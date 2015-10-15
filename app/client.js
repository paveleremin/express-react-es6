import ReactDom from 'react-dom';
import { createHistory } from 'history';

import routes from './_configuration/routes';

// Add promise support for browser not supporting it
import es6Promise from 'es6-promise';
es6Promise.polyfill();

require('./_configuration/main.less');

const history = createHistory();

ReactDom.render(routes(history), document.getElementById('app'));
