import * as React from "react";
import { Modal, Button, Row, Col, Radio, FormGroup } from "react-bootstrap";
import Input from "../common/textInput";
import Select from 'react-select';

interface Props extends React.Props<Plan> {
}

export default class AgentLicensedModal extends React.Component<Props, {}> {
  constructor(){
    super();
  },

  saveQuote() {
    this.setState({
      savingQuote: true
    });
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
    this.setState({[k]: v});
    this.props.keyValueChange(k, v);
  };

  public render() {  
    const timingSlots = [
      { 
        value: "Morning",
        label: "Morning"
      },
      { 
        value: "Afternoon",
        label: "Afternoon"
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
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                    <Row className="email-quote-text">
                        Connect me to a licensed agent
                    </Row>
                    <Row>
                        <Col className="email-description c-center" sm={12}>
                            Tell us when we may best reach you and a number to call you on and a licensed agent will follow up with your quote.
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
                    <Row className="okay-to-text-number">
                      <FormGroup className="radio-group">
                        <div className="c-radio" onClick={ ()=> {
                                this.onTextAllowedChange("okay_to_text", "Yes")
                              }}>
                          <input 
                            type="radio" 
                            name={"okay_to_text"} 
                            checked={this.state.okay_to_text == "Yes"}
                          />
                          <span style={{top: "3px"}}></span>
                          <label htmlFor={"okay_to_text"}> It's okay to text this number. </label >
                        </div>
                      </FormGroup>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Row>
                      <Col sm={8} className="c-center">
                        <Button  style={{float: "right"}} className={`c-button-default circular ${this.state.savingQuote ? "active" : ""}`} onClick={(){
                            this.saveQuote()
                          }}
                        >
                          SUBMIT
                          {this.state.savingQuote && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={10} className="c-center" style={{marginTop: "20px"}}>
                        <Row>
                          <Col className="free-toll-no-text">
                            Vantis Life Call Center toll free number  |  M-F 8am to 7pm PST: 
                          </Col>
                          <Col className="free-toll-no center">
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