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
  },
  public render() {  

    const riders = [
      {
        header: "Chronic Illiness",
        text: "Accelerates a portion of base policy benefits at attained age 60, if insured is unable to perform at least 2 or 6 activites of daily living"
      },
      {
        header: "Charitable Giving",
        text: "An additional death benefit of 1% (up to $100,000) to a qualified charitable organization is provided at the policyholders choosing"
      },
      {
        header: "Disability Waiver of Premium",
        text: "Available thru age 55, coverage ends at age 60; if insured becomes totally disabled prior to age 60 for a period of 6 months or more, all premiums after that time will be waived until the earlier of the end of the disability or age 65"
      }

    ];
    return (
      <Row className="all-riders-info-container">
        {map(this.props.persons, (person) =>
          <Col key={person.name} sm={12} className="c-one-person-container riders-outer-container">
            <Row>
              <Col sm={8} className="c-center" style={{paddingLeft: "20px"}}>
                Riders for {person.name}
              </Col>
              <Col sm={8} className="c-center">
                  {map(riders, (rider) =>
                     return <Rider key={rider.header}
                        rider={rider}
                        person={person}
                      />
                  )}
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    );
  }
}