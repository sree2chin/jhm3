import * as React from "react";
import { Modal, Button, Row, Col, FormGroup, ControlLabel } from "react-bootstrap";
import Input from "../common/textInput";
import DatePicker from 'react-datepicker';
import {Tooltip} from 'react-lightweight-tooltip';
import Select from 'react-select';
import { getStateObjects } from '../../utility/states';
import {isEmpty} from 'underscore';
import * as moment from "moment";
import {DateInputComponent, DateFormats } from "react-controlled-date-input";

interface Props extends React.Props<EditPerson> {
  personIndex: any,
  showModalEditPerson: any,
  handleChange: any,
  onCloseModal: any,
  editablePerson: any
}

export default class EditPerson extends React.Component<Props, {}> {
  constructor(){
    super();
  }
  state={}
  handleChange(personIndex, key, val) {
    this.setState({
      [key]: val
    });
  }

  onDateInputChange(year, month, date) {
    this.setState({ year, month, date });
    this.onDateChange("s_birthDate", month + "/" + date + "/" + year, month + "/" + date + "/" + year);
  }

  onDateChange(key, value, formattedDate) {
    var date = moment(new Date(value));
    if (date.isValid()) {
      this.setState({
        [key]: date,
        formattedDate
      });
    }
  }
  onChangeRaw(v, a, c) {
    console.log(v);
  }
  componentWillReceiveProps(nextProps) {
    if(!isEmpty(nextProps.editablePerson)) {
      const person = JSON.parse(JSON.stringify(nextProps.editablePerson));
      person.s_birthDate = moment(person.s_birthDate);
      this.setState(person);
    }
  }
  submitEditForm() {
    this.props.handleChange(this.state, true);
    this.props.onCloseModal();
  }


  public render() {
    var errors ={};
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
       <Modal bsSize="small" show={this.props.showModalEditPerson} className="edit-modal-container"  onHide={this.props.onCloseModal}>
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
                      Please select your gender.
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
                          <DatePicker
                            selected={this.state.s_birthDate}
                            onChange={(date)=>{
                              this.handleChange(personIndex, "s_birthDate", date)
                            }}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            placeholderText="MM/DD/YYYY"
                            minDate={moment().subtract(120, "year")}
                            maxDate={moment().add(0, "month")}
                          />
                        </FormGroup>
                    </Col>
                    { errors.s_birthDateError && <Col sm={12} className={"c-subheader-text error"}>
                      Please select your birth date.
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
                            Please select your state.
                          </Col> }
                    </Col>

                  </Row>
                  <Row  style={{marginBottom: "11px", marginLeft: "-15px"}}>
                    <Col sm={12} className={"c-subheader-text c-subheader-overall-health"} style={{marginTop: "15px"}}>
                      Overall health
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
                        Please indicate whether or not you use tobacco products.
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
