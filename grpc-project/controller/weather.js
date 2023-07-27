const grpc = require('@grpc/grpc-js');
const { TemperatureLabel, Op } = require('../db/models');
const axios = require('axios');
const API_KEY = process.env.API_KEY;

const weatherHandler = async (req, res)=>{
    try {
        const city = req.request.city
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await axios.get(weatherUrl);
        const temperature = response.data.main.temp;
        const temperatureLabel = await TemperatureLabel.findOne({
        where: {
            min_temperature: { [Op.lte]: temperature },
            max_temperature: { [Op.gte]: temperature },
        }
        });
        if(temperatureLabel){
            res(null, {
                temperature: temperature,
                label: temperatureLabel.label,
            });
        }else{
            res({
                code: grpc.status.NOT_FOUND,
                message: "Temperature label not found."
            });
        }
    } catch (err) {
        res({
            message: err.message,
            code: grpc.status.INTERNAL
        });
    }
}

module.exports = {
    weatherHandler
}