const mongoose = require('mongoose')
const shortId = require('shortid')

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
    }
})