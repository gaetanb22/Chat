import Send from '@material-ui/icons/Send';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react'
import ChatMessage from './ChatMessage'

class ListMessages extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      messageTosend : '',
      name : props.username,
      messages: props.messages,
    }
  }
  handleChangeMessageTosend = (event) => {
    this.setState({messageTosend: event.target.value});
  }

  handleSubmitMessageTosend = (event) => {
    const addingMessage =  {cmd: "messageToUser", option : {userSender: global.ws.login, userTarget : this.state.name, message: this.state.messageTosend, date : (new Date()).toString()}}
    global.ws.sendData(JSON.stringify(addingMessage))
    global.ws.handleMessage(addingMessage.option)
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmitMessageTosend}>
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
            name={formerMessage.userSender}
            date={formerMessage.date} />
      )}
      </List>
      </Paper>
      </div>)}
}

export default ListMessages;