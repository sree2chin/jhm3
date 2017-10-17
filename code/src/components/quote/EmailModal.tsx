import * as React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Input from "../common/textInput";

interface Props extends React.Props<Plan> {
}

export default class EmailModal extends React.Component<Props, {}> {
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

  public render() {  

    return (
       <Modal show={this.props.showModalEmail} onHide={this.props.onCloseModal} className="email-modal-container">
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                    <Row className="email-quote-text">
                        Email me the quote
                    </Row>
                    <Row>
                        <Col className="email-description c-center" sm={12}>
                            Email the quote and fill it out at your best convience. Simply enter your 
                            email address below and we'll mail you a copy of this quote and a link to continue your application.
                        </Col>
                    </Row>

                    <Row style={{marginTop: "35px"}}>
                      <Col sm={12} className="email-label">
                        Email address
                      </Col>
                      <Col sm={12} className={"email-input-container"}>
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
