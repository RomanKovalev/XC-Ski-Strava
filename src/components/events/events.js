import React, { Component } from 'react';

export default class Events extends Component {
  render() {
    return (
      <div>
        <div className="goals_header">My events<sub>edit</sub></div><span></span>
        <div>

          <div className="event_wrapper">
            <div><span>24.02.2020</span></div><div><a href="#">Karelia Ski fest</a></div><div><i className="fa fa-trash"></i></div><div><i className="fa fa-edit"></i></div>
          </div>

          <div className="event_wrapper">
            <div><span>12.03.2020</span></div><div><a href="#">Marcialonga</a></div><div><i className="fa fa-trash"></i></div><div><i className="fa fa-edit"></i></div>
          </div>

          <div className="event_wrapper">
            <div><span>12.03.2021</span></div><div><a href="#">Demino</a></div><div><i className="fa fa-trash"></i></div><div><i className="fa fa-edit"></i></div>
          </div>

        </div>
      </div>
    );
  }
}

