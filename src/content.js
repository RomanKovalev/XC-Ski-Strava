/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { Container, Row, Col } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

import "./content.css";

import Header from "./components/Header";
import Stats from "./components/Stats";
import Goals from "./components/Goals";
import Events from "./components/Events";
import Footer from "./components/Footer";

class Main extends React.Component {
    render() {
        return (
            <Frame height="600" frameBorder="0" width="auto" head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}>
                <FrameContextConsumer>
                    {
                        // Callback is invoked with iframe's window and document instances
                        ({ document, window }) => {
                            // Render Children
                            return (
                                <div class="xc_ski_extension" style={{ marginTop: '10px'}}>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <Header />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xl={12} md={12}>

                                                <Stats />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Goals />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Events />
                                        </Row>
                                        <Row>
                                            <Footer />
                                        </Row>
                                    </Container>
                                </div>
                            )
                        }
                    }
                </FrameContextConsumer>

            </Frame >
        )
    }
}

const app = document.createElement('div');
const parent = document.getElementsByClassName('col-lg-3 col-md-4')[1]
const sibling = document.getElementById('js-dashboard-athlete-goals')
parent.insertBefore(app, sibling)

ReactDOM.render(<Main />, app);
