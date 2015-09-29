import React from 'react';
import { createHistory } from 'history';

import routes from './_configuration/routes';

// Add promise support for browser not supporting it
import es6Promise from 'es6-promise';
es6Promise.polyfill();

require('./_configuration/main.less');

const history = createHistory();

React.render(routes(history), document.body);
