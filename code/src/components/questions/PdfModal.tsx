import * as React from "react"
import { Modal, Button } from "react-bootstrap";
import { Document, Page } from 'react-pdf';

export interface PdfModal {
    link: any
}


const PdfModal = React.createClass<PdfModal, {}>({
    onLoadPdf(contextOfIframe) {
        console.log("sdds");
    },
    render() {
        return (
            <Modal autoFocus={true} bsSize="large"
                aria-labelledby="contained-modal-title-lg"
                show={this.props.link && this.props.link.length > 0}
                className="pdf-modal-container"
                onHide={this.props.onCloseModal}>
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>

                    <iframe id="pdf-iframe" frameborder="0" scrolling="no" onload="alert(this.contentWindow.location)" width="100%" src={this.props.link}></iframe>
                </Modal.Body>
            </Modal>
        )
    }
})

export default PdfModal
