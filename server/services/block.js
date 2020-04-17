const fs = require('fs').promises;
const path = require('path');
const utils = require('../utils');
const Api = require('../api');
const materialConfig = 222;

module.exports = {
    list: async(agent, framework) => {
        try {
            const blocks = await Api.get(`/projects/${materialConfig[framework].projectId}/repository/files/blocks.json/raw`);
            return blocks.filter((v) => (agent === 'all' || v.agent === agent));
        } catch (err) {
            throw err;
        }
    },
    download: async(framework, name) => {
        const blockFilePath = path.join(process.cwd(), 'showbox', name);
        utils.mkdirsSync(blockFilePath);
        try {
            // 获取所有需要下载的文件列表
            const files = await Api.get(`/projects/${materialConfig[framework].projectId}/repository/tree`, {
                params: {
                    path: `blocks/${name}/src/`,
                    recursive: true
                }
            });
            console.log(files);
            for (let i = 0, len = files.length; i < len; i++) {
                let file = files[i];
                const localFilePath = path.join(process.cwd(), 'showbox', file.path.replace(`blocks/${name}/src`, `${name}/`));
                console.log(localFilePath);
                if (file.type === 'tree') { // 如果类型是文件夹，则先创建文件夹
                    utils.mkdirsSync(localFilePath);
                }
                if (file.type === 'blob') { // 如果是类型是文件
                    const filePath = encodeURIComponent(file.path);
                    if (utils.isImage(file.name)) { // 如果是图片
                        let data = await Api.get(`/projects/${materialConfig[framework].projectId}/repository/files/${filePath}`);
                        data = new Buffer.from(data.content, 'base64');
                        await fs.writeFile(localFilePath, data);
                    } else {
                        const data = await Api.get(`/projects/${materialConfig[framework].projectId}/repository/files/${filePath}/raw`);
                        console.log(data);
                        await fs.writeFile(localFilePath, data);
                    }
                }
            }
            return 'download success';
        } catch (err) {
            throw new Error('下载失败，请重试');
        }
    }
}
