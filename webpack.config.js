var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/scripts');
var APP_DIR = path.resolve(__dirname, 'src');


var config = {

	entry: APP_DIR + '/app.js',

	output: {
		path: BUILD_DIR,
		filename: 'bundle.js',
		publicPath: './public/'
	},

	devServer: {
		inline: true,
		contentBase: './public',
		port: 1339,
		historyApiFallback: true,
		stats: 'errors-only',
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: '/node_modules/',
				include : APP_DIR,
				query: {
					presets: [ 'es2015', 'stage-1', 'react' ],
					// plugins: []
				}
			},
		],

		preLoaders: [
			{
				test: /\.js?$/,
				loaders: [ 'eslint' ],
				include : APP_DIR
			}
		]


	},

	resolve: {
		alias: {
			app: APP_DIR
		},
		extensions: [ '', '.js', '.json' ]
	},


	eslint: {
		configFile: './.eslintrc'
	},

};


module.exports = config;

