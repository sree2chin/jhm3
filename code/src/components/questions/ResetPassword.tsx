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
    this.props.resetPassword();
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
       <Modal bsSize="small" show={this.props.showModalResetPassword} onHide={this.props.onCloseModal} className="email-modal-container email-modal-unique-container">
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                    <Row className="email-quote-text email-quote-text-on-modal">
                        Reset your password
                    </Row>
                    <Row>
                        <Col className="email-description email-description-on-modal c-center" sm={12}>

                        </Col>
                    </Row>

                    <Row style={{marginTop: "35px"}}>
                      <Col sm={12} className="email-label email-label-on-modal">
                        Password
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
                        />
                      </Col>
                    </Row>
                    <Row style={{marginTop: "35px"}}>
                      <Col sm={12} className="email-label email-label-on-modal">
                        Confirm Password
                      </Col>
                      <Col sm={12} className={"email-input-container  email-input-container-on-modal"}>
                        <Input
                          name={"password-2"}
                          type={"password"}
                          placeholder={"Confirm your password"}
                          value={this.state.email0}
                          onChange={(e)=>{
                            this.handleChange("confirm_password", e)
                          }}
                        />
                      </Col>
                      { this.props.confirmPasswordError && <Col style={{ paddingLeft: "0px", marginLeft: "30px", color: "red"}} sm={12} className={"c-subheader-text error"}  style={{paddingLeft: "0px"}}>
                        Please select the number of person
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
