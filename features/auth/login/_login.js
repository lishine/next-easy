// node modules
import { listen, action, thunk } from 'easy-peasy'
import isEmpty from 'lodash/isEmpty'

// Common
import { formModel } from 'common/models/formModel'
import { post } from 'utils/fetch'
import { initialState } from 'features/model'
console.log('initialState', initialState)
export const login = {
    reset: action(state => initialState.auth.login),

    ...formModel(),
    stage: 'Details',
    setStage: action((state, { stage }) => {
        state.stage = stage
    }),

    mode: 'SignIn',
    setMode: action((state, payload = {}) => {
        const { mode } = payload
        state.mode = mode || 'SignIn'
    }),
    navigate: thunk(async (actions, { mode }) => {
        if (mode) {
            actions.setStage({ stage: 'Details' })
            actions.setMode({ mode })
        }
    }),

    post: thunk(async (___, json) =>
        post({
            url: `${process.env.API_URL}/api/auth/login`,
            json,
        })
    ),

    startSubmitting: thunk(async (actions, ___, { getState }) => {
        const { mode, stage, values, fromForm = {} } = getState()
        const { resendCode } = fromForm
        const json = { values, mode, stage, resendCode }

        const { data, err, timeOut } = await actions.post(json)
        actions.stopSubmitting({ data, err, timeOut })
    }),

    submitSuccess: thunk(
        async (actions, { returnData: { code } }, { dispatch, getState }) => {
            console.log('*** submitSuccess')

            console.log('TESTING - REMOVE code', code)
            actions.setCode({ code })

            const { fromForm, stage } = getState()
            if (stage === 'Details') {
                actions.setStage({ stage: 'Code' })
            } else if (stage === 'Code') {
                if (!(fromForm && fromForm.resendCode)) {
                    await dispatch.auth.enter()
                    dispatch.closeModal()
                }
            }
        }
    ),

    /// //// FOR TESTING - REMOVE
    code: undefined,
    setCode: action((state, { code }) => {
        state.code = code
    }),

    // listeners: listen(on => {
    //     on(login.startSubmitting, login.detailsSubmit)
    //     on(login.stages.details.submitSuccess, login.detailsSubmitSuccess)
    // }),
}
