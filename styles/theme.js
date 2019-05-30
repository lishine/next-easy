// !!!NOTICE: copy in _variables.scss
import React from 'react'
import { Global } from '@emotion/core'
import { rgb, rgba } from 'polished'

const breakpoints = ['768px', '1024px', '1440px']

export const theme = {
    breakpointsObject: {
        sm: 0,
        md: breakpoints[0],
        lg: breakpoints[1],
        xl: breakpoints[2],
    },
    breakpointsList: ['md', 'lg', 'xl'],
    breakpoints,
    radii: [0, '3'],
    shadows: ['inset 0 0 0 1px #929292'],
    colors: {
        primary: rgb(253, 194, 1),
        'primary-1': '#E6B000',
        'primary-2': '#FECF33',
        secondary: rgb(25, 25, 25),
        'secondary-1': '#2B2B2B',
        'secondary-2': '#979797',
        tertiary: rgb(0, 204, 204),
        success: rgb(0, 204, 0),
        warning: rgb(254, 207, 51),
        danger: rgb(252, 0, 0),
        link: rgb(76, 118, 254),
        'dark-normal': rgba(0, 0, 0, 0.87),
        'dark-muted': rgba(0, 0, 0, 0.87),
        'dark-disabled': rgba(0, 0, 0, 0.87),
        'dark-border': rgba(0, 0, 0, 0.87),
        'light-normal': rgb(255, 255, 255),
        'light-muted': rgba(255, 255, 255, 0.7),
        'light-disabled': rgba(255, 255, 255, 0.5),
        'light-border': rgba(255, 255, 255, 0.12),
        'onwhite-normal': rgb(77, 77, 77),
        'onwhite-muted': rgb(151, 151, 151),
        'onwhite-disabled': rgb(179, 179, 179),
        'onwhite-border': rgb(225, 225, 225),
    },
    space: [...Array(30).keys()].map(n => n * 8),
    widths: [...Array(30).keys()].map(n => n * 8),
}

// export const GlobalCss = () => <Global styles={process.env.NODE_ENV !== 'production' ? preview : preview} />
export const GlobalCss = () => <Global styles />
