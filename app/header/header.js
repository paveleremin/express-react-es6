import React from 'react';
import CustomLink from './header-link';

export default React.createClass({
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
                    </ul>
                </div>
            </div>
        </div>;
    }
});
