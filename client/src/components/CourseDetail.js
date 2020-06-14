import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
export default class CourseDetail extends Component {
  state={
    courseDetail:{},
    authorized: false,
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId:null,
    errors: [],
    success:[]
  }
  componentDidMount(){
 this.detail()
  }
    render() {
      const {
        courseDetail,
        authorized,
    } = this.state;

        return (
            
            <div>
                <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
            {
              authorized ? 
              <span>
            <Link className="button" to={this.props.match.params.id+'/update'}>Update Course</Link>
            <Link className="button" to={this.props.match.params.id+'/delete'}>Delete Course</Link>
            <Link className="button button-secondary" to="/">Return to List</Link>
            </span>
            :
            <Link className="button button-secondary" to="/">Return to List</Link>

            }
            
           
                </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{
                courseDetail.title
              }</h3>
              <p>By { courseDetail.firstName+" "+courseDetail.lastName}</p>

            </div>
       
              <ReactMarkdown className="course--description" source={ courseDetail.description} escapeHtml={false} />
              
          
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3> { courseDetail.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ReactMarkdown  source={ courseDetail.materialsNeeded} escapeHtml={false}/>
                </li>
              </ul>
            </div>
          </div>
        </div>
            </div>
        )
    }
    detail = ()=>{
      const { context, match } = this.props;
      context.data.getCourse(match.params.id)
          .then(course => {
            console.log(course)
            try{ 
              if (context.authenticatedUser) {
                  if (context.authenticatedUser.id === course.owner.id) {
                      this.setState(() => {
                          return {
                              courseDetail:  { ...course.course,...course.owner },
                              authorized: true,
                          }

                      });
                      console.log(this.state.courseDetail)
                  } else {
                      this.setState(() => {
                          return {
                              courseDetail: { ...course.course,...course.owner },
                          }
                      });
                  }
              } else {
               
                  if(course!=null){ 
                  this.setState(() => {
                      return {
                          courseDetail:  { ...course.course,...course.owner },
                      }
                  });}
                else{
                  throw new Error()
                }
                 
              }
            }
            catch(err){
              this.props.history.push('/notFound');
            }
          });
    }
}
