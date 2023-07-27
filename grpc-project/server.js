const PROTO_AUTH_PATH = "./auth.proto";
const PROTO_WEATHER_PATH = "./weather.proto";

var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
const { authenticateHandler, tokenHandler } = require('./controller/auth');
const { weatherHandler } = require('./controller/weather');

var authProto = grpc.loadPackageDefinition(protoLoader.loadSync(PROTO_AUTH_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
}));

var weatherProto = grpc.loadPackageDefinition(protoLoader.loadSync(PROTO_WEATHER_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
}));

const server = new grpc.Server();

server.addService(authProto.AuthService.service, {
    Authenticate: (req, res) => authenticateHandler(req, res),
    isAccessTokenValide: (req, res) => tokenHandler(req, res)
});

server.addService(weatherProto.WeatherService.service, {
    GetWeather: (req, res) => weatherHandler(req, res),
});

server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:30043");
server.start();