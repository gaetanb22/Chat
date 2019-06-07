class clientServerCommunication {
	constructor(url) {
    this.login = "";
    this.url = url;
    this.ws = new WebSocket(this.url);
    this.ws.onmessage = evt => {
      const data = JSON.parse(evt.data)
      this.receiveData(data);
    }

    this.ws.onclose = () => {
      this.ws = new WebSocket(this.url);
    }
    }
    sendData(data)
    {
    	this.ws.send(data);
    }
    receiveData(data)
    {
      //console.log("receive")
      if (data.cmd == "user")
      {
        this.handleNewUser(data.option)
      }
    	if (data.cmd == "messageToUser")
    	{
    		this.handleMessage(data.option)
    	}
      if (data.cmd == "create")
      {
        this.login = data.option.username
        this.handleCreate(data.option)
      }
      if (data.cmd == "connect")
      {
        this.login = data.option.username
        this.handleCreate(data.option)
      }
    }
}

export default clientServerCommunication;