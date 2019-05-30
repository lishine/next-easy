import React from 'react'

export const Email = ({ width, height, ...props }) => {
	const defaultWidth = 20
	const defaultHeight = 20
	return (
		<svg
			viewBox={`0 0 ${defaultWidth} ${defaultHeight}`}
			{...{
				width: width || (height ? undefined : `${defaultWidth}px`),
				height: height || (width ? undefined : `${defaultHeight}px`),
				...props,
			}}
		>
			<path
				fillOpacity=".54"
				fillRule="evenodd"
				d="M16.4,4 C17.28,4 18,4.675 18,5.5 L18,14.5 C18,15.325 17.28,16 16.4,16 L3.6,16 C2.72,16 2,15.325 2,14.5 L2.008,5.5 C2.008,4.675 2.72,4 3.6,4 L16.4,4 Z M16,8.25 L16,6.25 L10,10 L4,6.25 L4,8.25 L10,12 L16,8.25 Z"
			/>
		</svg>
	)
}
