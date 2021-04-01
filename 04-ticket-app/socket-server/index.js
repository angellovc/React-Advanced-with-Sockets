const Server = require("./helpers/server");
require('dotenv').config();
const server = new Server();
server.execute();
