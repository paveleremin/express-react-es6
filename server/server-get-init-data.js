/* eslint prefer-const: 0 */

export default function(routerState) {
    let currentRoute,
        initData = {},
        promises;

    promises = routerState.routes.reduce((initData, route) => {
        if (route.handler && route.handler.getInitData) {
            currentRoute = route;
            let promises = route.handler.getInitData(routerState.params, routerState.query);

            Object.keys(promises).forEach((key) => {
                initData[key] = promises[key];
            });
        }
        return initData;
    }, {});

    Object.keys(promises).forEach((key) => {
        promises[key].then((response) => {
            if (currentRoute.handler.initData) {
                currentRoute.handler.initData[key] = response;
            }
            initData[key] = response;
        });
    });

    return Promise.all(Object.keys(promises).map((key) => {
        return promises[key];
    })).then(() => {
        return initData;
    });
}
