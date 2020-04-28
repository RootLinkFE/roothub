import Vue from 'vue';
import Vuex from 'vuex';
import Api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        workingDirectory: '',
        project: {},
        projects: [],
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
        },
        setWorkingDirectory (state, payload) {
            state.workingDirectory = payload;
        },
        setProjects (state, payload = []) {
            state.projects = payload;
        }
    },
    actions: {
        getWorkingDirectory: ({ commit }) => {
            return Api.get('/workingDirectory').then(res => {
                commit('setWorkingDirectory', res);
                return res;
            });
        },
        getDependence: ({ commit }) => {
            return Api.get('/dependence').then(res => {
                commit('setDependence', res);
                return res;
            });
        },
        getProjects: ({ commit }) => {
            return Api.get('/myProjects').then(res => {
                commit('setProjects', res);
                return res;
            });
        }
    }
});
