import React from 'react';
import {Link} from 'react-router';
import CustomLink from './header-custom-link';

const HeaderView = React.createClass({
    render() {
        return <div id="header">
            <div className="navbar navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="users">
                            App
                        </Link>
                    </div>
                    <ul className="nav navbar-nav">
                        <li>
                            <CustomLink to="users">
                                Users
                            </CustomLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
});

export default HeaderView;
