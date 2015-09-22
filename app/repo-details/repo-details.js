import React from 'react';
import {Navigation, Link, State} from 'react-router';

import initDataMixin from '../components/init-data-mixin';
import {RepoApi, UserApi} from '../_configuration/resources';
import Footer from '../footer/footer';
import Header from '../header/header';
import Loader from '../loader/loader';

const RepoDetailsView = React.createClass({
    mixins: [
        initDataMixin,
        Navigation,
        State
    ],

    statics: {
        getInitData(params) {
            return {
                user: UserApi.get(params),
                repo: RepoApi.get(params),
                commits: RepoApi.commits(params),
                branches: RepoApi.branches(params)
            };
        }
    },

    getInitialState() {
        return {
            user: null,
            repo: null,
            commits: null,
            branches: null
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
            if (!this.state.repo) {
                RepoApi.get(params).then((repo) => {
                    this.setState({
                        repo: repo
                    });
                });
            }
            if (!this.state.commits) {
                RepoApi.commits(params).then((commits) => {
                    this.setState({
                        commits: commits
                    });
                });
            }
            if (!this.state.branches) {
                RepoApi.branches(params).then((branches) => {
                    this.setState({
                        branches: branches
                    });
                });
            }
        });
    },


    renderDetails() {
        const {user, repo, commits, branches} = this.state;
        if (!user || !repo || !commits || !branches) {
            return <Loader/>;
        }

        return <div>
            <div className="row">
                <div className="col-xs-5">
                    <table className="table">
                        <thead>
                            <tr>
                                <td><b>Name:</b></td>
                                <td>{ repo.name }</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>Description:</b></td>
                                <td>{ repo.description }</td>
                            </tr>
                            <tr>
                                <td><b>Watchers:</b></td>
                                <td>{ repo.watchers_count }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-xs-offset-2 col-xs-5">
                    <table className="table">
                        <thead>
                        <tr>
                            <td><b>Author name:</b></td>
                            <td>{user.name}</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><b>Author login:</b></td>
                            <td>{user.login}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <h2>
                Branches
            </h2>

            <div>
                { branches.map((branch) =>
                    <span key={ branch.name }>
                        { branch.name }
                    </span>
                ) }
            </div>

            <h2>
                Commits
            </h2>

            <table className="table table-list">
                <thead>
                    <tr>
                        <th colsSan="2">Author</th>
                        <th>SHA</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    { commits.map((commit) =>
                        <tr key={ commit.sha }>
                            <td>
                                <img
                                    src={ commit.author.avatar_url }
                                    className="img50"
                                    alt=""/>
                            </td>
                            <td>
                                { commit.author.login }
                            </td>
                            <td>
                                { commit.sha }
                            </td>
                            <td>
                                { commit.commit.message }
                            </td>
                        </tr>
                    ) }
                </tbody>
            </table>
        </div>;
    },

    render() {
        const userLogin = this.getParams().userLogin;

        return <div id="page">
            <Header/>
            <div className="container" id="content">
                <h2 className="mt0">
                    Repository
                    <Link
                        to="user-details"
                        params={ {userLogin: userLogin} }
                        className="btn btn-link btn-back">
                        <i className="fa fa-reply"></i>
                        Back to user
                    </Link>
                </h2>
                { this.renderDetails() }
            </div>
            <Footer/>
        </div>;
    }
});

export default RepoDetailsView;
