import * as React from 'react';
import {Link} from 'react-router';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";

interface Props extends React.Props<NoProducts> {
}

export default class NoProducts extends React.Component<Props, {}> {
  constructor(){
    super();
  },

  public render() {
    return (
      <Row className="no-product-outer-container">
        <Col sm={12} className="no-product-container">
          <div className="inner-no-product-container">
            <Row className="" style={{fontSize: "26px", color: "#999999"}}>
              No Eligible products
            </Row>
            <Row style={{fontSize: "13px", color: "#999999"}}> 
              We're sorry, we couldn't find any eligible products for you.
            </Row>
          </div>
        </Col>
      </Row>
    );
  }
}