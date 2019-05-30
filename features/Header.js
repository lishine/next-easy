import React from 'react'
import { Flex, NavLink, SvgIcon, Box } from 'styles/ss-components'
import { useStore, useActions } from 'easy-peasy'
import { Login, Logout, Person } from 'common/svg/icons/index'

export const Header = () => {
    const isAuth = useStore(state => state.auth.isAuth)
    const profile = useStore(state => state.auth.profile)
    const showLogin = useActions(actions => actions.auth.showLogin)
    const logout = useActions(actions => actions.auth.logout)

    return (
        <Flex w={200} mx="auto" flexDirection="column" alignItems="center">
            {isAuth ? (
                <>
                    <NavLink onClick={logout}>
                        <SvgIcon mr={[1]}>
                            <Logout />
                        </SvgIcon>
                        Sign Out
                    </NavLink>
                    <Box>
                        <SvgIcon mr={[1]}>
                            <Person />
                        </SvgIcon>
                        {profile && profile.name}
                    </Box>
                </>
            ) : (
                <NavLink onClick={showLogin}>
                    <SvgIcon mr={[1]}>
                        <Login />
                    </SvgIcon>
                    Sign In
                </NavLink>
            )}
        </Flex>
    )
}
