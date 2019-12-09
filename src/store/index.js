import Vue from 'vue';
import Vuex from 'vuex';
import Api from '@/api';

const project = {
    vue: '18640',
    react: '18323'
};

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
        getMaterials: async (context, params) => {
            const { agent, framework, material } = params;
            const result = await Api.get(`/projects/${project[framework]}/repository/files/${material}s.json/raw`);
            if (material === 'block') {
                context.commit('setBlockMaterials', result);
            } else if (material === 'component') {
                context.commit('setComponentMaterials', result);
            }
        }
    }
});