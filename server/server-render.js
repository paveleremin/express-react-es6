import React, {PropTypes} from 'react';
import Router from 'react-router';
import serialize from 'serialize-javascript';

import routes from './../app/_configuration/routes';
import getInitData from './server-get-init-data';

const css = [];
const scripts = [];

if (process.env.NODE_ENV === 'production') {
    // on production, include scripts and css from the webpack stats
    const config = require('../webpack/config.prod.js');
    const stats = require('../static/dist/stats.json');
    scripts.push(`${config.output.publicPath}${stats.main}`);
    css.push(`${config.output.publicPath}${stats.css}`);
}
else {
    // on development, use the webpack dev server config
    // css are not needed since they are injected inline with webpack
    const config = require('../webpack/config.dev.js');
    scripts.push(`${config.output.publicPath}${config.output.filename}`);
}

/* eslint react/no-danger: 0 */

const Html = React.createClass({
    propTypes: {
        initDataJSON: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    },

    render() {
        const {initDataJSON, content} = this.props;
        return <html>
            <head>
                <meta content="text/html;charset=UTF-8" httpEquiv="content-type"/>
                <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no"/>
                { css.map((href, k) => <link href={ href } key={ k } rel="stylesheet" type="text/css"/>) }
            </head>
            <body>
                <div dangerouslySetInnerHTML={ {__html:content} }/>
                <script dangerouslySetInnerHTML={ {__html:initDataJSON} }/>
                { scripts.map((src, i) => <script src={ src } key={ i }/>) }
            </body>
        </html>;
    }

});

function render(req, res, next) {
    Router.run(routes, req.url, (Handler, routerState) => {
        getInitData(routerState).then((initData) => {

            const initDataJSON = 'window.initData='+serialize(initData)+';';
            const content = React.renderToString(<Handler/>);

            const html = React.renderToStaticMarkup(
                <Html initDataJSON={ initDataJSON } content={ content }/>
            );
            const doctype = '<!DOCTYPE html>';
            res.send(doctype+html);
        }).catch((err) => {
            next(err);
        });
    });
}

export default render;
