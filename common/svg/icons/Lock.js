import React from 'react'

export const Lock = ({ width, height, ...props }) => {
	if (!width && !height) {
		width = 17
	}
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
				d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"
			/>
		</svg>
	)
}
