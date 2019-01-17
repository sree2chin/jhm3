import * as React from "react";
import { Modal, Button, Row, Col, Radio, FormGroup } from "react-bootstrap";
import Input from "../common/textInput";
import Select from 'react-select';
import { isEmpty } from "underscore";
import TelLinkComponent from "../common/TelLinkComponent";

interface Props extends React.Props<Plan> {
}
let licensemodal = null;
export default class LicensedModal extends React.Component<Props, {}> {
  constructor(){
    super();
  }

  componentWillUnmount() {    
    if(licensemodal != null)
    licensemodal.removeEventListener("keydown", this.keyDownlicensemodal.bind(this), false);
    licensemodal = null;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.showModalEmail && licensemodal == null){      
      const current = this;
      setTimeout(function(current){
        var modal = document.querySelector('div[role="dialog"].fade.in');        
        if(modal){
          licensemodal = modal;
          licensemodal.addEventListener("keydown", current.keyDownlicensemodal.bind(current), false);  
        }
      },200,current);
    }
  }

  keyDownlicensemodal(e){
    var keyCode = e.keyCode;
    var isModalPopup = document.querySelector('div[role="dialog"].fade.in');
    if(keyCode==13 && isModalPopup != null) {
        var activeElement = document.activeElement;
        if(activeElement.getAttribute('aria-haspopup') == null && !activeElement.classList.contains('react-datepicker-ignore-onclickoutside')){
          this.saveQuote();
        }
    }
  }

  saveQuote() {
    var phoneError = isEmpty(this.state.phone);
    if (phoneError) {
      this.validateEmailForm();
      this.setState({
        phoneError: true
      });
    } else {
      this.setState({
        phoneError: false
      });
      if (this.validateEmailForm()) {
        this.setState({
          savingQuote: true
        });
        this.props.saveQuote().then(()=>{
          this.setState({
            savingQuote: false
          });
        });;
      }
    }
  }

  state = {}

  handlePhoneChange(e) {
    var val = e.target.value;
    var sampleVal = "123-123-1234";
    if (val.length > 0 && (sampleVal && sampleVal.length > val.length) && !(new RegExp(/^[a-zA-Z0-9]*$/).test(sampleVal[val.length]))) {
      if (this.state.value && this.state.value.length > val.length) {

      } else {
        val = val + sampleVal[val.length];
      }

    }
    this.props.handlePhoneChange(val);
    this.setState({
      phone: val,
      phoneError: isEmpty(val)
    }, () => {
    });
  }
  validateEmailForm() {
    var isError = false;
    var emailRegex =  /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

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
  };
  onSlotChange(key, obj) {
    if (this.state.slotInputError) {
      this.setState({
        slotInputError: false
      });
    }
    this.setState({
      [key]: obj.value
    });
    this.props.handleSlotChange(obj.value);
  }

  onTextAllowedChange(k, v) {
    this.setState({[k]: v});
    this.props.keyValueChange(k, v);
  };

  getErrorsClassNames(errors, key) {
    if(errors[key]) {
      return "input-border-error";
    }
  }

  handleChange(personIndex, e) {
    var emailRegex =  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if(this.state.emailErrorExists) {
      if(this.validateEmailForm()) {
        this.setState({
          emailErrorExists: false
        });
      }
    }
    this.props.handleChange(personIndex, String(e.target.value).trim());
    this.setState({
      personIndex: personIndex,
      ["email" + personIndex]: String(e.target.value).trim()
    }, ()=>{
      this.validateEmailForm();
    });
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
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                    <Row className="email-quote-text">
                      Connect me to a licensed agent
                    </Row>
                    <Row>
                        <Col className="email-description c-center" sm={12}>
                            Please complete the information below and a licensed agent will contact you to complete your application.
                        </Col>
                    </Row>

                    <Row style={{marginTop: "35px"}}>
                      <Col sm={6}>
                        <Col sm={12} className="email-label slot-label">
                          Best time to reach you?
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
                            placeholder={"800-252-7254"}
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
                        Applicant Email address 1
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
                        { this.state.emailError0 && <Col sm={12} className={"c-subheader-text error-msg"}  style={{paddingLeft: "0px", fontSize: "16px", marginBottom: "15px"}}>
                          Please enter email address of applicant 1.
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
                        { this.state.emailError1 && <Col sm={12} className={"c-subheader-text error-msg"}  style={{paddingLeft: "0px", fontSize: "16px", marginBottom: "15px"}}>
                          Please enter email address of applicant 2.
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
                        >
                          SUBMIT
                          {this.state.savingQuote && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                        </Button>
                      </Col>
                    </Row>
                    <Row className="agent-modal-submit-text-container">
                      <Col className="agent-modal-submit-text">
                        By clicking SUBMIT, I consent to receive phone calls from Vantis Life Insurance Company, at the telephone numbers indicated above including wireless numbers, if provided. I understand these calls may be generated using an automatic dialing system. I understand consent is not required to get a quote, apply for insurance or to make a purchase from Vantis Life Insurance Company.
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={10} className="c-center" style={{marginTop: "20px"}}>
                        <Row>
                          <Col className="free-toll-no-text">
                          Vantis Life Call Center toll free number  |  Mon. – Fri., 8:30am – 5:00pm, EST:
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
