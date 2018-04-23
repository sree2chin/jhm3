import * as React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Input from "../common/textInput";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface Props extends React.Props<ThanksPhone> {
}

class ThanksPhone extends React.Component<Props, {}> {
  constructor(){
    super();

  };
  state = {};
  public render() {
    return (
      <Modal show={this.props.showModalPhoneThanks} onHide={this.props.onCloseModal} bsSize="small">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                <Row>
                  <img style={{marginBottom: "34px", marginTop: "54px"}} src={"../images/thanks-phone.svg"} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ThanksPhone);
