let debug;

if (process.env.DEBUG == 'app') {
    debug = require('debug')('app');
    debug.url = (req) => {
        let url = req.url;
        if (req.qs) {
            url += '?'+JSON.stringify(req.qs).replace(/":/g, '=').replace(/","/g, '&').replace(/[{"}]/g, '');
        }
        return url;
    };
}
else {
    debug = () => {};
    debug.url = () => {};
}

export default debug;
