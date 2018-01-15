import * as React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Input from "../common/textInput";

interface Props extends React.Props<EmailModal> {
    submitPassword: any,
    handleChange: any,
    showModalPassword: any,
    onCloseModal: any
}

export default class EmailModal extends React.Component<Props, {}> {
  constructor(){
    super();

  }
  submitPassword() {
    this.setState({
        submittingPassword: true
    });
    this.props.submitPassword();
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
       <Modal bsSize="small" bsStyle="primary" show={this.props.showModalPassword} onHide={this.props.onCloseModal} className="email-modal-container email-modal-unique-container">
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                    <Row className="email-quote-text email-quote-text-on-modal">
                        Authenticate
                    </Row>
                    <Row>
                        <Col className="email-description email-description-on-modal c-center" sm={12}>

                        </Col>
                    </Row>

                    <Row style={{marginTop: "35px"}}>
                      <Col sm={12} className="email-label email-label-on-modal">
                        Enter your password
                      </Col>
                      <Col sm={12} className={"email-input-container  email-input-container-on-modal"}>
                        <Input
                          name={"password-1"}
                          type={"password"}
                          placeholder={"Enter your password"}
                          value={this.state.password}
                          onChange={(e)=>{
                            this.handleChange(e)
                          }}
                        />
                      </Col>
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
