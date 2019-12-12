const fs = require('fs');
const path = require('path');
const Api = require('../api');
const materialConfig = require('../../config/material-config');

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

module.exports = {
    downloadBlock: async (req, res) => {
        const { framework, name } = req.query;
        try {
            // 获取所有需要下载的文件列表
            const files = await Api.get(`/projects/${materialConfig[framework].projectId}/repository/tree`, {
                params: {
                    path: `blocks/${name}/src/`,
                    recursive: true
                }
            });
            files.forEach(async (file) => {
                const localFilePath = path.join(process.cwd(), 'magic-park', file.path.replace('/src', '/'));
                if (file.type === 'tree') { // 如果类型是文件夹，则先创建文件夹
                    mkdirsSync(localFilePath);
                }
                if (file.type === 'blob') { // 如果是类型是文件
                    const filePath = encodeURIComponent(file.path);
                    if (isImage(file.name)) { // 如果是图片
                        
                        Api.get(`/projects/${materialConfig[framework].projectId}/repository/files/${filePath}`).then(res => {
                            const data = new Buffer.from(res.content, 'base64');
                            fs.writeFile(localFilePath, data, (err) => {
                                if (err) throw err;
                            })
                        })
                    } else {
                        const data = await Api.get(`/projects/${materialConfig[framework].projectId}/repository/files/${filePath}/raw`)
                        fs.writeFile(localFilePath, data, (err) => {
                            if(err) throw err;
                        });
                    }
                }
            });
            res.send(files);
        } catch(err) {
            res.send(err);
        }
    }
}