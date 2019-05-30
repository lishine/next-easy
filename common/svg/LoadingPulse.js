import React from 'react'
export const LoadingPulse = props => (
	<svg viewBox="0 0 100 100" {...props}>
		<circle
			cx="50"
			cy="50"
			r="24.2634"
			fill="none"
			ng-attr-stroke="{{config.c1}}"
			ng-attr-stroke-width="{{config.width}}"
			stroke="#ffffcb"
			strokeWidth="3">
			<animate
				attributeName="r"
				calcMode="spline"
				values="0;40"
				keyTimes="0;1"
				dur="1.5"
				keySplines="0 0.2 0.8 1"
				begin="-0.75s"
				repeatCount="indefinite"
			/>
			<animate
				attributeName="opacity"
				calcMode="spline"
				values="1;0"
				keyTimes="0;1"
				dur="1.5"
				keySplines="0.2 0 0.8 1"
				begin="-0.75s"
				repeatCount="indefinite"
			/>
		</circle>
		<circle
			cx="50"
			cy="50"
			r="39.62"
			fill="none"
			ng-attr-stroke="{{config.c2}}"
			ng-attr-stroke-width="{{config.width}}"
			stroke="#fac090"
			strokeWidth="3">
			<animate
				attributeName="r"
				calcMode="spline"
				values="0;40"
				keyTimes="0;1"
				dur="1.5"
				keySplines="0 0.2 0.8 1"
				begin="0s"
				repeatCount="indefinite"
			/>
			<animate
				attributeName="opacity"
				calcMode="spline"
				values="1;0"
				keyTimes="0;1"
				dur="1.5"
				keySplines="0.2 0 0.8 1"
				begin="0s"
				repeatCount="indefinite"
			/>
		</circle>
	</svg>
)
