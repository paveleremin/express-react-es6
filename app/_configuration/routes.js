import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './app';

import UserList from '../user-list/user-list';
import UserPrettyList from '../user-list-pretty/user-list-pretty';
import UserDetails from '../user-details/user-details';
import Error404 from '../errors/error-404.js';

export default function(history) {
    return (
        <Router history={ history }>
            <Route path="/" component={ App }>
                <IndexRoute component={ UserList }/>
                <Route path="pretty" component={ UserPrettyList }/>
                <Route path="users/:id" component={ UserDetails }/>
                <Route path="*" component={ Error404 }/>
            </Route>
        </Router>
    );
}
