// node_modules
import React, { useState, useEffect } from 'react'
import { useStore, useActions } from 'easy-peasy'
import get from 'lodash/fp/get'

// Common
import { Box, Form, Button, Flex, Span, H1, H2, H3, H4 } from 'styles/ss-components'
import { Field } from 'formik'
import Input from 'common/form/fields/Input'
import { FForm } from 'common/form/FForm'

const path = 'auth.login'

export const DetailsForm = props => {
    const submitting = useStore(state => get(path)(state).submitting)
    const error = useStore(state => get(path)(state).error)
    const mode = useStore(state => get(path)(state).mode)

    const initialValues = mode === 'SignUp' ? { name: '', phone: '' } : { phone: '' }

    return (
        <>
            <FForm path={path} initialValues={initialValues}>
                {({ handleSubmit }) => (
                    <Form
                        onSubmit={handleSubmit}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        {mode === 'SignUp' && (
                            <Field name="name">
                                {props => (
                                    <Input
                                        w="200px"
                                        mt={2}
                                        {...props}
                                        autoComplete="name"
                                        placeholder="Full Name"
                                    />
                                )}
                            </Field>
                        )}

                        <Field name="phone">
                            {props => (
                                <Input
                                    w="200px"
                                    mt={2}
                                    {...props}
                                    autoComplete="phone"
                                    placeholder="Phone"
                                />
                            )}
                        </Field>

                        <Button
                            w="200px"
                            mt={2}
                            type="submit"
                            className="btn btn-primary"
                            disabled={submitting}
                            loading={submitting}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </FForm>
            <Flex py={2}>{error}</Flex>
        </>
    )
}
