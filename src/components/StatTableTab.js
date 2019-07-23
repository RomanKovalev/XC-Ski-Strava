import React, { Component } from 'react';
import { Table } from 'react-bootstrap'

class StatTableTab extends Component {
  render() {
    return (
        <Table borderless size="sm">
              <tbody>
                <tr></tr>
                <tr>
                  <td>Distance</td>
                  <td>100 km</td>
                </tr>
                <tr>
                  <td>Time</td>
                  <td>6 h 54m</td>
                </tr>
                <tr>
                  <td>Elevation</td>
                  <td>450 m</td>
                </tr>
                <tr>
                  <td>The biggest</td>
                  <td>120 km</td>
                </tr>            
                <tr>
                  <td>The longest</td>
                  <td>5 hours</td>
                </tr>                    
              </tbody>
            </Table>
    );
  }
}

export default StatTableTab;
