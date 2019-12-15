import React, { Component } from 'react';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'


function Faq(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <ButtonToolbar>
            <Button bsSize="xsmall" variant="primary" onClick={() => setModalShow(true)}>
                FAQ
        </Button>

            <FaqModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </ButtonToolbar>
    );
}

export default Faq;



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