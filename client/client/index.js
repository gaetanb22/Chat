import ReactDOM from 'react-dom'
import Chat from './Chat.js'
import React from 'react'
import clientServerCommunication from './clientServerCommunication'


global.ws = new clientServerCommunication('ws://localhost:3030')

ReactDOM.render(
  <Chat/>,
  document.getElementById('app'),
)
