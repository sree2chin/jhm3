import * as React from 'react';
import * as Autocomplete from "react-autocomplete"
import * as moment from "moment";
import {Link} from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {Button, Row, Col, FormGroup, Radio, NavItem, Nav, Modal} from "react-bootstrap";
import SingleSelection from "./SingleSelection";
import Label from "./Label"
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import AsyncCustomSelect from "./AsyncCustomSelect";
import QuestionsCustomDatePicker from "./QuestionsCustomDatePicker";
import Subheader from "../common/subheader";
import {each, isEmpty, map} from "underscore";
import {getQuestions, authenticateUser, changePassword} from '../../actions/Questions';
const objectAssign = require('object-assign');
import { browserHistory } from 'react-router';
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";


interface Props  extends React.Props<Signature> {
  submitQuoteForm: ()=>void,
  submitProductsForm: ()=>void,
  getQuestions: any,
  postQuestions: any,
  confirmQuestions: any,
  questions: any,
  previousQuestionIds: any,
  getFactorsearch: any,
  authenticateUser: any,
  changePassword: any
}

class Signature extends React.Component<Props, {}> {
  constructor(){
    super();
  }
  state = {};
  questions:any = {};
  actualQuestionLists: any = [];
  questionComponents: any = [];

  componentWillMount() {

  }

  redirectToQuestions () {
    var queryParams = this.props.location.query;
    var queryParamsString = "?";
    for(var k in queryParams) {
      if (queryParams[k]) {
        queryParamsString += k + "=" + queryParams[k] + "&";
      } else {
        queryParamsString += k + "&";
      }
    }
    browserHistory.push("/questions" + queryParamsString);
  }

  public render() {
    return (
      <Modal autoFocus={true} bsSize="large" bsStyle="primary" show={true} onHide={this.redirectToQuestions.bind(this)} className="email-modal-container email-modal-unique-container enter-password-modal-container">
      <Modal.Body style={{ fontSize: "16px", textAlign: "left", padding: "78px 150px 25px 71px"}}>
          <Row className="email-quote-text email-quote-text-on-modal">
            Something doesn’t seem right…
          </Row>
          <Row style={{marginLeft: "0px", marginTop: "20px", marginBottom: "40px"}}>
            <Col sm={12} style={{marginBottom: "11px", paddingLeft: "0px"}} className="person-name-container">
              {this.props.questions.message}
            </Col>
          </Row>

      </Modal.Body>
      <Modal.Footer>
          <Row>
            <Col sm={12} className="c-center">
              <Button  style={{float: "right"}} className={`c-button-default circular ${this.state.savingQuote ? "active" : ""}`}  onClick={() => {
                  this.redirectToQuestions()
                }}
              >
                CLOSE
                {this.state.submittingPassword && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
              </Button>
            </Col>
          </Row>
      </Modal.Footer>
    </Modal>);
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    questions: state.questions.questions,
    user: state.questions.user
  }
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
    getQuestions: (data: any) => {
      return dispatch(getQuestions(data))
    },
    authenticateUser: (data: any) =>  {
      return dispatch(authenticateUser(data));
    },
    changePassword: (data: any) =>  {
        return dispatch(changePassword(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signature);