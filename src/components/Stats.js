import React, { Component } from 'react';
import { Tab, Tabs, Table } from 'react-bootstrap'

import StatTableTab from "./StatTableTab";

class Stats extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="skate" id="uncontrolled-tab-example" className="main_tabs_header">
        <Tab eventKey="skate" title="Skate">
          <StatTableTab />
        </Tab>
        <Tab eventKey="classic" title="Classic">
          <StatTableTab />
        </Tab>
        <Tab eventKey="total" title="Total">
          <StatTableTab />
        </Tab>
      </Tabs>
    );
  }
}

export default Stats;
