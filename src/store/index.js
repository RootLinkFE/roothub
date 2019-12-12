import Vue from 'vue';
import Vuex from 'vuex';
import Api from '@/api/gitlab';
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
        setDependence (state, payload = []) {
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
            .then((result) => {
                if (material === 'block') {
                    context.commit('setBlockMaterials', result);
                } else if (material === 'component') {
                    context.commit('setComponentMaterials', result);
                }
            });
        }
    }
});