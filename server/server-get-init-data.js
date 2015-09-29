/* eslint prefer-const: 0 */

export default function(routerState) {
    let currentRoute,
        initData = {},
        promises;

    promises = routerState.routes.reduce((initData, route) => {
        if (route.component && route.component.getInitData) {
            currentRoute = route;
            let promises = route.component.getInitData(routerState.params, routerState.query);

            Object.keys(promises).forEach((key) => {
                initData[key] = promises[key];
            });
        }
        return initData;
    }, {});

    Object.keys(promises).forEach((key) => {
        promises[key].then((response) => {
            if (currentRoute.component.initData) {
                currentRoute.component.initData[key] = response;
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
