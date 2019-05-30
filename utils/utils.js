import React from 'react'
import { default as lodashSome } from 'lodash/fp/some'
import { default as fpmap } from 'lodash/fp/map'
import { default as fpFind } from 'lodash/fp/find'
import { default as freduce } from 'lodash/fp/reduce'
import get from 'lodash/fp/get'
import compose from 'lodash/fp/compose'
import omit from 'lodash/fp/omit'
import mapProps from 'recompose/mapProps'
import LoadingOverlay from 'react-loading-overlay'

export const find = fpFind.convert({ cap: false })
export const map = fpmap.convert({ cap: false })
export const reduce = freduce.convert({ cap: false })

export const omitProps = compose(
    mapProps,
    omit
)

export const some = (value, array) => lodashSome(v => v === value)(array)

export const mapToObject = func => array =>
    reduce((acc, value, key) => {
        return Object.assign(acc, func(value, key))
    }, {})(array)

export const Map = ({ collection, children, visible = true }) =>
    visible && <>{map(children)(collection)}</>

export const Loading = ({ loading, children }) => {
    return (
        <LoadingOverlay
            active={loading}
            spinner
            text="Loading..."
            styles={{
                overlay: base => ({
                    ...base,
                    background: 'rgba(0, 0, 0, 0.2)',
                }),
                content: base => ({
                    ...base,
                    color: 'rgba(255, 0, 0, 0.5)',
                }),
                spinner: base => ({
                    ...base,
                    width: '100px',
                    '& svg circle': {
                        stroke: 'rgba(255, 0, 0, 0.5)',
                    },
                }),
            }}
        >
            {children}
        </LoadingOverlay>
    )
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const capitalize = word => word.charAt(0).toUpperCase() + word.substring(1)

export const toCapitalizedWords = name => {
    var words = name.match(/[A-Za-z][a-z]*/g) || []
    return words.map(capitalize).join(' ')
}

/// ////// Functional switch
const resolve = resolvedValue => ({
    is: () => resolve(resolvedValue),
    else: () => resolvedValue,
})

export const when = expr => ({
    is: (constExpr, value) => (expr === constExpr ? resolve(value) : when(expr)),
    else: defaultValue => defaultValue,
})
/// / !!!!! MUST USE ELSE !!!!
// export const whenTrue = expr => {
// 	then: value => (expr ? value : when(expr)),
// 	else: defaultValue => defaultValue,
// }

/// ////////////////

export const throwIf = (fn, ...args) => result => {
    if (typeof fn === 'function') {
        if (fn(result)) {
            throw Error(...args)
        }
        return result
    } else if (fn) {
        throw Error(...args)
    }
}

export function totoCatch(p, t) {
    return toto(p, t).then(({ data, err, timeOut }) => {
        if (timeOut) {
            throw new Error('timeout')
        } else if (err) {
            throw new Error(err)
        }
        return data
    })
}

export function toto(p, t) {
    const promise = get('promise')(p) || p
    const timeOut = get('timeOut')(p) || t
    console.log('timeOut', timeOut)
    return timeOutPromise({ promise, timeOut })
        .then(data => ({ data }))
        .catch(err => {
            if (err && err.message === 'timeOut') {
                return { timeOut: true }
            } else {
                return { err }
            }
        })
}

function timeOutPromise({ timeOut, promise }) {
    let handle
    if (!timeOut) {
        return promise
    }

    return Promise.race([
        promise,
        new Promise((resolve, reject) => {
            handle = setTimeout(() => {
                reject(new Error('timeOut'))
            }, timeOut)
        }),
    ]).then(
        v => {
            clearTimeout(handle)
            return v
        },
        err => {
            clearTimeout(handle)
            throw err
        }
    )
}
