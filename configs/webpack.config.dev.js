const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const APP_DIR = path.resolve(__dirname, '..', 'app');
const RESOURCES_DIR = path.resolve(__dirname, '..', 'resources');
const ENTRIES_DIR = path.resolve(__dirname, '..', 'app', 'entries');

const port = process.env.PORT || 80;

module.exports = merge.smart(baseConfig, {
	devtool: 'eval-cheap-module-source-map',
	mode: 'development',
	target: 'web',
	entry: {
		app: ['babel-polyfill', path.join(ENTRIES_DIR, 'app.tsx')],
	},

	output: {
		path: APP_DIR,
		filename: '[name].bundle.js',
		publicPath: '/',
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'less-loader',
						options: {
							sourceMap: true,
							lessOptions: {
								javascriptEnabled: true,
							},
						},
					},
				],
			},
		],
	},

	plugins: [
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'development',
		}),
	],

	devServer: {
		contentBase: [APP_DIR, RESOURCES_DIR],
		port: port,
		hot: true,
		historyApiFallback: true,
		compress: true,
		noInfo: true,
		stats: 'errors-only',
		watchOptions: {
			aggregateTimeout: 300,
			ignored: /node_modules/,
			poll: 100,
		},
	},
});
