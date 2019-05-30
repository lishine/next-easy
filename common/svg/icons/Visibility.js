import React from 'react'

export const Visibility = ({ width, height, ...props }) => {
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
				d="M10,4 C6.36363636,4 3.25818182,6.488 2,10 C3.25818182,13.512 6.36363636,16 10,16 C13.6363636,16 16.7418182,13.512 18,10 C16.7418182,6.488 13.6363636,4 10,4 L10,4 Z M10,14 C7.792,14 6,12.208 6,10 C6,7.792 7.792,6 10,6 C12.208,6 14,7.792 14,10 C14,12.208 12.208,14 10,14 L10,14 Z M10,8 C8.89333333,8 8,8.89333333 8,10 C8,11.1066667 8.89333333,12 10,12 C11.1066667,12 12,11.1066667 12,10 C12,8.89333333 11.1066667,8 10,8 L10,8 Z"
			/>
		</svg>
	)
}
