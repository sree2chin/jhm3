import * as React from 'react';
import {Link} from 'react-router';
import {Button, Row, Col, Navbar} from "react-bootstrap";

interface Props extends React.Props<breadCrumbs> {
}

export default class breadCrumbs extends React.Component<Props, {}> {
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
          </Row>
      </Navbar>
    );
  }
}
