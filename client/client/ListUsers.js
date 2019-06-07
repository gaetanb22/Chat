import Send from '@material-ui/icons/Send';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react'
import ChatUser from './ChatUser'

class ListUsers extends Component
{
	constructor(props) {
    super(props); // init non defined props to null ?
    this.state = {
      users: [],
    }
    global.ws.handleNewUser = this.addUser
    global.ws.removeAllUser = this.removeAllUser
  }

  removeAllUser = () => 
  {
    this.setState({users: []})
  }

  addUser = (addingUser) =>
  {
    this.setState({users:[...this.state.users,addingUser]});
  }

	render() {
    return (
      <div>
      <Paper style={{maxHeight: 200, overflow: 'auto'}}>
      <List>
      {this.state.users.map((formerUser, index) =>
          <ChatUser
            key={index} // only put index if only add element at the end
            username={formerUser.username}/>
      )}
      </List>
      </Paper>
      </div>)}
}

export default ListUsers;