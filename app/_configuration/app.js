import React from 'react';
import {RouteHandler} from 'react-router';
import {State} from 'react-router';

export default React.createClass({
    mixins: [
        State
    ],
    render() {
        return <RouteHandler ref="handler" key={ this.getPathname() }/>;
    }
});
