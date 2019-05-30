import React, { useEffect } from 'react'
import { useStore, useAction } from 'easy-peasy'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import { Device } from './device/Device'

export const Test = () => (
    <>
        <Device />
    </>
)
