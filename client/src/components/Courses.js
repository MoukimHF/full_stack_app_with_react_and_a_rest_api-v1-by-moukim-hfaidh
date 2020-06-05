import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Courses extends Component {
    render() {
        return (
            <div>
          
             <div class="bounds">
               {/* map start here */}
               {this.props.data.map(course=>{
                   return(
                    <div class="grid-33"><Link class="course--module course--link" to={'/courses/'+course.id}>
            <h4 class="course--label">Course</h4>
            <h3 class="course--title">{course.title}</h3>
          </Link></div>
                   )
               })}
                  

            {/* outside of the map */}
          <div class="grid-33"><a class="course--module course--add--module" href="create-course.html">
            <h3 class="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" class="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </a></div>
            </div>

            </div>
        )
    }
}
