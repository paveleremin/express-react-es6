import React from 'react';

import CustomLink from './header-link';
import recentlyViewedService from '../recently-viewed/recently-viewed-service';

export default React.createClass({
    showHide() {
        return recentlyViewedService.get().length
            ? ''
            : 'hide';
    },

    render() {
        return <div id="header">
            <div className="navbar navbar-inverse">
                <div className="container">
                    <ul className="nav navbar-nav">
                        <CustomLink to="/" activeClassName="active" onlyActiveOnIndex={ true }>
                            <span className="hidden-xs">
                                Random users
                            </span>
                            <span className="visible-xs-inline">
                                <i className="fa fa-users fa-white"></i>
                                Users
                            </span>
                        </CustomLink>
                        <CustomLink to="/pretty" activeClassName="active">
                            <span className="hidden-xs">
                                Pretty girls
                            </span>
                            <span className="visible-xs-inline">
                                <i className="fa fa-female fa-white"></i>
                                Pretty
                            </span>
                        </CustomLink>
                        <CustomLink to="/recently-viewed" className={ this.showHide() } activeClassName="active">
                            <span className="hidden-xs">
                                Recently viewed
                            </span>
                            <span className="visible-xs-inline">
                                <i className="fa fa-eye fa-white"></i>
                                Viewed
                            </span>
                        </CustomLink>
                    </ul>
                </div>
            </div>
        </div>;
    }
});
