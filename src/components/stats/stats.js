import React, { Component } from 'react';
import { Tab, Tabs, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'
import StatTableTab from "../stattabletab"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import './stats.css';

class Stats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activities: [],
            totalStats: {},
            classicStats: {},
            skateStats: {},
            startDate: new Date(),
            seasonStartDate: null,
            thisSeason: false
        }

        this.handleSeasonClick = this.handleSeasonClick.bind(this);
        this.handleAllTimeClick = this.handleAllTimeClick.bind(this);
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
        const seasonStartDate = localStorage.getItem('seasonStartDate')
        if (seasonStartDate != null) {
            this.setState({ seasonStartDate: seasonStartDate })
        }


        const results = this.makerequest(url) // request 1st page
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
        const seasonTotalStats = {
            totalDistance: 0,
            totalTime: 0,
            totalElevation: 0,
            maxDistance: 0,
            maxTime: 0
        }
        const seasonClassicStats = {
            totalDistance: 0,
            totalTime: 0,
            totalElevation: 0,
            maxDistance: 0,
            maxTime: 0
        }
        const seasonSkateStats = {
            totalDistance: 0,
            totalTime: 0,
            totalElevation: 0,
            maxDistance: 0,
            maxTime: 0
        }
        const seasonStartDate = localStorage.getItem('seasonStartDate')
        skiActivities.forEach(element => {
            if (element.start_time > seasonStartDate) {
                seasonTotalStats.totalDistance = seasonTotalStats.totalDistance + parseFloat(element.distance)
                seasonTotalStats.totalTime = seasonTotalStats.totalTime + element.moving_time_raw
                seasonTotalStats.totalElevation = seasonTotalStats.totalElevation + element.elevation_gain_raw
                if (seasonTotalStats.maxDistance < parseFloat(element.distance)) {
                    seasonTotalStats.maxDistance = parseFloat(element.distance)
                }
                if (totalStats.maxTime < element.moving_time_raw) {
                    totalStats.maxTime = element.moving_time_raw
                }
            }
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
                case (element.name.includes("Classic") || element.name.includes("classic")):
                    if (element.start_time > seasonStartDate) {
                        seasonClassicStats.totalDistance = seasonClassicStats.totalDistance + parseFloat(element.distance)
                        seasonClassicStats.totalTime = seasonClassicStats.totalTime + element.moving_time_raw
                        seasonClassicStats.totalElevation = seasonClassicStats.totalElevation + element.elevation_gain_raw
                        if (seasonClassicStats.maxDistance < parseFloat(element.distance)) {
                            seasonClassicStats.maxDistance = parseFloat(element.distance)
                        }
                        if (seasonClassicStats.maxTime < element.moving_time_raw) {
                            seasonClassicStats.maxTime = element.moving_time_raw
                        }
                    }
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
                case (element.name.includes("Skate") || element.name.includes("skate")):
                    if (element.start_time > seasonStartDate) {
                        seasonSkateStats.totalDistance = seasonSkateStats.totalDistance + parseFloat(element.distance)
                        seasonSkateStats.totalTime = seasonSkateStats.totalTime + element.moving_time_raw
                        seasonSkateStats.totalElevation = seasonSkateStats.totalElevation + element.elevation_gain_raw
                        if (seasonSkateStats.maxDistance < parseFloat(element.distance)) {
                            seasonSkateStats.maxDistance = parseFloat(element.distance)
                        }
                        if (seasonSkateStats.maxTime < element.moving_time_raw) {
                            seasonSkateStats.maxTime = element.moving_time_raw
                        }
                    }
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

        seasonClassicStats.totalDistance = seasonClassicStats.totalDistance.toFixed(2)
        seasonClassicStats.totalElevation = seasonClassicStats.totalElevation.toFixed(2)
        seasonSkateStats.totalDistance = seasonSkateStats.totalDistance.toFixed(2)
        seasonSkateStats.totalElevation = seasonSkateStats.totalElevation.toFixed(2)
        seasonTotalStats.totalDistance = seasonTotalStats.totalDistance.toFixed(2)
        seasonTotalStats.totalElevation = seasonTotalStats.totalElevation.toFixed(2)

        classicStats.distanceUnit = skiActivities[0].short_unit
        skateStats.distanceUnit = skiActivities[0].short_unit
        totalStats.distanceUnit = skiActivities[0].short_unit
        seasonClassicStats.distanceUnit = skiActivities[0].short_unit
        seasonSkateStats.distanceUnit = skiActivities[0].short_unit
        seasonTotalStats.distanceUnit = skiActivities[0].short_unit

        classicStats.elevateUnit = skiActivities[0].elevation_unit
        skateStats.elevateUnit = skiActivities[0].elevation_unit
        totalStats.elevateUnit = skiActivities[0].elevation_unit

        seasonClassicStats.elevateUnit = skiActivities[0].elevation_unit
        seasonSkateStats.elevateUnit = skiActivities[0].elevation_unit
        seasonTotalStats.elevateUnit = skiActivities[0].elevation_unit

        classicStats.totalTime = this.convertTime(classicStats.totalTime)
        classicStats.maxTime = this.convertTime(classicStats.maxTime)
        skateStats.totalTime = this.convertTime(skateStats.totalTime)
        skateStats.maxTime = this.convertTime(skateStats.maxTime)
        totalStats.totalTime = this.convertTime(totalStats.totalTime)
        totalStats.maxTime = this.convertTime(totalStats.maxTime)

        seasonClassicStats.totalTime = this.convertTime(seasonClassicStats.totalTime)
        seasonClassicStats.maxTime = this.convertTime(seasonClassicStats.maxTime)
        seasonSkateStats.totalTime = this.convertTime(seasonSkateStats.totalTime)
        seasonSkateStats.maxTime = this.convertTime(seasonSkateStats.maxTime)
        seasonTotalStats.totalTime = this.convertTime(seasonTotalStats.totalTime)
        seasonTotalStats.maxTime = this.convertTime(seasonTotalStats.maxTime)


        this.setState({
            totalStats: totalStats,
            classicStats: classicStats,
            skateStats: skateStats,
            seasonTotalStats: seasonTotalStats,
            seasonClassicStats: seasonClassicStats,
            seasonSkateStats: seasonSkateStats

        })
    }

    convertTime(RawTotalTime) {
        const h = Math.floor(RawTotalTime / 3600)
        const m = Math.floor((RawTotalTime - 3600 * h) / 60)
        return `${h} h ${m} m`
    }

    setStartDate(date) {
        date = new Date(date.setUTCHours(0, 0, 0, 0)).toISOString()
        // const ldate = JSON.parse(localStorage.getItem('lastSyncTime'))
        this.setState({ seasonStartDate: date })
        localStorage.setItem('seasonStartDate', date)
        const activities = localStorage.getItem('skiActivities')
        this.computeStats(JSON.parse(activities))
    }

    handleSeasonClick() {
        this.setState({ thisSeason: true })
    }

    handleAllTimeClick() {
        this.setState({ thisSeason: false })
    }

    render() {
        return (
            <div>
                {this.state.seasonStartDate !== null ?
                    <div className='info-message'>Your season started {new Intl.DateTimeFormat("en-AU", { year: "numeric", month: "short", day: "numeric" }).format(new Date(this.state.seasonStartDate)).replace(/\s/g, '-')}</div>
                    :
                    <div className="info-message">Click fogs icon below to set season start date</div>
                }
                <Tabs defaultActiveKey="total" id="uncontrolled-tab-example" className="main_tabs_header">
                    <div className="controllers-wrapper">
                        <div>
                            <Button
                                bsSize="xsmall"
                                bsStyle={`${this.state.thisSeason ? "secondary" : "light"}`}
                                onClick={this.handleSeasonClick}
                                disabled={!this.state.seasonStartDate}
                            >
                                This season
                            </Button>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={date => this.setStartDate(date)}
                                customInput={<FontAwesomeIcon className="setup-button" icon={faCogs} className="settings-icon" />}
                                isodateFormat="yyyy-MM-d"
                            />
                        </div>
                        <Button
                            bsSize="xsmall"
                            bsStyle={`${this.state.thisSeason ? "light" : "secondary"}`}
                            onClick={this.handleAllTimeClick}>
                            All time
                        </Button>
                    </div>
                    <Tab eventKey="total" title="Total">
                        <StatTableTab stats={!this.state.thisSeason ? this.state.totalStats : this.state.seasonTotalStats} />
                    </Tab>
                    <Tab eventKey="skate" title="Skate">
                        <StatTableTab stats={!this.state.thisSeason ? this.state.skateStats : this.state.seasonSkateStats} />
                    </Tab>
                    <Tab eventKey="classic" title="Classic">
                        <StatTableTab stats={!this.state.thisSeason ? this.state.classicStats : this.state.seasonClassicStats} />
                    </Tab>
                </Tabs>
            </div >
        );
    }
}

export default Stats;