import * as React from 'react';
import {Link} from 'react-router';
import { Navbar } from "react-bootstrap";
import * as moment from "moment";
import {Button, Row, Col} from "react-bootstrap";

interface Props extends React.Props<PersonInfo> {
  location: any
}

export default class PersonInfo extends React.Component<Props, {}> {
  public render() {
    const {person} = this.props;
    
    return (
      <div style={{backgroundColor: "rgb(247, 247, 247)"}}>
        <Row>
          <Col sm={8} className="person-info-container">
            <Row className="person-info-header-container">
              <Col sm={11} className="person-name-container">
                {person.name} 
              </Col>
              <Col sm={1} className="person-edit-container" onClick={()=> person.editPerson(person.index)}>
                Edit
              </Col>
            </Row>
            <Row className="person-content">
              <Col sm={4}>
                <Row>
                  <Col sm={12}>
                    <span className="person-label">State: </span>
                    <span className="person-label-content">{person.state}</span>
                  </Col>
                  <Col sm={12}>
                    <span className="person-label">Gender: </span>
                    <span className="person-label-content">{person.s_gender}</span>
                  </Col>
                </Row>
              </Col>
              <Col sm={4}>
                <Row>
                  <Col sm={12}>
                    <span className="person-label">D.O.B: </span> 
                    <span className="person-label-content">{moment(person.s_birthDate).format("YYYY-MM-DD")}</span> 
                  </Col>
                  <Col sm={12}>
                    <span className="person-label">Health: </span><span className="person-label-content">{person.health}</span>
                  </Col>
                </Row>
              </Col>
              <Col sm={4}>
                <Row>
                  <Col sm={12}>
                    <span className="person-label">Tobacco Use: </span> 
                    <span className="person-label-content">{person.smoke} </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
