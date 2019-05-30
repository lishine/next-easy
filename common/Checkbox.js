import React, { useState } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { hideVisually } from 'polished'
import withProps from 'recompose/withProps'
import _Checkbox from 'rc-checkbox'
import './checkbox.css'

import { P, Box, Flex, Span, Text, Card, Image, H3, Button } from 'styles/ss-components'

// const HiddenCheckbox = styled(props => <input {...props} type="checkbox" />)(hideVisually)

// const StyledCheckbox = styled.div`
// 	display: inline-block;
// 	width: 16px;
// 	height: 16px;
// 	background: ${props => (props.checked ? 'salmon' : 'papayawhip')};
// 	border-radius: 3px;
// 	transition: all 150ms;

// 	${HiddenCheckbox}:focus {
// 		box-shadow: 0 0 0 3px pink;
// 	}
// `

// const CheckboxVisual = ({ className, checked, ...props }) => (
// 	<Box display="inline-block" verticalAlign="middle" className={className}>
// 		<HiddenCheckbox checked={checked} {...props} />
// 		<Box visibility={checked ? 'visible' : 'hidden'}>
// 			<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
// 				<polyline stroke="blue" strokeWidth="2px" points="20 6 9 17 4 12" />
// 			</svg>
// 		</Box>
// 		<StyledCheckbox checked={checked} />
// 	</Box>
// )

export const Checkbox = ({ children, ...props }) => {
	const [checked, setChecked] = useState(false)

	return (
		<Box {...props}>
			<label>
				<_Checkbox
					defaultChecked
					onChange={event => setChecked(event.target.checked)}
					disabled={false}
				/>
				&nbsp;&nbsp;&nbsp;{children}
			</label>
		</Box>
	)
}
