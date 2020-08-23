/**
 * Pasta aonde esta localizado o arquivo de entrada
 */
const entry_path = './resources/js';

/**
 * Pasta de saida dos arquivos após a compilação
 */
const output_path = './public/assets';

/**
 * Libs
 */
const path 				= require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TerserPlugin 		= require('terser-webpack-plugin');

/**
 * Timestamp
 */
const time = new Date().getTime();

module.exports = {
	target  : 'web',
	entry   : {
		bundle : path.resolve(`${entry_path}/`, 'app.js'),
	},
	output  : {
		filename	: 'js/[name].js',
		path		: path.resolve(__dirname, `${output_path}`),
	},
	devServer: {
		contentBase         : path.join(__dirname, 'public'),
		port                : 3000,
		compress            : true,
		watchContentBase    : true,
		writeToDisk         : true,
		historyApiFallback  : true,
		headers: {
			'Access-Control-Allow-Origin' : '*'
		}
	},
	stats : {
		colors          : true,
		modules         : false,
		reasons         : false,
		errorDetails    : true,
		entrypoints     : false
	},
	module  : {
		rules: [
			{
				test        : /\.scss$/,
				use         : ExtractTextPlugin.extract({
					fallback    : 'style-loader',
					use         : [
						{ 
							loader: 'css-loader?url=false'
						},
						{
							loader : 'sass-loader'
						}
					]
				})
			}
		]
	},
	plugins : [
		new ExtractTextPlugin({
			filename 	: 'css/[name].css',
			allChunks 	: true
		}),
	],
	resolve : {
		extensions : [ 
			'.jsx', 
			'.js',
			'.json'
		]
	},
	optimization : {
		minimizer : [
			new TerserPlugin({
				terserOptions : {
					output : {
						comments : false
					}
				}
			})
		]
	}
};