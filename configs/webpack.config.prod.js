const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const APP_DIR = path.resolve(__dirname, '..', 'app');
const ENTRIES_DIR = path.resolve(__dirname, '..', 'app', 'entries');

module.exports = merge.smart(baseConfig, {
	devtool: 'hidden-source-map',
	mode: 'production',
	target: 'web',
	entry: {
		app: ['babel-polyfill', path.join(ENTRIES_DIR, 'app.tsx')],
	},

	output: {
		path: DIST_DIR,
		publicPath: '/assets',
		filename: '[name].bundle.js',
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '/assets',
						},
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
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

	optimization: {
		minimizer: [
			new TerserPlugin({
				parallel: true,
				sourceMap: true,
				cache: true,
			}),
			new OptimizeCSSAssetsPlugin({
				cssProcessorOptions: {
					map: {
						inline: false,
						annotation: true,
					},
				},
			}),
		],
	},

	plugins: [
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'production',
		}),

		new MiniCssExtractPlugin({
			filename: '[name].style.css',
		}),

		new BundleAnalyzerPlugin({
			analyzerMode: process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
			openAnalyzer: process.env.OPEN_ANALYZER === 'true',
		}),

		new CopyPlugin({
			patterns: [
				{ from: path.resolve(APP_DIR, 'index.html'), to: path.resolve(DIST_DIR), force: true },
				{ from: path.resolve(APP_DIR, '..', 'resources', 'img', 'favicon.png'), to: path.resolve(DIST_DIR), force: true },
			],
		}),

		// new CompressionPlugin({
		//     filename: '[path].gz[query]',
		//     algorithm: 'gzip',
		//     test: /\.(js|css|html|svg)$/,
		//     compressionOptions: { level: 11 },
		//     threshold: 10240,
		//     minRatio: 0.8,
		//     deleteOriginalAssets: false
		// }),
	],
});
