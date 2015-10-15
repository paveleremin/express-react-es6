import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './app';

import UserList from '../user-list/user-list';
import UserPrettyList from '../user-list-pretty/user-list-pretty';
import UserDetails from '../user-details/user-details';
import RecentlyViewed from '../recently-viewed/recently-viewed';
import Error404 from '../errors/error-404.js';

export default function(history) {
    return (
        <Router history={ history }>
            <Route path="/" component={ App }>
                <IndexRoute component={ UserList } onEnter={ UserList.onEnter }/>
                <Route path="pretty" component={ UserPrettyList } onEnter={ UserPrettyList.onEnter }/>
                <Route path="users/:id" component={ UserDetails }/>
                <Route path="recently-viewed" component={ RecentlyViewed } onEnter={ RecentlyViewed.onEnter }/>
                <Route path="*" component={ Error404 }/>
            </Route>
        </Router>
    );
}
