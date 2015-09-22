import React from 'react';
import {Navigation, Link} from 'react-router';

import initDataMixin from '../components/init-data-mixin';
import {UserApi} from '../_configuration/resources';
import Footer from '../footer/footer';
import Header from '../header/header';
import Loader from '../loader/loader';

const UserListView = React.createClass({
    mixins: [
        initDataMixin,
        Navigation
    ],

    statics: {
        getInitData() {
            return {
                users: UserApi.query()
            };
        }
    },

    getInitialState() {
        return {
            users: null
        };
    },

    componentWillMount() {
        this.setStateFromInitData(() => {
            if (!this.state.users) {
                UserApi.query().then((users) => {
                    this.setState({
                        users: users
                    });
                });
            }
        });
    },

    renderList() {
        const {users} = this.state;
        if (!users) {
            return <Loader/>;
        }

        return <table className="table table-list">
            <thead>
                <tr>
                    <th colSpan="2">User</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                { users.map((user) =>
                    <tr key={ user.id }>
                        <td>
                            <img
                                src={ user.avatar_url }
                                className="img50"
                                alt=""/>
                        </td>
                        <td>
                            { user.login }
                        </td>
                        <td>
                            <Link to="user-details" params={ {userLogin: user.login} } className="btn btn-link btn-block">
                                Details
                            </Link>
                        </td>
                    </tr>
                ) }
            </tbody>
        </table>;
    },

    render() {
        return <div id="page">
            <Header/>
            <div className="container" id="content">
                <h2 className="mt0">
                    Users
                </h2>
                { this.renderList() }
            </div>
            <Footer/>
        </div>;
    }
});

export default UserListView;
