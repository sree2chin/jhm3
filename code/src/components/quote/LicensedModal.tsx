import * as React from "react";
import { Modal, Button, Row, Col, Radio } from "react-bootstrap";
import Input from "../common/textInput";
import Select from 'react-select';

interface Props extends React.Props<Plan> {
}

export default class LicensedModal extends React.Component<Props, {}> {
  constructor(){
    super();
  },

  saveQuote() {
    this.props.saveQuote();
  },

  state = {},

  handlePhoneChange(e) {
    this.props.handlePhoneChange(e.target.value);
    this.setState({
      phone: e.target.value
    });
  },

  onSlotChange(key, obj) {
    this.setState({
      [key]: obj.value
    });
    this.props.handleSlotChange(obj.value);
  },

  onTextAllowedChange(k, v) {
    this.props.keyValueChange(k, v);
  };

  public render() {  
    const timingSlots = [
      { 
        value: "Morning",
        label: "Morning"
      },
      { 
        value: "After noon",
        label: "After noon"
      },
      { 
        value: "Evening",
        label: "Evening"
      },
      { 
        value: "Night",
        label: "Night"
      }
    ];
    return (
       <Modal show={this.props.showModalPhone} onHide={this.props.onCloseModal} className="email-modal-container agent-modal-container">
                <Modal.Header closeButton>
                </Modal.Header>
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
                        <Col sm={12} className="email-label slot-label">
                          Best time to reach you?
                        </Col>
                        <Col sm={12} className={"slot-input-container"}>
                          <Select
                            name="form-field-slot"
                            options={timingSlots}
                            value={this.state.slot}
                            onChange={(slot)=>{
                              this.onSlotChange("slot", slot)
                            }}
                          />
                        </Col>
                      </Col>
                      <Col sm={6}>
                        <Col sm={12} className="email-label">
                          Phone number
                        </Col>
                        <Col sm={12} className={"email-input-container"}>
                          <Input 
                            name={"phone-number"}
                            placeholder={"555-555-5555"}
                            value={this.state.phone}
                            onChange={this.handlePhoneChange.bind(this)}
                          />
                        </Col>
                      </Col>
                    </Row>
                    <Row>
                      <Radio name="okay-to-text-number" 
                          onClick={ ()=> {
                            this.onTextAllowedChange("okay_to_text", "Yes")
                          }}>
                        It's okay to text this number.
                      </Radio>
                    </Row>
                </Modal.Body>
                <Modal.Footer style={{borderBottom: "none"}}>
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
                    <Row>
                      <Col sm={8}>
                        <Row>
                          <Col>
                            Vantis Life Call Center toll free number: 
                          </Col>
                          <Col>
                            555-555-5555
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
    );
  }
}
