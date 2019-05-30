// node_modules
import { when, sleep } from 'utils/utils'
import { post, queryDb } from 'utils/fetch'
import { thunk } from 'easy-peasy'
import get from 'lodash/fp/get'

const getWifiStatus = props =>
    queryDb(
        /* GraphQL */ `
            query($signId: Int!, $name: String!) {
                wifi(
                    where: {
                        _and: [{ sign_id: { _eq: $signId } }, { name: { _eq: $name } }]
                    }
                ) {
                    status
                }
            }
        `,
        props
    )

export const submit = thunk(async (actions, { index }, { getState }) => {
    if (getState().forms[index].submitting) {
        return
    }

    actions.setSubmitting({ submitting: true, index })
    actions.setError({ error: 'Sending command', index })

    const { signId, wifis } = getState().data
    const json = {
        signId,
        wifi: wifis[index],
        password: getState().forms[index].values.password,
    }

    const { data, err, timeOut } = await post({
        url: `${process.env.API_URL}/api/register/wifi-connect`,
        json,
    })

    if (data) {
        console.log('success')

        actions.setError({ error: 'Waiting sign to connect to wifi', index })
        const { name } = wifis[index]
        console.log('name', name)
        console.log('signId', signId)

        let data, err, status
        let cnt = 0
        const startTime = new Date().getTime()
        while (new Date().getTime() - startTime < 10000) {
            ;({ data, err } = await getWifiStatus({
                signId,
                name,
            }))
            console.log('@ data', cnt++, data)
            status = get('wifi[0].status')(data)
            if (status || err) {
                break
            }
            await sleep(500)
        }

        console.log('^ satus', status)
        if (status) {
            actions.setError({ error: status, index })
        } else if (err) {
            console.log('err', err)
            actions.setError({ error: 'Something went wrong', index })
        } else {
            actions.setError({ error: 'Timeout', index })
        }
        actions.setSubmitting({ submitting: false, index })
    } else if (timeOut) {
        actions.setError({ error: 'Timeout', index })
        actions.setSubmitting({ submitting: false, index })
    } else {
        console.dir(err)
        const { response } = err || {}
        const { data, status } = response || {}

        if (!data) {
            actions.setError({ error: 'Something went wrong', index })
            return
        }
        const { mes = '' } = data

        const setError = () =>
            actions.setError({
                error: when(status)
                    .is(504, 'Network timeout')
                    .is(400, mes)
                    .else('Something went wrong'),
                index,
            })

        setError()
        actions.setSubmitting({ submitting: false, index })
    }
})
