import React, { Component } from 'react'
import ListUsers from './ListUsers'
import AppBarMenu from './AppBarMenu'
import Conversations from './Conversations'

//import bootstrap from 'bootstrap'

class Chat extends Component {
  render() {
    return (
      <div>
      <AppBarMenu/>
      <ListUsers/>
      <Conversations/>
      </div>
    );
  }
}

export default Chat;