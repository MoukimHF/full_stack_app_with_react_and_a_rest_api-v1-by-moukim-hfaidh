import React, { Component } from 'react'
import Form from './Form';
export default class UpdateCourse extends Component {
  state={
    courseDetail:{},
    authorized: true,
    userId:null,
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
    success:[]
  }
  componentDidMount(){
 this.detail()
  }
    render() {
      if(this.props.context.authenticatedUser){
      const { firstName, lastName } = this.props.context.authenticatedUser;
   
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
        <h1>Update Course</h1>
        <div>
        <Form 
            cancel={this.cancel}
            errors={errors}
            success={success}
            submit={this.submit}
            submitButtonText="Update Course"
            cancelButtonText="cancel"
            elements={() => (
              <React.Fragment>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                    value={ title}
                  onChange={this.change} 
              /></div>
              {
                this.props.context.authenticatedUser ?
                <React.Fragment>
                <p>By 
                
                {" "+ firstName+" "+lastName}

            </p>
                </React.Fragment>
                :
                <React.Fragment>
                  <p>By</p>
                </React.Fragment>
              }
               
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" placeholder="Course description..." 
                value= { description}
                onChange={this.change} >
              
              
                  </textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" value={ estimatedTime}
                        onChange={this.change}
                        /></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                    <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." 
                    value={ materialsNeeded}
                    onChange={this.change}>
                    </textarea>
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
    else{
      
      this.props.history.push('/forbidden');
      return null;
    }
  }
    detail = ()=>{
      const { context, match } = this.props;
      console.log(context)
      context.data.getCourse(match.params.id)
          .then(course => {
            console.log(course)
              if (context.authenticatedUser) {
                  if (context.authenticatedUser.id === course.owner.id) {
                      this.setState(() => {
                          return {
                              courseDetail:  { ...course.course,...course.owner },
                              authorized: true,
                              title: course.course.title,
                              description: course.course.description,
                              estimatedTime: course.course.estimatedTime,
                              materialsNeeded: course.course.materialsNeeded
                          }

                      });
                  } else {
                    this.props.history.push('/forbidden');

                  }
              } else {
                this.props.history.push('/forbidden');
              }
          });
    }

    change = (event) => {
      const name = event.target.name;
      let value = event.target.value;
      this.setState(() => {
        return {
          [name]: value
        };
      });
    }
  
    submit = () => {
      const { context,match } = this.props;
      const { emailAddress, password } = context.authenticatedUser;

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
        materialsNeeded
      };
      console.log(title)
      console.log(description)
      console.log(course)
      context.data.updateCourse(match.params.id, course, emailAddress, password)
            .then(errors=>{
            console.log(errors)
         if(errors.length>0){
          this.setState({errors:errors})
        }else{
          this.setState({success:'Course successfuly updated'})
          window.scrollTo(0, 0)
          setTimeout(()=> {this.props.history.push('/');
          window.location.reload();}
          ,1000)
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
