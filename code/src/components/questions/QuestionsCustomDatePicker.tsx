import * as React from 'react';
import {Button, Row, Col, FormGroup, Radio, ControlLabel} from "react-bootstrap";
var BootStrapDatePicker = require("react-bootstrap-date-picker");
import {DateInputComponent, DateFormats } from "react-controlled-date-input";
import * as moment from "moment";
import DatePicker from 'react-datepicker';
import {isEmpty} from "underscore";

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
  componentWillMount() {
    if (!isEmpty(this.props.question) && this.props.question.answer) {
      this.setState({
        s_birthDate: moment(this.props.question.answer)
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.question) && this.props.question.answer) {
      this.setState({
        s_birthDate: moment(nextProps.question.answer)
      });
    }
  }

  onDateInputChange(year, month, date) {
    this.setState({ year, month, date });
    var momentDate = moment(new Date(month + "/" + date + "/" + year));
    if (momentDate.isValid()) {
      //this.onDateChange("s_birthDate", month + "/" + date + "/" + year, month + "/" + date + "/" + year);

    }
  }

  onDateChange(key, value) {
    this.setState({
      [key]: moment(value),
      formattedDate: moment(value).format("MM/DD/YYYY")
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
  onChangeRaw(e) {
    var parentClass = "." + this.props.question.id.replace(/[^a-zA-Z0-9]/g, "");
    /*if (this.props.index==0) {
      parentClass=".first- ";
    } else {
      parentClass=".second-person-content ";
    }*/
    if (this.previousDateVal && this.previousDateVal.length > e.target.value.length) {
      this.previousDateVal = e.target.value;
      return;
    }
    if (e.target.value) {
      var val = e.target.value;
      if (val.length == 1) {
        if (isNaN(val) || parseInt(val) > 1) {
          document.querySelector(parentClass + " .react-datepicker__input-container").getElementsByTagName("input")[0].value = "";
        };
      } else if (val.length == 2) {
        if (isNaN(val) || parseInt(val)>12) {
          val = val.substr(0, 1);
          document.querySelector(parentClass + " .react-datepicker__input-container").getElementsByTagName("input")[0].value = val;
        } else {
          document.querySelector(parentClass + " .react-datepicker__input-container").getElementsByTagName("input")[0].value = val + "/";
        }
      } else if (val.length == 4) {
        var tempVal = val.substr(3, 1);
        var monthVal =  parseInt(val.substr(0, 2));
        var maxVal = 3;
        if (monthVal == 2) {
          maxVal = 2;
        }
        if (isNaN(tempVal) || parseInt(tempVal) > maxVal) {
          document.querySelector(parentClass + " .react-datepicker__input-container").getElementsByTagName("input")[0].value = val.substring(0, 3);
        } else {
          document.querySelector(parentClass + " .react-datepicker__input-container").getElementsByTagName("input")[0].value = val;
        }
      } else if (val.length == 5) {
        var maxVal = 31;
        var monthVal =  parseInt(val.substr(0, 2));
        if (monthVal == 4 || monthVal == 6 || monthVal == 9 || monthVal == 11) {
          maxVal = 30
        } else if (monthVal == 2) {
          maxVal = 29;
        }
        var tempVal = val.substr(3, 2);
        if (isNaN(tempVal) || parseInt(tempVal) > maxVal) {
          document.querySelector(parentClass + " .react-datepicker__input-container").getElementsByTagName("input")[0].value = val.substring(0, 4);
        } else {
          document.querySelector(parentClass + " .react-datepicker__input-container").getElementsByTagName("input")[0].value = val + "/";
        }
      } else if (val.length == 7) {
        document.querySelector(parentClass + " .react-datepicker__input-container").getElementsByTagName("input")[0].value = val;
        var tempVal = val.substr(6, 1);
        if (isNaN(tempVal) || !(parseInt(tempVal)>=1 && parseInt(tempVal)<=2)) {
          document.querySelector(parentClass + " .react-datepicker__input-container").getElementsByTagName("input")[0].value = val.substring(0, 6);
        }
      } else if (val.length == 8) {
        var tempVal = val.substr(6, 2);
        if (isNaN(tempVal) || !(parseInt(tempVal)>=19 && parseInt(tempVal)<=20)) {
          document.querySelector(parentClass + " .react-datepicker__input-container").getElementsByTagName("input")[0].value = val.substring(0, 7);
        }
      } else if (val.length == 9) {
        var tempVal = val.substr(6, 3);
        if (isNaN(tempVal)) {
          document.querySelector(parentClass + " .react-datepicker__input-container").getElementsByTagName("input")[0].value = val.substring(0, 8);
        }
      } else if (val.length == 10) {
        var tempVal = val.substr(6, 4);
        if (isNaN(tempVal)) {
          document.querySelector(parentClass + " .react-datepicker__input-container").getElementsByTagName("input")[0].value = val.substring(0, 9);
        }
      } else if (val.length > 10) {
        var tempVal = val.substr(6, 4);
        document.querySelector(parentClass + " .react-datepicker__input-container").getElementsByTagName("input")[0].value = val.substring(0, 10);
      }
      this.previousDateVal = document.querySelector(parentClass + " .react-datepicker__input-container").getElementsByTagName("input")[0].value;
    }
  }

  public render() {
    var wrapperClass : string = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
     wrapperClass += " " + 'has-error';
    }
    var question = this.props.question;
    var currentDate = moment();
    var minDate = moment('1900-01-01');

    var s_birthDate = this.state.s_birthDate;
    s_birthDate = s_birthDate && s_birthDate.isValid() ? s_birthDate: "";

    return (
        <Row id={question.id.replace(/[^a-zA-Z0-9]/g, "")} className={question.id.replace(/[^a-zA-Z0-9]/g, "")} style={{marginBottom: "25px", marginLeft: "0px"}}>
          <Col sm={12} className={"c-subheader-text fs18"} style={{marginBottom: "10px", paddingLeft: "0px"}}>
          {question.constraints && question.constraints.required && <span style={{color: "rgb(255, 73, 73)", marginRight: "9px"}}>*</span>}
            {question.caption}
          </Col>
          <Col sm={12} className="birth-date-picker-container" >
              <span className="test-class">

              </span>
              <FormGroup style={{marginBottom: "10px"}} controlId={"change_handler_" + this.props.personIndex}>
                <ControlLabel>
                  <div className="custom-date-picker-container">
                    <span className="custom-date-picker" onClick={this.props.onClick}>
                      <img src={"../images/calendar.svg"} />
                    </span>
                  </div>
                </ControlLabel>
                <DatePicker
                      selected={s_birthDate}
                      onChange={(date)=>{
                        this.onDateChange("s_birthDate", date)
                      }}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      placeholderText="MM/DD/YYYY"
                      onChangeRaw={this.onChangeRaw.bind(this)}
                      minDate={moment().subtract(120, "year")}
                      maxDate={moment().add(0, "month")}
                  />
              </FormGroup>

          </Col>
            {!this.validate() &&
              <div className="input" style={{marginTop: "5px", color: "#ff4949"}}>
                {question.constraints.minValueViolationMessage || "Required"}
              </div>
            }
            {question.answerState=="invalid" &&
              <div className="input" style={{marginTop: "5px", color: "#ff4949"}}>
                {"Invalid"}
              </div>
            }
        </Row>
    );
  }
}
