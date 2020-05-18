import Vue from 'vue';
import Vuex from 'vuex';
import Api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        workingDirectory: '',
        project: {},
        projects: [],
        materials: [],
        dependence: {
            dependencies: [],
            devDependencies: []
        },
        logShow: false,
        finderShow: false,
        sidebarOpen: true // 侧边栏展开、收起
    },
    mutations: {
        toggleSidebar (state) {
            state.sidebarOpen = !state.sidebarOpen;
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
        },
        setMaterials (state, payload = []) {
            state.materials = payload;
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
        },
        getMaterials: ({ commit }) => {
            return Api.get('/materials').then(res => {
                commit('setMaterials', res);
                return res;
            });
        }
    }
});
