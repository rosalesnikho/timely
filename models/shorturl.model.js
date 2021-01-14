const mongoose = require('mongoose')
const shortId = require('shortid')


const shortUrlSchema = new mongoose.Schema({
    
    fullURL: {
        type: String,
        required: true
    },
    shortURL: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clickURL: {
        type: Number,
        required: true,
        default: 0
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: '1m' },
    },

})

module.exports = mongoose.model('ShortURL', shortUrlSchema)
