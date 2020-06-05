import React, { Component } from 'react'
import Courses from './Courses';
import axios from 'axios';

export default class Index extends Component {
    
  constructor() {
    super();
    this.state={
      courses: [],
      loading:true
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
        courses: response.data.courses,
      loading:false
    });
  
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

  }
    render() {
        return (
            <div>
                <Courses data={this.state.courses}></Courses>
            </div>
        )
    }
}
