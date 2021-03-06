import * as React from "react";
import { Modal, Button, Row, Col, Radio, FormGroup } from "react-bootstrap";
import Input from "../common/textInput";
import Select from 'react-select';
import {each, isEmpty} from "underscore";
import TelLinkComponent from "../common/TelLinkComponent";

interface Props extends React.Props<Plan> {
}

let agentlicensedmodal = null;
export default class AgentLicensedModal extends React.Component<Props, {}> {
  constructor(){
    super();
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    if(agentlicensedmodal != null)
    agentlicensedmodal.removeEventListener("keydown", this.keyDownAgentLicensedModal.bind(this), false);
    agentlicensedmodal = null;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.showModalPhone && agentlicensedmodal == null){
      console.log('componentWillReceiveProps');
      const current = this;
      setTimeout(function(current){
        var modal = document.querySelector('div[role="dialog"].fade.in');        
        if(modal){
          agentlicensedmodal = modal;
          agentlicensedmodal.addEventListener("keydown", current.keyDownAgentLicensedModal.bind(current), false);  
        }
      },200,current);
    }
  }

  keyDownAgentLicensedModal(e){
    var keyCode = e.keyCode;
    var isModalPopup = document.querySelector('div[role="dialog"].fade.in');
    if(keyCode==13 && isModalPopup != null) {
        var activeElement = document.activeElement;
        if(activeElement.getAttribute('aria-haspopup') == null && !activeElement.classList.contains('react-datepicker-ignore-onclickoutside')){
          console.log("AgentLicenseModal.tsx");
          this.saveQuote();
        }
    }
  }

  validateEmailForm() {
    var isError = false;
    var emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    var input1Valid = emailRegex.test(this.state.email0);
    var input2Valid = emailRegex.test(this.state.email1);
    if (this.props.noOfPersons==2) {
      if ((!input1Valid && isEmpty(this.state.email0)) && (!input2Valid && isEmpty(this.state.email1))) {
        isError = true;
        this.setState({
          emailErrorExists: true,
          emailError0: true
        });
      } else {
        isError = false;
        this.setState({
          emailErrorExists: false
        });
        if (!input2Valid && !isEmpty(this.state.email1)) {
          isError = true;
          this.setState({
            ["emailError1"]: true
          });
        } else {
          this.setState({
            ["emailError1"]: false
          });
        }
        if (!input1Valid && !isEmpty(this.state.email0)) {
          isError = true;
          this.setState({
            ["emailError0"]: true
          });
        } else {
          this.setState({
            ["emailError0"]: false
          });
        }
      }
    } else {
      if (input1Valid) {
        isError = false;
        this.setState({
          emailError0: false
        });
        this.setState({
          emailErrorExists: false
        });
      } else {
        isError = true;
        this.setState({
          emailError0: true,
          emailErrorExists: true
        });
      }
    }

    return !isError;
  }

  saveQuote() {
    var phoneError = isEmpty(this.state.phone);
    if (phoneError) {
      //this.validateEmailForm();
      this.setState({
        phoneError: true
      });
    } else if (this.validateEmailForm()) {
      this.setState({
        savingQuote: true,
        phoneError: false
      });
      this.props.saveQuote().then(()=>{
        this.setState({
          savingQuote: false
        });
      });;
    }
  }

  state = {}

  handlePhoneChange(e) {
    if(this.validateEmailForm()) {
      this.setState({
        emailErrorExists: false
      });
    }
    var val = String(e.target.value).trim();
    var sampleVal = "123-123-1234";
    if (val.length > 0 && (sampleVal && sampleVal.length > val.length) && !(new RegExp(/^[a-zA-Z0-9]*$/).test(sampleVal[val.length]))) {
      if (this.state.phone && this.state.phone.length > val.length) {

      } else {
        val = val + sampleVal[val.length];
      }

    }
    this.props.handlePhoneChange(val);
    this.setState({
      phone: val
      phoneError: isEmpty(val)
    });
  }

  onSlotChange(key, obj) {
    this.setState({
      [key]: obj.value
    });
    this.props.handleSlotChange(obj.value);
  }

  onTextAllowedChange(k, v) {
    this.setState({[k]: v});
    this.props.keyValueChange(k, v);
  };

  handleChange(personIndex, e) {
    this.setState({
      personIndex: personIndex,
      ["email" + personIndex]: String(e.target.value).trim()
    });
    this.props.keyValueChange("email" + personIndex, String(e.target.value).trim());
    if(this.validateEmailForm()) {
      this.setState({
        emailErrorExists: false
      });
    }
  }
  getErrorsClassNames(errors, key) {
    if(errors[key]) {
      return "input-border-error";
    }
  }

  public render() {
    const timingSlots = [
      {
        value: "Morning",
        label: "Morning"
      },
      {
        value: "Afternoon",
        label: "Afternoon"
      },
      {
        value: "Evening",
        label: "Evening"
      },
      {
        value: "Night",
        label: "Night"
      }
    ];
    return (
       <Modal autoFocus={true} show={this.props.showModalPhone} onHide={this.props.onCloseModal} className="email-modal-container agent-modal-container">
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                    <Row className="email-quote-text">
                      Drop ticket to Vantis Life call center
                    </Row>
                    <Row>
                        <Col className="email-description c-center" sm={12}>
                        </Col>
                    </Row>

                    <Row style={{marginTop: "35px"}}>
                      <Col sm={6}>
                        <Col sm={12} className="email-label slot-label">
                          Best time to reach applicant?
                        </Col>
                        <Col sm={12} className={"slot-input-container"}>
                          <Select
                            name="form-field-slot"
                            options={timingSlots}
                            value={this.state.slot}
                            onChange={(slot)=>{
                              this.onSlotChange("slot", slot)
                            }}
                          />
                        </Col>
                      </Col>
                      <Col sm={6}>
                        <Col sm={12} className="email-label">
                          Phone number
                        </Col>
                        <Col sm={12} className={"email-input-container"}>
                          <Input
                            name={"phone-number"}
                            placeholder={"866-826-8471"}
                            value={this.state.phone}
                            onChange={this.handlePhoneChange.bind(this)}
                          />
                        </Col>
                      </Col>
                      {this.state.phoneError && <Col style={{textAlign: "right", color: "red", paddingRight: "33px", marginBottom: "15px",  fontSize: "15px", marginTop: "-5px"}} sm={12} className={"c-subheader-text error"}>
                        Please enter valid phone number.
                      </Col> }
                    </Row>
                    <Row className="okay-to-text-number">
                      <FormGroup className="radio-group">
                        <div className="c-radio" onClick={ ()=> {
                                this.onTextAllowedChange("text_accepted", "Yes")
                              }}>
                          <input
                            type="radio"
                            name={"text_accepted"}
                            checked={this.state.text_accepted == "Yes"}
                          />
                          <span style={{top: "3px"}}></span>
                          <label htmlFor={"text_accepted"}> It's okay to text this number. </label >
                        </div>
                      </FormGroup>
                    </Row>
                    <Row style={{marginTop: "35px"}}>
                      <Col sm={12} className="email-label email-label-on-modal">
                        Applicant Email address {this.props.noOfPersons ==2 && `1`}
                      </Col>
                      <Col sm={12} className={"email-input-container  email-input-container-on-modal"}>
                        <Input
                          name={"email-1"}
                          placeholder={"Enter your email"}
                          value={this.state.email0}
                          onChange={(e)=>{
                            this.handleChange(0, e)
                          }}
                          className={this.getErrorsClassNames(this.state, "emailError0")}
                        />
                        { this.state.emailError0 && <Col sm={12} className={"c-subheader-text error-msg"}  style={{paddingLeft: "0px", textAlign: "left", fontSize: "18px", marginBottom: "10px"}}>
                          Please enter valid email address of applicant{this.props.noOfPersons ==2 && ` 1`}.
                        </Col> }
                      </Col>
                    </Row>
                    {this.props.noOfPersons ==2 && <Row style={{marginTop: "35px"}}>
                        <Col sm={12} className="email-label" style={{paddingLeft: "15px"}}>
                          Applicant Email address 2
                        </Col>
                        <Col sm={12} className={"email-input-container  email-input-container-on-modal"}>
                          <Input
                            name={"email-1"}
                            placeholder={"Enter your email"}
                            value={this.state.email1}
                            onChange={(e)=>{
                              this.handleChange(1, e)
                            }}
                            className={this.getErrorsClassNames(this.state, "emailError1")}
                          />
                        { this.state.emailError1 && <Col sm={12} className={"c-subheader-text error-msg"}  style={{paddingLeft: "0px", textAlign: "left", fontSize: "18px", marginBottom: "10px"}}>
                          Please enter valid email address of applicant 2.
                        </Col> }
                        </Col>
                      </Row>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Row>
                      <Col sm={8} className="c-center">
                        <Button  style={{float: "right"}} className={`c-button-default circular ${this.state.savingQuote ? "active" : ""}`} onClick={(){
                            this.saveQuote()
                          }}
                          disabled={this.state.savingQuote}
                        >
                          SUBMIT
                          {this.state.savingQuote && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={10} className="c-center" style={{marginTop: "20px"}}>
                        <Row>
                          <Col className="free-toll-no-text">
                            Vantis Life Call Center toll free number  |  Mon-Fri 8:30 am - 6 pm, Eastern Time
                          </Col>
                          <Col className="free-toll-no center">
                            <TelLinkComponent
                                phoneNumber={this.props.phoneNumberDetails}
                              />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
    );
  }
}
