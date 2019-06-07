import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListMessages from './ListMessages'

class Conversations extends Component {
  constructor(props) {

    super(props)
    this.state = {
      conversations: [],
      value: 0
    }
    global.ws.createNewConversation = this.createNewConversation
    global.ws.handleMessage = this.addMessage
    global.ws.removeAllConversations = this.removeAllConversations
  }
  handleChange = (event, newValue) => {
      this.setState({value: newValue})
      event.preventDefault()
    }
  removeAllConversations = () => 
  {
    this.setState({conversations: []})
  }
  addMessage = (addingMessage) =>
  {
    if (addingMessage.userSender == global.ws.login)
      global.ws.createNewConversation(addingMessage.userTarget)
    else
      global.ws.createNewConversation(addingMessage.userSender)
    var inc = 0;

    while (inc < this.state.conversations.length && this.state.conversations[inc].username != addingMessage.userSender && this.state.conversations[inc].username != addingMessage.userTarget)
      inc++;
    if (inc < this.state.conversations.length)
    {
      var copyValues = this.state.conversations.slice()
      copyValues[inc].messages.push(addingMessage)
      this.setState({conversations : copyValues})
    }
  }
  createNewConversation = (name) =>
  {
    const addingConversation = {username: name, messages : []}
    var inc = 0;
    while (inc < this.state.conversations.length && this.state.conversations[inc].username != name)
      inc++;
    if (inc == this.state.conversations.length)
    {
      this.setState({conversations:[...this.state.conversations,addingConversation]})
      this.setState({value: inc})
    }
    else
      this.setState({value: inc})
  }
  render()
  {
    var messages = "";
    if (this.state.conversations.length > 0)
      {
        this.state.conversations.map((formerUser, index) =>
        {
          if (this.state.value === index)
            messages = <ListMessages key = {index} messages = {formerUser.messages} username = {formerUser.username}/>
        })
      }
    return (
      <div>
      <AppBar position="static" color="default">
      <Tabs
      value={this.state.value}
      onChange={this.handleChange}
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      >
      {this.state.conversations.map((formerUser, index) =>
          <Tab
            key={index} // only put index if only add element at the end
            label={formerUser.username}/>
      )}
      </Tabs>
      </AppBar>
      {messages}
      </div>
      );
  }
}

export default Conversations;

