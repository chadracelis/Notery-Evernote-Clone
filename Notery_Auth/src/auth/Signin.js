import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom'
import Styles from './Styles'

const firebase = require("firebase");

class SignIn extends React.Component {

  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      serverError: false
    };
  }

  handleType = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
 
  handleSubmit = async (e) => {
    e.preventDefault(); // This is to prevent the automatic refreshing of the page on submit.
    await firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push('/');
      }, err => {
        this.setState({ serverError: true });
        console.log('Error logging in: ', err);
      });
    console.log(this.state);
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
            Sign in
          </Typography>
          <form className={classes.form1} onSubmit={(e) => this.handleSubmit(e)} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleType}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleType}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <NavLink to='/signup' variant="body2">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </form>
          { this.state.serverError ? 
            <Typography className={classes.errorText} component='h5' variant='h6'>
              Incorrect Login Information
            </Typography> :
            null
          }
        </div>
      </Container>
    );
  }
}

export default withStyles(Styles)(SignIn)

