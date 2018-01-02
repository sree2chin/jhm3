import * as React from 'react';
import {Link} from 'react-router';
import { Navbar } from "react-bootstrap";
import * as moment from "moment";
import {Button, Row, Col} from "react-bootstrap";

interface Props extends React.Props<PersonInfo> {
  person: any,
  noOfPersons: any,
  personIndex: any,
  index: any,
  openEditPersonModal: any
}

export default class PersonInfo extends React.Component<Props, {}> {
  public render() {
    const {person} = this.props;
    const personsContainerWidth = this.props.noOfPersons == 2 ? 6 : 12;
    var additionalClass = this.props.noOfPersons==2 ? "contains-two-persons" : "contains-one-person";
    if(this.props.personIndex == 0) {
      additionalClass += " first-person";
    } else {
      additionalClass += " second-person";
    }
    return (
          <Col sm={personsContainerWidth} className={`person-info-container  ${additionalClass}`}>
            <Row className="person-info-header-container">
              <Col sm={9} xs={9} className="person-name-container">
                {person.name}
              </Col>
              <Col sm={3} xs={3} className="person-edit-container" onClick={()=> this.props.openEditPersonModal(this.props.person, this.props.personIndex)}>
                EDIT
              </Col>
            </Row>
            <Row className="person-content">
              <Col sm={4} className="person-info-columns">
                <Row>
                  <Col sm={12} className="mb10">
                    <span className="person-label">State: </span>
                    <span className="person-label-content">{person.state}</span>
                  </Col>
                  <Col sm={12}>
                    <span className="person-label">Gender: </span>
                    <span className="person-label-content">{person.s_gender ==1 ? "Male" : "Female"}</span>
                  </Col>
                </Row>
              </Col>
              <Col sm={4} className="person-info-columns">
                <Row>
                  <Col sm={12} className="mb10">
                    <span className="person-label">D.O.B: </span>
                    <span className="person-label-content">{moment(person.s_birthDate).format("YYYY-MM-DD")}</span>
                  </Col>
                  <Col sm={12}>
                    <span className="person-label">Health: </span><span className="person-label-content">{person.health}</span>
                  </Col>
                </Row>
              </Col>
              <Col sm={4} className="person-info-columns">
                <Row>
                  <Col sm={12} className="mb10">
                    <span className="person-label">Tobacco Use: </span>
                    <span className="person-label-content">{person.smoke} </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
    );
  }
}
