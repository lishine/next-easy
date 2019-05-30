import { queryDb } from 'utils/fetch'
import { thunk } from 'easy-peasy'

const getWifis = props =>
    queryDb(
        /* GraphQL */ `
            query($barcode: String!) {
                sign(where: { barcode: { _eq: $barcode } }) {
                    id
                    wifis {
                        id
                        name
                    }
                }
            }
        `,
        props
    )

export const load = thunk(
    async (actions, payload, { getState, getStoreState, dispatch }) => {
        actions.setLoading(true)
        console.log('wifi setting loading = true')

        const { barcode } = getStoreState().register
        let { data, err, timeOut, queryError } = await getWifis({ barcode })
        if (data) {
            const { sign } = data
            if (sign.length === 1) {
                const { id, wifis } = sign[0]
                data = { signId: id, wifis }
                wifis.forEach(() => actions.addForm())
            } else {
                data = undefined
                err = { message: 'No Sign with such barcode' }
            }
        } else if (queryError) {
            err = { message: 'Query Error' }
        } else if (timeOut) {
            err = { message: 'Timeout' }
        } else {
            err = { message: 'Unknown error' }
        }

        actions.setData(data)
        actions.setErr(err)
        actions.setTimeOut(timeOut)

        actions.setLoading(false)
        return { data, err, timeOut }
    }
)
