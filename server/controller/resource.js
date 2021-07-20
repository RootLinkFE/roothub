const path = require('path')
const fs = require('fs-extra')
const { imgUrlToBase64 } = require('../utils')
const { recommendResourcesPath, resourceImgBaseUrl, resourceDefaultImg } = require('../const.js')

module.exports = {
  list: async (req, res, next) => {
    try {
      const resourceJson = await fs.readJson(recommendResourcesPath)
      resourceJson.map(item => {
        if (item.img && item.img !== '' && !/^https?:\/\//.test(item.img)) {
          try {
            item.img = imgUrlToBase64(path.join(resourceImgBaseUrl, item.img))
          } catch (error) {
            item.img = imgUrlToBase64(resourceDefaultImg)
          }
        }
      })
      res.status(200).send({
        success: true,
        data: {
          resource: resourceJson
        }
      })
    } catch (err) {
      next(err)
    }
  }
}
