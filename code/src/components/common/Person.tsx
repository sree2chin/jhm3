import * as React from 'react';
import {Link} from 'react-router';
import {Button, Row, Col, FormGroup, Radio, ControlLabel} from "react-bootstrap";
import { getStateObjects } from '../../utility/states';
import DatePicker from 'react-datepicker';
import CustomDatepicker from "../common/CustomDatepicker";
var BootStrapDatePicker = require("react-bootstrap-date-picker");
import {DateInput, MonthInput} from 'react-date-input';
import {DateInputComponent, DateFormats } from "react-controlled-date-input";
import Select from 'react-select';
import Input from "../common/textInput";
import ReactTooltip from 'react-tooltip';
import {Tooltip} from 'react-lightweight-tooltip';
import * as moment from "moment";


interface Props extends React.Props<Person> {
  onChange: any,
  index: any,
  onClick: any,
  person: any,
  errors: any
}

export default class Person extends React.Component<Props, {}> {
  state = {
    year: "",
    month: "",
    date: ""
  }
  onChange(key, value) {
    this.setState({
      [key]: value
    });
    this.props.onChange(this.props.index, key, value);
  }

  onDateInputChange(year, month, date) {
    this.setState({ year, month, date });
    var momentDate = moment(new Date(month + "/" + date + "/" + year));
    if (momentDate.isValid()) {
      this.onDateChange("s_birthDate", month + "/" + date + "/" + year, month + "/" + date + "/" + year);
    }
  }

  onDateChange(key, value) {
    this.setState({
      [key]: moment(value),
      formattedDate: moment(value).format("MM/DD/YYYY")
    });
    this.props.onChange(this.props.index, key, moment(value));
  }

  getErrorsClassNames(errors, key) {
    if(errors[key]) {
      return "input-border-error";
    }

  }
  onChangeRaw(e) {
    var parentClass = "";
    if (this.props.index==0) {
      parentClass=".one-person-content ";
    } else {
      parentClass=".second-person-content ";
    }
    if (e.target.value) {
      var val = e.target.value;
      if (val.length == 1) {
        if (isNaN(val) || parseInt(val) > 1) {
          document.querySelector(parentClass + ".react-datepicker__input-container").getElementsByTagName("input")[0].value = "";
        };
      } else if (val.length == 2) {
        if (isNaN(val) || parseInt(val)>12) {
          val = val.substr(0, 1);
          document.querySelector(parentClass + ".react-datepicker__input-container").getElementsByTagName("input")[0].value = val;
        } else {
          document.querySelector(parentClass + ".react-datepicker__input-container").getElementsByTagName("input")[0].value = val + "/";
        }
      } else if (val.length == 4) {
        var tempVal = val.substr(3, 1);
        if (isNaN(tempVal) || parseInt(tempVal) > 3) {
          document.querySelector(parentClass + ".react-datepicker__input-container").getElementsByTagName("input")[0].value = val.substring(0, 3);
        } else {
          document.querySelector(parentClass + ".react-datepicker__input-container").getElementsByTagName("input")[0].value = val;
        }
      } else if (val.length == 5) {
        var tempVal = val.substr(3, 2);
        if (isNaN(tempVal) || parseInt(tempVal) > 31) {
          document.querySelector(parentClass + ".react-datepicker__input-container").getElementsByTagName("input")[0].value = val.substring(0, 4);
        } else {
          document.querySelector(parentClass + ".react-datepicker__input-container").getElementsByTagName("input")[0].value = val + "/";
        }
      } else if (val.length > 6) {
        document.querySelector(parentClass + ".react-datepicker__input-container").getElementsByTagName("input")[0].value = val;
        return;
        var tempVal = val.substr(5, 4);
        if (isNaN(tempVal) || parseInt(tempVal) > 31) {
          document.querySelector(parentClass + ".react-datepicker__input-container").getElementsByTagName("input")[0].value = val.substring(0, 4);
        }
      }
    }
  }
  public render() {
    const toolTipStyles = {
      wrapper: {
        marginLeft: "15px",
        top: "-16px"
      },
      content: {
        background: 'none',
        borderRadius: '10px',
        fontSize: "12px",
        color: "#ffffff",
        whiteSpace: "normal",
        padding: '.3em 5px',
      },
      tooltip: {
        borderRadius: '10px',
        width: "109px",
        background: 'rgba(0, 0, 0, 0.5)'
      },
      arrow: {
        borderTop: 'solid rgba(0, 0, 0, 0.5) 5px'
      },
      gap:{

      }
    };

    const toolTipStylesBirthData = JSON.parse(JSON.stringify(toolTipStyles));
    toolTipStylesBirthData.wrapper.top = "0px";

    var statesObjects = getStateObjects();
    const personIndex = this.props.index;
    var {errors, person} = this.props;
    errors = errors || {};
    person = person || {};
    var s_birthDate = this.state.s_birthDate || person.s_birthDate;
    const healthRatingObjects = [
          {value: "Excellent", label: "Excellent"},
          {value: "Very Good", label: "Very Good"},
          {value: "Good", label: "Good"},
          {value: "Fair", label: "Fair"}
        ];

    var {year, month, date} = this.state;
        if(!!!year) {year = "YYYY"};
        if(!!!month) {month = "MM"};
        if(!!!date) {date = "DD"};

    return (
      <Col sm={12} className="c-one-person-container">
        <div>
          <Col sm={12} className={"c-person-header-text fwbold"}>
            {"Applicant " + (personIndex + 1)}
          </Col>
          <Col sm={12} style={{marginBottom: "0px"}} className="person-name-container">
            <Input
              name={"first-applicant-name-" + personIndex}
              label="Name"
              placeholder="Name"
              value={person.name}
              onChange={(e) => {
                this.onChange("name", e.target.value
              )}}
              className={this.getErrorsClassNames(errors, "nameError")}
            />

            <Col sm={12} className={`c-subheader-text error ${errors.nameError ? "visibility-show" : "visibility-hidden"}`} style={{paddingLeft: "0px"}}>
              Please enter applicant name.
            </Col>
          </Col>
          <Col sm={12} className={"c-subheader-text"}>
            Gender
          </Col>
          <Col sm={12} style={{paddingRight: "22px", marginBottom: "0px"}} className="person-gender-container">
            <FormGroup className="radio-group hidden-xs">
              <div className="c-radio" style={{marginBottom: "0px"}} onClick={ ()=> {
                      this.onChange("s_gender", "1")
                    }}>
                <input
                  type="radio"
                  name={"person_s_gender_" + personIndex}
                  checked={person.s_gender == "1"}
                />
                <span></span>
                <label htmlFor={"person_s_gender_" + personIndex}> Male </label >
              </div>
              <div className="c-radio" style={{marginBottom: "0px"}} onClick={ ()=> {
                      this.onChange("s_gender", "2")
                    }}>
                <input
                  type="radio"
                  name={"person_s_gender_" + personIndex}
                  checked={person.s_gender == "2"}
                />
                <span></span>
                <label htmlFor={"person_s_gender_" + personIndex} style={{marginBottom: "0px"}}> Female </label>
              </div>
            </FormGroup>
            <Row className="visible-xs">
              <Col xs={6}>
                <Button className={`c-button-default circular ${person.s_gender == "1" ? "active" : ""}`} onClick={(){
                      this.onChange("s_gender", "1")
                    }}
                  >
                    MALE
                </Button>
              </Col>
              <Col xs={6}>
                <Button style={{marginBottom: "0px"}} className={`c-button-default circular ${person.s_gender == "2" ? "active" : ""}`} onClick={(){
                      this.onChange("s_gender", "2")
                    }}
                  >
                    FEMALE
                </Button>
              </Col>
            </Row>

            <Col sm={12} className={`c-subheader-text error ${errors.s_genderError ? "visibility-show" : "visibility-hidden"}`} style={{paddingLeft: "0px", marginTop: "0px"}}>
              Please select your gender.
            </Col>
          </Col>
        </div>
        <Row style={{marginLeft: "0px"}}>
          <Col sm={12} className={"c-subheader-text"} style={{marginTop: "0px", marginBottom: "3px"}}>
            Birth date
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
                  />
              </FormGroup>

          </Col>
          <Col sm={12} className={`c-subheader-text error ${errors.s_birthDateError ? "visibility-show" : "visibility-hidden"}`}>
            Please select your birth date.
          </Col>
        </Row>
        <div style={{marginBottom: "12px"}}>
          <Col sm={12} className={"c-subheader-text"} style={{marginBottom: "2px"}}>
            State
          </Col>
          <Col sm={12} className={"c-address-input"}>
            <Select
              name="form-field-name1"
              options={statesObjects}
              value={person.state}
              onChange={(stateObj)=>{
                this.onChange("state", stateObj.value)
              }}
              className={this.getErrorsClassNames(errors, "stateError")}
            />
            <Col style={{ paddingLeft: "0px", marginTop: "-5px"}} sm={12} className={`c-subheader-text error ${errors.stateError ? "visibility-show" : "visibility-hidden"}`}>
              Please select your state.
            </Col>
          </Col>

        </div>
        <div  style={{marginBottom: "0px"}}>
          <Col sm={12} className={"c-subheader-text"} style={{marginTop: "5px"}}>
            Overall health
          </Col>
          <Col sm={12} style={{marginBottom: "0px", marginTop: "6px"}}>
            <Select
              name={"form-field-name-" + personIndex}
              options={healthRatingObjects}
              value={person.health}
              onChange={(healthObj)=>{
                this.onChange("health", healthObj.value)
              }}
              className={this.getErrorsClassNames(errors, "healthError")}
            />
            <div style={{display: 'inline-block'}}>
            <Tooltip content="Please select your health status" styles={toolTipStyles}>
              <img style={{marginBottom: "7px"}} src={"../images/question-mark.svg"} />
            </Tooltip>
            </div>
            <Col sm={12} style={{marginTop: "-5px", paddingLeft: "0px"}} className={`c-subheader-text error ${errors.healthError ? "visibility-show" : "visibility-hidden"}`}>
              Please select your health status.
            </Col>
          </Col>

        </div>
        <div>
          <Col sm={12} className={"c-subheader-text"}  style={{marginTop: "0px"}}>
            Tobacco use
          </Col>
          <Col sm={12} style={{paddingRight: "22px"}} className="person-tobacco-container">
            <FormGroup className="radio-group hidden-xs">
              <div className="c-radio" style={{marginBottom: "0px"}} onClick={ ()=> {
                      this.onChange("smoke", "Yes")
                    }}>
                <input
                  type="radio"
                  name={"person1_smoke_" + personIndex}
                  checked={person.smoke == "Yes"}
                />
                <span></span>
                <label> Yes </label>
              </div>
              <div className="c-radio" style={{marginBottom: "0px"}} onClick={ ()=> {
                      this.onChange("smoke", "No")
                    }}>
                <input
                  type="radio"
                  name={"person1_smoke_" + personIndex}
                  checked={person.smoke == "No"}
                />
                <span></span>
                <label style={{marginBottom: "0px"}}> No </label>
              </div>
            </FormGroup>
            <Row className="visible-xs">
              <Col xs={6}>
                <Button className={`c-button-default circular ${person.smoke == "Yes" ? "active" : ""}`} onClick={(){
                      this.onChange("smoke", "Yes")
                    }}
                  >
                    YES
                </Button>
              </Col>
              <Col xs={6}>
                <Button className={`c-button-default circular ${person.smoke == "No" ? "active" : ""}`} onClick={(){
                      this.onChange("smoke", "No")
                    }}
                  >
                    NO
                </Button>
              </Col>
            </Row>
            <Col sm={12} className={`c-subheader-text error ${errors.smokeError ? "visibility-show" : "visibility-hidden"}`} style={{marginTop: "0px", paddingLeft: "0px"}}>
              Please indicate whether or not you use tobacco products.
            </Col>
          </Col>
        </div>
      </Col>
    );
  }
}