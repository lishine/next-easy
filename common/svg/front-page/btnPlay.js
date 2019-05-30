import React from 'react'

export const btnPlay = props => (
	<svg viewBox="0 0 69 68" {...props}>
		<defs>
			<path
				id="btn-play-b"
				d="M50.9015488,50.8816947 C41.467171,60.3727684 16.5101612,60.3727684 7.07578338,50.8816947 C-2.35859446,41.3906209 -2.35859446,16.5037214 7.07578338,7.07302347 C16.5101612,-2.35767449 41.467171,-2.35767449 50.9015488,7.07302347 C60.3359266,16.5037214 60.396326,41.4509967 50.9015488,50.8816947 Z"
			/>
			<filter
				id="btn-play-a"
				width="125.9%"
				height="125.9%"
				x="-12.9%"
				y="-12.9%"
				filterUnits="objectBoundingBox">
				<feMorphology
					in="SourceAlpha"
					operator="dilate"
					radius="2.5"
					result="shadowSpreadOuter1"
				/>
				<feOffset in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
				<feColorMatrix
					in="shadowOffsetOuter1"
					values="0 0 0 0 1   0 0 0 0 0.905882353   0 0 0 0 0.6  0 0 0 1 0"
				/>
			</filter>
			<path
				id="btn-play-d"
				d="M42.1693128,27.460215 L23.9302705,15.3181782 C23.3548378,14.9340346 22.6117403,14.8948514 21.9981651,15.2162991 C21.3845898,15.5377468 21.0006913,16.1673552 21.0000021,16.8533249 L21.0000021,41.1420364 C20.9989534,41.8288386 21.3821781,42.4600171 21.9960906,42.7826132 C22.6100031,43.1052092 23.3541394,43.0664315 23.9302705,42.6818211 L42.1693128,30.5397843 C42.6885516,30.1951661 43,29.6178569 43,28.9999996 C43,28.3821424 42.6885516,27.8048331 42.1693128,27.460215 Z"
			/>
			<filter
				id="btn-play-c"
				width="168.2%"
				height="150%"
				x="-34.1%"
				y="-13%"
				filterUnits="objectBoundingBox">
				<feMorphology in="SourceAlpha" radius=".5" result="shadowSpreadOuter1" />
				<feOffset dy="3" in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
				<feGaussianBlur
					in="shadowOffsetOuter1"
					result="shadowBlurOuter1"
					stdDeviation="2.5"
				/>
				<feColorMatrix
					in="shadowBlurOuter1"
					values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.12 0"
				/>
			</filter>
		</defs>
		<g fill="none" fillRule="evenodd" transform="translate(5.5 5)">
			<use fill="#000" filter="url(#btn-play-a)" xlinkHref="#btn-play-b" />
			<use fill="#FDC201" xlinkHref="#btn-play-b" />
			<use fill="#000" filter="url(#btn-play-c)" xlinkHref="#btn-play-d" />
			<use fill="#FFF" xlinkHref="#btn-play-d" />
		</g>
	</svg>
)
