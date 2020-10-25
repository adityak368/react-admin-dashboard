const webpack = require('webpack');
const pkg = require('../package.json');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /(node_modules)/,
				loader: 'awesome-typescript-loader',
				options: {
					cacheDirectory: true,
				},
			},
			{
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'application/font-woff',
					},
				},
			},
			{
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'application/font-woff',
					},
				},
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'application/octet-stream',
					},
				},
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				use: 'file-loader',
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: ['@svgr/webpack'],
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
				use: 'url-loader',
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
		plugins: [new TsConfigPathsPlugin()],
	},

	plugins: [
		new webpack.DefinePlugin({
			__VERSION__: JSON.stringify(pkg.version),
		}),
		new webpack.NamedModulesPlugin(),
		new AntdDayjsWebpackPlugin(),
	],
};
