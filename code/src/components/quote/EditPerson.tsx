import * as React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Input from "../common/textInput";

interface Props extends React.Props<Plan> {
}

export default class EditPerson extends React.Component<Props, {}> {
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
  handleChange(personIndex, e) {
    this.props.handleChange(personIndex, e.target.value);
    this.setState({
      personIndex: personIndex,
      ["email" + personIndex]: e.target.value
    });
  },
  onCloseModal() {

  },

  public render() {  

    return (
       <Modal show={this.props.showModalEditPerson} onHide={this.props.onCloseModal} className="email-modal-container">
                <Modal.Header closeButton>
                  {"Applicant " + (0 + 1)}
                </Modal.Header>
                <Modal.Body style={{ fontSize: "25px", textAlign: "center"}}>
                    
                </Modal.Body>
                <Modal.Footer>
                
                </Modal.Footer>
            </Modal>
    );
  }
}
