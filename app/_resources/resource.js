import { assign } from 'lodash';
import superagent from 'superagent';
if (process.env.BROWSER) {
    require('superagent-jsonp')(superagent);
}

import config from './../_configuration/env';
import debug from './../components/debug';

export default class  {
    constructor() {
        this.url = config.apiBase;
    }

    absoluteUrl(additionUrl = '') {
        return this.url + additionUrl;
    }

    request(query, additionalUrl, resInterceptor) {

        assign(query, {
            v: '5.37',
            lang: 'en'
        });

        const url = this.absoluteUrl(additionalUrl);

        const request = superagent
            .get(url)
            .query(query)
            .set('Accept', 'application/json');
        if (process.env.BROWSER) {
            request.jsonp();
        }

        const promise = new Promise((resolve, reject) => {
            try {
                if (process.env.DEBUG == 'app') {
                    debug('=> |GET| %s', debug.url(request));
                }
                request.end((err, res) => {
                    if (process.env.DEBUG == 'app') {
                        debug('<= |%s| %s', res && res.status, debug.url(request));
                    }
                    err ? reject(err) : resolve(res);
                });
            }
            catch (e) {
                reject(e);
            }
        }).then(resInterceptor);

        promise.abort = () => {
            request.abort();
        };

        return promise;

    }
}
