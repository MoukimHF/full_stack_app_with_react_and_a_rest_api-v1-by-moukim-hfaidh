import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
        firstName,
        lastName,
      emailAddress,
      password,
      confpassword,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            cancelButtonText="cancel"
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First name" />
             <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last name" />
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email address" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
                  <input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password"
                  value={confpassword} 
                  onChange={this.change} 
                  placeholder=" Confirm password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("1 :"+name+"2 :"+value)
    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const {
        firstName,
        lastName,
      emailAddress,
      password,
     
    } = this.state; 
    const user = {
        firstName,
        lastName,
      emailAddress,
      password,
     
    };
    context.data.createUser(user)
    .then(errors=>{
      console.log(errors)
      if(errors.length>0){
        this.setState({errors:errors})
      }
      else {
        context.actions.signIn(emailAddress,password)
        .then(()=>{
          this.props.history.push('/authenticated');
        })
        console.log(`${emailAddress} is successfully signed up and authenticated!`)
      }
    })
    .catch(err=>{
  
      this.props.history.push('/error');

      
    
    })

  }

  cancel = () => {

    this.props.history.push('/')

  }
}
