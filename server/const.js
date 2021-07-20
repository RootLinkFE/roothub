const os = require('os')
const path = require('path')
const appName = 'roothub'

module.exports = {
  appName,
  mainPath: path.join(os.homedir(), `.${appName}`),
  configPath: path.join(os.homedir(), `.${appName}/config.json`),
  defaultConfigPath: path.join(__dirname, '../project.config.json'),
  recommendMaterialsPath: path.join(__dirname, '../recommendMaterials.json'),
  recommendResourcesPath: path.join(__dirname, '../recommendResources.json'),
  resourceImgBaseUrl: path.join(__dirname, '../src/assets/resource'),
  resourceDefaultImg: path.join(__dirname, '../src/assets/logo.png'),
}
