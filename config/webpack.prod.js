var webpack = require('webpack'),
    webpackMerge = require('webpack-merge'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    commonConfig = require('./webpack.common'),
    AotPlugin = require('@ngtools/webpack').AotPlugin,
    helpers = require('./helpers');


const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {

    devtool: 'source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].[hash].chunk.js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: '@ngtools/webpack'
            }
        ]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),

        new AotPlugin({
            tsConfigPath:  helpers.root('src', 'tsconfig.json'),
            entryModule: helpers.root('src', 'app', 'app.module#AppModule')
        }),

        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                keep_fnames: true
            }
        }),

        new ExtractTextPlugin({filename: 'css/[contenthash].css'}),

        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ]
});