const spawn = require('cross-spawn');
const service =  require('../services/create');
const Model = require('../model')

// 项目实例化
const projectPath = `${process.cwd()}/apollo-server/const/project.json`
const Project = new Model.create(projectPath)
// 收藏文件夹实例化
const floderPath = `${process.cwd()}/apollo-server/const/floder.json`
const Floder = new Model.create(floderPath)

module.exports = {
  list: async(req, res) => {
    const { path, isShowHideFile }  = req.query;
    // 转布尔
    const isShowHide = isShowHideFile === "true"
    try {
      const result = await service.list(path, isShowHide)
      res.send(result)
    } catch (err) {
      res.send(err)
    }
  },
  // 新增项目
  addProject: async (req, res) => {
    const opts = req.body
    // 删除无用信息
    delete opts.ref
    delete opts.private_token
    try {
      const data = await Project.addItem(opts)
      if(data) {
        res.send({
          success: data
        })
      }
    } catch (err) {
      res.send({
        success: false
      })
    }

  },

  // 获取本地已加入的项目
  getProjectList: async (req, res) => {
    try {
      const data = await Project.getItem(['favorite']);
      res.send({
        success: true,
        data
      })
    } catch (err) {
      res.send({
        success: false
      })
    }
  },
  // 收藏项目
  favorite: async (req, res) => {
    const { id, favorite } = req.query
    try {
      const data = await Project.editItem({ id, favorite })
      if(data) {
        res.send({
          success: data
        })
      }
    } catch (err) {
      res.send({
        success: false
      })
    }
  },
  // 编辑文件名操作
  editItem: async (req, res) => {
    const { id, name } = req.query
    try {
      const data = await Project.editItem({ id, name })
      if(data) {
        res.send({
          success: data
        })
      }
    } catch (err) {
      res.send({
        success: false
      })
    }
  },
  // 删除操作
  deleteItem: async (req, res) => {
    const { id } = req.query
    try {
      const data = await Project.deleteItem({ id })
      if(data) {
        res.send({
          success: data
        })
      }
    } catch (err) {
      res.send({
        success: false
      })
    }
  },
  // 打开编辑器
  openEditor: async (req, res) => {
    const { path } = req.query
    const result = await spawn('code', [ path ])
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
      // 根据path 查询
      const data = await Project.getItem(['favorite'], { path });
      data.length > 0
      ? res.send({success: true, hasProject: true})
      : res.send({success: true, hasProject: false})
    } catch (err) {
      res.send({
        success: false
      })
    }
  },
  // 查看是否收藏
  queryIsFavorite: async (req, res) => {
    const { path } = req.query
    try {
      // 根据path 查询
      const projectList = await Project.getItem(['favorite'], { path });

      projectList.length > 0 && projectList[0].favorite
      ? res.send({success: true, projectList})
      : res.send({success: false})
    } catch (err) {
      res.send({
        success: false
      })
    }
  },
  // 添加收藏的路径
  addFavoritePath: async (req, res) => {
    const opts = req.body

    // 删除无用信息
    delete opts.ref
    delete opts.private_token
    try {
      const data = await Floder.addItem(opts)
      if(data) {
        res.send({
          success: data
        })
      }
    } catch (err) {
      res.send({
        success: false
      })
    }
  },
  // 查询所有收藏的路由
  queryFavoritePath: async (req, res) => {
    try {
      const data = await Floder.getItem();
      res.send({
        success: true,
        data
      })
    } catch (err) {
      res.send({
        success: false
      })
    }
  },
  // 删除收藏的路由
  deleteFavoritePath: async (req, res) => {
    const { path } = req.query

    try {
      const data = await Floder.deleteItem({ path })
      if(data) {
        res.send({
          success: data
        })
      }
    } catch (err) {
      res.send({
        success: false
      })
    }
  },
  // 新建文件夹
  newDir:  async (req, res) => {
    const { path, name } = req.query
    try {
      const data = await service.mkNewDir(path, name)
      console.log(data)
      if (data) {
        res.send({
          success: true,
          hasFloder: false
        })
      } else {
        res.send({
          success: true,
          hasFloder: true
        })
      }
    } catch (err) {
      res.send({
        success: false
      })
    }
  },
  // 删除某个文件或文件夹
  deleteFile: async (req, res) => {
    const { path, type } = req.query
    try {
      const data = await service.deleteFile(path, type)
      if(data) {
        res.send({
          success: true
        })
      }
    } catch (err) {
      res.send({
        success: false
      })
    }
  },
}