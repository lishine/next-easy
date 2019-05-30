import React from 'react'

export const Person = props => (
	<svg width="20" height="20" viewBox="0 0 20 20" {...props}>
		<defs>
			<path
				id="icon-person-a"
				d="M10,9 C11.6575,9 13,7.6575 13,6 C13,4.3425 11.6575,3 10,3 C8.3425,3 7,4.3425 7,6 C7,7.6575 8.3425,9 10,9 L10,9 Z M3,14.3333333 L3,17 L17,17 L17,14.3333333 C17,12.1166667 12.33625,11 10,11 C7.66375,11 3,12.1166667 3,14.3333333 Z"
			/>
		</defs>
		<use fillOpacity=".54" fillRule="evenodd" xlinkHref="#icon-person-a" />
	</svg>
)
