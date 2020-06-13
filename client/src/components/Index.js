import React, { Component } from 'react'
import Courses from './Courses';

export default class Index extends Component {

    render() {
        return (
            <div>
                <Courses data={this.props.data}></Courses>
            </div>
        )
    }
}
