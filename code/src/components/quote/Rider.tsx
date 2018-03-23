import * as React from 'react';
import {Link} from 'react-router';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import {each, isEmpty, find} from "underscore";
import RawHtml from "react-raw-html"

interface Props extends React.Props<Plan> {
  rider: any,
  person: any,
  isActive: Boolean,
  selectRider: any,
  premium_type: any
}

export default class Plan extends React.Component<Props, {}> {
  constructor(){
    super();
  }
  selectRider(){
    this.setState({
      riderAdded: true
    });
    this.props.selectRider(this.props.rider);
  }
  state={}
  public render() {
    const {rider} = this.props;
    RawHtml.addTag("mycooltag");
    if(!isEmpty(rider)) {
      return (
        <Col key={rider.Name} sm={4} className="rider-container single-product-container">
          <Row className="single-product-content">
            <Row className="header">
              <Col style={{textAlign: "center"}} sm={12}>
                {rider.Name}
              </Col>
            </Row>
            <Row>
              <Col sm={12} className="product-main-content">
                <Row className="text-center">
                  <div className="c-product-text">
                    <RawHtml.mycooltag>
                      {rider.Description}
                    </RawHtml.mycooltag>
                  </div>
                </Row>
              </Col>
            </Row>
          </Row>
          {rider.Name != "WP" && <Row className={`text-center quote-product rider-footer-container`} style={{paddingTop: "10px", marginLeft: "10px", height: "62px", fontFamily: "NunitoRegular!important"}} onClick={()=> this.selectRider(rider)}>
            <div className="c-coverage-amount" style={{fontSize: "14px", color: "#317dbd"}}>included in policy</div>
            <div className="c-coverage-amount additional-text" style={{fontSize: "14px", color: "#999999"}}>(no additional premium)</div>
          </Row>}
          {rider.Name == "WP" && <Row className={`text-center quote-product `} style={{paddingTop: "10px", marginLeft: "10px", height: "62px", fontFamily: "NunitoRegular!important"}}>
            {!this.state.riderAdded && <Button style={{float: "right", width: "88%", marginRight: "6%", marginTop: "0px"}} className={`c-button-default circular ${this.state.riderAdded ? "active" : ""}`} onClick={(){
                this.selectRider(rider)
              }}
            >
              ADD TO QUOTE
            </Button>}
            {this.state.riderAdded && <Button style={{float: "right", width: "88%", marginRight: "6%", marginTop: "0px"}} className={`c-button-default circular ${this.state.riderAdded ? "active" : ""}`} onClick={(){
                this.selectRider(rider)
              }}
            >
              ADDED TO QUOTE
            </Button>}
          </Row>}
        </Col>

      );
    } else {
      return null;
    }
  }
}