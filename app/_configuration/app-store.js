import Reflux from 'reflux';

import AppActions from './app-actions';

export default Reflux.createStore({
    listenables: [AppActions],
    data: {},
    onSetData(data) {
        for (const key in data) {
            if (key === null) {
                delete this.data[key];
                continue;
            }
            this.data[key] = data[key];
        }
        this.trigger(this.data);
    },
    getData() {
        return this.data;
    }
});
