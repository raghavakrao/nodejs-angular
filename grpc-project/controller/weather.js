const { TemperatureLabel, Op } = require('../db/models');
const axios = require('axios');
const API_KEY = process.env.API_KEY;

const weatherHandler = async (req, res, next)=>{
    try {
        const { city } = req.query;
        if (!city) {
            return res.status(400).send({error: "city is required field.", success: false});
        }
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
            return res.status(200).send({
                success: true,
                temperature: temperature,
                label: temperatureLabel.label
            });
        }else{
            return res.status(404).json({success: false, message: "Temperature label not found."});
        }
    } catch (err) {
        next(error);
    }
}

module.exports = {
    weatherHandler
}