import React from 'react';
import {Link} from 'react-router';

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
                <div className="error-template">
                    <h1>Oops!</h1>
                    <h2>404 Not Found</h2>
                    <div className="error-details">
                        Sorry, an error has occured, requested page not found!
                    </div>
                    <div className="error-actions">
                        <Link to="users" className="btn btn-link btn-lg">
                            <i className="fa fa-users"></i>
                            Random users
                        </Link>
                        <Link to="pretty" className="btn btn-link btn-lg">
                            <i className="fa fa-female"></i>
                            Pretty girls
                        </Link>
                    </div>
                </div>
            </div>
        </div>;
    }
});
