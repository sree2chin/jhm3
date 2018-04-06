import * as React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Input from "../common/textInput";

interface Props extends React.Props<EmailModal> {
    submitPassword: any,
    handleChange: any,
    showModalPassword: any,
    onCloseModal: any,
    errorMsg?: any
}

export default class EmailModal extends React.Component<Props, {}> {
  constructor(){
    super();

  }
  submitPassword() {
    this.setState({
        submittingPassword: true
    });
    this.props.submitPassword(()=>{
      this.setState({
          submittingPassword: false
      });
    });
  }

  state = {}
  handleChange(e) {
    this.props.handleChange(e.target.value);
    this.setState({
      password: e.target.value
    });
  }
  onCloseModal() {

  }

  public render() {

    return (
       <Modal bsSize="large" bsStyle="primary" show={this.props.showModalPassword} onHide={this.props.onCloseModal} className="email-modal-container email-modal-unique-container enter-password-modal-container">
                <Modal.Body style={{ fontSize: "16px", textAlign: "left"}}>
                    <Row className="email-quote-text email-quote-text-on-modal">
                      Enter your password
                    </Row>
                    <Row>
                        <Col className="email-description email-description-on-modal c-center" sm={12}>

                        </Col>
                    </Row>

                    <Row style={{marginTop: "35px"}}>
                      <Col sm={12} className="email-label email-label-on-modal">
                        Please enter your password below.
                      </Col>
                      <Col sm={12} className={"email-input-container email-input-container-on-modal"}>
                        <Input
                          name={"password-1"}
                          type={"password"}
                          placeholder={"Enter password here"}
                          value={this.state.password}
                          onChange={(e)=>{
                            this.handleChange(e)
                          }}
                          className="question-with-bottom-border"
                        />
                      </Col>
                      { this.props.errorMsg && this.props.errorMsg.length > 0 && <Col style={{ paddingLeft: "0px", marginLeft: "auto", color: "red", fontSize: "15px"}} sm={12} className={"c-subheader-text error"}>
                        {this.props.errorMsg}
                      </Col> }
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Row>
                      <Col sm={12} className="c-center">
                        <Button  style={{float: "right"}} className={`c-button-default circular ${this.state.savingQuote ? "active" : ""}`}  onClick={(){
                            this.submitPassword()
                          }}
                        >
                          SUBMIT
                          {this.state.submittingPassword && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                        </Button>
                      </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
    );
  }
}
