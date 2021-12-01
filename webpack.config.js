const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExctractPlugin = require('mini-css-extract-plugin')

module.exports = (env = {}) => {

	console.log(env)

	const { mode = 'development' } = env

	const isProd = mode === 'production'
	const isDev = mode === 'development'

	const getPlugins = () => {
		const plugins = [
			new HtmlWebpackPlugin({
				template: 'public/index.html'
			})
		]

		if (isProd) {
			plugins.push(new MiniCssExctractPlugin({
				filename: 'main-[hash:8].css'
				})
			)
		}

		return plugins
	}

	return {
		mode: isProd ? 'production' : isDev && 'development',
		output: {
			filename: 'bundle.js'
		},

		module: {
			rules: [
	
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [ 'babel-loader' ]
				},
	
				// Loading images
				{
					test: /\.(png|jpe?g|svg|gif)$/,
					use: [
						{ 
							loader: 'file-loader',
							options: {
								outputPath: 'images',
								name: '[name]-[sha1:hash:7].[ext]'
							}
						}
					]
				},
	
				// Loading styles
				{
					test: /\.s[ac]ss$/,
					use: [ isProd ? MiniCssExctractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader' ]
				}
			]
		},
	
		plugins: getPlugins(),
	
		devServer: {
			open: true,
			port: 5000
		},

		devtool: isDev ? 'source-map' : false
	}
}