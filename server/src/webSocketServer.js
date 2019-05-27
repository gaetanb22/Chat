//import WebSocket from 'ws';
var WebSocket = require('ws');
var r = require('rethinkdb');
var users = require("./users.js")
var usersModel = new users();


class webSocketServer
{
	constructor()
	{
	}
	run()
	{
		const wss = new WebSocket.Server({ port: 3030 });

		console.log('9');
		wss.on('connection', function connection(ws) {
			usersModel.sortUsers(r.desc('date'), function(err,pollResponse) {
				if(err) {
					console.log("error")
				}
				console.log(pollResponse);
				//const table = JSON.parse(pollResponse)
				pollResponse.forEach(function(element) {
  					console.log(element);
  					const addingMessage = {cmd: "message", option : element}
  					//console.log(JSON.stringify(addingMessage))

  					ws.send(JSON.stringify(addingMessage))
				});
			})
			console.log('10');
			//console.log(this.wss);
			ws.on('message', function incoming(data) {
				console.log(data)
				const addingMessage = JSON.parse(data)
				if (addingMessage.cmd == "message")
				{
					usersModel.addNewData({"name" : addingMessage.option.name, "message" : addingMessage.option.message, "date" : addingMessage.option.date} , function(err,pollResponse) {
			    		if(err) { console.log("error") }
    				})
				}
				wss.clients.forEach(function each(client) {
					if (client !== ws && client.readyState === WebSocket.OPEN) {
						client.send(data);
					}
				});
			});
		});
	}
}

module.exports = webSocketServer;