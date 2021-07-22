const path = require('path')
const { getConfig, setConfig, startSendNewsService, stopSendNewsService } = require('../news/news')

module.exports = {
  getSendNewsStatus: async (req, res, next) => {
    try {
      const config = await getConfig()
      res.status(200).send({
        success: true,
        data: config
      })
    } catch (err) {
      next(err)
    }
  },
  changeSendNewsConfig: async (req, res, next) => {
    try {
      // mode: 'timing' | 'interval'
      const { value, mode, isOpen } = req.body
      if (mode === 'timing' && /^\+?[1-9][0-9]*$/.test(value)) {
        res.status(200).send({
          success: false,
          data: {},
          message: 'mode为timing时，value必须为数字或者数字字符串'
        })
        return
      }
      if (mode === 'interval' && value.split(':').length === 3) {
        res.status(200).send({
          success: false,
          data: {},
          message: 'mode为interval时，value格式必须为：x:x:x ！'
        })
        return
      }

      await setConfig({ value, mode, isOpen })
      const config = await getConfig()
      res.status(200).send({
        success: true,
        data: config
      })
    } catch (err) {
      next(err)
    }
  },
  switchSendNews: async (req, res, next) => {
    try {
      const { isOpen } = req.body
      if (isOpen) {
        await startSendNewsService()
      } else {
        await stopSendNewsService()
      }
      res.status(200).send({
        success: true
      })
    } catch (err) {
      next(err)
    }
  }
}
