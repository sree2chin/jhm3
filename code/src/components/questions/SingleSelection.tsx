import * as React from 'react';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";

interface Props extends React.Props<SingleSelection> {
  data: any
}

export default class SingleSelection extends React.Component<Props, {}> {
  constructor(props : Props){
    super(props);
  },

  onChange(val) {
    this.props.onChange(val);
  },

  public render() {
    var wrapperClass : string = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
     wrapperClass += " " + 'has-error';
    },

    return (
     <div className="row c-quote">
        <Col sm={12} className={"c-subheader-text"}>
          {this.props.caption}
        </Col>
          <Col sm={12} style={{paddingRight: "22px", marginBottom: "0px"}} className="person-gender-container">
            <Row>
              <Col xs={6}>
                <Button className="c-button-default circular" className={`c-button-default circular`} onClick={(){
                      this.onChange(this.props.options[0].id)
                    }}
                  >
                    {this.props.options[0].label}
                </Button>
              </Col>
              <Col xs={6}>
                <Button style={{marginBottom: "0px"}} className={`c-button-default circular `} onClick={(){
                      this.onChange(this.props.options[1].id)
                    }}
                  >
                    {this.props.options[1].label}
                </Button>
              </Col>
            </Row>

            <Col sm={12} className={`c-subheader-text error`} style={{paddingLeft: "0px", marginTop: "0px"}}>
              
            </Col> 
          </Col> 
      </div>
    );
  }
}
