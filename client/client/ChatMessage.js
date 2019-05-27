import React, { Component } from 'react'

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

class ChatMessage extends Component {
	render()
	{
		return (
			<ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar>{this.props.name.substring(0, 2)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<React.Fragment>
			 	 	{this.props.name}
			 	 	<div style={{float:'right'}}>{this.props.date}</div>
					</React.Fragment>}
            secondary={
            <React.Fragment>
              <Typography component="span" color="textPrimary">
                {this.props.message}
              </Typography>
            </React.Fragment>
          }
          />
          </ListItem>
		);
	}
}
export default ChatMessage;