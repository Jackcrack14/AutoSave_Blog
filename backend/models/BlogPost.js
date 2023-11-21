const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {type: String},
    content: {type: String}
})

module.exports = mongoose.model('BlogPost', blogSchema)