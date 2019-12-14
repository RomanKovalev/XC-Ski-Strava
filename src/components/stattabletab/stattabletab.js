import React, { Component } from 'react';
import { Table } from 'react-bootstrap'

import './stattabletab.css';

export default class StatTableTab extends Component {

    render() {
        if (this.props.stats !== undefined ) {
            const { totalDistance,
                distanceUnit,
                totalTime,
                totalElevation,
                elevateUnit,
                maxDistance,
                maxTime } = this.props.stats
            return (
                <Table borderless size="sm">
                    <tbody>
                        
                        <tr>
                            <td>Distance</td>
                            <td>{totalDistance} {distanceUnit}</td>
                        </tr>
                        <tr>
                            <td>Time</td>
                            <td>{totalTime}</td>
                        </tr>
                        <tr>
                            <td>Elevation</td>
                            <td>{totalElevation} {elevateUnit}</td>
                        </tr>
                        <tr>
                            <td>The biggest</td>
                            <td>{maxDistance} {distanceUnit}</td>
                        </tr>
                        <tr>
                            <td>The longest</td>
                            <td>{maxTime}</td>
                        </tr>
                    </tbody>
                </Table>
            );
        }
        else {
            return <div>Loading...</div>
        }
    }
}