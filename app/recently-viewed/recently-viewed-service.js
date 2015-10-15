let cookie = null;
if (process.env.BROWSER) {
    cookie = require('cookie');
}

export default {

    maxLength: 10,

    get() {
        const scope = process.env.BROWSER
            ? cookie.parse(document.cookie)
            : global.app.req.cookies;

        if (scope.recentlyViewed) {
            return scope.recentlyViewed.split('.');
        }
        return [];
    },

    set(ids) {
        const idsStr = ids.join('.');

        if (process.env.BROWSER) {
            document.cookie = cookie.serialize('recentlyViewed', idsStr);
        }
        else {
            global.app.res.cookie('recentlyViewed', idsStr);
        }
    },

    add(id) {
        let recentlyViewed = this.get();

        const index = recentlyViewed.indexOf(id);
        if (index != -1) {
            recentlyViewed.splice(index, 1);
        }

        else if (recentlyViewed.length >= this.maxLength) {
            recentlyViewed.splice(this.maxLength, 1);
        }

        recentlyViewed.unshift(id);

        this.set(recentlyViewed);
    }
};
