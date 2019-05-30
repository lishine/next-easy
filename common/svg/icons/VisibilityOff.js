import React from 'react'

export const VisibilityOff = ({ width, height, ...props }) => {
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
				d="M8.5,6.3 L6.8,4.7 C7.8,4.2 8.9,4 10,4 C13.6,4 16.7,6.5 18,10 C17.5,11.4 16.7,12.6 15.7,13.6 L13.7,11.6 C13.9,11.1 14,10.6 14,10.1 C14,7.9 12.2,6.1 10,6.1 C9.5,6 9,6.1 8.5,6.3 Z M12,9.8 C11.9,8.9 11.2,8.1 10.2,8 L12,9.8 Z M17.6,17.5 L16.5,18.6 L13.2,15.3 C12.2,15.7 11.1,16 10,16 C6.4,16 3.3,13.5 2,10 C2.5,8.6 3.3,7.4 4.3,6.4 L1.4,3.5 L2.5,2.4 L17.6,17.5 Z M11.6,13.7 L9.9,12 C8.9,12 8,11.1 8,10.1 L6.3,8.4 C6.1,8.9 6,9.4 6,10 C6,12.2 7.8,14 10,14 C10.6,14 11.1,13.9 11.6,13.7 Z"
			/>
		</svg>
	)
}
