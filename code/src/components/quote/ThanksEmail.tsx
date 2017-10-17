import * as React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Input from "../common/textInput";

interface Props extends React.Props<Plan> {
}

export default class ThanksEmail extends React.Component<Props, {}> {
  constructor(){
    super();

  },
  saveQuote() {
    this.props.saveQuote();
  },
  getAmountFormat(amount) {
    var a = parseInt(amount);

    if(a/1000000 >=1) {
      return (a/1000000) + "m";
    } else {
      return (a/1000) + "k";
    }
  },

  
  state = {},
  public render() {  

    return (
          <Modal show={this.props.showModalEmailThanks} onHide={this.props.showModalEmailThanks}>
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                    <Row>
                      <Col sm={12} className="confirmation-email">
                        We've sent you an email!
                      </Col>
                      <Col sm={12} className={"confirmation-email-input"}>
                        We send your email a link where you can view the rest of the form and fill it out when you have time.
                      </Col>
                    </Row>
                </Modal.Body>
            </Modal>
    );
  }
}
