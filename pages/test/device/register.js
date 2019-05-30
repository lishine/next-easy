import React from 'react'

import { Box } from 'styles/ss-components'
import { Register } from 'features/test/device/register/Register'

const Page = () => (
    <>
        <Register />
    </>
)

Page.getInitialProps = async ({ store, isServer, pathname, query }) => {
    console.log('in Test in getInitialProps')

    if (process.browser) {
        console.log('Test BROWSER')
    } else {
        console.log('Test SERVER')
    }

    return {}
}

export default Page
