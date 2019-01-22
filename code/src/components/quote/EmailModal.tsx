import * as React from "react";
import { Modal, Button, Row, Col, Radio, FormGroup } from "react-bootstrap";
import Input from "../common/textInput";
import {isEmpty} from "underscore";
import TelLinkComponent from "../common/TelLinkComponent";

interface Props extends React.Props<EmailModal> {
  onCloseModal: any,
  showModalEmail: any,
  saveQuote: any
}

let popupemailmodal = null;
let phonesampleVal = "123-123-1234";
export default class EmailModal extends React.Component<Props, {}> {
  constructor(){
    super();
  }

  componentWillUnmount() {    
    if(popupemailmodal != null)
    popupemailmodal.removeEventListener("keydown", this.keyDownEmailModal.bind(this), false);
    popupemailmodal = null;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.showModalEmail && popupemailmodal == null){      
      const current = this;
      setTimeout(function(current){
        var modal = document.querySelector('div[role="dialog"].fade.in');        
        if(modal){
          popupemailmodal = modal;
          popupemailmodal.addEventListener("keydown", current.keyDownEmailModal.bind(current), false);  
        }
      },200,current);
    }
  }

  keyDownEmailModal(e){    
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
    this.setState({
      alreadySubmittedOnce: true
    });
    if(this.validateEmailForm()) {
      this.setState({
        savingQuote: true
      });
      this.props.saveQuote().then(()=>{
        this.setState({
          savingQuote: false
        });
      });
    }
  }

  state = {}

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
    var phoneNumber = this.state.phone;
    var val = phoneNumber.trim();
    if (!isEmpty(val)) {
      this.props.handlePhoneChange(val);
      this.setState({
        phone: val
        phoneError: (val.length != phonesampleVal.length)
      });
    } else {
      //phoneError: isEmpty(phoneNumber)
    }
    return !isError;
  }

  handlePhoneChange(e) {
    /*if(this.validateEmailForm()) {
      this.setState({
        emailErrorExists: false
      });
    }*/
    var val = String(e.target.value).trim();
    //var sampleVal = "123-123-1234";
    if (val.length > 0 && (phonesampleVal && phonesampleVal.length > val.length) && !(new RegExp(/^[a-zA-Z0-9]*$/).test(phonesampleVal[val.length]))) {
      if (this.state.phone && this.state.phone.length > val.length) {

      } else {
        val = val + phonesampleVal[val.length];
      }

    }
    this.props.handlePhoneChange(val);
    this.setState({
      phone: val
      phoneError: (val.length > phonesampleVal.length)
    });
  }

  onTextAllowedChange(k, v) {
    this.setState({[k]: v});
    this.props.keyValueChange(k, v);
  };

  handleChange(personIndex, e) {
    var emailRegex =  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    this.props.handleChange(personIndex, String(e.target.value).trim());
    this.setState({
      personIndex: personIndex,
      ["email" + personIndex]: String(e.target.value).trim()
    }, ()=> {
      this.validateEmailForm();
    });
  }

  public render() {

    return (
       <Modal autoFocus={true} bsSize="small" show={this.props.showModalEmail} onHide={this.props.onCloseModal} className="email-modal-container email-modal-unique-container">
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                    <Row className="email-quote-text email-quote-text-on-modal">
                        {this.props.nextStep == "printTheQuote" ? "Print & Email Quote" :"Email the quote"}
                    </Row>
                    <Row>
                        <Col className="email-description email-description-on-modal c-center" sm={12}>
                            { this.props.fromAgentPage ? (
                              this.props.nextStep == "printTheQuote" ? "Please provide the applicant's email address where the quote should be sent. You will then be redirected to the Agent Panel so you can print the quote information." :
                              "Fill out this info to email the quote to the applicant! Then the application can be continued from the Agent panel.") :
                             "Complete your email address to receive the quote for your records. Then you can click submit to complete the application."
                            }
                        </Col>
                    </Row>

                    <Row style={{marginTop: "35px"}}>
                      <Col sm={12} className="email-label email-label-on-modal">
                        Applicant Email address
                      </Col>
                      <Col sm={12} className={"email-input-container  email-input-container-on-modal"}>
                        <Input
                          name={"email-1"}
                          placeholder={"Enter your email"}
                          value={this.state.email0}
                          onChange={(e)=>{
                            this.handleChange(0, e)
                          }}
                        />
                      </Col>
                    </Row>
                    {this.state.emailError0 && <Col style={{textAlign: "left", color: "red", paddingLeft: "0px", marginBottom: "15px", fontSize: "15px", marginTop: "-5px"}} sm={12} className={"c-subheader-text error"}>
                      Please enter valid email address of applicant{this.props.noOfPersons ==2 && ` 1`}.
                    </Col> }
                    {this.props.noOfPersons ==2 && <Row style={{marginTop: "15px"}}>
                        <Col sm={12} className="email-label">
                          Applicant Email address 2
                        </Col>
                        <Col sm={12} className={"email-input-container  email-input-container-on-modal"}>
                          <Input
                            name={"email-2" }
                            placeholder={"Enter your email"}
                            value={this.state.email1}
                            onChange={(e)=>{
                              this.handleChange(1, e)
                            }}
                          />
                        </Col>
                      </Row>
                    }
                    {this.state.emailError1 && <Col style={{textAlign: "left", color: "red", paddingLeft: "0px", marginBottom: "15px",  fontSize: "15px", marginTop: "-5px"}} sm={12} className={"c-subheader-text error"}>
                      Please enter valid email address of applicant 2.
                    </Col> }
                    <Row style={{marginTop: "35px"}}>
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
                        {this.state.phoneError && <Col style={{textAlign: "right", color: "red", paddingRight: "0px", marginBottom: "15px",  fontSize: "15px", marginTop: "-5px", textAlign: "left"}} sm={12} className={"c-subheader-text error"}>
                          Please enter valid phone number.
                        </Col> }
                      </Col>
                      <Col sm={6} className="okay-to-text-number">
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
                      </Col>
                    </Row>
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
