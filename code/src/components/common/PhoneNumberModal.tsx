import * as React from "react"
import { Modal, Button } from "react-bootstrap"
import TelLinkComponent from "./TelLinkComponent"

export interface PhoneNumberProps {
    showModalPhoneNumber: boolean,
    phoneNumber: string,
    name: string,
    titleText: string,
    onCloseModal: any
}

const PhoneNumberModal = React.createClass<PhoneNumberProps, {}>({
    render() {
        return (
            <Modal show={this.props.showModalPhoneNumber} onHide={this.props.onCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">{this.props.titleText}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                    <span>{this.props.name}:{" "} </span>
                    <TelLinkComponent phoneNumber={this.props.phoneNumber} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
})

export default PhoneNumberModal
