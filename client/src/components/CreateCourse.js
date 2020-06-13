import React, { Component } from 'react'
import Form from './Form';

export default class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId:null,
    errors: [],
    success:[]
  }

    render() {
      const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
      errors,
      success
    } = this.state;

        return (
            <div>
                  <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <Form
           cancel={this.cancel}
            errors={errors}
            success={success}
            submit={this.submit}
            submitButtonText="Create Course"
            cancelButtonText = "Cancel"
            elements={() => (
              <React.Fragment>
          
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                <input id="title" name="title" type="text" className="input-title course--title--input" 
                placeholder="Course title..."
                onChange={this.change} 
                value={title} />
                    
                    </div>
                <p>By Joe Smith</p>
              </div>
              <div className="course--description">
                <div>
                <textarea id="description" name="description" className=""
                 placeholder="Course description..."
                 onChange={this.change} 
                 value={description}>

                </textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                    <input id="estimatedTime" name="estimatedTime" type="text" 
                    className="course--time--input"
                        placeholder="Hours"
                        onChange={this.change} 
                         value={estimatedTime}/>
                        
                        </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                    <textarea id="materialsNeeded" name="materialsNeeded" className="" 
                    placeholder="List materials..."
                    onChange={this.change} 
                    value={materialsNeeded}></textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
           
            </React.Fragment>
            )} />
        </div>
      </div>
            </div>
        )
        
    }
    
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    console.log(context.authenticatedUser)
    const userId=context.authenticatedUser.id
    const {
        title,
        description,
      estimatedTime,
      materialsNeeded,
      
     
    } = this.state; 
    const course = {
        title,
        description,
      estimatedTime,
      materialsNeeded,
      userId
     
    };
    context.actions.createCourse(course)
    .then(errors=>{
      if(errors.length>0){
        this.setState({errors:errors})
      }else{
        this.setState({success:'Course successfuly created'})
        setTimeout(()=> {this.props.history.push('/');
        window.location.reload();}
        ,2500)
      }
    
    })
    .catch(err=>{
      console.log(err);
      this.props.history.push('/error');

      
    
    })

  }

  cancel = () => {

    this.props.history.push('/')

  }
}
