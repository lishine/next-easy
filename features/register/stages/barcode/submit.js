import { thunk } from 'easy-peasy'

export const submit = thunk(
    async (actions, __payload, { getState, getStoreState, dispatch }) => {
        if (getState().submitting) {
            return
        }

        if (!getStoreState().auth.isAuth) {
            dispatch.auth.showLogin()
            return
        }

        actions.setSubmitting({ submitting: true })

        const { barcode } = getState().values
        dispatch.register.setBarcode(barcode)

        const { data, err } = await dispatch.register.stages.wifi.load()
        console.log('in barcode { data, err }', { data, err })
        if (data) {
            console.log('in barcode success')
            dispatch.register.navigate(+1)
        } else {
            actions.setError({ error: err.message })
        }
        actions.setSubmitting({ submitting: false })
    }
)
