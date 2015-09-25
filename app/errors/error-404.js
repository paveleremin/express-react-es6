import React from 'react';

import AppActions from '../_configuration/app-actions';

export default React.createClass({
    render() {

        AppActions.setData({
            title: 'Page not found',
            description: 'Page not found',
            pageClassName: 'error404'
        });

        return <div id="page">
            <div className="container" id="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="error-template">
                            <h1>Oops!</h1>
                            <h2>404 Not Found</h2>
                            <div className="error-details">
                                Sorry, an error has occured, requested page not found!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
});
