import * as React from 'react';
import {Button, Row, Col, FormGroup, Radio, ControlLabel} from "react-bootstrap";
var BootStrapDatePicker = require("react-bootstrap-date-picker");

interface Props extends React.Props<QuestionsCustomDatePicker> {
  name : string;
  label : string;
  onChange : any;
  placeholder? : string;
  value: string;
  error : string;
}

export default class QuestionsCustomDatePicker extends React.Component<Props, {}> {
  constructor(props : Props){
    super(props);
  }

  state={},

  getClassName() {
    var className = "form-control ";
    if(this.props.className) {
      className = className + this.props.className;
    }
    return className;
  }

  public render() {
    var wrapperClass : string = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
     wrapperClass += " " + 'has-error';
    }
    return (
        <Row style={{marginBottom: "10px", marginLeft: "0px"}}>
          <Col sm={12} className={"c-subheader-text"} style={{marginTop: "0px", marginBottom: "3px"}}>
            {this.props.caption}
          </Col>
          <Col sm={12} className="birth-date-picker-container" >
              <span className="test-class">
               
              </span>
              <FormGroup controlId={"change_handler_" + this.props.personIndex}> 
                <ControlLabel>      
                  <div className="custom-date-picker-container">
                    <span className="custom-date-picker" onClick={this.props.onClick}>
                      <img src={"../images/calendar.svg"} />
                    </span>
                  </div>
                </ControlLabel>
                <BootStrapDatePicker 
                  onChange={this.handleChange} 
                  placeholder={"YYYY-MM-DD"}
                  value={this.state.formattedDate} 
                  id={"change_handler_example_" + + this.props.personIndex} 
                  dateFormat={"YYYY-MM-DD"}
                  onChange={(date, formattedDate)=>{
                    this.onDateChange("s_birthDate", date, formattedDate)
                  }}/>
              </FormGroup>

          </Col>
          <Col sm={12} className={`c-subheader-text error`}>
            Please select your birth date.
          </Col> 
        </Row>
    );
  }
}
