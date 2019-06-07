var db = require("./db.js");
var r = require('rethinkdb');
var webSocketServer = require("./webSocketServer.js")

var dbModel = new db('data');
dbModel.setupDb('message');
dbModel.setupDb('users');

wss = new webSocketServer()

wss.run()