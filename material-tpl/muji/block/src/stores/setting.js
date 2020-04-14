import { createStore } from '@souche-f2e/muji';
import setting from '../setting';
const state = {
  ...setting,
};
export default createStore({
  state,
});
