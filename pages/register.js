import React from 'react'

import { router } from 'routes'

import { Register } from 'features/register/Register'

export default class Page extends React.Component {
    constructor(props) {
        super(props)
        const { store } = props

        if (process.browser) {
            console.log('BROWSER in constructor in register')

            const { barcode } = store.getState().router.query
            if (barcode) {
                router.replaceRoute('register', {}, { shallow: true })
            }
        } else {
            console.log('SERVER in constructor in register')
        }
    }

    componentWillUnmount() {
        if (process.browser) {
            console.log('BROWSER in componentWillUnmount in register')
        }
    }

    static async getInitialProps({ store }) {
        console.log('in Register in getInitialProps')

        store.dispatch.register.reset()
        const { barcode } = store.getState().router.query
        if (barcode) {
            store.dispatch.register.setBarcode(barcode)
            store.dispatch.register.setStage('Wifi')
            // await store.dispatch.register.stages.wifi.load()
        } else {
            store.dispatch.register.setStage('Barcode')
        }

        if (process.browser) {
            console.log('Register BROWSER')
        } else {
            console.log('Register SERVER')
        }
        return {}
    }

    render() {
        return (
            <>
                <Register />
            </>
        )
    }
}
