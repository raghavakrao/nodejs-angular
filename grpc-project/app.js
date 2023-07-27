const auth = require('./auth');
const weather = require('./weather');
const AUTH_PORT = 8000;
const WEATHER_PORT = 8001;

// Start Authentication server
auth.listen(AUTH_PORT, () => {
  console.log(`Authentication Service running on port ${AUTH_PORT}`);
});

// Start Weather server
weather.listen(WEATHER_PORT, () => {
    console.log(`Weather Service running on port ${WEATHER_PORT}`);
  });
  