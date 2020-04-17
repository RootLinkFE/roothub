import Vue from 'vue';
import Vuex from 'vuex';
import Api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        project: {},
        dependence: {
            dependencies: [],
            devDependencies: []
        },
        logShow: false,
        finderShow: false,
        activeName: '' // 侧边栏高亮
    },
    mutations: {
        setActiveName (state, payload) {
            state.activeName = payload;
        },
        setProject (state, payload = {}) {
            state.project = payload;
        },
        setDependence (state, payload = {}) {
            state.dependence = payload;
        },
        setLogShow (state, payload = true) {
            state.logShow = payload;
        },
        setFinderShow (state, payload = true) {
            state.finderShow = payload;
        }
    },
    actions: {
        getProject: ({ commit }) => {
            return Api.get('/project').then(res => {
                commit('setProject', res);
                return res;
            });
        },
        getDependence: ({ commit }) => {
            return Api.get('/dependence').then(res => {
                commit('setDependence', res);
                return res;
            });
        }
    }
});
