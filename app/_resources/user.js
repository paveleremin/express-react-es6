import { sample, random, assign } from 'lodash';
import Resource from './resource';

class UserApi extends Resource {
    get(id, fields) {
        const query = {
            fields: fields,
            user_ids: id
        };

        return super.request(query, '/users.get', (data) => {
            return data.body.response[0];
        });
    }

    query(ids, fields) {
        const query = {
            fields: fields,
            user_ids: ids.join()
        };

        return super.request(query, '/users.get', (data) => {
            return data.body.response;
        });
    }

    friends(id, params, limit = 10) {
        const query = assign({}, params, {
            user_id: id,
            count: limit
        });

        return super.request(query, '/friends.get', (data) => {
            return data.body.response;
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
            213795388, 136717137, 107981766, 371565
        ], limit);

        return this.query(ids, fields);
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

        return this.query(ids, fields);
    }

    photos(id, albumId = 'profile', limit = 50) {
        const query = {
            album_id: albumId,
            owner_id: id,
            rev: 1,
            photo_sizes: 1,
            count: limit
        };

        return super.request(query, '/photos.get', (data) => {
            return data.body.response;
        });

    }
}

export default new UserApi();
