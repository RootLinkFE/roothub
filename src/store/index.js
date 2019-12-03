import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        project: {},
        dependencies: [],
        devDependencies: []
    },
    mutations: {
        getProject (state, payload = {}) {
            state.project = payload;
        },
        getDependencies (state, payload = []) {
            state.dependencies = payload;
        },
        getDevDependencies (state, payload = []) {
            state.devDependencies = payload;
        }
    }
});