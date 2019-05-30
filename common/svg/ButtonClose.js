import React from 'react'

export const ButtonClose = props => (
	<svg width="32" height="32" viewBox="0 0 32 32" fill="#FFE799" {...props}>
		<defs>
			<path
				id="button-close-b"
				d="M24.307484,24.2999532 C20.7289269,27.9000156 11.2624749,27.9000156 7.68391783,24.2999532 C4.10536072,20.6998907 4.10536072,11.2600323 7.68391783,7.68287097 C11.2624749,4.10570968 20.7289269,4.10570968 24.307484,7.68287097 C27.8860411,11.2600323 27.9089512,20.7227919 24.307484,24.2999532 Z"
			/>
			<filter
				id="button-close-a"
				width="168.2%"
				height="168.2%"
				x="-34.1%"
				y="-34.1%"
				filterUnits="objectBoundingBox"
			>
				<feMorphology in="SourceAlpha" operator="dilate" radius="2.5" result="shadowSpreadOuter1" />
				<feOffset in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
				<feColorMatrix
					in="shadowOffsetOuter1"
					values="0 0 0 0 1   0 0 0 0 0.905882353   0 0 0 0 0.6  0 0 0 1 0"
				/>
			</filter>
		</defs>
		<g fill="none" fillRule="evenodd">
			<circle cx="15" cy="15" r="12" fill="#E7EAEE" />
			<use fill="#000" filter="url(#button-close-a)" xlinkHref="#button-close-b" />
			<use fill="#FDC201" xlinkHref="#button-close-b" />
			<polygon
				fill="#FFF"
				points="15.3 16 12 12.7 12 12 12.7 12 16 15.3 19.3 12 20 12 20 12.7 16.7 16 20 19.3 20 20 19.3 20 16 16.7 12.7 20 12 20 12 19.3"
			/>
		</g>
	</svg>
)
