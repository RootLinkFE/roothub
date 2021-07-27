const request = require('request')
const cheerio = require('cheerio')
const CronJob = require('cron').CronJob
const { newsDataPath, hasBeenSent, newsConfig } = require('../const')
const fs = require('fs-extra')
const dayjs = require('dayjs')

//前端咨询地址
const newsUrl = 'https://front-end-rss.vercel.app'
//推送机器地址
let webhook = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=8fdbabfd-64eb-48ec-9255-d9fb8c1c606d' //dev
if (process.env.NODE_ENV === 'development') {
  webhook = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=d57bb8ec-34f5-4641-91b1-e6ca908d37e3'
}

//记录已经推送的最新列表
let hasSenddata = []
let Job = null

// 排序
const sortDate = arr => {
  return arr.sort((a, b) => {
    return a.date < b.date ? 1 : -1
  })
}

//读取处理需要推送数据
async function handleBody(body) {
  try {
    const rangeTime = [
      dayjs()
        .subtract(10, 'day')
        .format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD')
    ]

    const $ = cheerio.load(body)
    const newsList = $('script')
    const regData = /LINKS_DATA[\s]*?=[\s]*?/
    const reg = /[\;][\n]*[\s]*?$/ //去掉尾部分号
    sendList = [] //存储推送列表

    newsList.map(item => {
      //取数据LINKS_DATA变量值
      if (newsList[item].children[0]?.data.split(regData)?.[1]) {
        //格式化数据
        const jsonStr = newsList[item].children[0]?.data.split(regData)?.[1].split(reg)[0]
        const jsonData = JSON.parse(jsonStr)
        // fs.writeJsonSync(newsDataPath, jsonData)
        jsonData.map(it => {
          it.items.map(l => {
            if (l.date >= rangeTime[0] && l.date <= rangeTime[1]) {
              l['source'] = it.title
              sendList.push(l)
            }
          })
        })
      }
    })
    sendList = sortDate(sendList)
    //存在内存中就不读取文件
    if ((await fs.pathExists(hasBeenSent)) && hasSenddata.length <= 0) {
      try {
        hasSenddata = (await fs.readJson(hasBeenSent)) || []
      } catch (error) {
        console.error(error)
      }
    }
    //过滤已发送或者日期相对较旧
    sendList = sendList.filter(item => {
      let isExit = false
      hasSenddata.map(hs => {
        if ((hs.title === item.title && hs.source === item.source) || item.date < hs.date) {
          isExit = true
        }
      })
      return !isExit
    })
    if (sendList.length > 0) {
      sendNews(sendList)
      hasSenddata = [...sendList]
      fs.writeJsonSync(hasBeenSent, sendList)
    }
  } catch (error) {
    console.error(error)
  }
}

function getNews() {
  request.get(newsUrl, (err, res, body) => {
    if (!err && res.statusCode == 200) {
      handleBody(body)
    } else {
      console.error(err)
    }
  })
}

//推送数据格式化
function formalSendData(data) {
  let str = '# 前端资讯\n\n'
  data.map((item, index) => {
    str += `\n${index + 1}、[${item.title}](${item.link})    <font color="comment" >${item.date}  ${
      item.source
    }</font>\n\n`
  })

  str += `\n[>>查看更多](${newsUrl})  `

  return {
    msgtype: 'markdown',
    markdown: {
      content: str
    }
  }
}

//推送信息
function sendNews(data) {
  request.post(
    webhook,
    {
      body: JSON.stringify(formalSendData(data)),
      headers: {
        'Content-Type': 'application/json'
      }
    },
    function(err, resp, body) {
      if (err) {
        console.error(err)
      }
    }
  )
}
/**
 * config说明：
 * value: string; //每天九点如：9:00:00；间隔时间设置的最小单位是小时
 * mode: 'timing' | 'interval';//定时每天推送时间or轮询间隔时间
 * isOpen: Boolean;
 */
const setConfig = async ({ value, mode, isOpen }) => {
  try {
    const config = await fs.readJson(newsConfig)
    if (value) {
      config.value = value
    }
    if (mode) {
      config.mode = mode
    }

    if (typeof isOpen !== 'undefined') {
      config.isOpen = isOpen
    }

    fs.writeJsonSync(newsConfig, config)
  } catch (error) {}
}

const getConfig = async () => {
  try {
    const config = await fs.readJson(newsConfig)
    return config
  } catch (error) {}
  return {}
}

const startSendNewsService = async () => {
  try {
    const config = await fs.readJson(newsConfig)
    let spec = '0 0 */1 * * *'
    if (!config.isOpen) return
    if (Job) Job.stop()

    if (config.mode === 'interval') {
      //每隔x小时整点推送
      let value = parseInt(config.value) >= 24 ? 23 : parseInt(config.value)
      spec = `0 0 */${value} * * *`
    } else {
      //定时推送
      let value = config.value.split(':')
      spec = `${value?.[2] || 0} ${value?.[1] || 0} ${value[0]} * * *`
    }
    Job = new CronJob(
      spec,
      function() {
        getNews()
      },
      null,
      true,
      'Asia/Shanghai'
    )

    Job.start()
  } catch (error) {
    console.log('startSendNewsService error:', error)
  }
}

const stopSendNewsService = async () => {
  if (Job) {
    Job.stop()
  }
  await setConfig({ isOpen: false })
  Job = null
}

module.exports = {
  getConfig,
  setConfig,
  startSendNewsService,
  stopSendNewsService
}
