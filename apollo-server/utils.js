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
function walk( reqPath, isShowHideFile ){
  let files = fs.readdirSync( reqPath );
  let dirList = [], fileList = [], item = ''

  for(item of files) {
    const stat =  fs.lstatSync(`${reqPath}/${item}`)
    // 判断是否显示隐藏文件
    if(isShowHideFile) {
      if(stat.isDirectory() && item[0] !== '.') {
        dirList.push( {type: 'dir', name: item} )
      } else if (stat.isFile() && item[0] !==  '.') {
        fileList.push( {type: 'file', name:item } );
      }
    } else {
      stat.isDirectory()
      ? dirList.push( {type: 'dir', name: item} )
      : fileList.push( {type: 'file', name:item } );
    }
  }
  let result = dirList.concat( fileList );
  return result;
}
/**
 * 删除文件夹
 * @param {*} path
 */
function delDir(path){
  let files = [];
  if(fs.existsSync(path)){
      files = fs.readdirSync(path);
      files.forEach((file, index) => {
          let curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()){
              delDir(curPath); //递归删除文件夹
          } else {
              fs.unlinkSync(curPath); //删除文件
          }
      });
      fs.rmdirSync(path);
  }
}

module.exports = {
    mkdirsSync,
    isImage,
    file,
    walk,
    delDir
}