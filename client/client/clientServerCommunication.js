class clientServerCommunication {
	constructor(url) {
    this.login = false;
    this.url = url;
    this.ws = new WebSocket(this.url);
    console.log('constructor')
    this.ws.onopen = () => {
      console.log('onopen')
    }

    this.ws.onmessage = evt => {
      console.log('onmessage')
      const data = JSON.parse(evt.data)
      this.receiveData(data);
    }

    this.ws.onclose = () => {
      console.log('onclose')
      this.ws = new WebSocket(this.url);
    }

    }
    sendData(data)
    {
    	this.ws.send(data);
    }
    receiveData(data)
    {
    	if (data.cmd == "message")
    	{
    		this.handleMessage(data.option)
    	}
    }
}

export default clientServerCommunication;