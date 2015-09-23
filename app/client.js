import React from 'react';
import Router from 'react-router';

import routes from './_configuration/routes';

// Add promise support for browser not supporting it
import es6Promise from 'es6-promise';
es6Promise.polyfill();

if (process.env.BROWSER) {
    require('./_configuration/main.less');
}

Router.run(routes, Router.HistoryLocation, (Handler) => {
    React.render(<Handler />, document.body);
});
