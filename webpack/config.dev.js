// This is the webpack config to use during development.
// It enables the hot module replacement, the source maps and inline CSS styles.

/* eslint no-var: 0, no-console: 0 */

import path from 'path';
import webpack from 'webpack';
import WebpackErrorNotificationPlugin from 'webpack-error-notification';

const host = process.env.HOST || 'localhost';
const port = (process.env.PORT+1) || 3001;
const dist = path.resolve(__dirname, '../static/dist');

const config = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://'+host+':'+port,
        'webpack/hot/only-dev-server',
        './app/client.js'
    ],
    output: {
        filename: 'bundle.js',
        chunkFilename: '[name].bundle.js',
        path: dist,
        publicPath: 'http://'+host+':'+port+'/dist/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel?cacheDirectory']
        }, {
            test: /\.less$/,
            loaders: ['style', 'css', 'autoprefixer?browsers=last 2 version!less']
        }, {
            test: /\.(jpe?g|gif|png|json|txt)$/,
            loader: 'file'
        }, {
            // use this mask for font-awesome fonts with params
            test: /\.(eot|svg|woff2?|ttf)(\?.*$|$)/,
            loader: 'file'
        }]
    },
    plugins: [
        // use only one 'en-gb' locale from momentjs
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                BROWSER: JSON.stringify(true)
            }
        }),
        new WebpackErrorNotificationPlugin()
    ]

};

export default config;
