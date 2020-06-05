import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';

import Index from './components/Index'
import Header from './components/Header';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Authenticated from './components/Authenticated';
import withContext from './Context';
import PrivateRoute from './PrivateRoute';
import CourseDetail from './components/CourseDetail';
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext =withContext(UserSignIn);
const AuthWithContext  = withContext(Authenticated);
const UserSignOutWithContext = withContext(UserSignOut);
export default class App extends Component {
  
  render() { 
    return(
    <Router>
    <div>
      <HeaderWithContext  />

      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/courses/:id" component={CourseDetail} />
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
    );
  }
}
