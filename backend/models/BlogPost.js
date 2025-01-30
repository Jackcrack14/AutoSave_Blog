const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {type: String},
    excerpt:{type:String},
    content: {type: String},
    coverImage:{type: Buffer},
    readTime:{type:String},
    owner:[{type: mongoose.Schema.Types.ObjectId, ref:'User'}]
})

module.exports = mongoose.model('BlogPost', blogSchema)