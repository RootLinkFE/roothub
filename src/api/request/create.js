import Api from '../index'

const { get, post} = Api

export default {
  // 项目列表
  getProjectList: () => get(`/create/getProjectList`),
  // 收藏
  favorite: (_id, favorite) => get(`/create/favorite?_id=${_id}&favorite=${!favorite}`),
  //  查询是否收藏此项目；
  queryIsFavorite: (path) => get(`/create/queryIsFavorite?path=${path}`),
  // 删除某项目
  deleteItem: (_id) => get(`/create/deleteItem?_id=${_id}`),
  // 编辑项目
  editItem: (id, floderName) => get(`/create/editItem?_id=${id}&name=${floderName}`),
  // 打开编辑器
  openEditor: (path) => get(`/create/openEditor?path=${path}`),
  // 项目列表
  list: (path, isShowHideFile = true) => get(`/create/list?path=${path}&isShowHideFile=${isShowHideFile}`),
  // 删除当前选择的文件
  deleteFile: (path, item) => get(`/create/deleteFile?path=${path}/${item.name}&type=${item.type}`),
  // 导入项目
  importProject: (data) => post('/create/addProject', data),
  // 检验是否拥有这个项目
  checkHasProject: (path) => get(`/create/checkHasProject?path=${path}`),
  // 收藏此路由
  favoritePath: (data) => post('/create/addFavoritePath', data),
   // 查询收藏的路由
  queryFavoritePath: () => get('/create/queryFavoritePath'),
  // 删除收藏的路由
  removeFavoritePath: (path) => get(`/create/deleteFavoritePath?path=${path}`),
  // 创建文件夹
  mkDir: (path, floderName) => get(`/create/newDir?path=${path}&name=${floderName}`)
}