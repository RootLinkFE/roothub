const mongoose = require('mongoose')
const spawn = require('cross-spawn');

const Create = mongoose.model('Create')
const FavoritePath = mongoose.model('FavoritePath')
const service =  require('../services/create');

module.exports = {
  list: async(req, res) => {
    const { path }  = req.query;
    try {
      const result = await service.list(path)
      res.send(result)
    } catch (err) {
      res.send(err)
    }
  },
  // 获取本地已加入的项目
  getProjectList: async(req, res) => {
    try {
      const projectList = await Create.find({})
      res.send(projectList)
    } catch (err) {
      res.send(err)
    }
  },
  // 新增项目
  addProject: async (req, res) => {
    const opts = req.body

    const project = new Create(opts)
    try {
      const saveProject = await project.save()

      if (saveProject) {
        res.send({
          success: true,
          data: saveProject
        })
      } else {
        res.send ({
          success: false
        })
      }
    } catch (err) {
      res.send(err)
    }

  },
  // 收藏项目
  favorite: async (req, res) => {
    const { _id, favorite } = req.query
    try {
      const result =  await Create.updateOne({ _id }, { favorite })
      result ? res.send({
        success: true,
        data: result
      })
      : res.send({
        success: false
      })
    } catch(err) {
      res.send(err)
    }
  },
  // 删除操作
  deleteItem: async (req, res) => {
    const { _id } = req.query
    try {
      const result = await Create.findByIdAndRemove(_id)
      result ? res.send({
        success: true,
        data: result
      })
      : res.send({
        success: false
      })
    } catch (err) {
      res.send(err)
    }
  },
  // 编辑文件名操作
  editItem: async (req, res) => {
    const { _id, name } = req.query
    try {
      const result =  await Create.updateOne({ _id }, { name })
      result ? res.send({
        success: true,
        data: result
      })
      : res.send({
        success: false
      })
    } catch(err) {
      res.send(err)
    }
  },
  // 打开编辑器
  openEditor: async (req, res) => {
    const { path } = req.query
    const result = await spawn('code', [path])
    result ? res.send({
      success: true
    }) : res.send({
      success: false
    })
  },
  // 检验是否拥有这个项目
  checkHasProject: async (req, res) => {
    const { path } = req.query
    try {
      const projectList = await Create.find({path})
      projectList.length > 0
      ? res.send({success: true, hasProject: true})
      : res.send({success: false, hasProject: false})
    } catch (err) {
      res.send(err)
    }
  },
  // 查看是否收藏
  queryIsFavorite: async (req, res) => {
    const { path } = req.query
    try {
      const projectList = await Create.find({path})
      projectList.length > 0 && projectList[0].favorite
      ? res.send({success: true, projectList})
      : res.send({success: false})
    } catch (err) {
      res.send(err)
    }
  },
  // 添加收藏的路径
  addFavoritePath: async (req, res) => {
    const opts = req.body

    const favoritePath = new FavoritePath(opts)
    try {
      const result = await favoritePath.save()

      if (result) {
        res.send({
          success: true,
          data: result
        })
      } else {
        res.send ({
          success: false
        })
      }
    } catch (err) {
      res.send(err)
    }
  },
  // 查询所有收藏的路由
  queryFavoritePath: async (req, res) => {
    try {
      const favoritePathList = await FavoritePath.find({})
      res.send(favoritePathList)
    } catch (err) {
      res.send(err)
    }
  },
  // 删除收藏的路由
  deleteFavoritePath: async (req, res) => {
    const { path } = req.query

    try {
      const result = await FavoritePath.findOneAndRemove(path)
      result ? res.send({
        success: true,
        data: result
      })
      : res.send({
        success: false
      })
    } catch (err) {
      res.send(err)
    }
  },
  // 新建文件夹
  newDir: async (req, res) => {
    const { path, name } = req.query
    service.mkNewDir(path, name, res)
  }
}