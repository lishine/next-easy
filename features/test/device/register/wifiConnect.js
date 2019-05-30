import { when, sleep } from 'utils/utils'
import { post } from 'utils/fetch'
import { thunk } from 'easy-peasy'

export const wifiConnect = thunk(async (actions, { index, values, status }, helpers) => {
    const { getState } = helpers

    if (getState().submitting) {
        return
    }
    actions.setSubmitting({ submitting: true })

    const { barcode, wifiNames } = values
    const json = { barcode, wifi: { name: wifiNames[index], status } }

    const { data, err, timeOut } = await post({
        url: `${process.env.API_URL}/api/device/wifi-connect`,
        json,
    })

    if (data) {
        console.log('success')
    } else if (timeOut) {
        actions.setError({ error: 'Timeout' })
    } else {
        console.dir(err)
        const { response } = err || {}
        const { data, status } = response || {}

        if (!data) {
            actions.setError({ error: 'Something went wrong' })
            return
        }
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

    actions.setSubmitting({ submitting: false })
})
