import * as React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Input from "../common/textInput";

interface Props extends React.Props<ResetPasswordModal> {
    resetPassword: any,
    handleChange: any,
    showModalResetPassword: any,
    onCloseModal: any,
    confirmPasswordError?: Boolean
}

export default class ResetPasswordModal extends React.Component<Props, {}> {
  constructor(){
    super();

  }
  resetPassword() {
    this.setState({
        resettingPassword: true
    });
    this.props.resetPassword(()=>{
        this.setState({
          resettingPassword: false
        });
      });
  }

  state = {}
  handleChange(key, e) {
    this.props.handleChange(key, e.target.value);
    this.setState({
      [key]: e.target.value
    });
  }
  onCloseModal() {

  }

  public render() {






    return (
       <Modal bsSize="large" show={this.props.showModalResetPassword} onHide={this.props.onCloseModal} className="email-modal-container email-modal-unique-container enter-password-modal-container">
                <Modal.Body style={{ fontSize: "16px", textAlign: "left"}}>
                    <Row className="email-quote-text email-quote-text-on-modal">
                      Reset password
                    </Row>
                    <Col sm={12} className={""} style={{marginBottom: "12px", paddingLeft: "0px"}}>
                      Reset your own password so you can save and return later. Your password must
                    </Col>
                    <Col sm={12} style={{marginBottom: "11px", paddingLeft: "0px"}} className="person-name-container">
                        <ul className="">
                            <li className="">Be at least 8 characters in length.</li>
                            <li className="">Contain at least 1 lowercase and 1 uppercase letter.</li>
                            <li className="">Contain at least 1 special character (!@#$%^&*)</li>
                            <li className="">Contain at least 1 number (0–9)</li>
                        </ul>
                    </Col>

                    <Row style={{marginTop: "35px"}}>
                      <Col sm={12} className="email-label email-label-on-modal">
                        Enter Password
                      </Col>
                      <Col sm={12} className={"email-input-container  email-input-container-on-modal"}>
                        <Input
                          name={"password-1"}
                          type={"password"}
                          placeholder={"Enter password"}
                          value={this.state.email0}
                          onChange={(e)=>{
                            this.handleChange("new_password", e)
                          }}
                          className="question-with-bottom-border"
                        />
                      </Col>
                    </Row>
                    <Row style={{marginTop: "35px"}}>
                      <Col sm={12} className={"email-input-container  email-input-container-on-modal"}>
                        <Input
                          name={"password-2"}
                          type={"password"}
                          placeholder={"Re-enter password"}
                          value={this.state.email0}
                          onChange={(e)=>{
                            this.handleChange("confirm_password", e)
                          }}
                          className="question-with-bottom-border"
                        />
                      </Col>
                      { this.props.confirmPasswordError && <Col style={{ paddingLeft: "0px", marginLeft: "auto", color: "red", fontSize: "15px"}} sm={12} className={"c-subheader-text error"}>
                        Password and confirm password must be same.
                      </Col> }
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Row>
                      <Col sm={12} className="c-center">
                        <Button  style={{float: "right"}} className={`c-button-default circular ${this.state.savingQuote ? "active" : ""}`}  onClick={(){
                            this.resetPassword()
                          }}
                        >
                          SUBMIT
                          {this.state.resettingPassword && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                        </Button>
                      </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
    );
  }
}
