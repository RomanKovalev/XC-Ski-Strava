import React, { Component } from 'react';
import { Tab, Tabs, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'
import StatTableTab from "../stattabletab"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import './stats.css';

export default class Stats extends Component {
    constructor() {
        super()
        this.state = {
            activities: [],
            totalStats: {},
            classicStats: {},
            skateStats: {},
            startDate: new Date(),
            seasonStartDate: ''
        }
    }

    makerequest(url, page = 1) {
        const results = fetch(
            url + page, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'accept': 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
                'x-requested-with': 'XMLHttpRequest'
            }
        }
        )
            .then((res) => res.json())
            .then((data) => data)
            .catch(error => console.log(error))
        return results
    }
    componentDidMount() {
        const lastSyncTime = JSON.parse(localStorage.getItem('lastSyncTime') || '[]')
        const url = 'https://www.strava.com/athlete/training_activities?activity_type=NordicSki&page='
        const results = this.makerequest(url)
            .then(response => {
                const skiActivities = JSON.parse(localStorage.getItem('skiActivities') || '[]')
                const pages = Math.ceil(response.total / response.perPage)
                response.models.forEach(element => {
                    if (element.start_time > lastSyncTime) {
                        skiActivities.push(element)
                    }
                })
                return { skiActivities, pages }
            })
            .then((data) => {
                let promises = []
                for (let page = 2; page <= data.pages; page++) {
                    promises.push(this.makerequest(url, page))
                }
                const resultPromise = Promise.all(promises)
                    .then((results) => {
                        let resultArray = []
                        const skiActivities = data.skiActivities
                        results.forEach(element => {
                            resultArray = resultArray.concat(element.models)
                        })
                        resultArray.forEach(element => {
                            if (element.start_time > lastSyncTime) {
                                data.skiActivities.push(element)
                            }
                        })
                        localStorage.setItem('skiActivities', JSON.stringify(skiActivities))
                        this.setState({ activities: skiActivities })
                        this.computeStats(skiActivities)
                    })
            })
            .then(() => {
                localStorage.setItem('lastSyncTime', JSON.stringify(new Date().toISOString()))
            })
            .catch(error => console.log(error))
    }

    computeStats(skiActivities) {
        const totalStats = {
            totalDistance: 0,
            totalTime: 0,
            totalElevation: 0,
            maxDistance: 0,
            maxTime: 0
        }
        const classicStats = {
            totalDistance: 0,
            totalTime: 0,
            totalElevation: 0,
            maxDistance: 0,
            maxTime: 0
        }
        const skateStats = {
            totalDistance: 0,
            totalTime: 0,
            totalElevation: 0,
            maxDistance: 0,
            maxTime: 0
        }
        skiActivities.forEach(element => {
            totalStats.totalDistance = totalStats.totalDistance + parseFloat(element.distance)
            totalStats.totalTime = totalStats.totalTime + element.moving_time_raw
            totalStats.totalElevation = totalStats.totalElevation + element.elevation_gain_raw
            if (totalStats.maxDistance < parseFloat(element.distance)) {
                totalStats.maxDistance = parseFloat(element.distance)
            }
            if (totalStats.maxTime < element.moving_time_raw) {
                totalStats.maxTime = element.moving_time_raw
            }
            switch (true) {
                case (element.name.includes("Skate") || element.name.includes("skate")):
                    console.log("Skate");
                    classicStats.totalDistance = classicStats.totalDistance + parseFloat(element.distance)
                    classicStats.totalTime = classicStats.totalTime + element.moving_time_raw
                    classicStats.totalElevation = classicStats.totalElevation + element.elevation_gain_raw
                    if (classicStats.maxDistance < parseFloat(element.distance)) {
                        classicStats.maxDistance = parseFloat(element.distance)
                    }
                    if (classicStats.maxTime < element.moving_time_raw) {
                        classicStats.maxTime = element.moving_time_raw
                    }
                    break;
                case (element.name.includes("Classic") || element.name.includes("classic")):
                    console.log("Classic");
                    skateStats.totalDistance = skateStats.totalDistance + parseFloat(element.distance)
                    skateStats.totalTime = skateStats.totalTime + element.moving_time_raw
                    skateStats.totalElevation = skateStats.totalElevation + element.elevation_gain_raw
                    if (skateStats.maxDistance < parseFloat(element.distance)) {
                        skateStats.maxDistance = parseFloat(element.distance)
                    }
                    if (skateStats.maxTime < element.moving_time_raw) {
                        skateStats.maxTime = element.moving_time_raw
                    }
                    break;
            }
        })

        classicStats.totalDistance = classicStats.totalDistance.toFixed(2)
        classicStats.totalElevation = classicStats.totalElevation.toFixed(2)
        skateStats.totalDistance = skateStats.totalDistance.toFixed(2)
        skateStats.totalElevation = skateStats.totalElevation.toFixed(2)
        totalStats.totalDistance = totalStats.totalDistance.toFixed(2)
        totalStats.totalElevation = totalStats.totalElevation.toFixed(2)

        classicStats.distanceUnit = skiActivities[0].short_unit
        skateStats.distanceUnit = skiActivities[0].short_unit
        totalStats.distanceUnit = skiActivities[0].short_unit

        classicStats.elevateUnit = skiActivities[0].elevation_unit
        skateStats.elevateUnit = skiActivities[0].elevation_unit
        totalStats.elevateUnit = skiActivities[0].elevation_unit

        classicStats.totalTime = this.convertTime(classicStats.totalTime)
        classicStats.maxTime = this.convertTime(classicStats.maxTime)
        skateStats.totalTime = this.convertTime(skateStats.totalTime)
        skateStats.maxTime = this.convertTime(skateStats.maxTime)
        totalStats.totalTime = this.convertTime(totalStats.totalTime)
        totalStats.maxTime = this.convertTime(totalStats.maxTime)


        this.setState({
            totalStats: totalStats,
            classicStats: classicStats,
            skateStats: skateStats

        })
        console.log('============================')
        console.log(totalStats)
        console.log(classicStats)
        console.log(skateStats)
        console.log('============================')

    }

    convertTime(RawTotalTime) {
        const h = Math.floor(RawTotalTime / 3600)
        const m = Math.floor((RawTotalTime - 3600 * h) / 60)
        return `${h} h ${m} m`
    }
    setStartDate (date) {
        date = new Date(date.setUTCHours(0, 0, 0, 0)).toISOString()
        console.log(date)
        this.setState({seasonStartDate: date})
    }

    render() {
        
        return (
            <div>
                <div>===={this.state.seasonStartDate}====</div>
                <Tabs defaultActiveKey="total" id="uncontrolled-tab-example" className="main_tabs_header">
                    <div className="controllers-wrapper">
                        <div>
                            <Button bsSize="xsmall" bsStyle="info">This season</Button>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={date => this.setStartDate(date)}
                                customInput={<FontAwesomeIcon className="setup-button" icon={faCogs} className="settings-icon" />}
                                isodateFormat="yyyy-MM-d"
                            />
                        </div>
                        <Button bsSize="xsmall">All time</Button>
                    </div>
                    <Tab eventKey="total" title="Total">
                        <StatTableTab stats={this.state.totalStats} />
                    </Tab>
                    <Tab eventKey="skate" title="Skate">
                        <StatTableTab stats={this.state.skateStats} />
                    </Tab>
                    <Tab eventKey="classic" title="Classic">
                        <StatTableTab stats={this.state.classicStats} />
                    </Tab>
                </Tabs>
            </div >
        );
    }
}