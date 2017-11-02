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
            <Col xs={3} className={`confirmation-header ${window.location.pathname=="/" || window.location.pathname=="/agent" || window.location.pathname=="/agent/" ? "active" : ""}`} style={{paddingRight: "0px"}}>
              <Row>
                <Col xs={12} className="gather-information">
                  Gather information
                </Col>
              </Row>
            </Col>
            <Col xs={6} sm={7} style={{paddingLeft: "24px"}} className={`confirmation-header ${window.location.pathname.indexOf("products") >-1 ? "active" : ""}`}>
              <Row className="product-selection-container">
                <Col xs={8} className='product-selection'>
                  Production selection
                </Col>
              </Row>
            </Col>
            <Col style={{}} xs={3} sm={2} className={`confirmation-header next-steps ${window.location.pathname=="/next-steps" ? "active" : ""}`}>
              <span>
                Next steps
              </span>
            </Col>
          </Row>
      </Navbar>
    );
  }
}
