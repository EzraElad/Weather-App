// const TempManager = require('./TempManager')
const tempManager = new TempManager()

// const Renderer = require('./Renderer')
const renderer = new Renderer()

const loadPage = async function(){
    await tempManager.getDataFromDB()
    renderer.renderData(tempManager.cityData)
}

const  handleSearch = async function(){
  let cityInput = $(".input").val()
  cityInput = cityInput[0].toUpperCase() + cityInput.slice(1).toLowerCase()// WORKS
  let x = tempManager.cityData  //all the cities
   console.log(x)
   for(let i = 0 ; i < x.length ; i++ ){
       if(x[i].name === cityInput){
           alert(`You already have ${cityInput} Saved`)
           return;
       }
   }
  await tempManager.getCityData(cityInput)
  renderer.renderData(tempManager.cityData)
}

$('.button').on('click' , function(){
    handleSearch()
})

$('body').on('click' , '.delete' , async function(){
    const name = $(this).closest('.city').find('.name').text()
    tempManager.removeCity(name)
    await tempManager.getDataFromDB()
    renderer.renderData(tempManager.cityData)
})


$('body').on('click' , '.save' ,  function(){
    const name = $(this).closest('.city').find('.name').text()
    console.log(name)
    tempManager.saveCity(name)
    renderer.renderData(tempManager.cityData)
})

loadPage()
