import React, { Component } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap'

class GoalForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
          goaltype: null
    
        }
        this.handleChange = this.handleChange.bind(this);
    
      }
    
      handleChange(evt) {
        this.setState({ goaltype: evt.target.value });
      }


    render() {
        return (
            <div>
            <div style={{ textAlign: 'center', fontWeight: 'bold', margin: '5px 0'}}>Set your {this.props.type} goal:</div>

                <div>Distance Time Elevation</div>
                <InputGroup size="sm" className="input_wrapper">

                    <InputGroup.Radio checked={this.state.goaltype} value="km" onChange={this.handleChange} name="goaltype" aria-label="" />
                    <InputGroup.Radio checked={this.state.goaltype} value="hr" onChange={this.handleChange} name="goaltype" aria-label="" />
                    <InputGroup.Radio checked={this.state.goaltype} value="m" onChange={this.handleChange} name="goaltype" aria-label="" />
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" style={{ maxWidth: '60px' }} />
                    <span style={{ alignSelf: 'center', marginLeft: '5px', minWidth: '25px' }}>{this.state.goaltype}</span>
                </InputGroup>
                <div class="btn_wrapper">
                    <Button variant="outline-success" style={{ marginRight: '5px' }} onClick={this.props.onSave}>Save</Button>
                    <Button variant="outline-danger">Close</Button>
                </div>
            </div>
        );
    }
}

export default GoalForm;
