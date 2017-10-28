import * as React from "react";
import { Modal, Button, Row, Col, FormGroup } from "react-bootstrap";
import Input from "../common/textInput";
import DatePicker from 'react-datepicker';
import {Tooltip} from 'react-lightweight-tooltip';
import Select from 'react-select';
import { getStateObjects } from '../../utility/states';
import {isEmpty} from 'underscore';
import * as moment from "moment";

interface Props extends React.Props<Plan> {
}

export default class EditPerson extends React.Component<Props, {}> {
  constructor(){
    super();

  },
  state={},
  saveQuote() {
    this.props.saveQuote();
  },
  
  state = {},
  handleChange(personIndex, key, val) {
    //this.props.handleChange(personIndex, key, val);
    this.setState({
      [key]: val
    });
  },
  componentWillReceiveProps(nextProps) {
    if(!isEmpty(nextProps.editablePerson)) {
      const person = JSON.parse(JSON.stringify(nextProps.editablePerson));
      person.s_birthDate = moment(person.s_birthDate);
      this.setState(person);
    }
  },

  onCloseModal() {

  },

  submitEditForm() {
    this.props.handleChange(this.state);
    this.props.onCloseModal();
  },

  public render() {  
    var errors ={};
    const {personIndex} = this.props;
    const toolTipStyles = {
      wrapper: {
        marginLeft: "15px",
        top: "5px"
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

    return (
       <Modal bsSize="small" show={this.props.showModalEditPerson} className="edit-modal-container"  onHide={this.props.onCloseModal} className="edit-modal-container">
                <Modal.Header closeButton>
                  {"Applicant " + (personIndex + 1)}
                </Modal.Header>
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                  <Row>
                  <Col sm={12} style={{marginBottom: "15px"}} className="person-name-container">
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
                  <Col sm={12} style={{paddingRight: "22px", marginBottom: "15px"}} className="person-gender-container">
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
                  <Row style={{marginBottom: "25px", marginLeft: "-15px"}}>
                    <Col sm={12} className={"c-subheader-text"} style={{marginTop: "0px", marginBottom: "3px"}}>
                      Birth date
                    </Col>
                    <Col sm={12} className="birth-date-picker-container" >
                        <span className="test-class">
                         
                        </span>
                        <DatePicker 
                          selected={this.state.s_birthDate} 
                          onChange={(date)=>{
                            this.handleChange(personIndex, "s_birthDate", date)
                          }}
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          placeholderText="MM/DD/YYYY"
                        />
                        <div style={{display: 'inline-block', float: "left"}}>
                          <Tooltip content="Please enter your date of birth" styles={toolTipStylesBirthData}>
                            <img style={{marginBottom: "2px"}} src={"../images/question-mark.svg"} />
                          </Tooltip>
                      </div>
                    </Col>
                    { errors.s_birthDateError && <Col sm={12} className={"c-subheader-text error"}>
                      Please select your birth date.
                    </Col> }
                  </Row>
                  <div style={{marginBottom: "12px", marginLeft: "-15px"}}>
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
                      <div style={{display: 'inline-block', float: 'left'}}>
                      <Tooltip content="Please select your state" styles={toolTipStyles}>
                        <img style={{marginBottom: "7px"}} src={"../images/question-mark.svg"} />
                      </Tooltip>
                      </div>
                       { errors.stateError && <Col style={{ paddingLeft: "0px"}} sm={12} className={"c-subheader-text error"}>
                            Please select your state.
                          </Col> }
                    </Col>
             
                  </div>
                  <div  style={{marginBottom: "0px", marginLeft: "-15px"}}>
                    <Col sm={12} className={"c-subheader-text"} style={{marginTop: "15px"}}>
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
                      <Tooltip content="Please select your health status" styles={toolTipStyles}>
                        <img style={{marginBottom: "7px"}} src={"../images/question-mark.svg"} />
                      </Tooltip>
                      </div>
                      { errors.person1_healthError && <Col sm={12} className={"c-subheader-text error"}>
                        Please select your person1_health status.
                      </Col> }
                    </Col>

                  </div>
                  <div style={{ marginLeft: "-15px"}}>
                    <Col sm={12} className={"c-subheader-text"}  style={{marginTop: "5px"}}>
                      Tobacco use
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
                        Please select whether you smoke or not.
                      </Col> }
                    </Col>
                  </div>
                  <div>
                    <Col style={{marginLeft: "-15px", marginRight: "-15px", marginBottom: "-15px"}}>
                      <Button className="c-button-default" onClick={(){
                          this.submitEditForm()
                        }}
                        style={{borderRadius: "5px!important"}}
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
