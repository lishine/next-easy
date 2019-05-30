import React from 'react'
import { useStore } from 'easy-peasy'
import { withTheme } from 'emotion-theming'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import { router } from 'routes'
import { boxCss } from 'styles/ss-utils'

export const RouteLink = boxCss.toClassName(
    ({ decorate, style, route, className, children, ...props }) => {
        const { Link: RouterLink, getRoutePath } = router
        const asPath = useStore(state => state.router.asPath)
        const href = getRoutePath(route, props)

        if (asPath === href) {
            className = `${className || ''} active`
        }

        style = style || {}
        style.textDecoration = decorate ? 'underline' : 'none'

        return (
            <RouterLink {...{ route }} {...props} prefetch>
                <a style={style} className={className}>
                    {children}
                </a>
            </RouterLink>
        )
    }
)
// export const Link = styled(boxCss.omitProps(_Link))(boxCss)
