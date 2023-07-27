
const {weatherClient} = require("./client");
const {auth} = require('./middleware');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8001;
app.use(compression());
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));

app.get('/api/weather', auth, async (req, res, next) => {
    const { city } = req.query;
    try {
        if (!city) {
            return res.status(400).send({error: "city is required field.", success: false});
        }
        weatherClient.GetWeather({city: city}, (err, data) => {
            if (!err){
                console.log(data)
                if(data){
                    return res.status(200).send({
                        success: true,
                        temperature: data.temperature,
                        label: data.label,
                    });
                }else{
                    return res.status(200).json({success: false, message: "Temperature label not found."});
                }
            }else{
                console.log("error", err);
                throw err;
            }
        });
    } catch (error) {
      next(error);
    }
  });

// Error handlers
app.use(function (err, req, res, next) {
    console.log("err2", err);
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: process.env.NODE_ENV== 'production' ? {} : err,
        success: false
    });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Authentication Service running on port ${PORT}`);
});
