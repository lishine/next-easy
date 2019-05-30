// node_modules
import React, { useState, useEffect } from 'react'
import { useStore, useActions } from 'easy-peasy'
import get from 'lodash/fp/get'

// Common
import { NavLink, Box, Form, Button, Flex, Span, H4, SvgIcon } from 'styles/ss-components'
import { Field } from 'formik'
import Input from 'common/form/fields/Input'
import { FForm } from 'common/form/FForm'
import { Chevron } from 'common/svg/icons/index'

const path = 'auth.login'

export const CodeForm = props => {
    const submitting = useStore(state => get(path)(state).submitting)
    const error = useStore(state => get(path)(state).error)
    const code = useStore(state => get(path)(state).code)
    const setStage = useActions(actions => get(path)(actions).setStage)

    return (
        <>
            <FForm path={path} initialValues={{ code: '' }} reset>
                {({ handleSubmit, submit }) => (
                    <Form onSubmit={handleSubmit} display="flex" flexDirection="column">
                        <Field name="code">
                            {props => (
                                <Input
                                    w="200px"
                                    mt={2}
                                    {...props}
                                    autoComplete="number"
                                    placeholder="Code from SMS"
                                />
                            )}
                        </Field>

                        <Flex justifyContent="space-between">
                            <NavLink
                                mt="2px"
                                onClick={() => submit({ resendCode: true })}
                            >
                                Resend code
                            </NavLink>
                            <Span> {code} </Span>
                        </Flex>

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
                        <Box>
                            <NavLink
                                mt="4px"
                                onClick={() => setStage({ stage: 'Details' })}
                            >
                                <SvgIcon ml="-5px">
                                    <Chevron transform="rotate(180)" />
                                </SvgIcon>
                                Edit phone
                            </NavLink>
                        </Box>
                    </Form>
                )}
            </FForm>
            <Flex py={2}>{error}</Flex>
        </>
    )
}
