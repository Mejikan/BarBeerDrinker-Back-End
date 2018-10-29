const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/siteApi/siteApi.ts',
	target: 'node',
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ],
		alias: {
			'@': path.resolve(__dirname, 'src/'),
		}
	},
	output: {
		filename: 'siteApi.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new NodemonPlugin({
			watch: path.resolve('./dist'),
			ignore: ['*.js.map'],
			verbose: true
		})
	]
};