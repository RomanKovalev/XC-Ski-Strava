import React, { Component } from 'react';
import './App.css';
import Stats from "./components/stats";
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Welcome to SKI</h2>
        <Stats />

        {/* <div>
          {
            this.state.activities.map((item, i) => {
              return (
                <div key={i}>
                  {item.id}
                </div>
              )
            })
          }
        </div>
        <p className="card">
          <Button onClick={this.handleClick}>Warning</Button>
        </p> */}
      </div>
    );
  }
}

export default App;


