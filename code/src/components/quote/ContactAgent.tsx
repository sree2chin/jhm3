import * as React from 'react';
import * as Autocomplete from "react-autocomplete"
import * as moment from "moment";
import {Link} from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import {each, isEmpty} from "underscore";
import {submitQuoteForm, setPersonsData, saveQuoteForm} from '../../actions/Quote';
const objectAssign = require('object-assign');
import ThanksEmail from "./ThanksEmail";
import ThanksPhone from "./ThanksPhone";
import ProductContainer from "./ProductContainer";
import PersonInfo from "./PersonInfo";
import Subheader from "../common/subheader";
import Plan from "../common/Plan"
import { browserHistory } from 'react-router';
import {Tooltip} from 'react-lightweight-tooltip';
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";
import Input from "../common/textInput";
import Select from 'react-select';

interface Props {
  plans: [any]
}

class ContactAgent extends React.Component<Props, {}> {
  constructor(){
    super();
    this.setState({
      type_of_submission: 10003
    });
  }
  state={}
  componentWillMount() {
    var queryParams = this.props.location.query;
    var queryParamsString = "?";
    for(var k in queryParams) {
      if (queryParams[k]) {
        queryParamsString += k + "=" + queryParams[k] + "&";
      } else {
        queryParamsString += k + "&";
      }
    }
    queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);
    if (isEmpty(this.props.plans) && isEmpty(this.props.persons)) {
      if (this.props.quoteResponse && this.props.quoteResponse.LOGIN_URL && this.props.quoteResponse.LOGIN_URL.length > 0) {
        window.location.href = this.props.quoteResponse.LOGIN_URL;
        return;
      }
      const basePath = this.props.location.pathname.indexOf("/agent") > 1 || this.props.is_agent ? "/agent" : "/";
      browserHistory.push(basePath + queryParamsString);
    }
  }

  handlePhoneChange(e) {
    this.setState({
      phone: e.target.value
    });
  }
  handleSlotChange(v) {
    this.setState({
      slot: v
    });
  }
  onTextAllowedChange(k, v) {
    this.setState({[k]: v});
  }
  directToCorrespondingPage() {
    var queryParams = this.props.location.query;
    var queryParamsString = "?";
    for(var k in queryParams) {
      if (queryParams[k]) {
        queryParamsString += k + "=" + queryParams[k] + "&";
      } else {
        queryParamsString += k + "&";
      }
    }
    queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);
    const basePath = this.props.location.pathname.indexOf("agent") >=0 || this.props.is_agent ? "/agent/" : "/";
    if (this.state.nextStep == "continueToApplication") {
      browserHistory.push(basePath + "/connect-to-agent" + queryParamsString);
    } else if (this.state.nextStep == "connectMeToAgent" + queryParamsString) {
      browserHistory.push(basePath + "/agent/connect-to-agent" + queryParamsString);
    } else {
      browserHistory.push(basePath + "/agent/email-to-quote" + queryParamsString);
    }
  }
  getExtraInfo(data) {
      data.contact_time = this.state.slot;
      data.phone_number = this.state.phone;
  }
  saveQuote() {
    const persons = [];

    const personOne = JSON.parse(JSON.stringify(this.props.persons[0]));
    personOne.sBirthDate = moment(personOne.s_birthDate).format("YYYY-MM-DD");
    personOne.type_of_submission = this.state.type_of_submission;
    if(this.state.email0) {
      personOne.email = this.state.email0;
    }
    this.getExtraInfo(personOne);

    persons.push(personOne);

    if(this.props.noOfPersons == 2) {
      const personTwo = JSON.parse(JSON.stringify(this.props.persons[1]));
      personTwo.type_of_submission = this.state.type_of_submission;
      if(this.state.email1) {
        personTwo.email = this.state.email1;
      }

      this.getExtraInfo(personOne);
      persons.push(personTwo);
    }

    var data = {
      applicants: JSON.stringify(persons)
    };

    this.getExtraInfo(data)


    this.props.setPersonsData(persons);
    var queryParams = this.props.location.query;
    var queryParamsString = "?";
    for(var k in queryParams) {
      if (queryParams[k]) {
        queryParamsString += k + "=" + queryParams[k] + "&";
      } else {
        queryParamsString += k + "&";
      }
    }
    queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);

    this.props.saveQuoteForm(data).then(() => {
      if (this.props.quoteResponse && this.props.quoteResponse.LOGIN_URL && this.props.quoteResponse.LOGIN_URL.length > 0) {
        window.location.href = this.props.quoteResponse.LOGIN_URL;
        return;
      }
      const basePath = this.props.location.pathname.indexOf("/agent") > 1 || this.props.is_agent ? "/agent/" : "/";
      browserHistory.push(basePath + "connect-agent-success" + queryParamsString);
    }).catch(()=>{
      this.submmitedProductForm = false;
    });
  }
  onSlotChange(key, obj) {
    this.setState({
      [key]: obj.value
    });
  }
  public render() {
    const timingSlots = [
      {
        value: "Morning",
        label: "Morning"
      },
      {
        value: "Afternoon",
        label: "Afternoon"
      },
      {
        value: "Evening",
        label: "Evening"
      },
      {
        value: "Night",
        label: "Night"
      }
    ];
    return (
      <div className="email-modal-container agent-modal-container agent-page-container">
        <Row className="email-quote-text">
          <Row style={{marginLeft: "15px"}}>
            Connect me to a licensed agent
          </Row>
        </Row>
        <Row>
            <Col className="email-description c-center" sm={12}>
                Tell us when we may best reach you and a number to call you on and a licensed agent will follow up with your quote.
            </Col>
        </Row>
        <Row style={{marginTop: "35px"}}>
          <Col sm={6}>
            <Col sm={12} className="email-label slot-label">
              Best time to reach you?
            </Col>
            <Col sm={12} className={"slot-input-container"}>
              <Select
                name="form-field-slot"
                options={timingSlots}
                value={this.state.slot}
                onChange={(slot)=>{
                  this.onSlotChange("slot", slot)
                }}
              />
            </Col>
          </Col>
          <Col sm={6} className="contact-agent-phone-container">
            <Col sm={12} className="email-label">
              Phone number
            </Col>
            <Col sm={12} className={"email-input-container"}>
              <Input
                name={"phone-number"}
                placeholder={"800-252-7254"}
                value={this.state.phone}
                onChange={this.handlePhoneChange.bind(this)}
              />
            </Col>
          </Col>
        </Row>
        <Row className="okay-to-text-number">
          <FormGroup className="radio-group">
            <div className="c-radio" onClick={ ()=> {
                    this.onTextAllowedChange("okay_to_text", "Yes")
                  }}>
              <input
                type="radio"
                name={"okay_to_text"}
                checked={this.state.okay_to_text == "Yes"}
              />
              <span style={{top: "3px"}}></span>
              <label htmlFor={"okay_to_text"}> It's okay to text this number. </label >
            </div>
          </FormGroup>
        </Row>
        <Row className="contact-agent-text-submit-btn-container">
          <Row>
            <Col xs={8} className="c-center" style={{marginTop: "20px"}}>
              <Row>
                <Col style={{marginBottom: "15px"}}>
                  <span className="free-toll-no-text">
                    Vantis Life Call Center toll free number  |  M-F 8am to 7pm PST:
                  </span>
                  <span className="free-toll-no center">
                    1-866-826-8471
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={11} className="c-center">
              <Button  style={{float: "right"}} className={`c-button-default ${this.state.savingQuote ? "active" : ""}`} onClick={(){
                  this.saveQuote()
                }}
              >
                SUBMIT
                {this.state.savingQuote && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
              </Button>
            </Col>
          </Row>

        </Row>
      </div>);
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    persons: state.quotes.persons,
    products: state.quotes.products,
    noOfPersons: state.selectPersons.noOfPersons,
    plans: state.quotes.plans,
    premiums: state.quotes.premiums,
    typeOfSubmission: state.quotes.typeOfSubmission,
    is_agent: state.quotes.is_agent
  };
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
    setPersonsData: (data) => {
      return dispatch(setPersonsData(data))
    },
    saveQuoteForm: (data) => {
      return dispatch(saveQuoteForm(data))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactAgent);