var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    helpers = require('./helpers');


module.exports = {
    entry: {
        'js/polyfills': './src/polyfills.ts',
        'js/vendor': './src/vendor.ts',
        'js/app': './src/main.ts'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                loader: 'file-loader?name=assets/images/[name].[hash].[ext]'
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                loader: 'file-loader?name=assets/fonts/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'assets'),
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?sourceMap'
                })
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loaders: ['to-string-loader', 'resolve-url-loader', 'css-loader?sourceMap']
            },
            {
                test: /\.scss$/,
                include: helpers.root('src', 'assets'),
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader:'css-loader?sourceMap'
                        },
                        {
                            loader:'sass-loader?sourceMap'
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                include: helpers.root('src', 'app'),
                loaders: ['to-string-loader', 'resolve-url-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
            }
        ]
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['js/app', 'js/vendor', 'js/polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};