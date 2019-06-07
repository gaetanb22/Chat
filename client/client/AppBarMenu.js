import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

import LoginConnect from './LoginConnect'
import LoginCreate from './LoginCreate'
import Login from './Login'

class AppBarMenu extends Component {
  state = {
    login : ""
  }
  constructor(props)
  {
    super(props)
    global.ws.handleCreate = this.handleCreate;
  }
  handleCreate = (option) =>
  {
    this.setState({login : option.username})
  }
  handleSignOut = (event) => {
    global.ws.login = ""
    this.setState({login : global.ws.login})
    const addingMessage =  {cmd: "signOut"}
    global.ws.sendData(JSON.stringify(addingMessage))
    global.ws.removeAllUser()
    global.ws.removeAllConversations()
  }
  componentWillMount()
  {
    this.setState({login : global.ws.login})
  }
  render()
  {
    var loginButton;
    if (this.state.login == "")
    {
      loginButton = <div><LoginConnect/><LoginCreate/></div>;
    }
    else
    {
      loginButton = <div><Login username = {this.state.login} /><Button onClick={this.handleSignOut}>Sign Out</Button></div>;
    }
    return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {loginButton}
        </Toolbar>
      </AppBar>
    </div>
  );
  }
}

export default AppBarMenu;