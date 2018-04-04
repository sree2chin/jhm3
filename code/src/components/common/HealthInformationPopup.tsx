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
       <Modal bsSize="large" show={this.props.show} className="health-information-popup-modal"  onHide={this.props.onCloseModal}>
                <Modal.Header closeButton>
                    Attention
                </Modal.Header>
                <Modal.Body style={{}}>
                  <Row>
                    <Col sm={12} className={""} style={{marginBottom: "12px"}}>
                        If you have any of the following conditions, an offer of coverage may not be available:
                    </Col>
                    <Col sm={12} style={{marginBottom: "11px"}} className="person-name-container">
                        <ul className="">
                            <li className="">Alcohol and/or drug abuse or treatment</li>
                            <li className="">Cancer diagnosed or treated in the last 10 years (with the exception of Basal or Squamous cell carcinoma)</li>
                            <li className="">Heart Disease or heart rhythm abnormality</li>
                            <li className="">Major Depression or Bi-polar disorder, dementia or Alzheimer’s</li>
                            <li className="">Chronic Obstructive Lung disease or a history of hospitilizations for a lung disorder</li>
                            <li className="">Insulin Dependent Diabetes or a chronic Kidney Disease or Disorder</li>
                            <li className="">A chronic liver disease or disorder</li>
                            <li className="">Stroke or mini-stroke (TIA), Parkinson’s, Multiple Sclerosis or seizures</li>
                            <li className="">A disease or disorder of the immune system requiring hospitalization or chronic treatment</li>
                            <li className="">A history of a felony, incarceration, multiple DUI’s or license suspension</li>
                        </ul>
                    </Col>


                  </Row>
                </Modal.Body>
                <div>
                    <Col style={{textAlign: "center"}}>
                      <Button style={{border: "solid 1px #4584c0", width: "30%", marginBottom: "36px"}} className="c-button-default" onClick={()=>{
                          this.props.onCloseModal()
                        }}
                      >
                        CLOSE
                      </Button>
                    </Col>
                  </div>


            </Modal>
    );
  }
}
