import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

import App from './app';

import UserList from '../user-list/user-list';
import UserPrettyList from '../user-list-pretty/user-list-pretty';
import UserDetails from '../user-details/user-details';
import Error404 from '../errors/error-404.js';

const routes = (
    <Route handler={ App } path="/">
        <DefaultRoute handler={ UserList }/>
        <Route name="users" path="/" handler={ UserList }/>
        <Route name="pretty" path="/pretty" handler={ UserPrettyList }/>
        <Route name="user-details" path="/users/:id" handler={ UserDetails }/>
        <NotFoundRoute name="error404" handler={ Error404 }/>
    </Route>
);

export default routes;
