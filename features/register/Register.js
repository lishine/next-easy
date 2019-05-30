import React, { useState, useEffect } from 'react'
import { useStore, useActions } from 'easy-peasy'

import { Box, Form, Button, Flex, Span, H1, H2, H3, H4 } from 'styles/ss-components'

import * as stages from './stages/index'

import { store } from 'pages/_app'

export const Register = () => {
    const stage = useStore(state => state.register.stage)
    const barcode = useStore(state => state.register.barcode)
    console.log('store.getState().register', store.getState().register)
    console.log('barcode', barcode)
    console.log('stage', stage)
    const Stage = stages[stage]

    return (
        <Flex w={700} mx="auto" flexDirection="column">
            <H3 mx="auto" my={2}>
                Device Register
            </H3>
            <Stage />
        </Flex>
    )
}
