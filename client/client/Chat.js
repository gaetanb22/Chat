import Send from '@material-ui/icons/Send';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';

//<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

import Button from '@material-ui/core/Button';

import React, { Component } from 'react'
import ChatMessage from './ChatMessage'
import AppBarMenu from './AppBarMenu'

//import bootstrap from 'bootstrap'

class Chat extends Component {
  constructor(props) {
    console.log("constructor");
    super(props); // init non defined props to null ?
    this.state = {
      messageTosend : '',
      name: 'anon',
      messages: [],
    }
    
    global.ws.handleMessage = this.addMessage.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeMessageTosend = this.handleChangeMessageTosend.bind(this);
    this.handleSubmitMessageTosend = this.handleSubmitMessageTosend.bind(this);
  }

  handleChangeName(event) {
    console.log(event.target);
    console.log("handleChangeName");
    this.setState({name: event.target.value});
  }

  handleChangeMessageTosend(event) {
    console.log("handleChangeMessageTosend");
    this.setState({messageTosend: event.target.value});
  }

  addMessage(addingMessage)
  {
    console.log("addingMessage");
    this.setState({messages:[...this.state.messages,addingMessage]});
  }
  handleSubmitMessageTosend(event) {
    console.log(event);
    console.log("handleSubmitMessageTosend");
    const addingMessage =  {cmd: "message", option : { name: this.state.name, message: this.state.messageTosend, date : (new Date()).toString()}}
    global.ws.sendData(JSON.stringify(addingMessage))
    this.addMessage(addingMessage.option)
    event.preventDefault();
  }
  componentDidMount() {
    console.log('componentDidMount');
  }

  render() {
    return (
      <div>
      <AppBarMenu/>
      <form onSubmit={this.handleSubmitMessageTosend}>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleChangeName} />
        </label>
        <label>
          message:
          <textarea value={this.state.messageTosend} onChange={this.handleChangeMessageTosend} />
        </label>
        <Button type="submit" value="Submit" variant="contained" color="primary">Send<Send/></Button>
      </form>
      <Paper style={{maxHeight: 200, overflow: 'auto'}}>
      <List>
      {this.state.messages.map((formerMessage, index) =>
         <ChatMessage
            key={index} // only put index if only add element at the end
            message={formerMessage.message}
            name={formerMessage.name}
            date={formerMessage.date} />
      )}
      </List>
      </Paper>
      </div>
    );
  }
}

export default Chat;