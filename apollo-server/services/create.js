const fs = require('fs')
const utils = require('../utils')

module.exports = {
  list: async (path, isShowHideFile) => {
    let content
    //判断访问地址是文件夹还是文件
    let stat = fs.statSync(path)
    content = stat.isDirectory() ? utils.walk(path, isShowHideFile) :  utils.file(path)
    return content
  },
  // 新增文件夹
  mkNewDir: (path, name) => {
    return utils.isExistsPromise(`${path}/${name}`).then(data => {
      if(data) {
        return false
      } else {
        return utils.mkdirPromise(`${path}/${name}`).then(data => {
          return data
        })
      }
    }).catch(err => {
      throw err
    })
  },
  // 删除
  deleteFile: (path, type) => {
    return utils.isExistsPromise(path).then(data => {
      if(data) {
        type === 'dir' ?  utils.delDir(path) : fs.unlinkSync(path);
        return true
      } else {
        return false
      }
    })
  }
}