export default {
    setStateFromInitData() {
        const isServer = typeof window == 'undefined';
        // at the serve we got data from initData object
        if (isServer) {
            this.setState(this.constructor.initData);
        }
        // at first render on client we sync data with rendered
        else if (window.initData) {
            this.setState(window.initData);
            // clear it to prevent cache when you press Back button
            delete window.initData;
        }
        // when we serf pages as SPA we get data from getInitData()
        else {
            // some views not used State mixin, because don't have a parametrs in route
            const params = this.getParams ? this.getParams() : {};
            const promises = this.constructor.getInitData(params);
            const initData = {};

            Object.keys(promises).forEach((key) => {
                promises[key].then((response) => {
                    initData[key] = response;
                });
            });

            Promise.all(Object.keys(promises).map((key) => {
                return promises[key];
            })).then(() => {
                this.setState(initData);
            });
        }
    },
    statics: {
        initData: {}
    },
    componentWillMount() {
        this.setStateFromInitData();
    }
};
