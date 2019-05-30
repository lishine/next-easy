import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import withProps from 'recompose/withProps'
import { withTheme } from 'emotion-theming'

import { Box, Flex } from 'styles/ss-components'
import { mediaUp, mediaBetween, mediaDown } from 'styles/utils'

// Transforms [n,n,n,n] to boostrap col-ibreakpoint-ncols
// 0: mediaBetween { display: none }
// null: don't apply
export const Col = withTheme(({ theme, cols, className, ...props }) => {
    const { breakpointsList } = theme
    let _className = ''
    let style = ''
    className = className || ''
    if (Array.isArray(cols)) {
        cols.forEach((width, index) => {
            let bkSuffix = ''
            if (index > 0) {
                const bkName = breakpointsList[index - 1]
                bkSuffix = `-${bkName}`
            }
            if (width === 0) {
                let _style = ''
                const bkCurrent = breakpointsList[index - 1]
                const bkNext = breakpointsList[index]
                if (index === 0) {
                    _style = `${mediaDown(bkNext)({ theme })} { 
						display: none; 
					}`
                } else {
                    if (index === breakpointsList.length) {
                        _style = `${mediaUp(bkCurrent)({ theme })} { 
							display: none; 
						}`
                    } else {
                        _style = `${mediaBetween(bkCurrent, bkNext)({ theme })} { 
							display: none;
						}`
                    }
                }
                style = `${style} ${_style}`
            } else if (width) {
                _className = `${_className} col${bkSuffix}-${width}`
            }
        })
    } else {
        _className = `col-${cols}`
    }
    className = `${className} ${_className}`

    return <Box className={className} css={css(style)} {...props} />
})

export const Row = ({ className, ...props }) => (
    <Flex {...props} className={`row ${className || ''}`} />
)
