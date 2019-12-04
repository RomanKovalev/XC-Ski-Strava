import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h2>Welcome to SKI</h2>
        <p className="card App-intro">
          To get started, edit  and save to reload.
        </p>
        <p>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
        </p>
      </div>
    );
  }
}

export default App;
