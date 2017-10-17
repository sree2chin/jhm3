import * as React from "react";
import { Modal, Button, Row, Col, Radio } from "react-bootstrap";
import Input from "../common/textInput";

interface Props extends React.Props<Plan> {
}

export default class LicensedModal extends React.Component<Props, {}> {
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
  handleChange(e) {
    this.props.handleChange(e.target.value);
    
    this.setState({
      email: e.target.value
    });
  },
  onCloseModal() {

  },

  public render() {  

    return (
       <Modal show={this.props.showModalEmail} onHide={this.props.onCloseModal} className="email-modal-container">
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                    <Row className="email-quote-text">
                        Connect me to a licensed agent
                    </Row>
                    <Row>
                        <Col className="email-description c-center" sm={12}>
                            Tell us when we may best reach you and a number to call you on and a licensed agent will follow up with you quote.
                        </Col>
                    </Row>

                    <Row style={{marginTop: "35px"}}>
                      <Col sm={6}>
                        <Col sm={12} className="email-label">
                          Best time to reach you?
                        </Col>
                        <Col sm={12} className={"email-input-container"}>
                          <Input 
                            name={"email"}
                            placeholder={"Enter your email"}
                            value={this.state.email}
                            onChange={this.handleChange.bind(this)}
                          />
                        </Col>
                      </Col>
                      <Col sm={6}>
                        <Col sm={12} className="email-label">
                          Phone number
                        </Col>
                        <Col sm={12} className={"email-input-container"}>
                          <Input 
                            name={"email"}
                            placeholder={"Enter your email"}
                            value={this.state.email}
                            onChange={this.handleChange.bind(this)}
                          />
                        </Col>
                      </Col>
                    </Row>
                    <Row>
                      <Radio name="okay-to-text-number" 
                          onClick={ ()=> {
                            this.onChange("okay_to_text", "Yes")
                          }}>
                        Yes
                      </Radio>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Row>
                      <Col sm={8} className="c-center">
                        <Button  style={{float: "right"}} className="c-button-default circular" onClick={(){
                            this.saveQuote()
                          }}
                        >
                          SUBMIT
                        </Button>
                      </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
    );
  }
}
