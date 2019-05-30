import React from 'react'
import { useStore } from 'easy-peasy'

import * as modals from './modals'

export const ModalSelect = () => {
    const modal = useStore(state => state.modal)
    if (!modal) {
        return null
    }
    const { component, params } = modal
    const Component = modals[component]
    return <Component {...params} />
}
