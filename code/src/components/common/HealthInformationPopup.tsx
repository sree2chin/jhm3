import * as React from "react";
import { Modal, Button, Row, Col, FormGroup, ControlLabel } from "react-bootstrap";
import Input from "../common/textInput";
import DatePicker from 'react-datepicker';
import {Tooltip} from 'react-lightweight-tooltip';
import Select from 'react-select';
import { getStateObjects } from '../../utility/states';
import {isEmpty} from 'underscore';
import * as moment from "moment";
import {DateInputComponent, DateFormats } from "react-controlled-date-input";

interface Props extends React.Props<HealthInformationPopup> {
  show: any,
  onCloseModal: any
}

export default class HealthInformationPopup extends React.Component<Props, {}> {
  constructor(){
    super();
  }
  state={}

  public render() {
    return (
       <Modal bsSize="small" show={this.props.show} className="edit-modal-container"  onHide={this.props.onCloseModal}>
                <Modal.Header closeButton>
                    Attention
                </Modal.Header>
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                  <Row>
                    <Col sm={12} className={"c-subheader-text"}>
                        If you have any of the following conditions, an offer of coverage may not be available:
                    </Col>
                    <Col sm={12} style={{marginBottom: "11px"}} className="person-name-container">
                        <ul className="list-group">
                            <li className="list-group-item">Alcohol and/or drug abuse or treatment</li>
                            <li className="list-group-item">Cancer diagnosed or treated in the last 10 years (with the exception of Basal or Squamous cell carcinoma)</li>
                        </ul>
                    </Col>


                  </Row>

                  <div>
                    <Col style={{marginLeft: "-20px", marginRight: "-20px", marginBottom: "-15px", borderRadius: "5px!important"}}>
                      <Button style={{border: "solid 1px #4584c0"}} className="c-button-default" onClick={()=>{
                          this.props.onCloseModal()
                        }}
                      >
                        CLOSE
                      </Button>
                    </Col>
                  </div>

                </Modal.Body>



            </Modal>
    );
  }
}
