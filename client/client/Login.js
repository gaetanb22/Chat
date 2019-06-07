import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';

class Login extends Component
{
  constructor(props)
  {
  	super(props);
  	this.state = {
      username : props.username
    }
  }
  render()
  {
  	return (
      <div>
      <Avatar>{this.state.username.substring(0, 2)}</Avatar>
      {this.state.username}
      </div>
      )
  }
}

export default Login;