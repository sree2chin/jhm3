import * as React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Input from "../common/textInput"

export interface PhoneNumberProps {
    showModalEmail: boolean
}

const EmailModal = React.createClass<PhoneNumberProps, {}>({
    constructor(){
        super();
    },
    state={},
    handleChange(e) {
        this.setState({
            email: e.targe.value
        })
    },
    render() {
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
                          name={"phone"}
                          placeholder={"Enter your phone number"}
                          value={this.state.phone}
                          onChange={this.handleChange.bind(this)}
                          />
                      </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
})

export default EmailModal
