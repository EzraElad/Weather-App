class TempManager {
    constructor() {
        this.cityData = []
    }
    async getDataFromDB() {
        this.cityData = await $.get('cities')
    }

    async getCityData(cityName) {
        const city = await $.get('city/' + cityName)
        // console.log(city)
        this.cityData.push(city)
    }

    saveCity(cityName) {
        let city = this.cityData.find(x => x.name === cityName)
        city.saveDB = "true"
        $.post('/city', city, function (req, res) {
        })

    }

    removeCity(cityName) {
        $.ajax({
            url: '/city/'+cityName,
            type: 'DELETE',
            success: function(result) {
                console.log("Deleted")
            }
        })
    }
}

// module.exports =  TempManager