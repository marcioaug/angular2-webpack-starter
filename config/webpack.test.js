var helpers = require('./helpers');

module.exports = {

    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.ts', '.js']
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
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'null-loader'
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'assets'),
                loader: 'null-loader'
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw-loader'
            },
            {
                test: /\.scss$/,
                include: helpers.root('src', 'assets'),
                loader: 'null-loader'
            },
            {
                test: /\.scss$/,
                include: helpers.root('src', 'app'),
                loaders: ['to-string-loader', 'resolve-url-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
            }
        ]
    }
};