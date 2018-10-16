import * as React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Input from "../common/textInput";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface Props extends React.Props<EmailModal> {
    submitPassword: any,
    handleChange: any,
    showModalPassword: any,
    onCloseModal: any,
    errorMsg?: any,
    questions?: any,
    sendResetLink?: any,
    resendData?: any,
    resendLinkDone?: any
}

class EmailModal extends React.Component<Props, {}> {
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
  sendResetLink() {
    this.setState({
        submittingPassword: true
    });
    this.props.sendResetLink(()=>{
      this.setState({
          submittingPassword: false
      });
    });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyDownTextField.bind(this), false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyDownTextField.bind(this), false);
  }
  keyDownTextField(e){
    var keyCode = e.keyCode;
    if(keyCode==13) {      
      var activeElement = document.activeElement;
      if(activeElement.getAttribute('aria-haspopup') == null && !activeElement.classList.contains('react-datepicker-ignore-onclickoutside')){
        this.submitPassword();
      }
    } else {
    }
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

  getMessage() {
    if (this.props.questions && this.props.questions.message && this.props.questions.message.length) {
      return this.props.questions.message;
    } else {
      return "Please click on the button to request a link to access the application";
    }
  }

  public render() {

    return (
      <Modal bsSize="large" bsStyle="primary" show={this.props.showModalPassword} onHide={this.props.onCloseModal} className="email-modal-container email-modal-unique-container enter-password-modal-container">
        <Modal.Body style={{ fontSize: "16px", textAlign: "left"}}>
            {/* <Row className="email-quote-text email-quote-text-on-modal">
              Enter your password
            </Row>
            <Row>
                <Col className="email-description email-description-on-modal c-center" sm={12}>

                </Col>
            </Row> */}

            <Row style={{marginTop: "35px"}}>
              {<Col sm={12} className="email-label email-label-on-modal">
                {this.getMessage()}
              </Col>}
              {/* <Col sm={12} className="email-label email-label-on-modal">
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
              </Col> */}
              { this.props.errorMsg && this.props.errorMsg.length > 0 && <Col style={{ paddingLeft: "15px", marginLeft: "auto", color: "red", fontSize: "15px"}} sm={12} className={"c-subheader-text error"}>
                {this.props.errorMsg}
              </Col> }
            </Row>

        </Modal.Body>
        <Modal.Footer>
            <Row>
              {/* <Col sm={12} className="c-center">
                <Button  style={{float: "right"}} className={`c-button-default circular ${this.state.savingQuote ? "active" : ""}`}  onClick={(){
                    this.submitPassword()
                  }}
                >
                  Request Link
                  {this.state.submittingPassword && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                </Button>
              </Col> */}
              {<Col sm={12}>
                {this.props.resendLinkDone ? <div style={{textAlign: "left"}}> {this.props.resendData.message}</div> :
                  (<Button  style={{float: "right"}} className={`c-button-default circular ${this.state.savingQuote ? "active" : ""}`}  onClick={(){
                      this.sendResetLink()
                    }}
                  >
                    Request Link
                    {this.state.submittingPassword && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                  </Button>)}
              </Col> }
            </Row>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    resendData: state.questions.resendData,
    resendLinkDone: state.questions.resendLinkDone
  }
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailModal);