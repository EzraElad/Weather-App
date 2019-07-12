const express = require('express')
const request = require('request')
const router = express.Router()
const bodyParser = require('body-parser')
const City = require('../model/city')


//.getCityData(cityName)
router.get('/city/:cityName', function (req, res) {
    let cityName = req.params.cityName
    request(`http://api.apixu.com/v1/current.json?key=38067590ac0540cebfe112245191007&q=${cityName}`, function (err, res2, body) {
        let data = JSON.parse(body)
        //console.log(data)
        // if(data.error.code === 1006){
        //     console.log('YEP')
        //     return  ;
        // }
        if(data.error === undefined){
        //console.log("There is data")
        const city = new City({
            saveDB: "false",
            name: data.location.name,
            country: data.location.country,
            updatedAt: data.current.last_updated,
            temperature: data.current.temp_c,
            condition: data.current.condition.text,
            conditionPic: data.current.condition.icon
        })    
        res.send(city) }else if(data.error.code === 1006){
                //console.log('YEP')
                return  ;
            }
    }) 
})

router.get('/cities', function (req, res) {
    City.find({}, function (err, res2) {
        res.send(res2)
    })
})

router.post('/city', function (req, res) {
    let data = req.body
    let city = new City(data)
    city.save()
    res.end()
})

router.delete('/city/:cityName', function (req, res) {
    let cityName = req.params.cityName
    City.find({}, function (err, res2) {
        let y = res2.findIndex(x => x.name === cityName)
        res2[y].remove()
    })
    res.end()
})

module.exports = router