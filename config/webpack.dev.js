    var webpackMerge = require('webpack-merge'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    commonConfig = require('./webpack.common.js'),
    helpers = require('./helpers');


module.exports = webpackMerge(commonConfig, {

    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: 'http://localhost:3000/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {configFileName: helpers.root('src', 'tsconfig.json')}
                    },
                    'angular2-template-loader'
                ]
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({filename: '[contenthash].css'})
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }

});