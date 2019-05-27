import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

import LoginConnect from './LoginConnect'
import LoginCreate from './LoginCreate'

class Login extends Component {
  constructor(props)
  {
    super(props);
  }
  render ()
  {
  	return (
  		<div>
        <LoginConnect/>
        <LoginCreate/>
  		</div>
  		);
  }
}

export default Login;