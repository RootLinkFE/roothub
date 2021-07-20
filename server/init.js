const os = require('os')
const fs = require('fs-extra')
const path = require('path')
const util = require('util')
const chalk = require('chalk')
const exec = util.promisify(require('child_process').exec)
const { configPath, defaultConfigPath, recommendMaterialsPath, appName } = require('./const.js')

function blockMapping(list = []) {
  const res = list
    ?.filter(v => v)
    .map(function(v) {
      return {
        name: v.key,
        description: v.description,
        sourceCode: v.url,
        screenshot: v.img,
        // category: v.tags && v.tags[0],
        category: v.tags,
        tags: v.tags,
        type: v.type,
        dependencies: v.dependencies,
        previewUrl: v.previewUrl,
        downloadPath: v.defaultPath,
        belongLib: v.belongLib
      }
    })
  return res
}

async function genMaterialsJsonFile(item, materialsDir) {
  try {
    const { jsonFile } = item
    let newJson = { ...item, list: {} }
    const jsonFilePath = path.join(materialsDir, jsonFile)
    let data = await fs.readJson(jsonFilePath)
    const blocks = data.blocks || data.list // 两种物料的配置不一样
    newJson.list.blocks = blockMapping(blocks)
    // 同步成统一规范格式的配置，后续持续直接读此文件
    const dest = path.join(materialsDir, 'materials.json')
    let str = JSON.stringify(newJson, null, '\t')
    await fs.writeFile(dest, str)
  } catch (err) {
    console.error(err)
  }
}

// 物料数据转换
async function materialsTranslate(item, materialsDir) {
  genMaterialsJsonFile(item, materialsDir)
}

module.exports = async function init() {
  try {
    const mainPath = path.join(os.homedir(), `.${appName}`) // 主目录
    var materials = []
    if (!fs.pathExistsSync(mainPath)) {
      fs.mkdirSync(mainPath)
    }
    console.log(`本地缓存目录: ${chalk.blue(mainPath)}`)
    const { nodeTool, downloadPath } = await fs.readJson(defaultConfigPath) // 默认设置
    const recommendMaterials = await fs.readJson(recommendMaterialsPath) // 推荐物料
    materials = materials.concat(recommendMaterials)
    // 初始化个人配置
    if (!fs.pathExistsSync(configPath)) {
      let data = {
        customMaterials: [],
        myProjects: [],
        nodeTool,
        downloadPath,
        workingDirectory: null
      }
      let str = JSON.stringify(data, null, '\t')
      await fs.writeFile(configPath, str)
    }
    const data = await fs.readJson(configPath)
    if (data.customMaterials) {
      materials = materials.concat(data.customMaterials)
    }
    // 遍历仓库列表
    // console.log(materials);
    for (const item of materials) {
      console.log(item.name, item.gitPath)

      if (item.active) {
        let materialsDir = path.join(os.homedir(), `.${appName}/${item.name}`)
        if (fs.pathExistsSync(materialsDir)) {
          const { stdout } = await exec('git pull', {
            cwd: materialsDir
          })
          materialsTranslate(item, materialsDir)
          console.log(`stdout: ${chalk.blue(item.name)} ${stdout}`)
        } else {
          const { stdout } = await exec(`git clone ${item.gitPath}`, {
            cwd: mainPath
          })
          materialsTranslate(item, materialsDir)
          console.log(`stdout: ${chalk.blue(item.name)} ${stdout}`)
        }
      }
    }
    console.log(chalk.bgBlue('初始化结束'))
    return '初始化成功'
  } catch (err) {
    console.error(err)
  }
}
