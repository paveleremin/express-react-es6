import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import App from './app';

import UserList from '../user-list/user-list';
import UserPrettyList from '../user-list-pretty/user-list-pretty';
import UserDetails from '../user-details/user-details';

const routes = (
    <Route handler={ App } path="/">
        <DefaultRoute handler={ UserList }/>
        <Route name="users" path="/" handler={ UserList }/>
        <Route name="pretty" path="/pretty" handler={ UserPrettyList }/>
        <Route name="user-details" path="/users/:id" handler={ UserDetails }/>
    </Route>
);

export default routes;
