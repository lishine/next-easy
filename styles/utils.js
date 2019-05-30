import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import get from 'lodash/fp/get'
import forOwn from 'lodash/forOwn'

export const bg = (bgsObject, bks) => ({ theme: { breakpointsObject } }) => {
	const acc = {}
	forOwn(bks, (paths, key) => {
		if (paths) {
			const bk = breakpointsObject[key]
			const cssObject = combineBg(pickPaths(paths)(bgsObject))
			if (bk) {
				acc[`@media screen and (min-width: ${bk})`] = cssObject
			} else {
				Object.assign(acc, cssObject)
			}
		}
	})
	return acc
}

const pickPaths = paths => obj => paths.map(path => get(path)(obj))

const combineBg = list => {
	const acc = {}
	list.forEach(arg =>
		Object.entries(arg).forEach(([key, value]) => {
			acc[key] = (acc[key] && acc[key] + ', ') || ''
			acc[key] = acc[key] + value
		})
	)
	return acc
}

export const mediaUp = from => props =>
	`@media screen and (min-width: ${props.theme.breakpointsObject[from]})`

export const mediaDown = to => props => `@media screen and (max-width: ${props.theme.breakpointsObject[to]})`

export const mediaBetween = (from, to) => props =>
	`@media screen and (min-width: ${props.theme.breakpointsObject[from]}) and (max-width: ${
		props.theme.breakpointsObject[to]
	})`

// export const space = props => SS.space({ ...props, pt: [0, 2, 4], pl: 4 })

// ------------ NOT USED ----------------------

export const cancelContainerPadding = props => css`
	margin-right: calc((-1) * var(--padding-container));
	margin-left: calc((-1) * var(--padding-container));
`

export const CancelContainerPadding = styled.div`
	${props =>
		props.upto
			? css`
					@media (max-width: ${props.theme.breakpointsObject[props.upto]}) {
						${cancelContainerPadding(props)}
					}
			  `
			: cancelContainerPadding(props)}
`

export const Space = styled.div`
	${props =>
		css`
			display: ${props.y ? 'block' : 'inline'};
			padding: ${props.y || 0} ${props.x || 0} 0 0;
		`}
`
