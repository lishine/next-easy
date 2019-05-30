import React from 'react'

export const Check = ({ width, height, ...props }) => (
	<svg
		viewBox="0 0 24 24"
		{...{
			width: width || (height ? undefined : '24px'),
			height: height || (width ? undefined : '24px'),
			...props,
		}}
	>
		<defs>
			<polygon id="icon-check-a" points="9 16.17 4.83 12 3.41 13.41 9 19 21 7 19.59 5.59" />
		</defs>
		<use fill="#2DB101" fillRule="evenodd" xlinkHref="#icon-check-a" />
	</svg>
)
