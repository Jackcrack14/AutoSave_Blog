const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/api')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

mongoose.connect(process.env.MONGO_URI)

app.use(cors())
app.use(bodyParser.json())
app.use('/users',userRoutes)
app.use('/blogs',blogRoutes)


app.listen(5000, () => {
    console.log("server running sucessfull!!")
})