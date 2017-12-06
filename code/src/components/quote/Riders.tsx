import * as React from 'react';
import {Link} from 'react-router';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import Rider from "./Rider";
import {map} from "underscore";

interface Props extends React.Props<Plan> {
}

export default class Plan extends React.Component<Props, {}> {
  constructor(){
    super();
    this.selectRider.bind(this);
  },
  state={},
  selectRider() {
    this.setState({
      selectedRiderName: this.props.rider.Name
    });
    this.props.selectRider(this.props.rider, this.props.index);
  },
  public render() {  

    const riders = this.props.riders;
    const person = this.props.person;
    var self = this;
    return (
      <Row className="all-riders-info-container">
          <Col key={person.name} sm={12} className="c-one-person-container riders-outer-container">
            <Row>
              <Col sm={8} className="c-center rider-header-text">
                Riders for {person.name}
              </Col>
              <Col sm={8} className="riders-container c-center">
                  {map(riders, (rider) =>
                     if(typeof rider !="string") {return <Rider key={rider.Name}
                        rider={rider}
                        person={person}
                        isActive={rider.Name == self.state.selectedRiderName}
                        selectRider={self.selectRider.bind(self)}
                      />} else {
                        return null;
                      }
                  )}
              </Col>
          </Col>
        )}
      </Row>
    );
  }
}