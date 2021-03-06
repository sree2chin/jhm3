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
import { browserHistory } from 'react-router';
import {Tooltip} from 'react-lightweight-tooltip';
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";
import Input from "../common/textInput";
import Select from 'react-select';

interface Props {
  plans: [any]
}

class EmailToQuote extends React.Component<Props, {}> {
  constructor(){
    super();
    this.setState({
      type_of_submission: 10001
    });
  };
  state={};
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
      const basePath = this.props.location.pathname.indexOf("/agent") > 1 || this.props.is_agent ? "/agent" : "/";
      browserHistory.push(basePath + queryParamsString);
    }
  };

  isInAgentFlow() {
    return window.location.pathname.indexOf("/agent")>=0
  }
  handlePhoneChange(e) {
    this.setState({
      phone: e.target.value
    });
  }
  validateEmailForm() {
    var isError = false;
    var emailRegex =  /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    var input1Valid = emailRegex.test(this.state.email0);
    var input2Valid = emailRegex.test(this.state.email1);

    if ((!input1Valid && isEmpty(this.state.email0)) && (!input2Valid && isEmpty(this.state.email1))) {
      isError = true;
      this.setState({
        emailErrorExists: true,
        emailError0: true
      });
    } else {
      isError = false;
      this.setState({
        emailErrorExists: false
      });
      if (!input2Valid && !isEmpty(this.state.email1)) {
        isError = true;
        this.setState({
          ["emailError1"]: true
        });
      } else {
        this.setState({
          ["emailError1"]: false
        });
      }
      if (!input1Valid && !isEmpty(this.state.email0)) {
        isError = true;
        this.setState({
          ["emailError0"]: true
        });
      } else {
        this.setState({
          ["emailError0"]: false
        });
      }

    }

    return !isError;
  }
  appendRequestType(person) {

  }
  getExtraInfo(data) {
    if ( this.props.typeOfSubmission == 10003) {
      data.request_type = 3;
      if (this.state.slot) {
        data.contact_time = this.state.slot;
      }
      if (this.state.phone) {
        data.phone_number = this.state.phone;
      }
      if (this.state.text_accepted) {
        data.text_accepted = this.state.text_accepted;
      } else {
        data.text_accepted = "No";
      }
    } else if (this.props.typeOfSubmission == 10001) {
      data.request_type = 1;
    } else if (this.props.typeOfSubmission == 10002) {
      data.request_type = 2;
    } else if (this.props.typeOfSubmission == 10004) {
      data.request_type = 4;
      if (this.state.slot) {
        data.contact_time = this.state.slot;
      }
      if (this.state.phone) {
        data.phone_number = this.state.phone;
      }
      if (this.state.text_accepted) {
        data.text_accepted = this.state.text_accepted;
      }
    } else if (this.props.typeOfSubmission == 10005) {
      data.request_type = 5;
      if (this.state.slot) {
        data.contact_time = this.state.slot;
      }
      if (this.state.phone) {
        data.phone_number = this.state.phone;
      }
      if (this.state.text_accepted) {
        data.text_accepted = this.state.text_accepted;
      }
    } else if (this.props.typeOfSubmission == 10006) {
      data.request_type = 6;
    } else if (this.props.typeOfSubmission == 10007) {
      data.request_type = 7;
    }
    if (this.state.slot) {
      data.contact_time = this.state.slot;
    }
    if (this.state.phone) {
      data.phone_number = this.state.phone;
    }
    if (this.state.text_accepted) {
      data.text_accepted = this.state.text_accepted;
    }
  }
  saveQuote() {
    const persons = [];

    if(this.validateEmailForm()) {
      const personOne = JSON.parse(JSON.stringify(this.props.persons[0]));
      personOne.sBirthDate = moment(personOne.s_birthDate).format("YYYY-MM-DD");
      personOne.type_of_submission = this.state.type_of_submission;
      personOne.request_type = 2;
      if(this.state.email0) {
        personOne.email = this.state.email0;
      }

      persons.push(personOne);

      if(this.props.noOfPersons == 2) {
        const personTwo = JSON.parse(JSON.stringify(this.props.persons[1]));
        personTwo.type_of_submission = this.state.type_of_submission;
        personTwo.request_type = 2;
        if(this.state.email1) {
          personTwo.email = this.state.email1;
        }

        persons.push(personTwo);
      }

      var data = {
        applicants: JSON.stringify(persons)
      };
      //data.request_type = 1;
      this.getExtraInfo(data);
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

      this.setState({
        savingQuote: true
      });
      this.props.saveQuoteForm(data).then(() => {
        if (this.props.quoteResponse && this.props.quoteResponse.LOGIN_URL && this.props.quoteResponse.LOGIN_URL.length > 0) {
          window.location.href = this.props.quoteResponse.LOGIN_URL;
          return;
        }
        if (this.props.quoteResponse && this.props.quoteResponse.redirect_url && this.props.quoteResponse.redirect_url.length > 0) {
          window.location.href = this.props.quoteResponse.redirect_url;
          return;
        }
        const basePath = this.props.location.pathname.indexOf("/agent") > 1 || this.props.is_agent ? "/agent/" : "/";
        browserHistory.push(basePath + "email-quote-success" + queryParamsString);
      }).catch(()=>{
        this.submmitedProductForm = false;
      });
    }
  }
  onSlotChange(key, obj) {
    this.setState({
      [key]: obj.value
    });
  }

  handleChange(personIndex, e) {
    if(this.state.emailErrorExists) {
      if(this.validateEmailForm()) {
        this.setState({
          emailErrorExists: false
        });
      }
    }
    this.setState({
      personIndex: personIndex,
      ["email" + personIndex]: e.target.value
    });
  }
  getErrorsClassNames(errors, key) {
    if(errors[key]) {
      return "input-border-error";
    }
  }
  getSecondPersonName() {
    if (this.props.persons && this.props.persons[1]) {
      return 'and ' + this.props.persons[1].name;
    }
    return "";
  }

  public render() {
    return (
      <div className="email-modal-container agent-modal-container agent-page-container">
        <Row className="email-quote-text">
          <Row style={{marginLeft: "15px"}}>
            Email capture
          </Row>
        </Row>
        <Row>
            <Col className="email-description c-center" sm={12}>
              {this.isInAgentFlow() ?
                "Before beginning the application, please enter the applicant's email address. An email with the quote information will be sent to them." :
                "Before beginning the application, please enter your preferred email address.  We will send you the estimated quote for your records."
              }
            </Col>
        </Row>
        <Row style={{marginTop: "35px"}}>
          <Col sm={12} className="email-label email-label-on-modal">
            Applicant Email address{this.props.noOfPersons ==2 && ` 1`}
          </Col>
          <Col sm={12} className={"email-input-container  email-input-container-on-modal"}>
            <Input
              name={"email-1"}
              placeholder={"Enter your email"}
              value={this.state.email0}
              onChange={(e)=>{
                this.handleChange(0, e)
              }}
              className={this.getErrorsClassNames(this.state, "emailError0")}
            />
            { this.state.emailError0 && <Col sm={12} className={"c-subheader-text error-msg"}  style={{paddingLeft: "0px", textAlign: "left", fontSize: "18px"}}>
              Please enter valid email address of applicant{this.props.noOfPersons ==2 && ` 1`}.
            </Col> }
          </Col>
        </Row>
        {this.props.noOfPersons ==2 && <Row style={{marginTop: "35px"}}>
            <Col sm={12} className="email-label">
              Applicant Email address 2
            </Col>
            <Col sm={12} className={"email-input-container  email-input-container-on-modal"}>
              <Input
                name={"email-1"}
                placeholder={"Enter your email"}
                value={this.state.email1}
                onChange={(e)=>{
                  this.handleChange(1, e)
                }}
                className={this.getErrorsClassNames(this.state, "emailError1")}
              />
            { this.state.emailError1 && <Col sm={12} className={"c-subheader-text error-msg"}  style={{paddingLeft: "0px", textAlign: "left", fontSize: "18px"}}>
              Please enter valid email address of applicant 2.
            </Col> }
            </Col>
          </Row>
        }

        <Row className="contact-agent-text-submit-btn-container email-text-submit-btn-container">
          <Row className="email-quote-btn-container">
            <Col xs={11} className="c-center">
              <Button  style={{float: "right"}} className={`c-button-default ${this.state.savingQuote ? "active" : ""}`} onClick={(){
                  this.saveQuote()
                }}
                disabled={this.state.savingQuote}
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
    is_agent: state.quotes.is_agent,
    quoteResponse: state.quotes.quoteResponse
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

export default connect(mapStateToProps, mapDispatchToProps)(EmailToQuote);