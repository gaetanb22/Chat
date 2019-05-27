import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class LoginCreate extends React.Component {
  state = {
    username: "",
    password: "",
    open: false,
  };

  handleClickOpen = () => 
  {
    this.setState({ open: true });
  };

  handleClose = () => 
  {
    this.setState({ open: false });
  };

  handleSubmit = (event) => 
  {
    const addingMessage =  {cmd: "create", option : { username: this.state.username, password: this.state.password}}
    global.ws.sendData(JSON.stringify(addingMessage))
    event.preventDefault();
  }
  handleChangeUsername = (event) => 
  {
    this.setState({username: event.target.value});
  }

  handleChangePassword = (event) => 
  {
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <div>
        <Button color="inherit" onClick={this.handleClickOpen}>
          Login create
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Connect Login</DialogTitle>
          <DialogContent>
            <TextField
              value={this.state.username}
              onChange={this.handleChangeUsername}
              autoFocus
              margin="dense"
              id="name"
              label="username"
              fullWidth/>
            <TextField
              value={this.state.password}
              onChange={this.handleChangePassword}
              autoFocus
              margin="dense"
              id="name"
              label="password"
              fullWidth/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}