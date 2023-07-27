const PROTO_AUTH_PATH = "./auth.proto";

var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
const { tokenHandler } = require('./controller/auth');

var authProto = grpc.loadPackageDefinition(protoLoader.loadSync(PROTO_AUTH_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
}));

const server = new grpc.Server();

server.addService(authProto.AuthService.service, {
    isAccessTokenValide: (req, res) => tokenHandler(req, res)
});

server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:30043");
server.start();