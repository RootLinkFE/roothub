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
        blockMaterials: [],
        componentMaterials: []
    },
    mutations: {
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
        }
    },
    actions: {
        getProject: ({ commit }) => {
            Api.get('/project').then(res => {
                commit('setProject', res);
            });
        },
        getDependence: ({ commit }) => {
            Api.get('/dependence').then(res => {
                commit('setDependence', res);
            });
        },
        getBlocks: ({ commit }, params) => {
            Api.get('/block/list', {
                params
            }).then(res => {
                commit('setBlockMaterials', res);
            });
        }
    }
});