import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

import './goals.css';

class Goals extends Component {
    render() {
        const now = 60;
        return (
            <div className="goals">
                <ProgressBar now={now} label={`${now}%`} />
            </div>
        );
    }
}

export default Goals;