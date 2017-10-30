import * as React from 'react';
import {Link} from 'react-router';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";

interface Props extends React.Props<Plan> {
}

export default class Plan extends React.Component<Props, {}> {
  constructor(){
    super();
  },
  selectRider(){

  },
  public render() {
    const {rider} = this.props;
    return (

      <Col key={rider.header} sm={4} className="rider-container single-product-container">
        <Row className="single-product-content">
          <Row className="header">
            <Col style={{textAlign: "center"}} sm={12}>
              {rider.header}
            </Col>  
          </Row>
          <Row>
            <Col sm={12} className="product-main-content">
              <Row className="text-center">
                <div className="c-product-text">{rider.text}</div>
              </Row>
            </Col>
          </Row>
        </Row>
        <Row className={`text-center quote-product`} style={{paddingTop: "10px", marginLeft: "5px", height: "62px"}} onClick={()=> this.selectRider(rider)}>
          <div className="c-coverage-amount" style={{fontSize: "14px", color: "#317dbd"}}>included in policy</div>
          <div className="c-coverage-amount" style={{fontSize: "14px", color: "#999999"}}>(no additional premium)</div>
        </Row>
      </Col>

    );
  }
}