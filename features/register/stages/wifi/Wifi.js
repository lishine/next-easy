import React, { useState, useEffect } from 'react'
import { useStore, useActions } from 'easy-peasy'
import get from 'lodash/fp/get'

import { Box, Form, Button, Flex, Span, H4 } from 'styles/ss-components'
import { Field } from 'formik'
import Input from 'common/form/fields/Input'
import { FForm } from 'common/form/FForm'
import { Map, Loading } from 'utils/utils'

const path = 'register.stages.wifi'

export const Wifi = () => {
    const navigate = useActions(actions => actions.register.navigate)

    const load = useActions(actions => get(path)(actions).load)
    const loading = useStore(state => get(path)(state).loading)
    const data = useStore(state => get(path)(state).data)
    const err = useStore(state => get(path)(state).err)
    useEffect(() => {
        if (!data) {
            load()
        }
    }, [])

    if (loading) {
        return <Loading {...{ loading }} />
    } else if (err) {
        return <Flex justifyContent="center">{err.message}</Flex>
    }
    console.log('data', data)

    return (
        <>
            <H4 mb={2} mt={1} mx="auto">
                Connecting WIFI
            </H4>
            {data.wifis.length === 0 ? (
                <Flex justifyContent="center">NO WIFI</Flex>
            ) : (
                <Map collection={data.wifis}>
                    {({ name }, index) => {
                        const submitting = useStore(
                            state => get(`${path}.forms[${index}]`)(state).submitting
                        )
                        const error = useStore(
                            state => get(`${path}.forms[${index}]`)(state).error
                        )

                        return (
                            <FForm
                                key={index}
                                index={index}
                                path={path}
                                initialValues={{ password: '' }}
                            >
                                {({ handleSubmit }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <Flex
                                            py={2}
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Span>{name}</Span>
                                            <Box w="200px">
                                                <Field name="password">
                                                    {props => (
                                                        <Input
                                                            {...props}
                                                            placeholder="Password"
                                                        />
                                                    )}
                                                </Field>
                                            </Box>
                                            <Box w={150}>{error}</Box>
                                            <Button
                                                w="100px"
                                                className="btn btn-primary"
                                                type="submit"
                                                disabled={submitting}
                                                loading={submitting}
                                            >
                                                Connect
                                            </Button>
                                        </Flex>
                                    </Form>
                                )}
                            </FForm>
                        )
                    }}
                </Map>
            )}
            <Button
                mt={5}
                w="150px"
                className="btn btn-primary"
                onClick={() => navigate(-1)}
            >
                Enter barcode
            </Button>
        </>
    )
}
