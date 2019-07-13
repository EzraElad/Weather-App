const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
    saveDB : String ,
    name : String ,
    country : String ,
    updatedAt : String ,
    temperature : Number ,
    condition : String ,
    conditionPic : String ,
    localTime : String ,
    humidity : Number
})

const City = mongoose.model('city' , citySchema)

module.exports = City
