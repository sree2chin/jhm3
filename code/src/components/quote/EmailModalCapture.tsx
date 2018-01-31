import * as React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Input from "../common/textInput";

interface Props extends React.Props<Plan> {
}

export default class EmailModalCapture extends React.Component<Props, {}> {
  constructor(){
    super();

  }

  validateEmailForm() {
    var isError = false;
    if(!this.state.email0) {
      this.setState({
        emailError0: true
      });
      isError = true;
    } else {
      this.setState({
        emailError0: false
      });
    }
    if(this.state.noOfPersons == 2) {
      if(!this.state.email1) {
        this.setState({
          emailError1: true
        });
        isError = true;
      } else {
        this.setState({
          emailError1: false
        });
      }
    }
    if(isError) {
      this.setState({
        emailErrorExists: true
      });
    }

    return !isError;
  }
  saveQuote() {
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
  handleChange(personIndex, e) {
    if(this.state.emailErrorExists) {
      if(this.validateEmailForm()) {
        this.setState({
          emailErrorExists: false
        });
      }
    }
    this.props.handleChange(personIndex, e.target.value);
    this.setState({
      personIndex: personIndex,
      ["email" + personIndex]: e.target.value
    });
  }

  onCloseModal() {

  }
  getErrorsClassNames(errors, key) {
    if(errors[key]) {
      return "input-border-error";
    }
  }
  public render() {

    return (
       <Modal bsSize="small" show={this.props.showModalEmail} onHide={this.props.onCloseModal} className="email-modal-container email-modal-capture-container">
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                    <Row className="email-quote-text email-quote-text-on-modal">
                        Email capture
                    </Row>
                    <Row>
                        <Col className="email-description email-description-on-modal c-center" sm={12}>
                            Before beginning the application, please enter the applicant's email address. An email with the quote information and a link back to their application will be sent to them.
                        </Col>
                    </Row>

                    <Row style={{marginTop: "35px"}}>
                      <Col sm={12} className="email-label email-label-on-modal">
                        {this.props.noOfPersons ==2 && <Row> Applicant 1 Email </Row>}
                        {this.props.noOfPersons !=2 && <Row> Email address </Row>}
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
                        { this.state.emailError0 && <Col sm={12} className={"c-subheader-text error-msg"}  style={{paddingLeft: "0px"}}>
                          Please enter email address of applicant 1.
                        </Col> }
                      </Col>
                    </Row>
                    {this.props.noOfPersons ==2 && <Row style={{marginTop: "35px"}}>
                        <Col sm={12} className="email-label">
                          Applicant 2 Email
                        </Col>
                        <Col sm={12} className={"email-input-container  email-input-container-on-modal"}>
                          <Input
                            name={"email-2"}
                            placeholder={"Enter your email"}
                            value={this.state.email1}
                            onChange={(e)=>{
                              this.handleChange(1, e)
                            }}
                            className={this.getErrorsClassNames(this.state, "emailError1")}
                          />
                          { this.state.emailError1 && <Col sm={12} className={"c-subheader-text error-msg"}  style={{paddingLeft: "0px"}}>
                            Please enter email address of applicant 2.
                          </Col> }
                        </Col>
                      </Row>
                    }
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
