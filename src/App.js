import React, { Component } from 'react';
import './App.css';
import Stats from "./components/stats";
import Faq from "./components/faq";
import Goals from "./components/goals";
// import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Welcome to SKI</h2>
        <Stats />
        <Goals />
        <Faq />
      </div>
    );
  }
}

export default App;


