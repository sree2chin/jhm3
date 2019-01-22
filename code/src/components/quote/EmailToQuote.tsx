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
import TelLinkComponent from "../common/TelLinkComponent";

interface Props {
  plans: [any]
}

class EmailToQuote extends React.Component<Props, {}> {
  constructor(){
    super();
    this.setState({
      type_of_submission: 10002
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
    var val = String(e.target.value).trim();
    var sampleVal = "123-123-1234";
    if (val.length > 0 && (sampleVal && sampleVal.length > val.length) && !(new RegExp(/^[a-zA-Z0-9]*$/).test(sampleVal[val.length]))) {
      if (this.state.phone && this.state.phone.length > val.length) {

      } else {
        val = val + sampleVal[val.length];
      }

    }
    this.setState({
      phone: val
      phoneError: isEmpty(val)
    });
  };
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
  };
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
      if(this.state.email0) {
        personOne.email = this.state.email0;
      }

      persons.push(personOne);

      if(this.props.noOfPersons == 2) {
        const personTwo = JSON.parse(JSON.stringify(this.props.persons[1]));
        personTwo.type_of_submission = this.state.type_of_submission;
        if(this.state.email1) {
          personTwo.email = this.state.email1;
        }

        persons.push(personTwo);
      }

      var data = {
        applicants: JSON.stringify(persons)
      };
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
      this.setState({
        savingQuote: true
      });
      queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);
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
      }).catch(() => {
        this.submmitedProductForm = false;
      });
    }
  };
  onSlotChange(key, obj) {
    this.setState({
      [key]: obj.value
    });
  };
  onTextAllowedChange(k, v) {
    this.setState({[k]: v});
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
  };
  getErrorsClassNames(errors, key) {
    if(errors[key]) {
      return "input-border-error";
    }
  };
  public render() {
    return (
      <div className="email-modal-container agent-modal-container agent-page-container">
        <Row className="email-quote-text">
          <Row style={{marginLeft: "15px"}}>
            Email the quote
          </Row>
        </Row>
        <Row>
            <Col className="email-description c-center" sm={12}>
              {this.isInAgentFlow() ? (
                this.props.typeOfSubmission == 10006 ? "Fill out this info to email the quote to the applicant! The applicant can click on the link to complete the application." :
                "Fill out this info to email the quote to the applicant! Then the application can be continued from the Agent panel.") :
                "Fill out this info to email the quote to yourself for your records! Then you can click on the link to complete the application."
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
            { this.state.emailError0 && <Col sm={12} className={"c-subheader-text error-msg"}  style={{paddingLeft: "0px"}}>
              Please enter valid email address of applicant.
            </Col> }
          </Col>
        </Row>
        <Row style={{marginTop: "35px"}}>
          <Col sm={6}>
            <Col sm={12} className="email-label">
              Phone number
            </Col>
            <Col sm={12} className={"email-input-container"}>
              <Input
                name={"phone-number"}
                placeholder={"866-826-8471"}
                value={this.state.phone}
                onChange={this.handlePhoneChange.bind(this)}
              />
            </Col>
            {this.state.phoneError && <Col style={{color: "red", paddingRight: "0px", marginBottom: "15px",  fontSize: "15px", marginTop: "-5px", textAlign: "left"}} sm={12} className={"c-subheader-text error"}>
              Please enter valid phone number.
            </Col> }
          </Col>
          <Col sm={6} className="okay-to-text-number">
            <FormGroup className="radio-group">
              <div className="c-radio" onClick={ ()=> {
                      this.onTextAllowedChange("text_accepted", "Yes")
                    }}>
                <input
                  type="radio"
                  name={"text_accepted"}
                  checked={this.state.text_accepted == "Yes"}
                />
                <span style={{top: "3px"}}></span>
                <label htmlFor={"text_accepted"}> It's okay to text this number. </label >
              </div>
            </FormGroup>
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
            { this.state.emailError1 && <Col sm={12} className={"c-subheader-text error-msg"}  style={{paddingLeft: "0px"}}>
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
              >
                SUBMIT
                {this.state.savingQuote && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
              </Button>
            </Col>
          </Row>
          <Row style={{marginLeft: "20px"}} className="agent-modal-submit-text-container">
            <Col className="agent-modal-submit-text">
              By clicking SUBMIT, I consent to receive phone calls from Vantis Life Insurance Company, at the telephone numbers indicated above including wireless numbers, if provided. I understand these calls may be generated using an automatic dialing system. I understand consent is not required to get a quote, apply for insurance or to make a purchase from Vantis Life Insurance Company.
            </Col>
          </Row>
          <Row style={{marginLeft: "15px"}}>
            <Col sm={10} className="c-center" style={{marginTop: "20px"}}>
              <Row>
                <Col className="free-toll-no-text">
                  Vantis Life Call Center toll free number  |  Mon-Fri 8:30 am - 6 pm, Eastern Time
                </Col>
                <Col className="free-toll-no center">
                  <TelLinkComponent
                      phoneNumber={this.props.phoneNumberDetails}
                    />
                </Col>
              </Row>
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
    quoteResponse: state.quotes.quoteResponse,
    phoneNumberDetails: state.quotes.phoneNumberDetails
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