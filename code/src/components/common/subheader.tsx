import * as React from 'react';
import {Link} from 'react-router';
import { Navbar } from "react-bootstrap"
import {Button, Row, Col} from "react-bootstrap";

interface Props extends React.Props<Header> {
}

export default class Header extends React.Component<Props, {}> {
  public render() {
    return (
      <Navbar className="cf-nav-main-header subheader">
        <Navbar.Header>
          <div>
            <Navbar.Brand>  
              <img src={this.props.logoImgSrc} />
            </Navbar.Brand>
          </div>
        </Navbar.Header>
        <Navbar.Text pullRight>
          <Row>
            <Col sm={3} className="confirmation-header">
              Gather information
              <hr/>
            </Col>
            <Col sm={3} className="confirmation-header">
              Production selection
              <hr/>
            </Col>
            <Col sm={3} className="confirmation-header">
              Next steps
            </Col>
          </Row>
        </Navbar.Text>
      </Navbar>
    );
  }
}
