import { createStore } from '@souche-f2e/muji';
const state = {
  collapsed: false,
};
export default createStore({
  state,
  reducers: {
    SET_COLLAPSED(state, payload) {
      state.collapsed = payload;
    },
  },
  effects: {},
});
