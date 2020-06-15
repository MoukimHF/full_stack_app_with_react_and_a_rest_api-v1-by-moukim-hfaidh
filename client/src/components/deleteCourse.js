import React, { Component } from 'react'
import Form from './Form';
export default class deleteCourse extends Component {
    state = {
       courseId:this.props.match.params.id,
       emailAddress: '',
       password: '',
        errors: [],
        success:[]
      }
    render() {
        const {
            success,
          errors,
        } = this.state;
       
       
        return (
            <div>
            <div className="actions--bar">
      <div className="bounds">
            <h1 style={{marginLeft: '20px'}} >are u sure !</h1>
            <Form
            cancel={this.cancel}
            errors={errors}
            success={success}
            submit={this.submit}
            submitButtonText="Yes"
            cancelButtonText="No"
            elements={() => (
              <React.Fragment>
       
        </React.Fragment>
            )} />
      </div>
    </div>
    <div className="bounds course--detail">
    
      
    </div>
        </div>
        )
    }
    submit = () => {
      
        const {
            courseId
         
        } = this.state; 
        const {
            removeCourse
        } = this.props.context.actions;
    
         removeCourse(courseId)
        .then((errors)=>{

          if(errors.length>0){
              console.log(errors)
                          this.setState({errors:errors})
          }
          else{
            this.setState({success:'Course successfuly deleted'})
            setTimeout(()=> {this.props.history.push('/');
            window.location.reload();}
            ,1000)
           
          }
       
        })
        .catch(err=>{
          console.log('error '+err)
          this.props.history.push('/error');
        })
      
      }
     
    
      cancel = () => {
    
        this.props.history.push('/')
    
      }
}
