require("dotenv").config();
let config = {
    jwt:{
        expiryTime: (process.env.JWT_EXPIRY_TIME)?process.env.JWT_EXPIRY_TIME:0, //Eg - "10h" or "20d" or "120s"
        secretKey: "helloibasisjljfgnjnbags4354sdfabk"
    },
    development: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        dialect : 'mysql'
    }
};

module.exports = config;