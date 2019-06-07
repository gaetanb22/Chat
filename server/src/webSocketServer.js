//import WebSocket from 'ws';
var WebSocket = require('ws');
var r = require('rethinkdb');
var data1 = require("./users.js")
var dataModel = new data1();

function sendToEveryoneElse(wss, ws, data)
{
	wss.clients.forEach(function each(client) {
		if (client !== ws && client.readyState === WebSocket.OPEN) {
			client.send(data);
		}
	});
}

function sendAllMessageToUser(wss, ws, data)
{
	dataModel.filterData("message", r.row('userSender').default('foo').eq(data.username).or(r.row('userTarget').default('foo').eq(data.username)), function(err,pollResponse) {
		if(err) {
			console.log("error")
		}
		pollResponse.forEach(function(element) {
			const addingMessage = {cmd: "messageToUser", option : {userSender : element.userSender, userTarget : element.userTarget, message : element.message, date : element.date}}
				ws.send(JSON.stringify(addingMessage))
			})
	})
}

function sendListUserToUser(wss, ws)
{
	dataModel.getAllData("users", function(err,pollResponse) {
		if(err) {
			console.log("error")
		}
		pollResponse.forEach(function(element) {
			if (element.username != ws.id)
			{
				const addingUser = {cmd: "user", option : {username: element.username}}
				ws.send(JSON.stringify(addingUser))
			}
		});
	})
}
class webSocketServer
{
	
	run()
	{
		const wss = new WebSocket.Server({ port: 3030 });

		wss.on('connection', function connection(ws) {
			ws.id = ""
			ws.on('close', function(reasonCode, description)
			{
				ws.id = ""
			})
			ws.on('message', function incoming(data) {
				//console.log(data)
				const addingMessage = JSON.parse(data)
				if (addingMessage.cmd == "messageToUser")
				{
					dataModel.addNewData("message", {"userSender" : addingMessage.option.userSender, "userTarget" : addingMessage.option.userTarget, "message" : addingMessage.option.message, "date" : addingMessage.option.date} , function(err,pollResponse) {
			    		if(err) { console.log("error") }
    				})
    				wss.clients.forEach(function each(client) {
					if (client !== ws && client.readyState === WebSocket.OPEN && client.id == addingMessage.option.userTarget) {
						client.send(data);
					}})
				}
				if (addingMessage.cmd == "signOut")
				{
					ws.id = ""
				}
				if (addingMessage.cmd == "create")
				{
					dataModel.filterData("users", {username: addingMessage.option.username}, function(err,pollResponse) {
						if(err) {
							console.log("error")
						}
						if (pollResponse.length == 0)
						{
							dataModel.addNewData("users", {"username" : addingMessage.option.username, "password" : addingMessage.option.password} , function(err,pollResponse) {
			    				if(err) { console.log("error") }
    						})
    						ws.send(data);
    						const addingData = {cmd : "user", option : {username : addingMessage.option.username}}
    						sendToEveryoneElse(wss, ws, JSON.stringify(addingData))
    						ws.id = addingMessage.option.username
    						sendListUserToUser(wss, ws)
    						sendAllMessageToUser(wss, ws, addingMessage.option)
						}
					})
				}
				if (addingMessage.cmd == "connect")
				{
					dataModel.filterData("users", {username: addingMessage.option.username}, function(err,pollResponse) {
						if(err) {
							console.log("error")
						}
						if (pollResponse.length == 1)
						{
							if (pollResponse[0].password == addingMessage.option.password)
							{
    							ws.send(data);
    							ws.id = addingMessage.option.username
    							sendListUserToUser(wss, ws)
    							sendAllMessageToUser(wss, ws, addingMessage.option)
    						}
						}
					})
				}
			});
		});
	}
}

module.exports = webSocketServer;