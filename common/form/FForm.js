import React, { memo, useState, useEffect, useRef } from 'react'
import { Formik } from 'formik'
import { useActions, useStore } from 'easy-peasy'
import get from 'lodash/fp/get'
import set from 'lodash/fp/set'
import pick from 'lodash/fp/pick'
// import isEqual from 'lodash/isEqual'
import useDeepCompareEffect from 'use-deep-compare-effect'

// Common
import { validate } from './validate'
import { schema } from './schema'
import { store } from 'pages/_app'

// function usePrev(value) {
//     const ref = useRef()
//     useEffect(() => {
//         ref.current = value
//     })
//     return ref.current
// }

export const FForm = memo(({ path, index, children, initialValues, reset }) => {
    const submit = useActions(actions => get(path)(actions).submit)
    const onNewValues = useActions(actions => get(path)(actions).onNewValues)
    const clearError = useActions(actions => get(path)(actions).clearError)

    const [state, setState] = useState({})
    console.log('state', state)
    useDeepCompareEffect(() => {
        const fields = Object.keys(initialValues)
        const values = get(path)(store.getState()).values
        console.log('initialValues', initialValues)
        console.log('pick(fields)(values)', pick(fields)(values))
        console.log('reset', reset)
        setState({
            fields,
            initialValues: reset
                ? initialValues
                : Object.assign({}, initialValues, pick(fields)(values)),
        })

        clearError({ index })
    }, [initialValues])

    return (
        <Formik
            enableReinitialize
            initialValues={state.initialValues}
            validate={values => {
                const validated = validate(schema(state.fields))(values)
                onNewValues({ values, validated, index })
                return validated
            }}
            onSubmit={() => submit({ index })}
        >
            {({ submitForm, handleSubmit, ...props }) => {
                set(path)({ submitForm })(FForm)

                const _submit = fromForm => {
                    submit({ index, fromForm })
                }

                return children({ handleSubmit, submit: _submit, ...props })
            }}
        </Formik>
    )
})

// FForm.whyDidYouRender = true
