const fs = require('fs')
const utils = require('../utils')

module.exports = {
  list: async (path) => {
    let content
    //判断访问地址是文件夹还是文件
    let stat = fs.statSync(path)
    content = stat.isDirectory() ? utils.walk(path) :  utils.file(path)
    return content
  }
}