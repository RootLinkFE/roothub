const spawn = require('cross-spawn');
const service = require('../services/create');
const Model = require('../model')

// 项目实例化
const projectPath = `${process.cwd()}/apollo-server/const/project.json`
const Project = new Model(projectPath)
// 收藏文件夹实例化
const floderPath = `${process.cwd()}/apollo-server/const/floder.json`
const Floder = new Model(floderPath)

module.exports = {
    list: async (req, res, next) => {
        const { path, isShowHideFile } = req.query;
        // 转布尔
        const isShowHide = isShowHideFile === "true"
        try {
            const result = await service.list(path, isShowHide)
            res.success(result)
        } catch (err) {
            next(err)
        }
    },
    // 新增项目
    addProject: async (req, res, next) => {
        const opts = req.body
        // 删除无用信息
        delete opts.ref
        delete opts.private_token
        try {
            const data = await Project.addItem(opts)
            res.success(data);
        } catch (err) {
            next(err);
        }

    },

    // 获取本地已加入的项目
    getProjectList: async (req, res, next) => {
        try {
            const data = await Project.getItem(['favorite']);
            res.success(data);
        } catch (err) {
            next(err);
        }
    },
    // 收藏项目
    favorite: async (req, res, next) => {
        const { id, favorite } = req.query
        try {
            const data = await Project.editItem({ id, favorite })
            res.success(data);
        } catch (err) {
            next(err);
        }
    },
    // 编辑文件名操作
    editItem: async (req, res, next) => {
        const { id, name } = req.query
        try {
            const data = await Project.editItem({ id, name })
            res.success(data);
        } catch (err) {
            next(err);
        }
    },
    // 删除操作
    deleteItem: async (req, res, next) => {
        const { id } = req.query
        try {
            const data = await Project.deleteItem({ id })
            res.success(data);
        } catch (err) {
            next(err);
        }
    },
    // 打开编辑器
    openEditor: async (req, res, next) => {
        const { path } = req.query
        try {
            const result = await spawn('code', [path])
            res.success('成功');
        } catch (err) {
            next(err);
        }
    },
    // 检验是否拥有这个项目
    checkHasProject: async (req, res, next) => {
        const { path } = req.query
        try {
            // 根据path 查询
            const data = await Project.getItem(['favorite'], { path });
            data.length > 0
                ? res.success({ success: true, hasProject: true })
                : res.success({ success: true, hasProject: false })
        } catch (err) {
            next(err);
        }
    },
    // 查看是否收藏
    queryIsFavorite: async (req, res, next) => {
        const { path } = req.query
        try {
            // 根据path 查询
            const projectList = await Project.getItem(['favorite'], { path });

            projectList.length > 0 && projectList[0].favorite
                ? res.success({ success: true, projectList })
                : res.success({ success: false })
        } catch (err) {
            next(err);
        }
    },
    // 添加收藏的路径
    addFavoritePath: async (req, res, next) => {
        const opts = req.body
        // 删除无用信息
        delete opts.ref
        delete opts.private_token
        try {
            const data = await Floder.addItem(opts)
            res.success(data);
        } catch (err) {
            next(err);
        }
    },
    // 查询所有收藏的路由
    queryFavoritePath: async (req, res,next) => {
        try {
            const data = await Floder.getItem();
            res.success(data)
        } catch (err) {
            next(err);
        }
    },
    // 删除收藏的路由
    deleteFavoritePath: async (req, res, next) => {
        const { path } = req.query
        try {
            const data = await Floder.deleteItem({ path })
            res.success(data);
        } catch (err) {
            next(err);
        }
    },
    // 新建文件夹
    newDir: async (req, res, next) => {
        const { path, name } = req.query
        try {
            const data = await service.mkNewDir(path, name)
            if (data) {
                res.success({
                    success: true,
                    hasFloder: false
                })
            } else {
                res.success({
                    success: true,
                    hasFloder: true
                })
            }
        } catch (err) {
            next(err);
        }
    },
    // 删除某个文件或文件夹
    deleteFile: async (req, res, next) => {
        const { path, type } = req.query
        try {
            const data = await service.deleteFile(path, type)
            res.success(data);
        } catch (err) {
            next(err);
        }
    },
}