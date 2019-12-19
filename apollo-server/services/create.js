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
  mkNewDir: async (path, name, res) => {
    try {
      fs.exists(`${path}/${name}`, exists => {
        if(exists) {
          res.send({
            success: false,
            hasFloder: true
          })
        } else {
          fs.mkdirSync(`${path}/${name}`)
          res.send({
            success: true,
            hasFloder: false
          })
        }
      })
    } catch (error) {
      res.send({
        success: false
      })
   }

  },
  // 删除
  deleteFile: (path, type, res) => {
    try {
      /**
       * @des 判断文件或文件夹是否存在
       */
      if (fs.existsSync(path)) {
          if(type === 'dir') {
            utils.delDir(path)
          } else {
            fs.unlinkSync(path);
          }
          res.send({
            success: true
          })
      } else {
         res.send({
           success: false,
           hasFloder: false
         })
      }
  } catch (error) {
     res.send({
       success: false
     })
   }
  }
}