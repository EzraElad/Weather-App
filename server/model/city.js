const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
    saveDB : String ,
    name : String ,
    country : String ,
    updatedAt : Date ,
    temperature : Number ,
    condition : String ,
    conditionPic : String
})

const City = mongoose.model('city' , citySchema)

module.exports = City
