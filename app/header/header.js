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
                            Random users
                        </CustomLink>
                        <CustomLink to="/pretty" activeClassName="active">
                            Pretty girls
                        </CustomLink>
                        <CustomLink to="/recently-viewed" className={ this.showHide() } activeClassName="active">
                            Recently viewed
                        </CustomLink>
                    </ul>
                </div>
            </div>
        </div>;
    }
});
