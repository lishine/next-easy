import React from 'react'

export const CheckMd = ({ width, height, ...props }) => {
	const defaultWidth = 24
	const defaultHeight = 24
	return (
		<svg
			viewBox={`0 0 ${defaultWidth} ${defaultHeight}`}
			{...{
				width: width || (height ? undefined : `${defaultWidth}px`),
				height: height || (width ? undefined : `${defaultHeight}px`),
				...props,
			}}
		>
			<defs>
				<polygon
					id="icon-check-md-a"
					points="9 16.17 4.83 12 3.41 13.41 9 19 21 7 19.59 5.59"
				/>
			</defs>
			<use
				fill="#2DB101"
				fillRule="evenodd"
				xlinkHref="#icon-check-md-a"
			/>
		</svg>
	)
}
