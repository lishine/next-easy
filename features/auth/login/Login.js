// node_modules
import React, { useState, useEffect } from 'react'
import { useStore, useActions } from 'easy-peasy'
import get from 'lodash/fp/get'

// Common
import { ModalWrap } from 'common/modal/ModalWrap'

// Local
import { Box, Flex, Span, H3, H4, NavLink, P, SvgIcon } from 'styles/ss-components'

import { CodeForm } from './CodeForm'
import { DetailsForm } from './DetailsForm'
import { Chevron } from 'common/svg/icons/index'

const path = 'auth.login'

export const Content = () => {
    const stage = useStore(state => get(path)(state).stage)
    const mode = useStore(state => get(path)(state).mode)
    const navigate = useActions(actions => get(path)(actions).navigate)
    console.log('stage', stage)
    const Stage = stage === 'Details' ? DetailsForm : CodeForm

    return (
        <Flex w={200} mx="auto" flexDirection="column">
            <Flex my={2} alignItems="center" justifyContent="space-between">
                <H3>{mode === 'SignUp' ? 'Sign Up' : 'Sign In'}</H3>
                <P mt="auto">
                    <NavLink
                        onClick={() =>
                            navigate({
                                mode: mode === 'SignUp' ? 'SignIn' : 'SignUp',
                            })
                        }
                    >
                        <SvgIcon>
                            <Chevron />
                        </SvgIcon>
                        {mode === 'SignUp' ? 'Sign In' : 'Sign Up'}
                    </NavLink>
                </P>
            </Flex>
            <Stage />
        </Flex>
    )
}

export const Login = () => (
    <ModalWrap
        isOpen
        bg="grey"
        className="grid-container margin-container-md"
        width={400}
        // height={[null, 648, 664, 648]}
        alignSelf={['start', 'center']}
        overflow={['auto', 'visible']}
        // transform={[null, 'translateY(-30px)', 'translateY(3px)', 'translateY(-80px)']}
        Content={<Content />}
    />
)
