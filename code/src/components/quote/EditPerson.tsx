import * as React from "react";
import { Modal, Button, Row, Col, FormGroup, ControlLabel } from "react-bootstrap";
import Input from "../common/textInput";
import DatePicker from 'react-datepicker';
import {Tooltip} from 'react-lightweight-tooltip';
import Select from 'react-select';
import { getStateObjects } from '../../utility/states';
import {isEmpty,isEqual, extend} from 'underscore';
import * as moment from "moment";
import {DateInputComponent, DateFormats } from "react-controlled-date-input";

interface Props extends React.Props<EditPerson> {
  personIndex: any,
  showModalEditPerson: any,
  handleChange: any,
  onCloseModal: any,
  editablePerson: any
}
let initialpersonData = {};
let editpersonmodal = null;
export default class EditPerson extends React.Component<Props, {}> {
  constructor(){
    super();
  }

  state = {
    errors: {},
    initialQuoteSubmittedOnce:false
  }
  
  componentWillUnmount() {    
    if(editpersonmodal != null)
    editpersonmodal.removeEventListener("keydown", this.keyDowneditpersonmodal.bind(this), false);
    editpersonmodal = null;
  }

  keyDowneditpersonmodal(e){
    var keyCode = e.keyCode;
    var isModalPopup = document.querySelector('div[role="dialog"].fade.in');
    if(keyCode==13 && isModalPopup != null) {
        var activeElement = document.activeElement;
        if(activeElement.getAttribute('aria-haspopup') == null && !activeElement.classList.contains('react-datepicker-ignore-onclickoutside')){
          this.submitEditForm()
        }
    }
  }


  handleChange(personIndex, key, val) {    
    this.setState({
      [key]: val
    });
    //this.props.handleChange(this.props.personIndex, key, val);
    if (this.state.initialQuoteSubmittedOnce) {
      setTimeout(()=>{
        this.validateQuoteForm();
      }, 100);
    }
  }

  onDateInputChange(year, month, date) {
    this.setState({ year, month, date });    
    var momentDate = moment(new Date(month + "/" + date + "/" + year));
    if (momentDate.isValid()) {
      this.onDateChange("s_birthDate", month + "/" + date + "/" + year);
    }
  }

  validateQuoteForm() {
    var result = true;
    var errors = {};
    
    const {s_birthDate, s_gender, state, smoke, health, name} = this.state;

    const s_birthDateError = !(s_birthDate && moment(s_birthDate).format("YYYY-MM-DD").length > 0);
    const s_genderError = !(s_gender ==1 || s_gender ==2);
    const stateError = !(state && state.length > 0);
    const smokeError = !(smoke=="Yes" || smoke=="No");
    const healthError = !(health);    
    const nameError = !(name && String.prototype.trim.call(name).length > 0);

    errors = {
      s_birthDateError,
      s_genderError,
      stateError,
      smokeError,
      healthError,
      nameError
    };
    result = result && !(s_birthDateError || s_genderError || stateError || smokeError || healthError || nameError);

    this.setState({
      errors,
      initialQuoteSubmittedOnce:true
    });

    return result;
  }

  //this function is called after onChangeRaw
  onDateChange(key, value) {
    this.setState({
      [key]: ((value == null) ? null : moment(value)),
      formattedDate: ((value == null) ? null : moment(value).format("MM/DD/YYYY"))
    });
    this.handleChange(this.props.personIndex, key, value);
    if (this.state.initialQuoteSubmittedOnce) {
      setTimeout(()=>{
        this.validateQuoteForm();
      }, 100);
    }
  }

  //only for datepicker 
  onKeyDown(e) {
    if (e.keyCode == 13) {
      if (e.target.value && e.target.value.length ==10) {
      } else {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }
  onChangeRaw(e) {    
    var parentClass = ".edit-modal-container"
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
        var tempVal = val.substr(3, 2);
        var maxVal = 31;
        var monthVal =  parseInt(val.substr(0, 2));
        if (monthVal == 4 || monthVal == 6 || monthVal == 9 || monthVal == 11) {
          maxVal = 30
        } else if (monthVal == 2) {
          maxVal = 29;
        }
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

  componentWillReceiveProps(nextProps) {
    if(( (this.props.editablePerson == undefined || isEmpty(this.props.editablePerson))) && !isEmpty(nextProps.editablePerson)){
      initialpersonData = extend({},nextProps.editablePerson);
      initialpersonData.s_birthDate = moment(initialpersonData.s_birthDate);
    }

    //for keyboard
    if(nextProps.showModalEditPerson && editpersonmodal == null){      
      const current = this;
      setTimeout(function(current){
        var modal = document.querySelector('div[role="dialog"].fade.in');        
        if(modal){
          editpersonmodal = modal;
          editpersonmodal.addEventListener("keydown", current.keyDowneditpersonmodal.bind(current), false);  
        }
      },200,current);
    }

    if(!isEmpty(nextProps.editablePerson)) {      
      const person = extend({},nextProps.editablePerson);
      person.s_birthDate = moment(person.s_birthDate);
      this.setState(person);
    }
  }

  submitEditForm() {
    //console.log("initialpersonData");
    //console.log(initialpersonData);
    const newState = extend({}, this.state);
    const oldState = extend({}, initialpersonData);
    //trigger callback only if there is a change in fields
    if(!isEqual(newState, oldState)){      
      if(this.validateQuoteForm()) {
        this.props.handleChange(this.state, true);
        this.props.onCloseModal();
      }
    } else {
      this.props.onCloseModal();
    }
  }

  public render() {
    var {errors} = this.state;
    const {personIndex} = this.props;
    const toolTipStyles = {
      wrapper: {
        marginLeft: "15px",
        top: "5px",
        zIndex: "none"
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
    const healthRatingObjects = [
          {value: "Excellent", label: "Excellent"},
          {value: "Very Good", label: "Very Good"},
          {value: "Good", label: "Good"},
          {value: "Fair", label: "Fair"}
        ];
    const toolTipStylesBirthData = JSON.parse(JSON.stringify(toolTipStyles));
    toolTipStylesBirthData.wrapper.top = "0px";
    const toolTipStylesTobaccoUsage = JSON.parse(JSON.stringify(toolTipStyles));
    toolTipStylesTobaccoUsage.tooltip.width = "250px";
    toolTipStylesTobaccoUsage.wrapper.top = "0px";
    return (
       <Modal autoFocus={true} bsSize="small" show={this.props.showModalEditPerson} className="edit-modal-container"  onHide={this.props.onCloseModal}>
                <Modal.Header closeButton>
                  {"Applicant " + (personIndex + 1)}
                </Modal.Header>
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                  <Row>
                  <Col sm={12} style={{marginBottom: "11px"}} className="person-name-container">
                    <Input
                      name={"first-applicant-name-" + personIndex}
                      label="Name"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={(e) => {
                        this.handleChange(personIndex, "name", e.target.value
                      )}}
                    />
                    { errors.nameError && <Col sm={12} className={"c-subheader-text error"}  style={{paddingLeft: "0px"}}>
                      Please enter applicant name.
                    </Col> }
                  </Col>
                  <Col sm={12} className={"c-subheader-text"}>
                    Gender
                  </Col>
                  <Col sm={12} style={{paddingRight: "22px", marginBottom: "20px"}} className="person-gender-container">
                    <FormGroup className="radio-group">
                      <div className="c-radio" onClick={ ()=> {
                              this.handleChange(personIndex, "s_gender", "1")
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
                              this.handleChange(personIndex, "s_gender", "2")
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
                      Please select gender.
                    </Col> }
                  </Col>
                  </Row>
                  <Row style={{marginBottom: "27px", marginLeft: "-15px"}}>
                    <Col sm={12} className={"c-subheader-text"} style={{marginTop: "0px", marginBottom: "3px"}}>
                      Birth date
                    </Col>
                    <Col sm={12} className="birth-date-picker-container edit-birth-date-picker-container" >
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
                          <div style={{float: 'left'}}>
                            <DatePicker
                                selected={this.state.s_birthDate}
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
                                onKeyDown={this.onKeyDown.bind(this)}
                            />
                          </div>
                        </FormGroup>
                    </Col>
                    { errors.s_birthDateError && <Col sm={12} className={"c-subheader-text error"}>
                      Please select birth date.
                    </Col> }
                  </Row>
                  <Row style={{marginBottom: "12px", marginLeft: "-15px"}}>
                    <Col sm={12} className={"c-subheader-text"} style={{marginBottom: "2px"}}>
                      State
                    </Col>
                    <Col sm={12} className={"c-address-input"}>
                      <Select
                        name="form-field-name1"
                        options={statesObjects}
                        value={this.state.state}
                        onChange={(stateObj)=>{
                          this.handleChange(personIndex, "state", stateObj.value)
                        }}
                      />
                       { errors.stateError && <Col style={{ paddingLeft: "0px"}} sm={12} className={"c-subheader-text error"}>
                            Please select state.
                          </Col> }
                    </Col>

                  </Row>
                  <Row  style={{marginBottom: "11px", marginLeft: "-15px"}}>
                    <Col sm={12} className={"c-subheader-text c-subheader-overall-health"} style={{marginTop: "15px"}}>
                      How would you rate your overall health?
                    </Col>
                    <Col sm={12} style={{marginBottom: "10px", marginTop: "6px"}}>
                      <Select
                        name={"form-field-name-" + personIndex}
                        options={healthRatingObjects}
                        value={this.state.health}
                        onChange={(healthObj)=>{
                          this.handleChange(personIndex, "health", healthObj.value)
                        }}
                      />
                      <div style={{display: 'inline-block', float: "left"}}>
                        <Tooltip content="How would you rate your overall health?" styles={toolTipStyles}>
                          <img style={{marginBottom: "7px"}} src={"../images/question-mark.svg"} />
                        </Tooltip>
                      </div>
                      { errors.person1_healthError && <Col sm={12} className={"c-subheader-text error"}>
                        Please select your person1_health status.
                      </Col> }
                    </Col>

                  </Row>
                  <Row style={{marginBottom: "25px", marginLeft: "-15px"}}>
                    <Col sm={12} className={"c-subheader-text"}  style={{marginTop: "5px"}}>
                      <span>Tobacco use </span>
                      <div style={{display: 'inline-block'}}>
                        <Tooltip content="If you use of any tobacco-based products, e-cigarettes, vaping, or marijuana you are a tobacco user" styles={toolTipStylesTobaccoUsage}>
                          <img style={{marginBottom: "0px"}} src={"../images/question-mark.svg"} />
                        </Tooltip>
                      </div>
                    </Col>
                    <Col sm={12} style={{paddingRight: "22px"}} className="person-tobacco-container">
                      <FormGroup className="radio-group">
                        <div className="c-radio" onClick={ ()=> {
                                this.handleChange(personIndex, "smoke", "Yes")
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
                                this.handleChange(personIndex, "smoke", "No")
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
                        Please indicate whether or not use tobacco products.
                      </Col> }
                    </Col>
                  </Row>
                  <div>
                    <Col style={{marginLeft: "-20px", marginRight: "-20px", marginBottom: "-15px", borderRadius: "5px!important"}}>
                      <Button style={{border: "solid 1px #4584c0"}} className="c-button-default" onClick={()=>{
                          this.submitEditForm()
                        }}
                      >
                        SAVE CHANGES
                      </Button>
                    </Col>
                  </div>

                </Modal.Body>

            </Modal>
    );
  }
}