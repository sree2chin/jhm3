import * as React from 'react';
import {Link} from 'react-router';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import { getStateObjects } from '../../utility/states';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import Input from "../common/textInput";
import ReactTooltip from 'react-tooltip';
import {Tooltip} from 'react-lightweight-tooltip';


interface Props extends React.Props<Person> {
}

export default class Person extends React.Component<Props, {}> {
  state = {},
  onChange(key, value) {
    this.setState({
      [key]: value
    });
    this.props.onChange(this.props.index, key, value);
  },
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
    const {errors, person} = this.props;
    const healthRatingObjects = [
          {value: "Excellent", label: "Excellent"},
          {value: "Very Good", label: "Very Good"},
          {value: "Good", label: "Good"},
          {value: "Fair", label: "Fair"}
        ];

    return (
      <Col sm={12} className="c-one-person-container">
        <div>
          <Col sm={12} className={"c-person-header-text"}>
            {"Applicant " + (personIndex + 1)}
          </Col>
          <Col sm={12} style={{marginBottom: "15px"}} className="person-name-container">
            <Input 
              name={"first-applicant-name-" + personIndex}
              label="Name"
              placeholder="Name"
              onChange={(e) => {
                this.onChange("name", e.target.value
              )}}
            />
            { errors.nameError && <Col sm={12} className={"c-subheader-text error"}  style={{paddingLeft: "0px"}}>
              Please enter applicant name.
            </Col> }
          </Col>
          <Col sm={12} className={"c-subheader-text"}>
            Gender
          </Col>
          <Col sm={12} style={{paddingRight: "22px", marginBottom: "15px"}} className="person-gender-container">
            <FormGroup className="radio-group">
              <div className="c-radio" onClick={ ()=> {
                      this.onChange("s_gender", "1")
                    }}>
                <input 
                  type="radio" 
                  name={"person_s_gender_" + personIndex} 
                  checked={this.state.s_gender == "1"}
                />
                <span></span>
                <label htmlFor={"person_s_gender_" + personIndex}> Male </label >
              </div>
              <div className="c-radio" onClick={ ()=> {
                      this.onChange("s_gender", "2")
                    }}>
                <input 
                  type="radio" 
                  name={"person_s_gender_" + personIndex} 
                  checked={this.state.s_gender == "2"}
                />
                <span></span>
                <label htmlFor={"person_s_gender_" + personIndex}> Female </label>
              </div>
            </FormGroup>
            { errors.s_genderError && <Col sm={12} className={"c-subheader-text error"} style={{paddingLeft: "0px"}}>
              Please select your gender.
            </Col> }
          </Col> 
        </div>
        <Row style={{marginBottom: "25px", marginLeft: "0px"}}>
          <Col sm={12} className={"c-subheader-text"} style={{marginTop: "0px", marginBottom: "3px"}}>
            Birth date
          </Col>
          <Col sm={12} className="birth-date-picker-container" >
              <DatePicker 
                selected={person.s_birthDate} 
                onChange={(date)=>{
                  this.onChange("s_birthDate", date)
                }}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="MM/DD/YYYY"
                customInput={<div style={{display: "inline-block"}}>
                  <div className={"c-calendar-container"}>
                    <img src={"../images/calendar.svg"} />
                  </div>
                  <input type="text" value="" placeholder="MM/DD/YYYY" />
                </div>}
              />
              <div style={{display: 'inline-block'}}>
                <Tooltip content="Please enter your date of birth" styles={toolTipStylesBirthData}>
                  <img style={{marginBottom: "2px"}} src={"../images/question-mark.svg"} />
                </Tooltip>
            </div>
          </Col>
          { errors.s_birthDateError && <Col sm={12} className={"c-subheader-text error"}>
            Please select your birth date.
          </Col> }
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
            />
            <div style={{display: 'inline-block'}}>
            <Tooltip content="Please select your state" styles={toolTipStyles}>
              <img style={{marginBottom: "7px"}} src={"../images/question-mark.svg"} />
            </Tooltip>
            </div>
             { errors.stateError && <Col style={{ paddingLeft: "0px"}} sm={12} className={"c-subheader-text error"}>
                  Please select your state.
                </Col> }
          </Col>
   
        </div>
        <div  style={{marginBottom: "0px"}}>
          <Col sm={12} className={"c-subheader-text"} style={{marginTop: "15px"}}>
            Overall health
          </Col>
          <Col sm={12} style={{marginBottom: "10px", marginTop: "6px"}}>
            <Select
              name={"form-field-name-" + personIndex}
              options={healthRatingObjects}
              value={person.health}
              onChange={(healthObj)=>{
                this.onChange("health", healthObj.value)
              }}
            />
            <div style={{display: 'inline-block'}}>
            <Tooltip content="Please select your health status" styles={toolTipStyles}>
              <img style={{marginBottom: "7px"}} src={"../images/question-mark.svg"} />
            </Tooltip>
            </div>
            { errors.person1_healthError && <Col sm={12} className={"c-subheader-text error"}>
              Please select your person1_health status.
            </Col> }
          </Col>

        </div>
        <div>
          <Col sm={12} className={"c-subheader-text"}  style={{marginTop: "5px"}}>
            Tobacco use
          </Col>
          <Col sm={12} style={{paddingRight: "22px"}} className="person-tobacco-container">
            <FormGroup className="radio-group">
              <div className="c-radio" onClick={ ()=> {
                      this.onChange("smoke", "Yes")
                    }}>
                <input 
                  type="radio" 
                  name={"person1_smoke_" + personIndex}
                  checked={this.state.smoke == "Yes"}
                />
                <span></span>
                <label> Yes </label>
              </div>
              <div className="c-radio" onClick={ ()=> {
                      this.onChange("smoke", "No")
                    }}>
                <input 
                  type="radio" 
                  name={"person1_smoke_" + personIndex}
                  checked={this.state.smoke == "No"}
                />
                <span></span>
                <label> No </label>
              </div>
            </FormGroup>
            { errors.smokeError && <Col sm={12} className={"c-subheader-text error"} style={{marginTop: "0px", paddingLeft: "0px"}}>
              Please select whether you smoke or not.
            </Col> }
          </Col>
        </div>
      </Col>
    );
  }
}