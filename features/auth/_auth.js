// node_modules
import { action, thunk, select } from 'easy-peasy'

// Common
import { post } from 'utils/fetch'

// Local
import { login } from './login/_login'

export const auth = {
    isAuth: false,
    setAuth: action((state, isAuth) => {
        state.isAuth = isAuth
    }),
    profile: undefined,
    setProfile: action((state, profile) => {
        state.profile = profile
    }),

    logout: thunk(async actions => {
        actions.setAuth(false)
        actions.showLogin()
        await post({ url: `${process.env.API_URL}/api/auth/logout` })
    }),

    enter: thunk(async (actions, payload, { dispatch }) => {
        actions.setAuth(true)
        const { data, err, timeOut } = await post({
            url: `${process.env.API_URL}/api/auth/profile`,
        })
        console.log('*** profile data', data)
        if (data) {
            actions.setProfile(data.user)
        } else {
            console.error('err / timeOut', err, timeOut)
        }
    }),

    showLogin: thunk((actions, payload, { dispatch }) => {
        actions.login.reset()
        actions.login.setMode(payload)
        dispatch.openModal({ component: 'Login' })
    }),

    login,
}
