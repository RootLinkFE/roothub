const fs = require('fs')
const uuid = require('uuid')
const utils = require('../utils')


function Model (path) {
  this.path = path
}

// 新增
Model.prototype.addItem = function (opts) {
  const { path } = this
  // 写入文件
  const createFile = function (result) {
    return utils.createFilePromise(path, JSON.stringify(result)).then(data => {
      return data
    }).catch(err => {
      throw err
    })
  }
  // 判断是否存在
  if(fs.existsSync(path)) {
    return utils.readFilePromise(path).then(data => {
      const result = utils.addId([...data, opts])
      return createFile(result)
    })
  } else {
    const result = [{ id:  uuid(),...opts}]
    return createFile(result)
  }

}

// 查询
Model.prototype.getItem = function(toBooleanArr = [], query = {}) {
  const { path } = this
  console.log('path', path)
  if(fs.existsSync(path)) {
    return utils.readFilePromise(path).then(data => {
      // 是否需要布尔转换
      if(toBooleanArr.length > 0) {
        return Object.keys(query).length > 0
        ? utils.toBoolean(utils.filterData(data, query),toBooleanArr)
        : utils.toBoolean(data, toBooleanArr)
      } else {
        return Object.keys(query).length > 0
        ? utils.filterData(data, query)
        : data
      }
    }).catch(err => {
      throw err
    })
  }
}

// 编辑
Model.prototype.editItem = function(query) {
  const { path } = this
  return utils.readFilePromise(path).then(data => {
    // 修改完返回的数据
    const result = utils.modifyData(data, query)
    // 写入
    return utils.createFilePromise(path, JSON.stringify(result)).then(data => {
      return data
    })
  }).catch(err => {
    throw err
  })
}

// 删除
Model.prototype.deleteItem = function (query) {
  const { path } = this
  return utils.readFilePromise(path).then(data => {
    // 删除返回的数据
    const result = utils.deleteData(data, query)
    // 写入
    return utils.createFilePromise(path, JSON.stringify(result)).then(data => {
      return data
    })
  }).catch(err => {
    throw err
  })
}


module.exports = Model