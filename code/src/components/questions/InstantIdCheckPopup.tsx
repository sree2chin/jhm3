import * as React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Input from "../common/textInput";

interface Props extends React.Props<InstantIdCheckPopup> {
    showInstantIdCheckPopup: any,
    onCloseModal: any,
    instantIdCheckData: any
}

export default class InstantIdCheckPopup extends React.Component<Props, {}> {
  constructor(){
    super();
  }

  state = {}
  public render() {

    return (
          <Modal className="instant-id-check-popup-container" show={this.props.showInstantIdCheckPopup} onHide={this.props.onCloseModal} bsSize="big">
                <Modal.Header>
                  <img style={{float: "right", marginBottom: "25px", width: "24px", height: "24px"}} src={"../images/delete_beneficiary.svg"} onClick={()=>{
                          this.props.onCloseModal();
                        }}/>
                </Modal.Header>
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                    <Row>
                      <Col sm={12} className="instant-id-check-header">
                        {this.props.instantIdCheckData && this.props.instantIdCheckData.message_heading}
                      </Col>
                      <Col sm={12} className={"instant-id-check-desc"}>
                        {this.props.instantIdCheckData && this.props.instantIdCheckData.message_data}
                      </Col>
                      <Col>
                        <Button className={`c-button-default circular action`} style={{marginLeft: "15px", marginTop: "15px"}} onClick={()=>{
                            this.props.onCloseModal()
                          }}>
                            CLOSE
                        </Button>
                      </Col>
                    </Row>
                </Modal.Body>
            </Modal>
    );
  }
}
