const User = require('../models/UserModel')
const generateToken = require('../config/generateToken')


const registerUser = async (req,res) =>{
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Enter all the fields')
    }
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User exists! Please login!')
    }
    const user = await User.create({name, email, password})

    if (user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Failed to create User")
    }
}

const authUser = async (req,res) =>{
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            token:generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error("Invalid email or password")
    }
}

module.exports = {registerUser, authUser}