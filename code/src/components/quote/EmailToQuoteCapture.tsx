import * as React from 'react';
import * as Autocomplete from "react-autocomplete"
import * as moment from "moment";
import {Link} from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import {each, isEmpty} from "underscore";
import {submitQuoteForm, submitEmailForm, setPersonsData, saveQuoteForm} from '../../actions/Quote';
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
import { browserHistory } from 'react-router';
import Input from "../common/textInput";
import Select from 'react-select';

interface Props {
  plans: [any]
}

class EmailToQuote extends React.Component<Props, {}> {
  constructor(){
    super();
    this.setState({
      type_of_submission: 10002
    });
  },
  state={},
  componentWillMount() {
    if (isEmpty(this.props.plans) && isEmpty(this.props.persons)) {
      const basePath = this.props.location.pathname.indexOf("/agent") > 1 ? "/agent" : "/";
      browserHistory.push(basePath);
    }
  },

  handlePhoneChange(e) {
    this.setState({
      phone: e.target.value
    });
  },
  validateEmailForm() {
    var isError = false;
    if(!this.state.email0) {
      this.setState({
        emailError0: true
      });
      isError = true;
    } else {
      this.setState({
        emailError0: false
      });
    }
    if(this.state.noOfPersons == 2) {
      if(!this.state.email0) {
        this.setState({
          emailError1: true
        });
      } else {
        this.setState({
          emailError1: false
        });
      }
      isError = true;
    }
    if(isError) {
      this.setState({
        emailErrorExists: true
      });
    }

    return !isError;
  },
  saveQuote() {
    const persons = [];

    if(this.validateEmailForm()) {
      const personOne = JSON.parse(JSON.stringify(this.props.persons[0]));
      personOne.sBirthDate = moment(personOne.s_birthDate).format("YYYY-MM-DD");
      personOne.type_of_submission = this.state.type_of_submission;
      if(this.state.email0) {
        personOne.email = this.state.email0;
      } else {
        personOne.email = "TEST@co.COM";
      }

      persons.push(personOne);

      if(this.props.noOfPersons == 2) {
        const personTwo = JSON.parse(JSON.stringify(this.props.persons[1]));
        personTwo.type_of_submission = this.state.type_of_submission;
        if(this.state.email1) {
          personTwo.email = this.state.email1;
        } else {
          personTwo.email = "TEST@co.COM";
        }
        
        persons.push(personTwo);
      }

      var data = {
        applicants: JSON.stringify(persons)
      };

      this.props.setPersonsData(persons);

      this.props.saveQuoteForm(data).then(() => {
        const basePath = this.props.location.pathname.indexOf("/agent") > 1 ? "/agent/" : "/";
        browserHistory.push(basePath + "email-quote-success");
      }).catch(()=>{
        this.submmitedProductForm = false;
      });
    } 
  },
  onSlotChange(key, obj) {
    this.setState({
      [key]: obj.value
    });
  },

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
  },
  getErrorsClassNames(errors, key) {
    if(errors[key]) {
      return "input-border-error";
    }
  },
  getSecondPersonName() {
    if (this.props.persons && this.props.persons[1]) {
      return 'and ' + this.props.persons[1].name;
    } 
    return "";
  },

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
                Before beginning the application, please enter email addresses for {this.props.persons && this.props.persons[0].name} {this.getSecondPersonName()} so that we can send your quotes to you as well as links you can use to return to your applications at any time.
            </Col>
        </Row>
        <Row style={{marginTop: "35px"}}>
          <Col sm={12} className="email-label email-label-on-modal">
            Applicant Email address 1
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
              Please enter email address of applicant 1.
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
            { this.state.emailError1 && <Col sm={12} className={"c-subheader-text error-msg"}  style={{paddingLeft: "0px"}}>
              Please enter email address of applicant 2.
            </Col> }
            </Col>
          </Row>
        }

        <Row className="contact-agent-text-submit-btn-container email-text-submit-btn-container">
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
    typeOfSubmission: state.quotes.typeOfSubmission
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