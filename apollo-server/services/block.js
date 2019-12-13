const fs = require('fs');
const path = require('path');
const utils = require('../utils');
const Api = require('../api');
const materialConfig = require('../../config/material-config');

module.exports = {
    list: async (agent, framework) => {
        console.log(agent, framework);
        try {
            const blocks = await Api.get(`/projects/${materialConfig[framework].projectId}/repository/files/blocks.json/raw`);
            return blocks.filter((v) => (agent === 'all' || v.agent === agent));
        } catch (err) {
            throw err;
        }
    },
    download: async (framework, name) => {
        try {
            // 获取所有需要下载的文件列表
            const files = await Api.get(`/projects/${materialConfig[framework].projectId}/repository/tree`, {
                params: {
                    path: `blocks/${name}/src/`,
                    recursive: true
                }
            });
            await files.forEach(async (file) => {
                const localFilePath = path.join(process.cwd(), 'magic-park', file.path.replace('/src', '/'));
                if (file.type === 'tree') { // 如果类型是文件夹，则先创建文件夹
                    utils.mkdirsSync(localFilePath);
                }
                if (file.type === 'blob') { // 如果是类型是文件
                    const filePath = encodeURIComponent(file.path);
                    if (utils.isImage(file.name)) { // 如果是图片
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
            return 'success';
        } catch (err) {
            throw err;
        }
    }
}