import * as React from 'react';
import {Link} from 'react-router';
import { Navbar } from "react-bootstrap"
import {Button, Row, Col} from "react-bootstrap";

interface Props extends React.Props<cfooter> {
  location: any
}

export default class cfooter extends React.Component<Props, {}> {
  public render() {
    return (
      <Navbar className={`cf-nav-main-header subheader`}>
          <Row>
            <Col xs={12} sm={4} className={`confirmation-header ${window.location.pathname=="/" || window.location.pathname=="/agent" || window.location.pathname=="/agent/" ? "active" : ""}`}>
              <Row>
                <Col sm={8}>
                  Gather information
                </Col>
                <Col sm={4}>
                  <div className="hr-container">
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={12} sm={4} className={`confirmation-header ${window.location.pathname.indexOf("products") >-1 ? "active" : ""}`}>
              <Row>
                <Col sm={8}>
                  Production selection
                </Col>
                <Col sm={4}>
                  <div className="hr-container">
                  </div>
                </Col>
              </Row>
            </Col>
            <Col styles={{top: "-16px"}} xs={12} sm={4} className={`confirmation-header ${window.location.pathname=="/next-steps" ? "active" : ""}`}>
              <span>
                Next steps
              </span>
            </Col>
          </Row>
      </Navbar>
    );
  }
}
