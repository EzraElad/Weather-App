// const City = require('../server/model/city')
//  <div class ="updatedAt">${i.current.last_updated}</div>  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2

class Renderer {
    constructor(){
    }

    renderData(allCityData){
        //console.log(allCityData)
        $('.con').empty()
        for(let i of allCityData){
            const div = ` <div class ="city" id="${i._id}">
                <div class ="right">
                <img src="${i.conditionPic}"/>
                <p class ="condition">${i.condition}</p>
                </div>
                <div class="middle">
                <div class ="temperature">${i.temperature} <span>&#8451;</span>  ,      ${i.humidity} <i class="fas fa-tint"></i></div><br>
                <div class ="name">${i.name}</div>${i.country} , <p class="lTime">Local Time : ${i.localTime}</p>
                </div>
            </div>`
            $('.con').append(div)
            if (i.saveDB === "true") {
                $(`#${i._id}`).append(`<div><p class="update">${i.updatedAt}</p><i class="delete fas fa-minus-circle"></i></div>`)
            }
            else {
                $(`#${i._id}`).append(`<div><p class="update">${i.updatedAt}</p><i class="save fas fa-plus-circle"></i></div>`)
            }
        }
    }
}


// module.exports = Renderer