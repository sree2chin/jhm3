import * as React from 'react';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import Select from 'react-select';
interface Props extends React.Props<CustomSelect> {
  data: any
}

export default class CustomSelect extends React.Component<Props, {}> {
  constructor(props : Props){
    super(props);
  },
  state = {},
  onChange(val) {
    this.props.onChange(val);
  },
  getStateObjects() {
    var options = [];

    for(var i in this.props.options) {
      options.push(
        { value: this.props.options[i].id, 
        label:  this.props.options[i].label}
      );
    }
    return options;
  },
  public render() {
    var wrapperClass : string = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
     wrapperClass += " " + 'has-error';
    },
    var statesObjects = this.getStateObjects();

    return (
     <div className="row c-quote">
        <Col sm={12} className={"c-subheader-text"}>
          {this.props.caption}
        </Col>
          <Col sm={12} style={{paddingRight: "22px", marginBottom: "0px"}} className="person-gender-container">
            <Row>
            <Select
              name="form-field-name1"
              options={statesObjects}
              value={this.state.state}
              onChange={(stateObj)=>{
                this.onChange("state", stateObj.value)
              }}
              className={""}
            />
            </Row>

            <Col sm={12} className={`c-subheader-text error`} style={{paddingLeft: "0px", marginTop: "0px"}}>
              
            </Col> 
          </Col> 
      </div>
    );
  }
}
