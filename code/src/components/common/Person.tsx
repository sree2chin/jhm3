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
  onChange(key, value) {
    this.props.onChange(this.props.index, key, value);
  },
  public render() {
    const toolTipStyles = {
      wrapper: {
        marginLeft: "15px"
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
          <Col sm={12}>
            <Input 
              name={"first-applicant-name-" + personIndex}
              label="Name"
              placeholder="Name"
              onChange={(e) => {
                this.onChange("name", e.target.value
              )}}
            />
            { errors.nameError && <Col sm={12} className={"c-subheader-text error"}>
              Please enter applicant name.
            </Col> }
          </Col>
          <Col sm={12} className={"c-subheader-text"}>
            Gender
          </Col>
          <Col sm={12} style={{paddingRight: "22px"}}>
            <FormGroup className="radio-group">
              <Radio name={"person_s_gender_" + personIndex} 
                  onClick={ ()=> {
                    this.onChange("s_gender", "1")
                  }}>
                Male
              </Radio>
              {' '}
              <Radio name={"person_s_gender_" + personIndex} 
                  onClick={ ()=> {
                    this.onChange("s_gender", "2")
                  }}>
                Female
              </Radio>
              {' '}
            </FormGroup>
            { errors.s_genderError && <Col sm={12} className={"c-subheader-text error"}>
              Please select your gender.
            </Col> }
          </Col> 
        </div>
        <Row style={{marginBottom: "25px", marginLeft: "0px"}}>
          <Col sm={12} className={"c-subheader-text"} style={{marginTop: "10px", marginBottom: "3px"}}>
            Birth date
          </Col>
          <Col sm={12} >
            <div>
              <div className={"c-calendar-container"}>
                <img src={"../images/calendar.svg"} />
              </div>
              <DatePicker 
                selected={person.s_birthDate} 
                onChange={(date)=>{
                  this.onChange("s_birthDate", date)
                }}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="MM/DD/YYYY"
              />
              <div style={{display: 'inline-block', marginLeft: "2.5%"}}>
                <Tooltip content="Please enter your date of birth" styles={toolTipStyles}>
                  <img style={{marginBottom: "7px"}} src={"../images/question-mark.svg"} />
                </Tooltip>
              </div>
            </div>
          </Col>
          { errors.s_birthDateError && <Col sm={12} className={"c-subheader-text error"}>
            Please select your birth date.
          </Col> }
        </Row>
        <div>
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
            <Tooltip content="Please select your state" styles={toolTipStyles}>
              <img style={{marginBottom: "34px"}} src={"../images/question-mark.svg"} />
            </Tooltip>
          </Col>
          { errors.stateError && <Col style={{marginTop: "-17px"}} sm={12} className={"c-subheader-text error"}>
            Please select your state.
          </Col> }
        </div>
        <div>
          <Col sm={12} className={"c-subheader-text"} style={{marginTop: "7px"}}>
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
            <Tooltip content="Please select your health status" styles={toolTipStyles}>
              <img style={{marginBottom: "34px"}} src={"../images/question-mark.svg"} />
            </Tooltip>
          </Col>
          { errors.person1_healthError && <Col sm={12} className={"c-subheader-text error"}>
            Please select your person1_health status.
          </Col> }
        </div>
        <div>
          <Col sm={12} className={"c-subheader-text"}>
            Tobacco use
          </Col>
          <Col sm={4} style={{paddingRight: "22px"}}>
            <FormGroup className="radio-group">
              <Radio name={"person1_smoke_" + personIndex}
                  onClick={ ()=> {
                    this.onChange("smoke", "Yes")
                  }}>
                Yes
              </Radio>
              {' '}
              <Radio name={"person1_smoke_"  + personIndex}
                  onClick={ ()=> {
                    this.onChange("smoke", "No")
                  }}>
                No
              </Radio>
              {' '}
            </FormGroup>
          </Col>
          { errors.smokeError && <Col sm={12} className={"c-subheader-text error"}>
            Please select whether you smoke or not.
          </Col> }
        </div>
      </Col>
    );
  }
}