import Promise from 'bluebird';

export default (routerState) => {
    let currentRoute;

    const promises = routerState.routes.reduce((promises, route) => {
        if (route.component && route.component.getInitData) {
            currentRoute = route;
            const data = route.component.getInitData(routerState.params, routerState.query);
            Object.assign(promises, data);
        }
        return promises;
    }, {});

    return Promise.props(promises).then((result) => {
        if (currentRoute.component.initData) {
            currentRoute.component.initData = result;
        }
        return result;
    });
};
