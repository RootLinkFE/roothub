const fs = require('fs');
const path = require('path');


// 递归创建目录 同步方法
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
}

// 判断是图片
function isImage(name) {
    return /\.(png|jpg|gif|jpeg)$/.test(name.toLowerCase());
}

/**
 * 读取文件方法
 * @param  {string} 文件本地的绝对路径
 * @return {string|binary}
 */
function file (filePath) {
  let content = fs.readFileSync(filePath, 'binary')
  return content
}

/**
 * 遍历读取目录内容（子目录，文件名）
 * @param  {string} reqPath 请求资源的绝对路径
 * @return {array} 目录内容列表
 */
function walk( reqPath ){

  let files = fs.readdirSync( reqPath );

  let dirList = [], fileList = [], item = ''
  for(item of files) {
    // eslint-disable-next-line no-useless-escape
    let itemArr = item.split("\.");
    itemArr.length === 1
    ? dirList.push( {type: 'dir', name: item} )
    : fileList.push( {type: 'file', name:item } );
  }

  let result = dirList.concat( fileList );

  return result;
}

module.exports = {
    mkdirsSync,
    isImage,
    file,
    walk
}