import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';
const Context = React.createContext(); 

export class Provider extends Component {

  state={
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null

  };
  constructor() {
    super();
    this.data = new Data()
  }

  render() {

    const{authenticatedUser }=this.state;

    const value = {
      authenticatedUser ,
      data: this.data,
      actions:{ 
        signIn:this.signIn,
        signOut:this.signOut,
        removeCourse: this.removeCourse,
        createCourse:this.createCourse
      }
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  

  
  signIn = async (emailAddress, password) => {
    console.log(emailAddress)
    console.log(password)
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      const currentUser = { ...user, password };
      this.setState(() => {
        return {
          authenticatedUser: currentUser,
        };
      });
      Cookies.set('authenticatedUser',JSON.stringify(currentUser),{expires: 1});

    }
    return user;
  }



  signOut = () => {

    this.setState({
      authenticatedUser :null
    });
    Cookies.remove('authenticatedUser');
  }


  createCourse = async (course) => {
    const { authenticatedUser } = this.state;
    const error = await this.data.createCourse(course, authenticatedUser.emailAddress, authenticatedUser.password);
    if (error.length) {
      return error;
    } else {
      return true;
    }
  }
  removeCourse = async (courseId) => {
    const { authenticatedUser } = this.state;
    const error = await this.data.deleteCourse(courseId, authenticatedUser.emailAddress, authenticatedUser.password);
    if (error.length) {
      return error;
    } else {
      return true;
    }
  }


}


export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

