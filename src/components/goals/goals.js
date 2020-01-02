import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

import './goals.css';

class Goals extends Component {
    render() {
        const now = 60;
        return (
            <div className="goals">
                <span>Week goal</span>
                <ProgressBar now={now} label={`${now}%`} />
                <span>Season goal</span>
                <ProgressBar now={now-20} label={`${now-20}%`} />                
            </div>
        );
    }
}

export default Goals;