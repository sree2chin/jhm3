import * as React from 'react';
import * as Autocomplete from "react-autocomplete"
import * as moment from "moment";
import {Link} from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import {each, isEmpty} from "underscore";
import {submitQuoteForm, submitEmailForm, setPersonsData, saveQuoteForm, setTypeOfSubmission} from '../../actions/Quote';
const objectAssign = require('object-assign');
import ProductHeader from "./ProductHeader";
import EmailModal from "./EmailModal";
import ThanksEmail from "./ThanksEmail";
import ThanksPhone from "./ThanksPhone";
import AgentLicensedModal from "./AgentLicensedModal";
import ProductContainer from "./ProductContainer";
import PersonInfo from "./PersonInfo";
import Subheader from "../common/subheader";
import Plan from "../common/Plan"
import { browserHistory } from 'react-router';
import EmailModalCapture from "./EmailModalCapture";

interface Props {
  plans: [any]
}

class PlansPage extends React.Component<Props, {}> {
  constructor(){
    super();
    this.changeTypeOfSubmission.bind(this);
    this.openAgentInputPopup.bind(this);
    this.openEmailPopup.bind(this);
  },
  state={},
  componentWillMount() {
    if (isEmpty(this.props.plans) && isEmpty(this.props.persons)) {
      const basePath = this.props.location.pathname.indexOf("agent") > 1 ? "/agent" : "/";
      browserHistory.push(basePath);
    }
  },

  selectProduct(product) {
    this.setState({
      productId: product.ProductID
    });
  },

  changeTypeOfSubmission(val) {
    this.setState({
      type_of_submission: val
    })
    this.props.setTypeOfSubmission(val);
  },

  submitQuote() {
    this.props.submitQuote();
  },

  openEmailCapturePopup() {
    this.setState({
      showModalEmailCapture: true,
      type_of_submission: 10001,
      showModalPhone: false,
      showModalEmail: false,
    });
  },

  openEmailPopup() {
    this.setState({
      showModalEmail: true,
      showModalPhone: false,
      showModalEmailCapture: false,
      type_of_submission: 10002
    });
  },

  openAgentInputPopup() {
    this.setState({
      showModalPhone: true,
      showModalEmail: false,
      showModalEmailCapture: false,
      type_of_submission: 10005
    });
  },

  handlePhoneChange(v) {
    this.setState({
      phone: v
    });
  },
  handleSlotChange(v) {
    this.setState({
      slot: v
    });
  },
  getExtraInfo(data) {
    if ( this.state.type_of_submission == 10003) {
      data.contact_time = this.state.slot;
      data.phone_number = this.state.phone;
    }
  },
  saveQuote() {
    const persons = [];

    const personOne = JSON.parse(JSON.stringify(this.props.persons[0]));
    personOne.sBirthDate = moment(personOne.s_birthDate).format("YYYY-MM-DD");
    personOne.type_of_submission = this.state.type_of_submission;
    if(this.state.email0) {
      personOne.email = this.state.email0;
    } else {
      personOne.email = "TEST@co.COM";
    }

    this.getExtraInfo(personOne);

    persons.push(personOne);

    if(this.props.noOfPersons == 2) {
      const personTwo = JSON.parse(JSON.stringify(this.props.persons[1]));
      personTwo.type_of_submission = this.state.type_of_submission;
      if(this.state.email1) {
        personTwo.email = this.state.email1;
      } else {
        personTwo.email = "TEST@co.COM";
      }

      this.getExtraInfo(personOne);
      persons.push(personTwo);
    }

    var data = {
      applicants: JSON.stringify(persons)
    };

    this.getExtraInfo(data)


    this.props.setPersonsData(persons);

    this.props.saveQuoteForm(data).then(() => {
      var k1, k2;
      if(this.state.type_of_submission == 10002) {
        k1 = "showModalEmailThanks";
        k2 = "showModalEmail";
      } else if(this.state.type_of_submission == 10001) {
        k1 = "showModalEmailThanks";
        k2 = "showModalEmailCapture";
      } else {
        k1 = "showModalPhoneThanks";
        k2 = "showModalPhone";
      }
      this.setState({
        [k1]: true,
        [k2]: false
      });
    }).catch(()=>{
      this.submmitedProductForm = false;
    });
  },
  handleEmailChange(personIndex, v) {
    this.setState({
      ["email" + personIndex]: v
    });
  }
  closeEmailThanksModal() {
    this.setState({
      showModalEmailThanks: false
    });
  }
  closeEmailModal() {
    this.setState({
      showModalEmail: false
    });
  },
  closeAgentLicensedModal() {
    this.setState({
      showModalPhone: false
    });
  },
  keyValueChange(k, v) {
    this.setState({
      [k]: v
    });
  },
  openCorrespondingPopup() {
    if (this.state.nextStep == "continueToApplication") {
      this.openEmailCapturePopup();
    } else if (this.state.nextStep == "ticketToInternalAgent") {
      this.openAgentInputPopup();
    } else {
      this.openEmailPopup();
    }
  },
  closeEmailCaptureModal() {
    this.setState({
      showModalEmailCapture: false
    });
  },
  directToCorrespondingPage() {
    if (this.state.nextStep == "continueToApplication") {
      browserHistory.push("/agent/connect-to-agent");
    } else if (this.state.nextStep == "ticketToInternalAgent") {
      browserHistory.push("/agent/connect-to-agent");
    } else {
      browserHistory.push("/agent/email-to-quote");
    }
  },
  selectNextStep (nextStep) {
    this.setState({
      nextStep
    });
  },
  public render() {

    var {persons} = this.props;
    persons = persons || [];
    const personsContainerWidth = this.props.noOfPersons == 2 ? 4 : 8;
    return (
      <div className="next-steps-container">
        <Subheader />

        <Row>
          <Col sm={8} className="c-center customer-next-steps-container agent-next-steps-outer-container">
            <Row>
              <Col sm={4} className="agent-next-steps-text-container">
                <Row className="next-steps-header">
                  OK... Let's Take Some Action!
                </Row>
                <Row sm={8} className="next-steps-text">
                  This where the rubber hits the road. You're well on your way on getting covered with life insurance! Click on the appropriate button to take the next step.
                </Row>
              </Col>
              <Col sm={8} className="agent-next-steps-container">
                <FormGroup className="radio-group">
                  <div className="agent-next-step-container">
                    <div className="c-radio l-next-step-container" onClick={()=>{
                      this.selectNextStep("continueToApplication")
                    }}>
                      <input
                        type="radio"
                        name={"nextStep-continueToApplication"}
                        checked={this.state.nextStep == "continueToApplication"}
                      />
                      <span></span>
                      <label htmlFor={"person_s_gender_"}> Complete the application </label >
                    </div>
                  </div>
                  <div className="agent-next-step-container">
                    <div className="c-radio l-next-step-container" onClick={()=>{
                      this.selectNextStep("ticketToVantisLifeSales")
                    }}>
                      <input
                        type="radio"
                        name={"person_s_gender_"}
                        checked={this.state.nextStep=="ticketToVantisLifeSales"}
                      />
                      <span></span>
                      <label htmlFor={"person_s_gender_"}> Ticket to Vantis Life sales rep to complete application </label >
                    </div>
                  </div>
                  <div className="agent-next-step-container">
                    <div className="c-radio l-next-step-container" onClick={()=>{
                      this.selectNextStep("ticketToInternalAgent")
                    }}>
                      <input
                        type="radio"
                        name={"person_s_gender_"}
                        checked={this.state.nextStep=="ticketToInternalAgent"}
                      />
                      <span></span>
                      <label htmlFor={"person_s_gender_"}> Ticket to internal agent to complete application </label >
                    </div>
                  </div>
                  <div className="agent-next-step-container">
                    <div className="c-radio l-next-step-container" onClick={()=>{
                      this.selectNextStep("emailApplicationLink")
                    }}>
                      <input
                        type="radio"
                        name={"person_s_gender_"}
                        checked={this.state.nextStep=="emailApplicationLink"}
                      />
                      <span></span>
                      <label htmlFor={"person_s_gender_"}> Email the application link to your customer to complete </label >
                    </div>
                  </div>

                  <div className="agent-next-step-container">
                    <div className="c-radio l-next-step-container" onClick={()=>{
                      this.selectNextStep("printTheQuote")
                    }}>
                      <input
                        type="radio"
                        name={"person_s_gender_"}
                        checked={this.state.nextStep=="printTheQuote"}
                      />
                      <span></span>
                      <label htmlFor={"printTheQuote"}> Print this quote </label >
                    </div>
                  </div>
                </FormGroup>
              </Col>

            </Row>
          </Col>
        </Row>
        <Row className="next-step-submit-btn-outer-container">
          <Col className="c-center next-step-submit-btn-container">
            <Button className={`hidden-xs c-button-default next-step-submit-btn ${this.state.nextStep ? "active" : ""}`} onClick={(){
                this.openCorrespondingPopup()
              }}
            >
              CONTINUE
            </Button>
            <Button className={`visible-xs c-button-default next-step-submit-btn ${this.state.nextStep ? "active" : ""}`} onClick={(){
                this.directToCorrespondingPage()
              }}
            >
              CONTINUE
            </Button>
          </Col>
        </Row>

        <EmailModalCapture
          showModalEmail={this.state.showModalEmailCapture}
          saveQuote={this.saveQuote.bind(this)}
          handleChange={this.handleEmailChange.bind(this)}
          onCloseModal={this.closeEmailCaptureModal.bind(this)}
          noOfPersons={this.props.noOfPersons}
        />

        <EmailModal
          showModalEmail={this.state.showModalEmail}
          saveQuote={this.saveQuote.bind(this)}
          handleChange={this.handleEmailChange.bind(this)}
          onCloseModal={this.closeEmailModal.bind(this)}
          noOfPersons={this.props.noOfPersons}
        />
        <AgentLicensedModal
          showModalPhone={this.state.showModalPhone}
          saveQuote={this.saveQuote.bind(this)}
          handlePhoneChange={this.handlePhoneChange.bind(this)}
          handleSlotChange={this.handleSlotChange.bind(this)}
          onCloseModal={this.closeAgentLicensedModal.bind(this)}
          keyValueChange={this.keyValueChange.bind(this)}
        />

        <ThanksEmail
          showModalEmailThanks={this.state.showModalEmailThanks}
          onCloseModal={this.closeEmailThanksModal.bind(this)}
        />

        <ThanksPhone
          showModalPhoneThanks={this.state.showModalPhoneThanks}
        />

      </div>);
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    persons: state.quotes.persons,
    products: state.quotes.products,
    noOfPersons: state.selectPersons.noOfPersons,
    plans: state.quotes.plans,
    premiums: state.quotes.premiums
  };
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
    setPersonsData: (data) => {
      return dispatch(setPersonsData(data))
    },
    saveQuoteForm: (data) => {
      return dispatch(saveQuoteForm(data))
    },
    setTypeOfSubmission: (data) => {
      return dispatch(setTypeOfSubmission(data))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlansPage);