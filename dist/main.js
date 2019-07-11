// const TempManager = require('./TempManager')
const tempManager = new TempManager()

// const Renderer = require('./Renderer')
const renderer = new Renderer()

const loadPage = async function(){
    await tempManager.getDataFromDB()
    renderer.renderData(tempManager.cityData)
}

const  handleSearch = async function(){
  const cityInput = $(".input").val()
  console.log(cityInput)
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
    tempManager.saveCity(name)
    renderer.renderData(tempManager.cityData)
})

loadPage()