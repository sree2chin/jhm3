import * as React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Input from "../common/textInput";

interface Props extends React.Props<Plan> {
}

export default class ThanksPhone extends React.Component<Props, {}> {
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
                    Thank you!
                  </Col>
                  <Col sm={12} className="confirmation-email-text">
                    We will contact you soon
                  </Col>
                  <Col sm={12} className={"confirmation-email-desc"}>
                    An agent will be in touch with you as soon as possible during your selected availability window.
                  </Col>
                </Row>
            </Modal.Body>
       </Modal>
    );
  }
}
