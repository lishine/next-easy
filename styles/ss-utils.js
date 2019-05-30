// node_modules
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import ss_css from '@styled-system/css'
import {
    minHeight,
    verticalAlign,
    size,
    zIndex,
    left,
    top,
    bottom,
    right,
    position,
    display,
    overflow,
    maxWidth,
    space,
    color,
    width,
    height,
    flex,
    order,
    alignSelf,
    flexWrap,
    flexDirection,
    alignItems,
    justifyContent,
    fontSize,
    fontFamily,
    fontWeight,
    textAlign,
    lineHeight,
    letterSpacing,
    borders,
    borderColor,
    borderRadius,
    boxShadow,
    style,
    getWidth,
} from 'styled-system'

// Common
import { omitProps } from 'utils/utils'
import { mediaDown, mediaUp } from 'styles/utils'
import { theme } from 'styles/theme'

// const themed = key => props => props.theme[key]

// --------------------------------- Extra propeties

const clipPath = style({
    prop: 'clipPath',
    key: 'clipPaths',
    transformValue: n => n,
})

const notmobile = props =>
    props.notmobile && { [mediaDown('md')(props)]: { display: 'none' } }
notmobile.propTypes = { notmobile: PropTypes.bool }

const onlymobile = props =>
    props.onlymobile && { [mediaUp('md')(props)]: { display: 'none' } }
onlymobile.propTypes = { onlymobile: PropTypes.bool }

// -------------------------------------------------
// Box Extra Params -------------------------------
// -------------------------------------------------

export const transform = style({
    prop: 'transform',
})

const visibility = style({
    prop: 'visibility',
})

const cursor = style({
    prop: 'cursor',
})

const pointerEvents = style({
    prop: 'pointerEvents',
})

// -------------------------------------------------
// Text Extra Params -------------------------------
// -------------------------------------------------

const w = style({
    prop: 'w',
    cssProperty: 'width',
    key: 'widths',
    transformValue: getWidth,
})

const noBaselineShift = style({
    prop: 'noBaselineShift',
    cssProperty: 'transform',
    transformValue: n => 'translateY(0)',
})

const dark = style({
    prop: 'dark',
    cssProperty: 'color',
    transformValue: n => 'var(--dark-normal)',
})

const light = style({
    prop: 'light',
    cssProperty: 'color',
    transformValue: n => 'var(--light-normal)',
})

const text = ({ text }) =>
    text &&
    {
        menu: {
            fontFamily: 'Oswald, sans-serif',
            fontSize: '14px',
            lineHeight: '24px',
            transform: 'translateY(6px)',
            fontWeight: 400,
        },
    }[text]

const extraParamsObject = {
    w,
    pointerEvents,
    notmobile,
    onlymobile,
    cursor,
    visibility,
    transform,
    clipPath,
    text,
    dark,
    light,
    noBaselineShift,
}

const paramsObject = {
    ...extraParamsObject,
    minHeight,
    verticalAlign,
    boxShadow,
    bottom,
    right,
    size,
    zIndex,
    left,
    top,
    position,
    borders,
    borderColor,
    borderRadius,
    overflow,
    maxWidth,
    display,
    space,
    width,
    fontSize,
    color,
    flex,
    order,
    alignSelf,
    height,
    flexWrap,
    flexDirection,
    alignItems,
    justifyContent,
    fontFamily,
    fontWeight,
    textAlign,
    lineHeight,
    letterSpacing,
    // themed('Box'),
}
export const boxParamsArray = Object.entries(paramsObject).map(([key, value]) => value)

export const boxCss = props => boxParamsArray.map(func => func(props))

boxCss.blacklist = Object.entries(paramsObject).map(([key, value]) => key)
boxCss.filter = props => pick(boxCss.blacklist)(props)
boxCss.omit = props => omit(boxCss.blacklist)(props)
boxCss.omitProps = component => omitProps(boxCss.blacklist)(component)
boxCss.toClassName = component => styled(boxCss.omitProps(component))(boxParamsArray)

const traverse = (o, fn) => {
    for (var i in o) {
        fn.apply(this, [i, o[i], o])
        if (o[i] !== null && typeof o[i] === 'object') {
            traverse(o[i], fn)
        }
    }
}

boxCss.css = obj => {
    traverse(obj, (k, v, o) => {
        const e = extraParamsObject[k]
        if (e) {
            const g = e({ theme, [k]: v })
            delete o[k]
            Object.assign(o, g)
        }
    })
    return ss_css(obj)
}

boxCss.media = (media, obj) => {
    boxParamsArray.map(func => ({
        [media || '@media screen']: func({ theme, ...obj }),
    }))
}
