import * as React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Input from "../common/textInput";

interface Props extends React.Props<Plan> {
}

export default class EmailModal extends React.Component<Props, {}> {
  constructor(){
    super();

  },
  onPlanChange(key, obj) {
    this.setState({
      [key]: obj.value,
      selectedPlan: obj,
      sFaceAmount: parseInt(obj.FaceMin)
    })
    this.props.submitPlansForm([{plan: obj, sFaceAmount: obj.FaceMin}]);
  },
  onPaymentTypeChange(key, obj) {
    this.setState({
      [key]: obj.value,
      selectedPaymentType: obj
    })
  },
  onFaceValChange(key, value) {
    this.setState({
      [key]: value,
    })
  },
  onsFaceAmountChange() {
    //this.props.submitPlansForm({sFaceAmount: this.state.sFaceAmount);
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
  handleChange(value) {
    this.setState({
      sFaceAmount: parseInt(value)
    });
  },

  public render() {  

    return (
       <Modal show={this.props.showModalEmail} onHide={this.props.onCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Email me the quote</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                    <Row>
                        Email the quote and fill it out at your best convience. Simply enter your 
                        email address below and we'll mail you a copy of this quote and a link to continue your application.
                    </Row>

                    <Row>
                      <Col sm={12} className="confirmation-email">
                        Email address
                      </Col>
                      <Col sm={12} className={"confirmation-email-input"}>
                        <Input 
                          name={"email"}
                          placeholder={"Enter your email"}
                          value={this.state.email}
                          onChange={this.handleChange.bind(this)}
                          />
                      </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
    );
  }
}
