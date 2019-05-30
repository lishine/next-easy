import get from 'lodash/fp/get'
import { createStore, action } from 'easy-peasy'

import { auth } from 'features/auth/_auth'
import { register } from 'features/register/_register'
import { test } from 'features/test/_test'

const subscribers = {}
function subsc(key, cb) {
    if (subscribers.hasOwnProperty(key)) {
        subscribers[key].push(cb)
    } else {
        subscribers[key] = [cb]
    }

    return function() {
        subscribers[key] = subscribers[key].filter(s => s !== cb)
    }
}

function initSubscriber(store) {
    let prevState = store.getState()

    console.log('INIT subscribing')
    store.subscribe(() => {
        const subs = []
        const newState = store.getState()
        Object.keys(subscribers).forEach(key => {
            if (get(key)(prevState) !== get(key)(newState)) {
                subscribers[key].forEach(cb => subs.push(cb))
            }
        })

        prevState = newState
        subs.forEach(cb => cb(store))
    })

    return subsc
}

export let initialState = {}

const storeStructure = {
    ssrInitialState: {},
    setSSRInitialState: action((state, ssrInitialState) => {
        state.ssrInitialState = ssrInitialState
    }),
    reset: action(state => initialState),
    test,
    auth,
    register,

    modalOpen: false,
    modal: undefined,
    openModal: action((state, modal) => {
        state.modalOpen = true
        if (modal) {
            state.modal = modal
        }
    }),
    closeModal: action(state => {
        state.modalOpen = false
    }),

    router: {
        pathname: undefined,
        query: undefined,
        asPath: undefined,
        route: undefined,
        set: action((state, newState) => {
            Object.assign(state, newState)
        }),
    },
}

export let subscribe

export const makeStore = (updatedState, options) => {
    const store = createStore(storeStructure, { initialState: updatedState })
    if (!updatedState) {
        console.log('*** updating global-var initialState on the server')
        initialState = store.getState()
        store.dispatch.setSSRInitialState(initialState)
        initialState = store.getState()
    } else {
        console.log('*** updating global-var initialState after store mutated')
        initialState = store.getState().ssrInitialState
    }

    if (process.browser) {
        subscribe = initSubscriber(store)
    }

    return store
}
