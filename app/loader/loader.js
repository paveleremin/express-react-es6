import React from 'react';

export default React.createClass({
    render() {
        return <div className="loading-block">
            <div>Loading...</div>
            <i className="fa fa-cog fa-spin"></i>
        </div>;
    }
});
