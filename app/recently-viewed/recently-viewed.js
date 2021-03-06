import React from 'react';

import CustomLink from '../user-details/user-details-link';
import initDataMixin from '../components/init-data-mixin';
import UserApi from '../_resources/user';
import Footer from '../footer/footer';
import Header from '../header/header';
import Loader from '../loader/loader';
import AppActions from '../_configuration/app-actions';
import recentlyViewedService from './recently-viewed-service';

export default React.createClass({
    mixins: [
        initDataMixin
    ],

    statics: {
        onEnter(nextState, replaceState) {
            const ids = recentlyViewedService.get();
            if (!ids.length) {
                replaceState(null, '/');
            }
        },
        getInitData() {
            const ids = recentlyViewedService.get();
            return {
                users: UserApi.query(ids, 'photo_50,online')
            };
        }
    },

    getInitialState() {
        return {
            users: null
        };
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

        AppActions.setData({
            title: 'Users',
            description: 'Users',
            pageClassName: 'user-list'
        });

        return <table className="table table-hover table-list">
            <tbody>
                { users.map((user) =>
                    <tr key={ user.id }>
                        <td>
                            <CustomLink to={ `/users/${user.id}` } params={ user }>
                                <img
                                    src={ user.photo_50 }
                                    className="img50"
                                    alt=""/>
                            </CustomLink>
                        </td>
                        <td>
                            <CustomLink to={ `/users/${user.id}` } params={ user }>
                                { user.first_name+' '+user.last_name }
                            </CustomLink>
                        </td>
                        <td>
                            <CustomLink to={ `/users/${user.id}` } params={ user }>
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
            <div className="container" id="content">
                { this.renderList() }
            </div>
            <Footer/>
        </div>;
    }
});
