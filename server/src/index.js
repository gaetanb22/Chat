var db = require("./db.js");
var r = require('rethinkdb');
var webSocketServer = require("./webSocketServer.js")

var dbModel = new db('data', 'users');
dbModel.setupDb();

wss = new webSocketServer()

wss.run()