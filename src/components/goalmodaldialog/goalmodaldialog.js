import React, { Component } from 'react';
// import { Modal, Button } from 'react-bootstrap'


class GoalModalsDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  handleClose = () => {
    alert('onhide')
    this.state.show = false
  }

  handleShow = () => {
    alert('onshow')
    this.state.show = true
  }

  render() {
    // const show = false;
    // const setShow = false;
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    return (
    );
  }
}

export default GoalModalsDialog;