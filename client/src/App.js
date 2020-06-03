import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


export default class App extends Component {
  
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
    console.log(this.state.courses)
    console.log('hello')
    return (
      
        <div className="main-content">
        
      </div>
    );
  }
}
