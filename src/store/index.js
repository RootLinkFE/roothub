import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        project: {},
        dependence: {
            dependencies: [],
            devDependencies: []
        }
    },
    mutations: {
        getProject (state, payload = {}) {
            state.project = payload;
        },
        getDependence (state, payload = []) {
            state.dependence = payload;
        }
    }
});