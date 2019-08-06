import React, { Component } from 'react';
import { Tab, Tabs, Table } from 'react-bootstrap'
import StatTableTab from "./StatTableTab";

import DataService from "../services/DataService";


export default class Stats extends Component {

  dataService = new DataService()

  state = {
    totalStats: {}
  }

  getActivities() {
    this.dataService
      .getNordSkiActivities()
      .then((data) => {
        // console.log(data.models)
        this.computeStats(data.models)
      })
      .catch((err) => { console.log('Error with nordski request', err) })

  }


  componentDidMount() {
    this.getActivities()
  }

  convertTime(RawTotalTime) {
    return RawTotalTime
  }

  computeStats(trainings) {

    let totalDistance = 0
    let totalTime = 0
    let totalElevation = 0
    let maxDistance = 0
    let maxTime = 0

    let totalSkateDistance = 0
    let totalSkateTime = 0
    let totalSkateElevation = 0
    let maxSkateDistance = 0
    let maxSkateTime = 0

    let totalClassicDistance = 0
    let totalClassicTime = 0
    let totalClassicElevation = 0
    let maxClassicDistance = 0
    let maxClassicTime = 0






    trainings.forEach(element => {
      console.log(element)



      let currentDistance = parseFloat(element.distance)

      totalDistance = totalDistance + currentDistance
      totalTime = totalTime + element.moving_time_raw
      totalElevation = totalElevation + element.elevation_gain_raw
      if (maxDistance < currentDistance) {
        maxDistance = currentDistance
      }
      if (maxTime < element.moving_time_raw) {
        maxTime = element.moving_time_raw
      }
    });
    console.log(maxTime)

    const distanceUnit = trainings[0].short_unit
    const elevateUnit = trainings[0].elevation_unit

    totalTime = this.convertTime(totalTime)
    this.setState({
      totalStats: {
        totalDistance: totalDistance.toFixed(2),
        distanceUnit: distanceUnit,
        totalTime: totalTime,
        totalElevation: totalElevation.toFixed(2),
        elevateUnit: elevateUnit,
        maxDistance: maxDistance,
        maxTime: maxTime
      }
    })
    console.log('totalStats:', this.state.totalStats)
  }

  render() {

    return (
      <Tabs defaultActiveKey="total" id="uncontrolled-tab-example" className="main_tabs_header">
        <Tab eventKey="skate" title="Skate">
          <StatTableTab stats={this.state.totalStats} />
        </Tab>
        <Tab eventKey="classic" title="Classic">
          <StatTableTab stats={this.state.totalStats} />
        </Tab>
        <Tab eventKey="total" title="Total">
          <StatTableTab stats={this.state.totalStats} />
        </Tab>
      </Tabs>
    );
  }
}

