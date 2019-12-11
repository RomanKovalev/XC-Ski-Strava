import React, { Component } from 'react';
import './App.css';
import Stats from "./components/stats";
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {

  componentDidMount() {
    console.log('MAIN APP DID MOUNTED')
  }
  render() {
    return (
      <div className="App">
        <h2>Welcome to SKI</h2>
        <Stats />
      </div>
    );
  }
}

export default App;


