import superagent from 'superagent';
if (process.env.BROWSER) {
    require('superagent-jsonp')(superagent);
}
import {sample, random, assign} from 'lodash';
import config from './env';

import debug from '../components/debug';

class Resource  {
    getUrl(params = {}, additionUrl = '') {
        params.v = '5.37';
        params.lang = 'en';

        const queryParams = {};
        let url = this.url + additionUrl,
            newUrl;

        for (const key in params) {
            newUrl = url.replace(new RegExp(`:${key}`, 'g'), params[key]);
            if (params[key] && newUrl == url) {
                queryParams[key] = params[key];
            }
        }

        for (const key in queryParams) {
            url += `&${key}=`+queryParams[key];
        }

        url = url.replace('&', '?');
        url = url.replace(/\/:[A-z]+/g, '');
        url = url.replace(/\/{2,}$/g, '');

        return url;
    }

    get(url, callback) {
        const p = new Promise((resolve, reject) => {
            debug('Resource GET request to %s', url);
            const request = superagent
                .get(url)
                .send()
                .set('Accept', 'application/json');
            if (process.env.BROWSER) {
                request.jsonp();
            }
            request
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
        this.url = config.apiBase;
    }

    get(id, fields) {
        const params = {
            fields: fields,
            user_ids: id
        };
        const url = this.getUrl(params, '/users.get');
        return super.get(url, (data, resolve) => {
            resolve(data.body.response[0]);
        });
    }

    friends(id, params, limit = 10) {
        assign(params, {
            user_id: id,
            count: limit
        });
        const url = this.getUrl(params, '/friends.get');
        return super.get(url, (data, resolve) => {
            resolve(data.body.response);
        });
    }

    randPretty(fields, limit = 10) {
        const ids = sample([
            176354406, 244064682, 5857176, 82588913, 13536171, 10653558, 187819312,
            39890239, 20574237, 2881826, 1493537, 33654559, 13583230,
            8611282, 9612268, 8005365, 220692, 56414432, 4204239, 32252121,
            5670993, 77244148, 19581362, 12632556, 4890599, 19460227,
            9216357, 45557, 99668440, 6737291, 63895636, 4199078,
            76455, 18042998, 5781982, 93808169, 7738774, 79201190,
            9200556, 213086672, 30037100, 33545305, 45374530, 282204321,
            213795388
        ], limit);
        const params = {
            fields: fields,
            user_ids: ids
        };
        const url = this.getUrl(params, '/users.get');
        return super.get(url, (data, resolve) => {
            resolve(data.body.response);
        });
    }

    rand(fields, limit = 10) {
        const ids = [];
        while (ids.length < limit) {
            const rand = random(1, 320000000);
            if (ids.indexOf(rand) != -1) {
                continue;
            }
            ids.push(rand);
        }
        const params = {
            fields: fields,
            user_ids: ids
        };
        const url = this.getUrl(params, '/users.get');
        return super.get(url, (data, resolve) => {
            resolve(data.body.response);
        });
    }

    photos(id, albumId = 'wall') {
        const params = {
            album_id: albumId,
            owner_id: id
        };
        const url = this.getUrl(params, '/photos.get');
        return super.get(url, (data, resolve) => {
            resolve(data.body.response);
        });

    }
}


export default {
    UserApi: new User
};
