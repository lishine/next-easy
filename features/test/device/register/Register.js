import React, { useEffect } from 'react'
import { useStore, useActions } from 'easy-peasy'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import get from 'lodash/fp/get'

import { Box, Form, Button, Flex } from 'styles/ss-components'
import { Field, FieldArray } from 'formik'
import Input from 'common/form/fields/Input'
import { FForm } from 'common/form/FForm'
import { Map } from 'utils/utils'

const path = 'test.device.register'

export const Register = () => {
    const submitting = useStore(state => get(path)(state).submitting)
    const error = useStore(state => get(path)(state).error)

    const wifiConnect = useActions(actions => get(path)(actions).wifiConnect)

    return (
        <Box w={600} mx="auto" flexDirection="column">
            <Flex my={5} fontSize={3} justifyContent="space-around">
                Device Register
            </Flex>
            <FForm path={path} initialValues={{ barcode: '', wifiNames: ['a1', 'a2'] }}>
                {({ handleSubmit, values }) => (
                    <Form onSubmit={handleSubmit}>
                        <FieldArray name="wifiNames">
                            {({ insert, remove }) => {
                                const count = values.wifiNames.length
                                return (
                                    <>
                                        <Flex mb={5} justifyContent="space-between">
                                            <Flex
                                                flexDirection="column"
                                                alignItems="left"
                                            >
                                                <Box w="200px">
                                                    <Field name="barcode">
                                                        {props => (
                                                            <Input
                                                                {...props}
                                                                placeholder="Barcode"
                                                            />
                                                        )}
                                                    </Field>
                                                </Box>
                                            </Flex>
                                            <Button
                                                w="50px"
                                                ml={10}
                                                fontSize={35}
                                                className="btn btn-secondary"
                                                disabled={submitting}
                                                onClick={() =>
                                                    insert(count, `a${count + 1}`)
                                                }
                                            >
                                                &#43;
                                            </Button>
                                            <Button
                                                w="50px"
                                                fontSize={35}
                                                className="btn btn-secondary"
                                                disabled={count === 0}
                                                onClick={() => remove(count - 1)}
                                            >
                                                &#8722;
                                            </Button>
                                        </Flex>
                                        <Map collection={values.wifiNames}>
                                            {(_, index) => (
                                                <Flex
                                                    key={index}
                                                    py={2}
                                                    justifyContent="space-between"
                                                >
                                                    <Box w="200px">
                                                        <Field
                                                            name={`wifiNames[${index}]`}
                                                        >
                                                            {props => (
                                                                <Input
                                                                    {...props}
                                                                    placeholder="WIFI name"
                                                                />
                                                            )}
                                                        </Field>
                                                    </Box>
                                                    <Button
                                                        onClick={() =>
                                                            wifiConnect({
                                                                index,
                                                                values,
                                                                status: 'connected',
                                                            })
                                                        }
                                                        ml={6}
                                                        w="110px"
                                                        className="btn btn-primary"
                                                    >
                                                        Connected
                                                    </Button>
                                                    <Button
                                                        onClick={() =>
                                                            wifiConnect({
                                                                index,
                                                                values,
                                                                status:
                                                                    'unable to connect',
                                                            })
                                                        }
                                                        w="110px"
                                                        className="btn btn-primary"
                                                    >
                                                        Unable to connect
                                                    </Button>
                                                </Flex>
                                            )}
                                        </Map>

                                        <Flex
                                            mt={4}
                                            flexDirection="column"
                                            alignItems="center"
                                        >
                                            <Button
                                                w={1}
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={submitting}
                                                loading={submitting}
                                            >
                                                Submit
                                            </Button>
                                            {error && <Box py={2}>{error}</Box>}
                                        </Flex>
                                    </>
                                )
                            }}
                        </FieldArray>
                    </Form>
                )}
            </FForm>
        </Box>
    )
}
