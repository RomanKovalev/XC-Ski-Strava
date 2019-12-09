import React, { Component } from 'react';
import './App.css';
import { Button, Tab, Tabs, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import StatTableTab from "./components/stattabletab"


class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
    this.state = {
      activities: []
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

  handleClick() {
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
          })
      })
      .then(() => {
        localStorage.setItem('lastSyncTime', JSON.stringify(new Date().toISOString()))
      })
      .catch(error => console.log(error))
  }

  handleClick1() {
    console.log('ssss')
    console.log(this.state.activities)
  }
  render() {
    return (
      <div className="App">
        <h2>Welcome to SKI</h2>

        <div>
          <Tabs defaultActiveKey="total" id="uncontrolled-tab-example" className="main_tabs_header">
            <Tab eventKey="total" title="Total">
              <StatTableTab stats={['this.state.totalStats']} />
            </Tab>
            <Tab eventKey="skate" title="Skate">
              <StatTableTab stats={['this.state.classicStats']} />
            </Tab>
            <Tab eventKey="classic" title="Classic">
              <StatTableTab stats={['this.state.skateStats']} />
            </Tab>
          </Tabs>
        </div>

        {/* <div>
          {
            this.state.activities.map((item, i) => {
              return (
                <div key={i}>
                  {item.id}
                </div>
              )
            })
          }
        </div>
        <p className="card">
          <Button onClick={this.handleClick}>Warning</Button>
        </p> */}
      </div>
    );
  }
}

export default App;


