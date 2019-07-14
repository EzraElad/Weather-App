// const TempManager = require('./TempManager')
const tempManager = new TempManager()

// const Renderer = require('./Renderer')
const renderer = new Renderer()


const loadPage = async function () {
    await tempManager.getDataFromDB()
    renderer.renderData(tempManager.cityData)
}

const handleSearch = async function () {
    let cityInput = $(".input").val()
    let words = cityInput.split(" ")
    //console.log(words.length)
    if (words.length === 2) { // New York
        let y =words[0]
        let z = words[1]
        cityInput = y[0].toUpperCase() + words[0].slice(1).toLowerCase() + " " +z[0].toUpperCase() + words[1].slice(1).toLowerCase()
        //console.log(cityInput)
    }else{
    cityInput = cityInput[0].toUpperCase() + cityInput.slice(1).toLowerCase()// Eilat
    }
    let x = tempManager.cityData  //all the saved cities
    console.log(cityInput)
    for (let i = 0; i < x.length; i++) {
        if (x[i].name === cityInput) {
            alert(`You already have ${cityInput} Saved`)
            return;
        }
    }
    await tempManager.getCityData(cityInput)
    renderer.renderData(tempManager.cityData)
}

$('.button').on('click', function () {
    handleSearch()
})

$('body').on('click', '.delete', async function () {
    const name = $(this).closest('.city').find('.name').text()
    //$(this).closest('.city').remove()
    tempManager.removeCity(name)
    await tempManager.getDataFromDB()
    renderer.renderData(tempManager.cityData)
})


$('body').on('click', '.save', function () {
    const name = $(this).closest('.city').find('.name').text()
    console.log(name)
    tempManager.saveCity(name)
    renderer.renderData(tempManager.cityData)
})

$(".x").on('click', function () { // DELETES the text from the input
    $('.input').val('') /// PAY ATTTEINTIO
})

$('.input').keypress(function (event) { // I CANT PRESS ENTER AND IT WORKS
    if (event.keyCode == 13) {
        $('.button').click()
    }
})

// $('.damn').on('click' , function(){
//     console.log($(this).closest('.city').find('.name').text())
// })

loadPage()
