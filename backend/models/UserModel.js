const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name:{type:String, required:true},
    avatar:{type:Buffer},
    email:{type:String, unique:true, required:true},
    password:{type:String}
})

const User = mongoose.model("User",userSchema)

module.exports = User