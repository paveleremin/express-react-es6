import React from 'react';

const Loader = React.createClass({
    render() {
        return <div className="loading-block">
            <div>Loading...</div>
            <i className="fa fa-cog fa-spin"></i>
        </div>;
    }
});

export default Loader;
