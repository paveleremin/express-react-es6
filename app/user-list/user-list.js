import React from 'react';

import moment from 'moment';

import CustomLink from '../user-details/user-details-link';
import initDataMixin from '../components/init-data-mixin';
import {UserApi} from '../_configuration/resources';
import Footer from '../footer/footer';
import Header from '../header/header';
import Loader from '../loader/loader';

export default React.createClass({
    mixins: [
        initDataMixin
    ],

    statics: {
        getInitData() {
            return {
                users: UserApi.rand('photo_50,bdate,online')
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
                UserApi.rand('photo_50,bdate,online').then((users) => {
                    this.setState({
                        users: users
                    });
                });
            }
        });
    },

    renderOnline(user) {
        if (!user.online) {
            return '';
        }
        return <span className="online-status">
            { user.online_mobile && <i className="fa fa-mobile"></i> }
            Online
        </span>;
    },

    renderList() {
        const {users} = this.state;
        if (!users) {
            return <Loader/>;
        }

        return <table className="table table-hover table-list">
            <tbody>
                { users.map((user) =>
                    <tr key={ user.id }>
                        <td>
                            <CustomLink to="user-details" params={user}>
                                <img
                                    src={ user.photo_50 }
                                    className="img50"
                                    alt=""/>
                            </CustomLink>
                        </td>
                        <td>
                            <CustomLink to="user-details" params={user}>
                                { user.first_name+' '+user.last_name }
                            </CustomLink>
                        </td>
                        <td>
                            <CustomLink to="user-details" params={user}>
                                { this.renderOnline(user) }
                            </CustomLink>
                        </td>
                    </tr>
                ) }
            </tbody>
        </table>;
    },

    render() {
        return <div id="page">
            <Header/>
            <div className="container user-list" id="content">
                { this.renderList() }
            </div>
            <Footer/>
        </div>;
    }
});
