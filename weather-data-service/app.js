const express = require('express');
const axios = require('axios');
const Joi = require('@hapi/joi');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
// const grpc = require('simple-grpc-connector');
const {Op, TemperatureLabel} = require('./db/models');
const config  = require('./config');
const {auth} = require('./middleware');
const app = express();
const PORT = 8001;
app.use(compression());
app.use(cors()); 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));


// // Replace with your MySQL database connection details
// const db = new sequelize('your_database_name', 'your_database_user', 'your_database_password', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

// // Define your temparature_label model
// const TemperatureLabel = db.define('temparature_label', {
//   id: {
//     type: sequelize.INTEGER,
//     primaryKey: true,
//   },
//   min_temperature: sequelize.FLOAT,
//   max_temperature: sequelize.FLOAT,
//   label: sequelize.STRING,
// });

// Your implementation for /api/weather endpoint
app.get('/api/weather', auth, async (req, res, next) => {
  const { city } = req.query;
  console.log("city", city)
  try {
    
    const API_KEY = '6077346a88b69ca2095fc3a238d678ef';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(weatherUrl);
    const temperature = response.data.main.temp;
      console.log("temperature", temperature)
    // weather.getTemperature(function(err, temp){
    //   console.log("temp", temp)
    // })
    // Your implementation for token validation using gRPC
    // Call the isAccessTokenValid function of Authentication Service over gRPC
    // Implement the gRPC logic here

    // For simplicity, assume the token is valid
    
    // Your implementation to fetch weather data from OpenWeatherMap API
    // For simplicity, assume the temperature and label based on the city
   
    const temperatureLabel = await TemperatureLabel.findOne({
      where: {
          min_temperature: { [Op.lte]: temperature },
          max_temperature: { [Op.gte]: temperature },
      }
    });
    if(temperatureLabel){
      return res.status(200).json({
        success: true,
        temperature: temperature,
        label: temperatureLabel.label,
      });
    }else{
      return res.status(200).json({
        success: false,
        message: "Temperature label not found."
      });
    }
  } catch (error) {
    next(error);
  }
});

// Error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
      message: err.message,
      error: process.env.NODE_ENV== 'production' ? {} : err,
      success: false
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Weather Data Service running on port ${PORT}`);
});
