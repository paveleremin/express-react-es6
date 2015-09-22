import React from 'react';
import {Navigation, Link, State} from 'react-router';

import initDataMixin from '../components/init-data-mixin';
import {UserApi} from '../_configuration/resources';
import Footer from '../footer/footer';
import Header from '../header/header';
import Loader from '../loader/loader';

const UserDetailsView = React.createClass({
    mixins: [
        initDataMixin,
        Navigation,
        State
    ],

    statics: {
        getInitData(params) {
            return {
                user: UserApi.get(params),
                repos: UserApi.repos(params)
            };
        }
    },

    getInitialState() {
        return {
            user: null,
            repos: null
        };
    },

    componentWillMount() {
        this.setStateFromInitData(() => {
            const params = this.getParams();

            if (!this.state.user) {
                UserApi.get(params).then((user) => {
                    this.setState({
                        user: user
                    });
                });
            }
            if (!this.state.repos) {
                UserApi.repos(params).then((repos) => {
                    this.setState({
                        repos: repos
                    });
                });
            }
        });
    },

    renderDetails() {
        const {user, repos} = this.state;
        if (!user || !repos) {
            return <Loader/>;
        }

        return <div>
            <div className="row mb20">
                <div className="col-xs-4">
                    <img
                        src={ user.avatar_url }
                        className="img-responsive"
                        alt=""/>
                </div>
                <div className="col-xs-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <td><b>Name:</b></td>
                                <td>{ user.name }</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>Login:</b></td>
                                <td>{ user.login }</td>
                            </tr>
                            <tr>
                                <td><b>Email:</b></td>
                                <td>{ user.email }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <h2>
                Repositories
            </h2>

            <table className="table table-hover">
                <thead>
                    { repos.map((repo) =>
                        <tr key={ repo.id }>
                            <td>
                              { repo.name }
                            </td>
                            <td>
                                <Link
                                    to="repo-details"
                                    params={ {userLogin: user.login, repoName: repo.name} }
                                    className="btn btn-xs btn-primary">
                                    Commits
                                </Link>
                            </td>
                        </tr>
                    ) }
                </thead>
            </table>
        </div>;
    },

    render() {
        return <div id="page">
            <Header/>
            <div className="container" id="content">
                <h2 className="mt0">
                    User
                    <Link to="users" className="btn btn-link btn-back">
                        <i className="fa fa-reply"></i>
                        Back to users
                    </Link>
                </h2>
                { this.renderDetails() }
            </div>
            <Footer/>
        </div>;
    }
});

export default UserDetailsView;
