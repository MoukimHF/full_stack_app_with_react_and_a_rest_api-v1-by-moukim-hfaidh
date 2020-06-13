import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';
import axios from 'axios';

import Index from './components/Index'
import Header from './components/Header';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Authenticated from './components/Authenticated';
import withContext from './Context';
import PrivateRoute from './PrivateRoute';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import DeleteCourse from './components/deleteCourse';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import NotFound from './components/NotFound';
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const DeleteCourseWithContext = withContext(DeleteCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext =withContext(UserSignIn);
const AuthWithContext  = withContext(Authenticated);
const UserSignOutWithContext = withContext(UserSignOut);
export default class App extends Component {
     
  constructor() {
    super();
    this.state={
      courses: []
    };
  } 

  componentDidMount(){
    this.performSearch();
  }

  performSearch = () =>{

    axios.get(`http://localhost:5000/api/courses`)
    .then(response => {
      console.log(response)
      this.setState({
        courses: response.data.courses
    });
  
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

  }
  render() { 
    return(
    <Router>
    <div>
      <HeaderWithContext  />

      <Switch>
        <Route exact path="/" render={(props) => <Index {...props} data={this.state.courses} />} />
        <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
        <Route exact path="/courses/:id" render={(props) => <CourseDetailWithContext {...props} data={this.state.courses} />} />
        <Route  exact path="/courses/:id/update" render={(props) => <UpdateCourseWithContext {...props} data={this.state.courses} />} />
        <Route  exact path="/courses/:id/delete" render={(props) => <DeleteCourseWithContext {...props} data={this.state.courses} />} />
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/error" component={UnhandledError} />
        <Route path="/notfound " component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
    );
  }
}
