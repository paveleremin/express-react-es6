import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import App from './app';

import UserList from '../user-list/user-list';
import UserDetails from '../user-details/user-details';
import RepoDetails from '../repo-details/repo-details';

const routes = (
    <Route handler={ App } path="/">
        <DefaultRoute handler={ UserList }/>
        <Route name="users" path="/" handler={ UserList }/>
        <Route name="user-list" path="/users" handler={ UserList }/>
        <Route name="user-details" path="/users/:userLogin" handler={ UserDetails }/>
        <Route name="repo-details" path="/repos/:userLogin/:repoName" handler={ RepoDetails }/>
    </Route>
);

export default routes;
