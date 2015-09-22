/* eslint no-console: 0 */

import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import config from './config.dev.js';

export default function (app) {

    const host = app.get('host');
    const port = app.get('port')+1;
    const options = {
        contentBase: `http://${host}:${port}`,
        hot: true,
        inline: true,
        lazy: false,
        publicPath: config.output.publicPath,
        stats: {
            colors: true
        }
    };

    const compiler = webpack(config);
    const webpackDevServer = new WebpackDevServer(compiler, options);

    return webpackDevServer.listen(port, host, function () {
        console.log('Webpack development server listening on %s:%s', host, port);
    });
}
