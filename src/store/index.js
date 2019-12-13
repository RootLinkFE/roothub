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
        }
    },
    actions: {
        getMaterials: (context, params) => {
            const { agent, framework, material } = params;
            Api.get(`/projects/${materialConfig[framework].projectId}/repository/files/${material}s.json/raw`)
            .then((res) => {
                if (material === 'block') {
                    context.commit('setBlockMaterials', res);
                } else if (material === 'component') {
                    context.commit('setComponentMaterials', res);
                }
            });
        },
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