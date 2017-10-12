import * as React from 'react';
import {Link} from 'react-router';
import { Navbar } from "react-bootstrap"
import TelLinkComponent from "./TelLinkComponent"

interface Props extends React.Props<personsInfo> {
}

export default class personsInfo extends React.Component<Props, {}> {
  public render() {
    return (
      <div style={{backgroundColor: "rgb(247, 247, 247)"}}>
        <Row>
          <Col sm={8} className="c-select-persons-container">
            <Row>
              <Col sm={11} className="confirmation-msg-container">
                this.props.name 
              </Col>
              <Col sm={1} className="confirmation-msg-container" onClick={()=> this.props.editPerson(this.props.index)}>
                Edit
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col sm={4} className="c-select-persons-container">
            <Row>
              <Col sm={12}>
                State: {this.props.state}
              </Col>
              <Col sm={12}>
                Gender: {this.props.s_gender}
              </Col>
            </Row>
          </Col>
          <Col sm={4} className="c-select-persons-container">
            <Row>
              <Col sm={12}>
                D.O.B: this.props.s_birthDate.format("YYYY-MM-DD")
              </Col>
              <Col sm={12}>
                Health: {this.props.health}
              </Col>
            </Row>
          </Col>
          <Col sm={4} className="c-select-persons-container">
            <Row>
              <Col sm={12}>
                Tobacco Use: {this.props.smoke}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}


