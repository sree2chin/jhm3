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
    var emailRegex =  /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var input1Valid = true, input2Valid = true;
    if (this.props.noOfPersons==2) {
      input1Valid = emailRegex.test(this.state.email0);
      input2Valid = emailRegex.test(this.state.email1);
    } else {
      input1Valid = emailRegex.test(this.state.email0);
    }

    if ((input1Valid && isEmpty(this.state.email1)) || (input2Valid && isEmpty(this.state.email0)) ||
        (input1Valid && input2Valid)) {
      this.setState({
        savingQuote: true
      });
      this.props.saveQuote().then(()=>{
        this.setState({
          savingQuote: false
        });
      });
    } else {
      if ((!input1Valid && !isEmpty(this.state.email1)) && (!input2Valid && !isEmpty(this.state.email1))) {
        this.setState({
          bothInputsInvalid: true
        });
      } else if (!input2Valid && !isEmpty(this.state.email1)) {
        this.setState({
          input1Invalid: true
        });
      } else {
        this.setState({
          input0Invalid: true
        });
      }
    }
  }

  state = {}
  handleChange(personIndex, e) {
    var emailRegex =  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    this.props.handleChange(personIndex, e.target.value);
    this.setState({
      personIndex: personIndex,
      ["email" + personIndex]: e.target.value
    }, ()=>{
      var input1Valid = emailRegex.test(this.state.email0);
      var input2Valid = emailRegex.test(this.state.email1);

      if ((!input1Valid && !isEmpty(this.state.email1)) && (!input2Valid && !isEmpty(this.state.email1)) && this.state.alreadySubmittedOnce) {
        this.setState({
          bothInputsInvalid: true
        });
      } else if (this.state.alreadySubmittedOnce) {
        this.setState({
          bothInputsInvalid: false
        });
        this.setState({
          ["input" + personIndex + "Invalid"]: !emailRegex.test(this.state["email" + personIndex]) && !isEmpty(this.state["email" + personIndex])
        });
      }
    });
  }
  onCloseModal() {

  }

  public render() {

    return (
       <Modal bsSize="small" show={this.props.showModalEmail} onHide={this.props.onCloseModal} className="email-modal-container email-modal-unique-container">
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                    <Row className="email-quote-text email-quote-text-on-modal">
                        Email the quote
                    </Row>
                    <Row>
                        <Col className="email-description email-description-on-modal c-center" sm={12}>
                            Fill out this info to email the quote to yourself for your records! Then you can click on the link to complete the application.
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
                    {this.state.input0Invalid && <Col style={{textAlign: "left", color: "red", paddingLeft: "0px", marginBottom: "15px", fontSize: "15px", marginTop: "-5px"}} sm={12} className={"c-subheader-text error"}>
                      Please enter valid email.
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
                    {this.state.input1Invalid && <Col style={{textAlign: "left", color: "red", paddingLeft: "0px", marginBottom: "15px",  fontSize: "15px", marginTop: "-5px"}} sm={12} className={"c-subheader-text error"}>
                      Please enter valid email.
                    </Col> }
                    {(!this.state.input0Invalid && !this.state.input1Invalid && this.state.bothInputsInvalid) && <Col style={{textAlign: "left", color: "red", paddingLeft: "0px", marginBottom: "15px",  fontSize: "15px", marginTop: "-5px"}} sm={12} className={"c-subheader-text error"}>
                      Please enter valid emails.
                    </Col> }
                </Modal.Body>
                <Modal.Footer>
                    <Row>
                      <Col sm={12} className="c-center">
                        <Button  style={{float: "right"}} className={`c-button-default circular ${this.state.savingQuote ? "active" : ""}`}  onClick={(){
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
