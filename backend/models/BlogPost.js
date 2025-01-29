const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {type: String},
    content: {type: String},
    image:{type: Buffer},
    owner:[{type: mongoose.Schema.Types.ObjectId, ref:'User'}]
})

module.exports = mongoose.model('BlogPost', blogSchema)