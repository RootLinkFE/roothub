const mongoose = require('mongoose')

const Schema = mongoose.Schema

// 项目信息
const favoritePathSchema = new Schema({
  id: false,
  path: String,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

// 处理创建时间和更新时间
favoritePathSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

mongoose.model('FavoritePath', favoritePathSchema)