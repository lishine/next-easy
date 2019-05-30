const env = require('./env-config.js')

module.exports = {
	"presets": [
		"next/babel",
		"@emotion/babel-preset-css-prop"
	],
	"plugins": [
		[
			"emotion",
			{
			  "sourceMap": true,
			  "autoLabel": true,
			  "labelFormat": "[local]",
			  "cssPropOptimization": true
			}
		  ],
		['transform-define', env],
		[
			"module-resolver",
			{
				"root": [
					"."
				]
			}
		],
		"@babel/plugin-proposal-export-default-from"
	]
}