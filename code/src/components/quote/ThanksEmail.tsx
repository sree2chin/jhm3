import * as React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Input from "../common/textInput"

export interface PhoneNumberProps {
    showModalEmail: boolean
}

const ThanksEmailModal = React.createClass<PhoneNumberProps, {}>({
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
        )
    }
})

export default ThanksEmailModal
