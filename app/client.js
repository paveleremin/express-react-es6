import React from 'react';
import Router from 'react-router';

import routes from './_configuration/routes';

if (process.env.BROWSER) {
    require('./_configuration/main.less');
}

Router.run(routes, Router.HistoryLocation, (Handler) => {
    React.render(<Handler />, document.body);
});
