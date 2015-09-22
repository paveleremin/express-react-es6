import React from 'react';
import {RouteHandler} from 'react-router';
import {State} from 'react-router';

const App = React.createClass({
    mixins: [
        State
    ],
    render() {
        return <RouteHandler ref="handler" key={ this.getPathname() }/>;
    }
});

export default App;
