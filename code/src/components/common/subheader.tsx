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
            <Col className={`confirmation-header gather-information-container ${window.location.pathname=="/" || window.location.pathname=="/agent" || window.location.pathname=="/agent/" ? "active" : ""}`} style={{paddingRight: "0px"}}>
              <Row>
                <Col className="gather-information">
                  Gather information
                </Col>
              </Row>
            </Col>
            <Col className={`confirmation-header product-selection-text-container ${window.location.pathname.indexOf("products") >-1 ? "active" : ""}`}>
              <div className="product-selection-container">
                <div className='product-selection'>
                  Production selection
                </div>
              </div>
            </Col>
            <Col style={{}} className={`confirmation-header next-steps ${window.location.pathname=="/next-steps" ? "active" : ""}`}>
              <span>
                Next steps
              </span>
            </Col>
          </Row>
      </Navbar>
    );
  }
}
