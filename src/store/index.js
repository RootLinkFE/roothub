import Vue from 'vue';
import Vuex from 'vuex';
import Api from '@/api';
import materialConfig from '../../config/material-config';

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
        blockMaterials: [],
        componentMaterials: [],
        activeName: ''
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
        setBlockMaterials (state, payload = []) {
            state.blockMaterials = payload;
        },
        setComponentMaterials (state, payload = []) {
            state.componentMaterials = payload;
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
        },
        getBlocks: ({ commit }, params) => {
            return Api.get('/block/list', {
                params
            }).then(res => {
                console.log(res);
                commit('setBlockMaterials', res);
                return res;
            });
        }
    }
});
