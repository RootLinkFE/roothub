const screenshot = require('node-server-screenshot');
const inquirer = require('inquirer');
const axios = require('axios');
const chalk = require('chalk');
const path = require('path');
const FormData = require('form-data');
const fs = require('fs-extra');

function upload(filePath) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    const stream = fs.createReadStream(filePath);
    form.append('file', stream);
    form.append('dir', 'f2e/roothub/');
    const formHeaders = form.getHeaders();
    axios({
      method: 'post',
      url: 'https://himekaidou.souche.com/upload',
      data: form,
      timeout: 20000,
      headers: {
        ...formHeaders,
      },
    })
      .then((res) => {
        if (res.status === 200 && res.data.success === 1) {
          resolve(res.data.path);
        } else {
          throw res.data;
        }
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}
const sizes = {
  pc: {
    width: 1024,
    height: 768,
  },
  mobile: {
    width: 375,
    height: 667,
  },
};

module.exports = (options) => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'size',
        message: '选择截图类型',
        choices: ['pc', 'mobile'],
      },
      {
        type: 'list',
        name: 'type',
        message: '选择物料类型',
        choices: ['block', 'component'],
      },
    ])
    .then((answers) => {
      const { port } = options;
      const { size, type } = answers;
      const name = path.basename(process.cwd());
      console.log(name);
      const imgPath = path.join(process.cwd(), 'screenshot.png');
      screenshot.fromURL(
        `http://localhost:${port || '8222'}`,
        imgPath,
        {
          ...sizes[size],
        },
        function(err) {
          if (err) throw err;
          upload(imgPath)
            .then(async (filePath) => {
              try {
                const jsonPath = path.join(
                  process.cwd(),
                  '../../materials.json'
                );
                let json = await fs.readJson(jsonPath);
                const index = json.list[`${type}s`].findIndex((v) => {
                  return v.name === name;
                });
                json.list[`${type}s`][index]['screenshot'] = filePath;
                let str = JSON.stringify(json, null, '\t');
                await fs.writeFile(jsonPath, str);
                console.log(chalk.green(`截图已上传：${filePath}`));
              } catch (err) {
                console.error(err);
                throw err;
              }
            })
            .catch((err) => {
              throw err;
            });
        }
      );
    });
};
