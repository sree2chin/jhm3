import * as React from 'react';
import {Link} from 'react-router';
import { Navbar } from "react-bootstrap"
import {Button, Row, Col} from "react-bootstrap";

interface Props extends React.Props<Header> {
  location: any
}

export default class Header extends React.Component<Props, {}> {
  public render() {
    return (
      <Navbar className={`cf-nav-main-header subheader`}>
          <Row>
            <Col sm={4} className={`confirmation-header ${window.location.pathname=="/" || window.location.pathname=="/agent" ? "active" : ""}`}>
              <span>
                Gather information
              </span>
              <div className="hr-container" style={{marginLeft: "10%"}}>
                <hr/>
              </div>
            </Col>
            <Col sm={4} className={`confirmation-header ${window.location.pathname.indexOf("products") >-1 ? "active" : ""}`}>
              <span>
                Production selection
              </span>
              <div className="hr-container">
                <hr/>
              </div>
            </Col>
            <Col sm={4} className={`confirmation-header ${window.location.pathname=="/next-steps" ? "active" : ""}`}>
              <span>
                Next steps
              </span>
            </Col>
          </Row>
      </Navbar>
    );
  }
}
