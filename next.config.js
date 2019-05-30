const withPlugins = require('next-compose-plugins')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
// const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')

const nextConfig = {
    target: 'serverless',
    // webpack: (config, { dev }) => {
    // 	// Perform customizations to config
    // 	config.module.rules = config.module.rules.map(rule => {
    // 		if (rule.loader === 'babel-loader') {
    // 			rule.options.cacheDirectory = false
    // 		}
    // 		return rule
    // 	})
    // 	// Important: return the modified config
    // 	return config
    // },
}

// const _withBundleAnalyzer = withBundleAnalyzer({
// 	analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
// 	analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
// 	bundleAnalyzerConfig: {
// 		server: {
// 			analyzerMode: 'static',
// 			reportFilename: '../bundles/server.html',
// 		},
// 		browser: {
// 			analyzerMode: 'static',
// 			reportFilename: '../bundles/client.html',
// 		},
// 	},
// })

module.exports = withPlugins([[withCSS], [withSass]], nextConfig)
