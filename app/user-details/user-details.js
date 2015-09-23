import React from 'react';
import {State} from 'react-router';

import moment from 'moment';

import CustomLink from '../user-details/user-details-link';
import initDataMixin from '../components/init-data-mixin';
import {UserApi} from '../_configuration/resources';
import Footer from '../footer/footer';
import Header from '../header/header';
import Loader from '../loader/loader';

export default React.createClass({
    mixins: [
        initDataMixin,
        State
    ],

    statics: {
        getInitData(params) {
            return {
                user: UserApi.get(params.id, 'photo_200,bdate,online,last_seen,counters,bdate'),
                friends: UserApi.friends(params.id, {
                    order: 'random',
                    fields: 'photo_50'
                })
            };
        }
    },

    getInitialState() {
        return {
            user: null,
            friends: null
        };
    },

    componentWillMount() {
        this.setStateFromInitData(() => {
            const params = this.getParams();

            if (!this.state.user) {
                UserApi.get(params.id, 'photo_200,bdate,online,last_seen,counters,bdate').then((user) => {
                    this.setState({
                        user: user
                    });
                });
            }
            if (!this.state.friends) {
                UserApi.friends(params.id, {
                    order: 'random',
                    fields: 'photo_50'
                }).then((friends) => {
                    this.setState({
                        friends: friends
                    });
                });
            }
        });
    },

    renderOnline(user) {
        if (!user.online) {
            return moment.utc(user.last_seen.time * 1000).format('LLL');
        }
        return <span>
            { user.online_mobile && <i className="fa fa-mobile"></i> }
            Online
        </span>;
    },

    renderFriends(friends) {
        if (!friends.count) {
            return '';
        }

        const renderOthers = (friends) => {
            if (friends.count <= friends.items.length) {
                return '';
            }
            return <li className="friends-others">
                <div>
                    and<br/>
                    { friends.count-friends.items.length }<br/>
                    others
                </div>
            </li>;
        };

        return <div>
            <h3>
                Friends
            </h3>
            <ul className="list-inline">
                { friends.items.map((user) =>
                    <li key={ user.id }>
                        <CustomLink to="user-details" params={ user }>
                            <img
                                src={ user.photo_50 }
                                className="img-responsive"
                                alt=""/>
                        </CustomLink>
                    </li>
                ) }
                { renderOthers(friends) }
            </ul>
        </div>;
    },

    renderDetails() {
        const {user, friends} = this.state;
        if (!user || !friends) {
            return <Loader/>;
        }

        const bDate = (bdate) => {
            if (!bdate) {
                return '?';
            }
            if (bdate.split('.').length == 2) {
                return moment(bdate, 'D.M').format('MMMM D');
            }
            return moment(bdate, 'D.M.YYYY').format('MMMM D, YYYY');
        };

        return <div>
            <div className="row">
                <div className="col-sm-8">
                    <h2 className="mt0 user-name">
                        { user.first_name+' '+user.last_name }
                    </h2>
                </div>
                <div className="col-sm-4 text-right user-online online-status">
                    { this.renderOnline(user) }
                </div>
            </div>
            <div className="row mb20">
                <div className="col-sm-4">
                    <img
                        src={ user.photo_200 || 'http://vk.com/images/camera_a.gif' }
                        className="img-responsive"
                        alt=""/>
                </div>
                <div className="col-sm-8">
                    <table className="table mb0">
                        <thead>
                            <tr>
                                <td><b>Birth date:</b></td>
                                <td>{ bDate(user.bdate) }</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>Photos:</b></td>
                                <td>{ user.counters.photos }</td>
                            </tr>
                            <tr>
                                <td><b>Videos:</b></td>
                                <td>{ user.counters.videos }</td>
                            </tr>
                            <tr>
                                <td><b>Audios:</b></td>
                                <td>{ user.counters.audios }</td>
                            </tr>
                            <tr>
                                <td><b>Followers:</b></td>
                                <td>{ user.counters.followers }</td>
                            </tr>
                            <tr>
                                <td><i className="fa fa-vk"></i></td>
                                <td>
                                    <a href={'http://vk.com/id' + user.id } target="_blank">
                                        vk.com/id{ user.id }
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            { this.renderFriends(friends) }
        </div>;
    },

    render() {
        return <div id="page">
            <Header/>
            <div className="container user-details" id="content">
                { this.renderDetails() }
            </div>
            <Footer/>
        </div>;
    }
});
