import React from 'react'

const Page = () => <div>ppage</div>

Page.getInitialProps = async ({ store, isServer, pathname, query }) => {
    console.log('in Page in getInitialProps')

    await store.dispatch.auth.showLogin({ mode: 'SignUp' })

    if (process.browser) {
        console.log('Page BROWSER')
    } else {
        console.log('Page SERVER')
    }

    return {}
}

export default Page
