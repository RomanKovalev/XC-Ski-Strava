import React, { Component } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import { DBConfig } from './indexedsb/dbconfig';
import { initDB, IndexedDB, useIndexedDB } from 'react-indexed-db';




class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    // this.db = useIndexedDB('activities');
  }
  componentDidMount() {
    initDB(DBConfig);
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

  addRecordsToDB(activities) {
    const { add } = useIndexedDB('activities');
    activities.forEach((activity, i, activities) => {
      add(activity)
        .then(event => { console.log('Inserted: ', event) },
          error => { console.log('Exists already:', error) }
        );
    });
  }

  getLastSyncTime() {
    const { getAll } = useIndexedDB('activities');
    const data = getAll()
      .then(all => {
        console.log(all.length)
        all.forEach((element, index, array) => {
          if (element.sync_time) {
            const sync_time = element.sync_time
            delete array[index];
            console.log('Sync time: ', sync_time)
          } else {
            console.log('Syn Time not exist: ', element.sync_time)
          }
        });
        const lastActivityTime = all.reduce((prev, current) => prev.start_time > current.start_time ? prev : current, {});
        console.log("lastActivityTime:", lastActivityTime)

        all.forEach(element => {
          if (element.start_time > lastActivityTime) {
            console.log('Found new activity: ', element.start_time)
          } else {
            console.log('Activity is old')
          }
        })
      });
  }

  handleClick() {
    const sync_time = this.getLastSyncTime()
    console.log('SYNCTIME!!!!: ', sync_time)


    const url = 'https://www.strava.com/athlete/training_activities?activity_type=NordicSki&page='
    this.makerequest(url).then(response => {
      this.addRecordsToDB(response.models)
      const pages = Math.ceil(response.total / response.perPage)
      for (let i = pages; i > 1; i--) {
        this.makerequest(url, i).then(response => this.addRecordsToDB(response.models))
      }
    })
    // this.addRecordsToDB([{ 'sync_time': new Date().toISOString(), workout_type: 'sync' }])
    
    // todo Resolve issue with creating 2 stores
    // const { add:add_utils } = useIndexedDB('utils');
    // const now = new Date().toISOString()
    // add_utils({sync_time: now})
    // .then(event => {console.log('Inserted: ', event)},
    //   error => {console.log('Exists already:', error)}
    // );

  }

  render() {
    return (
      <div className="App">
        <h2>Welcome to SKI</h2>
        <p className="card">
          <Button onClick={this.handleClick}>Warning</Button>
        </p>
      </div>
    );
  }
}

export default App;


