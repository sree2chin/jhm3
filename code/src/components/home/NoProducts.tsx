import * as React from 'react';
import {Link} from 'react-router';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";

interface Props extends React.Props<NoProducts> {
  noOfPersons: any
}

export default class NoProducts extends React.Component<Props, {}> {
  constructor(){
    super();
  }

  public render() {
    var noOfPersons=this.props.noOfPersons;
    const personsContainerWidth = this.props.noOfPersons == 2 ? 6 : 12;
    return (
      <Col sm={personsContainerWidth} className="no-product-outer-container">
        <Col sm={12} className="no-product-container">
          <div className="inner-no-product-container">
            <Row className="" style={{fontSize: "26px", color: "#999999"}}>
              No products available
            </Row>
            <Row style={{fontSize: "13px", color: "#999999"}}>
              We're sorry, we couldn't find any eligible products for you.
            </Row>
          </div>
        </Col>
      </Col>
    );
  }
}