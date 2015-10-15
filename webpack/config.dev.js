/* no-console: 0 */

// This is the webpack config to use during development
// It enables the hot module replacement, the source maps and inline CSS styles

import path from 'path';
import webpack from 'webpack';
import WebpackErrorNotificationPlugin from 'webpack-error-notification';

import serverConfig from '../server/server-config';
const host = serverConfig.host == '0.0.0.0'
    ? 'localhost'
    : serverConfig.host;
const port = serverConfig.port + 1;

const dist = path.resolve(__dirname, '../static/dist');

export default {
    devtool: 'source-map',
    entry: [
        `webpack-dev-server/client?http://${host}:${port}`,
        'webpack/hot/only-dev-server',
        './app/client.js'
    ],
    output: {
        filename: 'bundle.js',
        chunkFilename: '[name].bundle.js',
        path: dist,
        publicPath: `http://${host}:${port}/dist/`
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
                BROWSER: JSON.stringify(true),
                DEBUG: JSON.stringify(process.env.DEBUG)
            }
        }),
        new WebpackErrorNotificationPlugin()
    ]
};
