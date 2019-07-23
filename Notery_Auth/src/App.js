import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignIn from './auth/Signin';
import Signup from './auth/Signup'
import Dashboard from './dashboard/Dashboard'
import './App.css';

class App extends Component {
  render() { 
    return (
      <BrowserRouter>
      <div className='app-container'>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={Signup} />
        </Switch>
      </div>
    </BrowserRouter>
    );
  }
}
 
export default App;