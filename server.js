const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require('path')
const api = require('./server/routes/api')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'dist')))
app.use( '/', api )

app.use(function (req, res, next) { //Suppose to fix a Heroku Bug
    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
        return res.sendStatus(204);
    }
    return next()
 })

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/weatherDB' ,  { useNewUrlParser: true })


// The Server is Listning
const port = process.env.PORT || 3000
app.listen(port , function(){
    console.log('The Server is up and running on ' + port)
})

//Trying something