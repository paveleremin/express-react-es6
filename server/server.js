/* eslint no-console: 0 */

import path from 'path';
import express from 'express';
import compression from 'compression';
import serveStatic from 'serve-static';
import serveFavicon from 'serve-favicon';
import cookieParser from 'cookie-parser';

import render from './server-render';

const staticPath = path.resolve(__dirname, '../static');

export default function (callback) {
    const app = express();

    app.set('env', process.env.NODE_ENV || 'development');
    app.set('host', process.env.HOST || 'localhost');
    app.set('port', process.env.PORT || 3000);

    app.use(cookieParser());
    app.use(compression());
    app.use(serveFavicon(`${staticPath}/favicon.png`));
    app.use(serveStatic(staticPath, {
        maxAge: 365 * 24 * 60 * 60
    }));

    // hacky way of preventing bad asset requests from hitting react router
    app.get(/.*\.\w+$/, (req, res) => res.sendStatus(404));

    // render the app server-side and send it as response
    app.use(render);

    // handle errors
    app.use((err, req, res, next) => {  // eslint-disable-line no-unused-vars
        console.log('Error on request %s %s', req.method, req.url);
        console.log(err);
        console.log(err.stack);
        res.status(500).send('Something bad happened');
    });

    // start the express application
    return app.listen(app.get('port'), () => callback(app));
}
