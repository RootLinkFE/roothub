const screenshot = require("node-server-screenshot");
const axios = require('axios');
const chalk = require('chalk');
const path = require('path');
const FormData = require('form-data');
const fs = require('fs-extra');

function upload (filePath) {
    return new Promise((resolve, reject) => {
        const form = new FormData();
        const stream = fs.createReadStream(filePath);
        form.append('file', stream);
        form.append('dir', 'f2e/showbox/');
        const formHeaders = form.getHeaders();
        axios({
            method: 'post',
            url: 'https://himekaidou.souche.com/upload',
            data: form,
            timeout: 20000,
            headers: {
                ...formHeaders
            }
        }).then(res => {
            if (res.status === 200 && res.data.success === 1) {
                resolve(res.data.path);
            } else {
                throw res.data;
            }
        }).catch(err => {
            console.error(err);
            reject(err);
        });
    });
}
module.exports = (port='8111') => {
    screenshot.fromURL(`http://localhost:${port}`, "screenshot.png", function (err){
        if (err) throw err;
        upload(path.join(process.cwd(), 'screenshot.png')).then(async (filePath) => {
            try {
                const jsonPath = path.join(process.cwd(), '../../blocks.json');
                const json = await fs.readJson(jsonPath);
                const name = path.basename(process.cwd());
                json[name]['screenshot'] = filePath;
                let str = JSON.stringify(json, null , '\t');
                await fs.writeFile(jsonPath, str);
                console.log(chalk.green(`截图已上传：${filePath}`));
            } catch(err) {
                console.error(err);
                throw err;
            }
        }).catch(err => {
            throw err;
        });
    });
}

