import React from 'react';
import {RouteHandler} from 'react-router';
import {State} from 'react-router';

import Reflux from 'reflux';
import AppStore from '../_configuration/app-store';

export default React.createClass({
    mixins: [
        State,
        Reflux.listenTo(AppStore, 'onSetData')
    ],

    // changes we do in the browser
    onSetData(data) {
        if (data.title) {
            document.title = data.title;
        }
        if (data.description) {
            document.querySelector('meta[name=description]').content = data.description;
        }
        if (data.pageClassName) {
            document.body.className = data.pageClassName;
        }
    },

    render() {
        return <RouteHandler ref="handler" key={ this.getPathname() }/>;
    }
});
