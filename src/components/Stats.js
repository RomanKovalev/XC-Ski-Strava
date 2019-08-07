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
        this.computeStats(data.models)
      })
      .catch((err) => { console.log('Error with nordski request', err) })

  }


  componentDidMount() {
    this.getActivities()
  }

  convertTime(RawTotalTime) {
    const h = Math.floor(RawTotalTime / 3600)
    const m = Math.floor((RawTotalTime - 3600 * h) / 60)

    return `${h} h ${m} m`
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

      if (element.name.includes("Skate") || element.name.includes("skate")) {
        let currentSkateDistance = parseFloat(element.distance)
        totalSkateDistance = totalSkateDistance + currentSkateDistance
        totalSkateTime = totalSkateTime + element.moving_time_raw
        totalSkateElevation = totalSkateElevation + element.elevation_gain_raw
        if (maxSkateDistance < currentSkateDistance) {
          maxSkateDistance = currentSkateDistance
        }
        if (maxSkateTime < element.moving_time_raw) {
          maxSkateTime = element.moving_time_raw
        }
      }

      if (element.name.includes("Classic") || element.name.includes("classic")) {
        let currentClassicDistance = parseFloat(element.distance)
        totalClassicDistance = totalClassicDistance + currentClassicDistance
        totalClassicTime = totalClassicTime + element.moving_time_raw
        totalClassicElevation = totalClassicElevation + element.elevation_gain_raw
        if (maxClassicDistance < currentClassicDistance) {
          maxClassicDistance = currentClassicDistance
        }
        if (maxClassicTime < element.moving_time_raw) {
          maxClassicTime = element.moving_time_raw
        }
      }

      let currentTotalDistance = parseFloat(element.distance)

      totalDistance = totalDistance + currentTotalDistance
      totalTime = totalTime + element.moving_time_raw
      totalElevation = totalElevation + element.elevation_gain_raw
      if (maxDistance < currentTotalDistance) {
        maxDistance = currentTotalDistance
      }
      if (maxTime < element.moving_time_raw) {
        maxTime = element.moving_time_raw
      }
    });

    const distanceUnit = trainings[0].short_unit
    const elevateUnit = trainings[0].elevation_unit

    totalTime = this.convertTime(totalTime)
    maxTime = this.convertTime(maxTime)
    totalSkateTime = this.convertTime(totalSkateTime)
    maxSkateTime = this.convertTime(maxSkateTime)
    totalClassicTime = this.convertTime(totalClassicTime)
    maxClassicTime = this.convertTime(maxClassicTime)        

    this.setState({
      totalStats: {
        totalDistance: totalDistance.toFixed(2),
        distanceUnit: distanceUnit,
        totalTime: totalTime,
        totalElevation: totalElevation.toFixed(2),
        elevateUnit: elevateUnit,
        maxDistance: maxDistance,
        maxTime: maxTime
      },
      classicStats: {
        totalDistance: totalClassicDistance.toFixed(2),
        distanceUnit: distanceUnit,
        totalTime: totalClassicTime,
        totalElevation: totalClassicElevation.toFixed(2),
        elevateUnit: elevateUnit,
        maxDistance: maxClassicDistance,
        maxTime: maxClassicTime
      },
      skateStats: {
        totalDistance: totalSkateDistance.toFixed(2),
        distanceUnit: distanceUnit,
        totalTime: totalSkateTime,
        totalElevation: totalSkateElevation.toFixed(2),
        elevateUnit: elevateUnit,
        maxDistance: maxSkateDistance,
        maxTime: maxSkateTime
      }
    })
  }

  render() {

    return (
      <Tabs defaultActiveKey="total" id="uncontrolled-tab-example" className="main_tabs_header">
        <Tab eventKey="skate" title="Skate">
          <StatTableTab stats={this.state.classicStats} />
        </Tab>
        <Tab eventKey="classic" title="Classic">
          <StatTableTab stats={this.state.skateStats} />
        </Tab>
        <Tab eventKey="total" title="Total">
          <StatTableTab stats={this.state.totalStats} />
        </Tab>
      </Tabs>
    );
  }
}

