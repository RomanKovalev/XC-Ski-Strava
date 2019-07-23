import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap'
import GoalForm from './GoalForm'
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import "../content.css";



class Goals extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showWeekGoalDialog: false,
      showYearGoalDialog: false,
      now_year: 75,
      now_week: 25,
      goal_year: 400,
      goal_week: 75,

    }
    this.handleWeekGoals = this.handleWeekGoals.bind(this);
    this.handleYearGoals = this.handleYearGoals.bind(this);

  }

  handleWeekGoals() {
    const { showWeekGoalDialog } = this.state;
    this.setState({
      showWeekGoalDialog: !showWeekGoalDialog,
    });
  }

  handleYearGoals() {
    const { showYearGoalDialog } = this.state;
    this.setState({
      showYearGoalDialog: !showYearGoalDialog,
    });
  }

  render() {
    return (
      <div>
        <div className="goals_header">Week goal<sub onClick={this.handleWeekGoals}>edit</sub></div><span></span>
        <ProgressBar now={this.state.now_week} label={`${this.state.now_week}%`} />
        <div class="goals_wrapper">
          <div style={{ marginLeft: this.state.now_week * 2 + 'px' }}>{this.state.now_week} km</div>
          <div>{this.state.goal_week} km</div>
        </div>
        {this.state.showWeekGoalDialog && (
          <div>
            <GoalForm type="week" onSave={() => console.log('onSave') }></GoalForm>
          </div>

        )}
        <div className="goals_header">Year goal<sub onClick={this.handleYearGoals}>edit</sub></div><span></span>
        <ProgressBar now={this.state.now_year} label={`${this.state.now_year}%`} />
        <div class="goals_wrapper">
          <div style={{ marginLeft: this.state.now_year * 2 + 'px' }}>{this.state.now_year} km</div>
          <div>{this.state.goal_year} km</div>
        </div>
        {this.state.showYearGoalDialog && (
          <div>
            <GoalForm type="year"></GoalForm>
          </div>
        )}
      </div>
    );
  }
}

export default Goals;
