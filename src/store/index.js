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
        vueMaterialsBlocks: []
    },
    mutations: {
        setProject (state, payload = {}) {
            state.project = payload;
        },
        setDependence (state, payload = []) {
            state.dependence = payload;
        },
        setVueMaterialsBlocks (state, payload = []) {
            state.vueMaterialsBlocks = payload;
        }
    },
    actions: {
        vueMaterialsBlocks: async (context) => {
            const result = await Api.get('/projects/18640/repository/files/blocks.json/raw');
            context.commit('setVueMaterialsBlocks', result);
        }
    }
});