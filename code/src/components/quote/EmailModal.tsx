import * as React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Input from "../common/textInput";
import {isEmpty} from "underscore";

interface Props extends React.Props<EmailModal> {
  onCloseModal: any,
  showModalEmail: any,
  saveQuote: any
}

export default class EmailModal extends React.Component<Props, {}> {
  constructor(){
    super();

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
    return !isError;
  }

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
  onCloseModal() {

  }

  public render() {

    return (
       <Modal bsSize="small" show={this.props.showModalEmail} onHide={this.props.onCloseModal} className="email-modal-container email-modal-unique-container">
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                    <Row className="email-quote-text email-quote-text-on-modal">
                        {this.props.nextStep == "printTheQuote" ? "Print & Email Quote" :"Email the quote"}
                    </Row>
                    <Row>
                        <Col className="email-description email-description-on-modal c-center" sm={12}>
                            { this.props.fromAgentPage ? (
                              this.props.nextStep == "printTheQuote" ? "Please provide the applicant's email address where the quote should be sent. You will then be redirected to the Agent Panel so you can print the quote information." :
                              "Fill out this info to email the quote to the applicant! Then the application can be continued from the Agent panel.") :
                             "Fill out this info to email the quote to yourself for your records! Then you can click on the link to complete the application."
                            }
                        </Col>
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
                        />
                      </Col>
                    </Row>
                    {this.state.emailError0 && <Col style={{textAlign: "left", color: "red", paddingLeft: "0px", marginBottom: "15px", fontSize: "15px", marginTop: "-5px"}} sm={12} className={"c-subheader-text error"}>
                      Please enter email address of applicant 1.
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
                      Please enter email address of applicant 2.
                    </Col> }
                   
                </Modal.Body>
                <Modal.Footer>
                    <Row>
                      <Col sm={12} className="c-center">
                        <Button  style={{float: "right"}} className={`c-button-default circular ${this.state.savingQuote ? "active" : ""}`}  onClick={()=>{
                            this.saveQuote()
                          }}
                        >
                          SUBMIT
                          {this.state.savingQuote && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                        </Button>
                      </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
    );
  }
}
