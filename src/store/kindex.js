import Vue from 'vue';
import KVuex from './kvue';

Vue.use(KVuex, '$kstore');

export default new KVuex.Store({
    state: {
        count: 0
    },
    mutations: {
        add(state, num = 1) {
            state.count += num;
        }
    },
    actions: {
        asyncAdd({ commit }) {
            return new Promise(resolve => {
                setTimeout(() => {
                    commit('add');
                    resolve({ok: 1});
                }, 2000);
            })
        }
    },
    getters: {
        score(state) {
            return "score:" + state.count;
        }
    }
})