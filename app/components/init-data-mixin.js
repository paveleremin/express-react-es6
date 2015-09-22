export default {
    setStateFromInitData(callback) {
        const isServer = typeof window == 'undefined';
        const initData = isServer
            ? this.constructor.initData
            : window.initData;
        this.setState(initData);
        setTimeout(callback);
        if (!isServer) {
            window.initData = {};
        }
    },
    statics: {
        initData: {}
    }
};
