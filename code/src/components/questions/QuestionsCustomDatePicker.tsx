import * as React from 'react';
import {Button, Row, Col, FormGroup, Radio, ControlLabel} from "react-bootstrap";
var BootStrapDatePicker = require("react-bootstrap-date-picker");
import {DateInputComponent, DateFormats } from "react-controlled-date-input";
import * as moment from "moment";

interface Props extends React.Props<QuestionsCustomDatePicker> {
  question: any,
  onChange : any,
  error : string,
  alreadyOnceSubmitted: any,
  counter?: any
}

export default class QuestionsCustomDatePicker extends React.Component<Props, {}> {
  constructor(props : Props){
    super(props);
  }

  state={}

  onDateInputChange(year, month, date) {
    this.setState({ year, month, date });
    var momentDate = moment(new Date(month + "/" + date + "/" + year));
    if (momentDate.isValid()) {
      this.onDateChange("s_birthDate", month + "/" + date + "/" + year, month + "/" + date + "/" + year);

    }
  }
  onDateChange(key, value, formattedDate) {
    this.setState({
      [key]: moment(new Date(value)),
      formattedDate
    });
    this.props.onChange( this.props.question, moment(value).format("YYYY-MM-DD"));
  }

  getClassName() {
    var className = "form-control ";
    if(this.props.className) {
      className = className + this.props.className;
    }
    return className;
  }
  validate(q) {
    if(!this.props.alreadyOnceSubmitted) {return true;}
    if (this.props.question.constraints) {
      var constraints = this.props.question.constraints;
      var isValid = true;

      if (constraints.required) {
        if (this.props.question.answer) {
          var isValid = !!this.props.question.answer;
          if (constraints.minValue) {
            isValid = isValid && constraints.minValue <= this.props.question.answer;
          }
          if (constraints.maxValue) {
            isValid = isValid && constraints.maxValue >= this.props.question.answer;
          }
          return isValid;
        }
        return false;
      }
    } else {
      return true;
    }
  }
  public render() {
    var wrapperClass : string = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
     wrapperClass += " " + 'has-error';
    }
    var question = this.props.question;
    return (
        <Row style={{marginBottom: "25px", marginLeft: "0px"}}>
          <Col sm={12} className={"c-subheader-text fs18"} style={{marginBottom: "10px", paddingLeft: "0px"}}>
            {question.caption}
          </Col>
          <Col sm={12} className="birth-date-picker-container" >
              <span className="test-class">

              </span>
              <FormGroup controlId={"change_handler_" + question.personIndex}>
                <ControlLabel>
                  <div className="custom-date-picker-container">
                    <span className="custom-date-picker" onClick={question.onClick}>
                      <img src={"../images/calendar.svg"} />
                    </span>
                  </div>
                </ControlLabel>
                <DateInputComponent
                  onChange={this.onDateInputChange.bind(this)}
                  dateFormat={DateFormats.MMDDYYYY}/>
              </FormGroup>

          </Col>
            {!this.validate() &&
              <div className="input" style={{marginTop: "5px", color: "#ff4949"}}>
                {question.constraints.minValueViolationMessage}
              </div>
            }
        </Row>
    );
  }
}
