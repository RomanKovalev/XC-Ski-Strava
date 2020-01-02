import React, { Component } from 'react';
import { Button, ButtonToolbar, Modal, Tab, Tabs, FormGroup, InputGroup, FormControl, Form, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'

import './faq.css';


function Faq(props) {
    const [modalFaqShow, setModalFaqShow] = React.useState(false);
    const [modalGoalsShow, setModalGoalsShow] = React.useState(false);

    return (
        <ButtonToolbar>
            <Button bsSize="xsmall" variant="primary" onClick={() => setModalFaqShow(true)}>
                FAQ
            </Button>
            <Button bsSize="xsmall" variant="primary" onClick={() => setModalGoalsShow(true)}>
                Set goals
            </Button>
            <FaqModal
                show={modalFaqShow}
                onHide={() => setModalFaqShow(false)}
            />
            <GoalsModal
                show={modalGoalsShow}
                onHide={() => setModalGoalsShow(false)}
            />
        </ButtonToolbar>
    );
}

export default Faq;

function GoalsModal(props) {

    const [unit, setUnit] = React.useState('');
    const [value, setValue] = React.useState('');
    
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Set your goals
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="Set year goal">
                        <Form inline>
                            <FormGroup controlId="formInlineName">
                                <FormControl 
                                    componentClass="select"
                                    placeholder="select"
                                    onClick={(e)=>setUnit(e.target.value)}
                                >
                                    <option value="">Choose goal type</option>
                                    <option value="kilometers">Distance</option>
                                    <option value="hours">Time</option>
                                    <option value="meters">Elevation</option>
                                </FormControl>
                            </FormGroup>
                            <FormGroup 
                                controlId="formInlineGoal" 
                                bsClass='form-group value-group'
                                validationState={(value < 0) ? "error" : ""}
                            >
                                <FormControl 
                                    type="number" 
                                    placeholder="" 
                                    bsClass='form-control value-control'
                                    onChange={(e)=>setValue(e.target.value)}
                                    />
                            </FormGroup>
                            <FormGroup controlId="formInlineGoal" bsClass='form-group value-group'>
                                <h5>{unit}</h5>
                            </FormGroup>
                        </Form>
                    </Tab>
                    <Tab eventKey={2} title="Set week goal">
                    <Form inline>
                            <FormGroup controlId="formInlineName">
                                <FormControl 
                                    componentClass="select"
                                    placeholder="select"
                                    onClick={(e)=>setUnit(e.target.value)}
                                >
                                    <option value="">Choose goal type</option>
                                    <option value="kilometers">Distance</option>
                                    <option value="hours">Time</option>
                                    <option value="meters">Elevation</option>
                                </FormControl>
                            </FormGroup>
                            <FormGroup 
                                controlId="formInlineGoal" 
                                bsClass='form-group value-group'
                                validationState={(value < 0) ? "error" : ""}
                            >
                                <FormControl 
                                    type="number" 
                                    placeholder="" 
                                    bsClass='form-control value-control'
                                    onChange={(e)=>setValue(e.target.value)}
                                    />
                            </FormGroup>
                            <FormGroup controlId="formInlineGoal" bsClass='form-group value-group'>
                                <h5>{unit}</h5>
                            </FormGroup>
                        </Form>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} disabled={(value < 0)}>Set goals</Button>
            </Modal.Footer>
        </Modal>
    );
}

function FaqModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Welcome to skis
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Personal data protection</h5>
                <p>"XC-Strava-ski" does not send any type of your personal and non-personal data to the 3rd party services.
                    The extension is open source and all code sources available.
                </p>
                <h5>To use feature "Classic" or "Skating" ski tab...</h5>
                <p>...the training must include the word "Skate" or "skate" to be counted as skating training.
                    The training must include the word "Classic" or "classic" to be counted as classic training.
                </p>
                <h5>To the "Total"" tab...</h5>
                <p>...counts all xc ski (nordic ski) trainings.
                </p>
                <h5>You can set up your star season date...</h5>
                <p>...by clicking on cogs icon between "This season" and "All time" buttons - <FontAwesomeIcon className="setup-button" icon={faCogs} className="settings-icon" />
                </p>
                <h5>I want to improve the extension...</h5>
                <p>...by adding season goals features, the use of events, make extension as independent service. And every feedback to rvk.sft@gmail.com increases my motivation to do this.
                    No matter good words or bug reports - it's important for me.
                </p>
                <h5>About roller ski extension...</h5>
                <p>...in the plans. Sorry, haven't done it yet.
                </p>
                <h5>Dear users,</h5>
                <p>I wish you a Merry Christmas and Happy New Year. Love skiing!
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}