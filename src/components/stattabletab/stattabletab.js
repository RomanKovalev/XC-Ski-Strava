import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'

import './stattabletab.css';

export default class StatTableTab extends Component {
    render() {

        if (this.props.stats) {
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
                            <td>
                                <Button bsSize="xsmall" bsStyle="info">This season</Button>
                                <FontAwesomeIcon icon={faCogs} className="settings-icon"/>
                            </td>
                            <td>
                                <Button bsSize="xsmall">All time</Button>
                            </td>
                        </tr>
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