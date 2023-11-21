const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const Routes = require('./routes/api')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

mongoose.connect(process.env.MONGO_URI)

app.use(cors())
app.use(bodyParser.json())
app.use('/',Routes)


app.listen(5000, () => {
    console.log("server running sucessfull!!")
})