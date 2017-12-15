import * as React from 'react';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import Select from 'react-select';
interface Props extends React.Props<CustomSelect> {
  onChange: any,
  question: any,
  error: any
}

export default class CustomSelect extends React.Component<Props, {}> {
  constructor(props : Props){
    super(props);
  }
  state = {}
  onChange(val) {
    this.setState({
      state: val.id
    });
    this.props.onChange(this.props.question, {id: val.id});
  }
  getStateObjects() {
    var options = this.props.question.options
    for(var i in options) {
      options.push(
        { value: options[i].id, 
        label:  options[i].label}
      );
    }
    return options;
  }
  public render() {
    var wrapperClass : string = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
     wrapperClass += " " + 'has-error';
    }
    var statesObjects = this.getStateObjects();
    var question = this.props.question;

    return (
     <div>
        <Col sm={12} className={"c-subheader-text"} style={{marginTop: "5px", paddingLeft: "0px", marginBottom: "5px"}}>
          {question.caption}
        </Col>
          <Col sm={12} style={{paddingRight: "15px", marginBottom: "0px"}} className="person-gender-container">
            <Row>
            <Select
              name="form-field-name1"
              options={statesObjects}
              value={this.state.state}
              onChange={(stateObj)=>{
                this.onChange(stateObj)
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
