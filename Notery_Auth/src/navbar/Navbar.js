import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Styles from './Styles';
import { withStyles } from '@material-ui/styles';
import { NavLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

const firebase = require('firebase');

class Navbar extends Component {

  signOut = () => {
    firebase.auth().signOut().then(
      console.log('signed out'));
  }

  render() { 
    const { classes, _user } = this.props;
    return (
        <div className={classes.root}>
          <AppBar className={classes.navbar} position="static">
            <Toolbar>
              <Typography variant="h4" className={classes.title}>
                Notery
              </Typography>
              <Button>
                <NavLink onClick={this.signOut} to='./signin' className={classes.link}>Logout</NavLink>
              </Button>
              {
                _user ?
                  <div>
                    <Avatar alt='Remy Sharp' className={classes.avatar}>
                      {_user.charAt(0).toUpperCase()}
                    </Avatar>
                  </div>
                : null
              }
            </Toolbar>
          </AppBar>
        </div>
    );
  }
}

export default withStyles(Styles)(Navbar);
