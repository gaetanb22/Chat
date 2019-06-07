import React, { Component } from 'react'

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


class ChatUser extends Component {
  constructor(props)
  {
    super(props)
    this.state = {
      username : props.username
    }
  }
  createNewConversation = (event) =>
  {
    global.ws.createNewConversation(this.state.username)
  }
	render()
	{
		return (
      <Button onClick = {this.createNewConversation}>
			<ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar>{this.state.username.substring(0, 2)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<React.Fragment>
          {this.state.username}
          </React.Fragment>}
            secondary={
            <React.Fragment>
              <Typography component="span" color="textPrimary">
                present
              </Typography>
            </React.Fragment>
          }
          />
          </ListItem>
      </Button>
		);
	}
}
export default ChatUser;