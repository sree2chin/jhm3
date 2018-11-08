import * as React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Input from "../common/textInput";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface Props extends React.Props<Plan> {
}

class ThanksEmail extends React.Component<Props, {}> {
  constructor(){
    super();

  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyDownTextField.bind(this), false);    
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyDownTextField.bind(this), false);
  }

  keyDownTextField(e){
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
    this.props.saveQuote();
  }
  getAmountFormat(amount) {
    var a = parseInt(amount);

    if(a/1000000 >=1) {
      return (a/1000000) + "m";
    } else {
      return (a/1000) + "k";
    }
  }
  state = {}
  public render() {

    return (
          <Modal show={this.props.showModalEmailThanks} onHide={this.props.onCloseModal} bsSize="small">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                    <Row>
                      <img style={{marginBottom: "34px", marginTop: "54px"}} src={"../images/thanks-email.svg"} />
                    </Row>
                    <Row>
                      <Col sm={12} className="confirmation-email-text">
                        {this.props.quoteResponse && this.props.quoteResponse.data && this.props.quoteResponse.data.message_heading}
                      </Col>
                      <Col sm={12} className={"confirmation-email-desc"}>
                        {this.props.quoteResponse && this.props.quoteResponse.data && this.props.quoteResponse.data.message_text}
                      </Col>
                    </Row>
                </Modal.Body>
            </Modal>
    );
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    quoteResponse: state.quotes.quoteResponse
  };
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThanksEmail);
