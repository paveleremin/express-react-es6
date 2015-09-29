import React from 'react';

import Reflux from 'reflux';
import AppStore from '../_configuration/app-store';

export default React.createClass({
    mixins: [
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

    getPathname() {
        return this.props.location.pathname;
    },

    render() {
        return React.cloneElement(this.props.children, {
            key: this.getPathname()
        });
    }
});
