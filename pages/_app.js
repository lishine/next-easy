// Node Modules
import React from 'react'
import Head from 'next/head'
import { withRouter, default as nextRouter } from 'next/router'
import withRedux from 'next-redux-wrapper'
import cookie from 'cookie'
import { destroyCookie } from 'nookies'
import jwtDecode from 'jwt-decode'
import App, { Container } from 'next/app'
import { useStore, StoreProvider } from 'easy-peasy'
import { ThemeProvider } from 'emotion-theming'

// Common
import { router, isPublicPage, findPage } from 'routes'
import { post } from 'utils/fetch'
import { makeStore } from 'features/model'
import { GlobalCss, theme } from 'styles/theme'

// Local
import { ModalSelect } from 'common/modal/ModalSelect'
import { Header } from 'features/Header'

import 'scss/index.scss'

export let store

export const redirect = (ctx, path) => {
    if (process.browser) {
        nextRouter.push(path)
    } else {
        ctx.res.writeHead(301, { Location: path })
        ctx.res.end()
    }
}

if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render')
    whyDidYouRender(React)
}

export let globalCtx

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        console.log('iiiin _app')

        globalCtx = ctx
        const { store, pathname, query, asPath } = ctx

        store.dispatch.reset()
        store.dispatch.router.set({
            pathname,
            query,
            asPath: asPath.split('?')[0],
            route: router.getMatchingRoute(asPath),
        })

        if (process.browser) {
            console.log('* IN BROWSER')
        } else {
            if (asPath === '/logout') {
                console.log('pushing logout')
                destroyCookie(ctx, 'sbsToken')
                await store.dispatch.auth.showLogin()
                redirect(ctx, '/')
            }
            console.log('* NOT in browser')
            try {
                const { sbsToken } = cookie.parse(ctx.req.headers.cookie) || {}
                console.log('sbsToken', sbsToken)
                const { expireIn, timestamp } = jwtDecode(sbsToken)
                const now = new Date().getTime()
                if (timestamp + expireIn < now) {
                    console.log('Access token is expired')
                    destroyCookie(ctx, 'sbsToken')
                    await store.dispatch.auth.showLogin()
                } else {
                    await store.dispatch.auth.enter()
                }
            } catch (error) {
                await store.dispatch.auth.showLogin()
                console.log('No token')
            }
        }

        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {}

        // if (findPage(pathname)) {
        // 	console.log({ pathname, query, asPath })
        // 	if (!store.getState().auth.isAuth && !isPublicPage(pathname)) {
        // 		console.log('redirecting to login')
        // 		redirect(ctx, '/login/sign-in')
        // 	} else if (store.getState().auth.isAuth && pathname === '/login') {
        // 		console.log('redirecting to home')
        // 		redirect(ctx, '/')
        // 	}
        // }
        return { pageProps }
    }
    constructor(props) {
        super(props)
        store = props.store

        if (process.browser) {
            console.log('* BROWSER in constructor')
        } else {
            console.log('* SERVER in constructor')
        }
    }
    render() {
        const { Component, pageProps, store } = this.props

        if (process.browser) {
            console.log('$ BROWSER in render _app')

            const { pathname, query, asPath } = this.props.router
            console.log('{ pathname, query, asPath }', {
                pathname,
                query,
                asPath,
            })
            store.dispatch.router.set({
                pathname,
                query,
                asPath,
                route: router.getMatchingRoute(asPath),
            })
        } else {
            console.log('$ SERVER in render _app')
        }
        return (
            <Container>
                <Head>
                    <title>Dance Salsa</title>
                </Head>
                <StoreProvider store={store}>
                    <ThemeProvider theme={theme}>
                        <GlobalCss />
                        <div className="page-container">
                            <Header />
                            <ModalSelect />
                            <Component store={store} {...pageProps} />
                        </div>
                    </ThemeProvider>
                </StoreProvider>
            </Container>
        )
    }
}

export default withRedux(makeStore, { debug: false })(withRouter(MyApp))
