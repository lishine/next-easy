// node_modules
import { action, thunk, select } from 'easy-peasy'
import isEmpty from 'lodash/isEmpty'
import { when, sleep } from 'utils/utils'

const form = () => ({
    error: undefined,
    valid: false,
    form: undefined,
    validated: { notValidatedAtStart: true },
    submitting: false,
    values: {},
    returnData: undefined,
    fromForm: undefined,
})

const getDynamicState = ({ state, dynamic, index }) => {
    if (dynamic) {
        return state.forms[index]
    } else {
        return state
    }
}

export const formModel = (params = {}) => {
    let obj = {}
    const { dynamic } = params
    if (dynamic) {
        obj.forms = []
    } else {
        Object.assign(obj, form())
    }
    Object.assign(obj, {
        addForm: action(state => {
            state.forms.push(form())
        }),
        isValidated: select(state => payload => {
            const { index = 0 } = payload
            return isEmpty(getDynamicState({ state, dynamic, index }).validated)
        }),
        setValidated: action((state, payload) => {
            const { validated, index = 0 } = payload
            getDynamicState({ state, dynamic, index }).validated = validated
        }),
        setValues: action((state, payload) => {
            const { values, index = 0 } = payload
            getDynamicState({ state, dynamic, index }).values = values
        }),
        onNewValues: thunk((actions, payload, { getState }) => {
            const { values, validated, index = 0 } = payload
            actions.setValidated({ validated, index })
            actions.setValues({ values: Object.assign(getState().values, values), index })
            if (getDynamicState({ state: getState(), dynamic, index }).error) {
                actions.clearError({ index })
            }
        }),
        setSubmitting: action((state, payload) => {
            const { submitting, index = 0 } = payload
            getDynamicState({ state, dynamic, index }).submitting = submitting
        }),
        setError: action((state, payload) => {
            const { error, index = 0 } = payload
            getDynamicState({ state, dynamic, index }).error = error
        }),
        setFromForm: action((state, payload) => {
            const { fromForm, index = 0 } = payload
            getDynamicState({ state, dynamic, index }).fromForm = fromForm
        }),
        clearError: action((state, payload) => {
            const { index = 0 } = payload
            getDynamicState({ state, dynamic, index }).error = undefined
        }),
        setReturnData: action((state, payload) => {
            const { returnData, index = 0 } = payload
            getDynamicState({ state, dynamic, index }).returnData = returnData
        }),
        submitSuccess: action((state, payload) => {
            const { returnData, index = 0 } = payload
            getDynamicState({ state, dynamic, index }).returnData = returnData
        }),
        submitFailure: action((state, payload = {}) => {
            const { index = 0 } = payload
            getDynamicState({ state, dynamic, index }).returnData = null
        }),
        submit,
        startSubmitting: action(() => {}),
        stopSubmitting,
    })

    return obj
}

const submit = thunk(async (actions, { index, fromForm }, { getState }) => {
    if (getState().submitting) {
        return
    }
    actions.setFromForm({ index, fromForm })
    actions.setSubmitting({ index, submitting: true })
    actions.startSubmitting({ index, fromForm, values: getState().values })
})

const stopSubmitting = thunk(async (actions, { data, err, timeOut }, { getState }) => {
    if (data) {
        console.log('success')
        actions.submitSuccess({ returnData: data })
    } else if (timeOut) {
        actions.setError({ error: 'Timeout' })
        actions.submitFailure()
    } else {
        console.error(err)
        console.error(JSON.stringify(err, 0, 2))

        const { response } = err || {}
        const { data, status } = response || {}

        if (!data) {
            actions.setError({ error: 'Something went wrong' })
        } else {
            const { mes = '' } = data

            const setError = () =>
                actions.setError({
                    error: when(status)
                        .is(504, 'Network timeout')
                        .is(400, mes)
                        .else('Something went wrong'),
                })

            setError()
        }

        actions.submitFailure()
    }

    actions.setSubmitting({ submitting: false })
})
