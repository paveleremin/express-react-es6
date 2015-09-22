import request from 'superagent';
import config from './env';

import debug from '../components/debug';

class Resource  {
    getUrl(params = {}, additionUrl = '') {
        let url = this.url + additionUrl;
        for (const key in params) {
            url = url.replace(new RegExp(`:${key}`, 'g'), params[key]);
        }
        url = url.replace(/\/:[A-z]+/g, '');
        url = url.replace(/\/{2,}$/g, '');
        return url;
    }

    get(url, callback) {
        const p = new Promise((resolve, reject) => {
            debug('Resource GET request to %s', url);
            request
                .get(url)
                .send()
                .set('Accept', 'application/json')
                .end((err, res) => {
                    debug('Received response %s from %s', res && res.status, url);
                    callback(res, resolve, err, reject);
                });
        });
        return p;
    }
}

class User extends Resource {
    constructor() {
        super();
        this.url = config.apiBase + '/users';
    }

    query() {
        const url = this.getUrl();
        return super.get(url, (data, resolve) => {
            resolve(data.body);
        });
    }

    get(params) {
        const url = this.getUrl(params, '/:userLogin');
        return super.get(url, (data, resolve) => {
            resolve(data.body);
        });
    }

    repos(params) {
        const url = this.getUrl(params, '/:userLogin/repos');
        return super.get(url, (data, resolve) => {
            resolve(data.body);
        });
    }
}

class Repo extends Resource {
    constructor() {
        super();
        this.url = config.apiBase + '/repos/:userLogin/:repoName';
    }

    get(params) {
        const url = this.getUrl(params);
        return super.get(url, (data, resolve) => {
            resolve(data.body);
        });
    }

    commits(params) {
        const url = this.getUrl(params, '/commits');
        return super.get(url, (data, resolve) => {
            resolve(data.body);
        });
    }

    branches(params) {
        const url = this.getUrl(params, '/branches');
        return super.get(url, (data, resolve) => {
            resolve(data.body);
        });
    }
}

module.exports = {
    UserApi: new User,
    RepoApi: new Repo
};
