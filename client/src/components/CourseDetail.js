import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class CourseDetail extends Component {
    render() {
        console.log(this.props.location)
        console.log(this.props.history)
        console.log(this.props)

        return (
            <div>
                <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span><Link class="button" to={this.props.match.params.id+'/update'}>Update Course</Link><Link className="button" to={this.props.match.params.id+'/delete'}>Delete Course</Link></span><Link
                className="button button-secondary" to="/">Return to List</Link></div>
          </div>
        </div>
            </div>
        )
    }
}
