import React, { useState, useEffect } from 'react'
import { useStore, useActions } from 'easy-peasy'
import get from 'lodash/fp/get'

import { Box, Form, Button, Flex, Span, H1, H2, H3, H4 } from 'styles/ss-components'
import { Field } from 'formik'
import Input from 'common/form/fields/Input'
import { FForm } from 'common/form/FForm'

const path = 'register.stages.barcode'

export const Barcode = props => {
    const submitting = useStore(state => get(path)(state).submitting)
    const error = useStore(state => get(path)(state).error)

    return (
        <>
            <H4 mb={2} mt={1} mx="auto">
                Entering barcode
            </H4>
            <FForm path={path} initialValues={{ barcode: '' }}>
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Flex py={2} justifyContent="space-between" alignItems="center">
                            <Box w="200px">
                                <Field name="barcode">
                                    {props => <Input {...props} placeholder="Barcode" />}
                                </Field>
                            </Box>
                            <Button
                                w="200px"
                                type="submit"
                                className="btn btn-primary"
                                disabled={submitting}
                                loading={submitting}
                            >
                                Next
                            </Button>
                        </Flex>
                        <Flex py={2} justifyContent="center">
                            {error}
                        </Flex>
                    </Form>
                )}
            </FForm>
        </>
    )
}
