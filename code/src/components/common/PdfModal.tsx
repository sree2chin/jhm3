import * as React from "react"
import { Modal, Button } from "react-bootstrap"

export interface PdfModal {
    link: any
}

const PdfModal = React.createClass<PdfModal, {}>({
    render() {
        return (
            <Modal show={this.props.link} onHide={this.props.onCloseModal}>

            </Modal>
        )
    }
})

export default PdfModal
