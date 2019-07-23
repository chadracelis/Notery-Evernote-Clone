import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles';
import Styles from './Styles'

const firebase = require("firebase");

class SignUp extends React.Component {

  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      passwordConfirm: null,
      firstName: null,
      lastName: null,
      signupError: ''
    };
  }

  handleType = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  formIsValid = () => this.state.password === this.state.passwordConfirm;

  handleSubmit = (e) => {
    e.preventDefault(); // This is to prevent the automatic refreshing of the page on submit.

    if(!this.formIsValid()) {
      this.setState({ signupError: 'Passwords do not match' });
      return;
    }
    console.log(this.state);
  
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(resp => {
        const userObj = {
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          initials: this.state.firstName[0] + this.state.lastName[0]
        };
        firebase
          .firestore()
          .collection('users')
          .doc(this.state.email)
          .set(userObj)
          .then(() => {
            this.props.history.push('/');
        }, dbErr => {
          console.log('Failed to add user to the database: ', dbErr);
          this.setState({ signupError: 'Failed to add user' });
        });
    }, authErr => {
      console.log('Failed to create user: ', authErr);
      this.setState({ signupError: 'Failed to add user' });
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={(e) => this.handleSubmit(e)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={this.handleType}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={this.handleType}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={this.handleType}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleType}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="confirm-password"
                  onChange={this.handleType}
                />
              </Grid>
            </Grid>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
           >
             Sign Up
           </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <NavLink to='/signin' variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </form>
          { 
            this.state.signupError ? 
            <Typography className={classes.errorText} component='h5' variant='h6'>
              {this.state.signupError}
            </Typography> :
            null
          }
        </div>
      </Container>
    );
  }
}

export default withStyles(Styles)(SignUp)