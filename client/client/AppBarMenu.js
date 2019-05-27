import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import LoginConnect from './LoginConnect'
import LoginCreate from './LoginCreate'

class AppBarMenu extends Component {
  constructor(props)
  {
    super(props);
  }
  render()
  {
    return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <LoginConnect/>
          <LoginCreate/>
        </Toolbar>
      </AppBar>
    </div>
  );
  }
}

export default AppBarMenu;