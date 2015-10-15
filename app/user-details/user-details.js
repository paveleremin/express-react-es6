import React from 'react';

import moment from 'moment';

import initDataMixin from '../components/init-data-mixin';
import UserApi from '../_resources/user';
import Footer from '../footer/footer';
import Header from '../header/header';
import Loader from '../loader/loader';
import AppActions from '../_configuration/app-actions';
import recentlyViewedService from '../recently-viewed/recently-viewed-service';

import FriendsBlock from './user-details-friends';
let PhotosBlock = null;
if (process.env.BROWSER) {
    PhotosBlock = require('./user-details-photos');
}

export default React.createClass({
    mixins: [
        initDataMixin
    ],

    statics: {
        getInitData(params) {
            return {
                user: UserApi.get(params.id, 'photo_200,bdate,online,last_seen,counters,bdate,status'),
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
            friends: null,
            photos: null
        };
    },

    componentWillMount() {
        const params = this.props.params;

        recentlyViewedService.add(params.id);

        if (process.env.BROWSER) {
            UserApi.photos(params.id).then((photos) => {
                this.setState({
                    photos: photos
                });
            });
        }
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

    renderDetails() {
        const {user, friends, photos} = this.state;
        if (!user || !friends) {
            return <Loader/>;
        }

        AppActions.setData({
            title: `User details: ${user.first_name} ${user.last_name}`,
            description: user.status,
            pageClassName: 'user-details'
        });

        const bDate = (bdate) => {
            if (!bdate) {
                return '?';
            }
            if (bdate.split('.').length == 2) {
                return moment(bdate, 'D.M').format('MMMM D');
            }
            const bDateMoment = moment(bdate, 'D.M.YYYY');
            const age = moment().diff(bDateMoment, 'years');
            return bDateMoment.format('MMMM D, YYYY') + ` (age ${age})`;
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
                                    <a href={ 'http://vk.com/id' + user.id } target="_blank">
                                        vk.com/id{ user.id }
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <FriendsBlock friends={ friends }/>
            { PhotosBlock && <PhotosBlock photos={ photos }/> }
        </div>;
    },

    render() {
        return <div id="page">
            <Header/>
            <div className="container" id="content">
                { this.renderDetails() }
            </div>
            <Footer/>
        </div>;
    }
});
