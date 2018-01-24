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
import EmailModalCapture from "./EmailModalCapture";
import ThanksEmail from "./ThanksEmail";
import ThanksPhone from "./ThanksPhone";
import LicensedModal from "./LicensedModal";
import ProductContainer from "./ProductContainer";
import PersonInfo from "./PersonInfo";
import Subheader from "../common/subheader";
import Plan from "../common/Plan"
import { browserHistory } from 'react-router';
import {Tooltip} from 'react-lightweight-tooltip';
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";
import { browserHistory } from 'react-router';

interface Props {
  plans: [any],
  persons: any
}

class PlansPage extends React.Component<Props, {}> {
  constructor(){
    super();
  }
  state={}
  componentWillMount() {
    if (isEmpty(this.props.plans) && isEmpty(this.props.persons)) {
      const basePath = this.props.location.pathname.indexOf("agent") > 1 ? "/agent" : "/";
      browserHistory.push(basePath);
    }
  }

  selectProduct(product) {
    this.setState({
      productId: product.ProductID
    });
  }

  changeTypeOfSubmission(val) {
    this.setState({
      type_of_submission: val
    });
    this.props.setTypeOfSubmission(val);
  }

  submitQuote() {
    this.props.submitQuote();
  }

  openEmailPopup() {
    this.setState({
      showModalEmail: true,
      type_of_submission: 10002,
      showModalPhone: false,
      showModalEmailCapture: false
    });
  }

  openEmailCapturePopup() {
    this.setState({
      showModalEmailCapture: true,
      type_of_submission: 10001,
      showModalPhone: false,
      showModalEmail: false,
    });
  }

  selectNextStep (nextStep) {
    this.setState({
      nextStep
    });
  }

  openAgentInputPopup() {
    this.setState({
      showModalPhone: true,
      showModalEmail: false,
      type_of_submission: 10003,
      showModalEmailCapture: false
    });
  }
  handlePhoneChange(v) {
    this.setState({
      phone: v
    });
  }
  handleSlotChange(v) {
    this.setState({
      slot: v
    });
  }
  getExtraInfo(data) {
    if ( this.state.type_of_submission == 10003) {
      data.contact_time = this.state.slot;
      data.phone_number = this.state.phone;
    }
  }
  constructPersonsInfo(persons) {
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
  }
  saveQuote() {
    const persons = [];
    this.constructPersonsInfo(persons);
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
  }
  handleEmailChange(personIndex, v) {
    this.setState({
      ["email" + personIndex]: v
    });
  }
  closeEmailModal() {
    this.setState({
      showModalEmail: false
    });
  }
  closeEmailThanksModal() {
    this.setState({
      showModalEmailThanks: false
    });
  }
  closeEmailCaptureModal() {
    this.setState({
      showModalEmailCapture: false
    });
  }
  closeLicensedModal() {
    this.setState({
      showModalPhone: false
    });
  }
  keyValueChange(k, v) {
    this.setState({
      [k]: v
    });
  }
  openCorrespondingPopup() {
    if (this.state.nextStep == "continueToApplication") {
      this.openEmailCapturePopup();
    } else if (this.state.nextStep == "connectMeToAgent") {
      this.openAgentInputPopup();
    } else {
      this.openEmailPopup();
    }
  }
  directToCorrespondingPage() {
    if (this.state.nextStep == "continueToApplication") {
      browserHistory.push("/connect-through-application");
    } else if (this.state.nextStep == "connectMeToAgent") {
      browserHistory.push("/connect-to-agent");
    } else {
      browserHistory.push("/email-to-quote");
    }
  }
  public render() {

    const toolTipStyles = {
      wrapper: {
        marginLeft: "15px",
        top: "-16px"
      },
      content: {
        background: 'none',
        borderRadius: '10px',
        fontSize: "12px",
        color: "#ffffff",
        whiteSpace: "normal",
        padding: '.3em 5px',
      },
      tooltip: {
        borderRadius: '10px',
        width: "109px",
        background: 'rgba(0, 0, 0, 0.5)'
      },
      arrow: {
        borderTop: 'solid rgba(0, 0, 0, 0.5) 5px'
      },
      gap:{

      }
    };

    var {persons} = this.props;
    persons = persons || [];
    const personsContainerWidth = this.props.noOfPersons == 2 ? 4 : 8;
    return (
      <div className="next-steps-container">
        <ScrollToTopOnMount />
        <Subheader />

        <Row>
          <Col className="c-center customer-next-steps-container container-max-width">
            <Row>
              <Col sm={6} className="c-center next-steps-header">
                OK... Let's Take Some Action
              </Col>
            </Row>
            <Row>
              <Col sm={8} className="next-steps-text c-center">
                This where the rubber hits the road. You're well on your way on getting covered with life insurance! Click on the appropriate button to take the next step.
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Col sm={4} className="next-action-application-img-container" onClick={()=>{
                  this.selectNextStep("continueToApplication")
                }} style={{}}>
                  <Col sm={12} className={`next-action-img-container next-action-img-container-mobile ${this.state.nextStep=="continueToApplication" ? "active" : ""}`}>

                    {this.state.nextStep!="continueToApplication" && <img src={"../images/application.svg"} className="hidden-xs"/>}
                    {this.state.nextStep=="continueToApplication" && <img src={"../images/form@2x.png"} className="hidden-xs"/>}

                    <Row className="visible-xs">
                      <Col xs={2} style={{paddingRight: "0px"}}>
                        {this.state.nextStep!="continueToApplication" && <img src={"../images/application.svg"} />}
                        {this.state.nextStep=="continueToApplication" && <img src={"../images/form@2x.png"} />}
                      </Col>
                      <Col xs={7} style={{marginTop: "23px"}}>
                        Apply now
                      </Col>
                      <Col xs={3} className="next-steps-tool-tips">
                       <Tooltip content="Apply now" styles={toolTipStyles}>
                          <img style={{marginBottom: "7px"}} src={"../images/question-mark.svg"} />
                        </Tooltip>
                      </Col>
                    </Row>
                  </Col>
                </Col>
                <Col sm={4} className="next-action-email-img-container" onClick={()=>{
                  this.selectNextStep("emailMeQuote")
                }} style={{}}>
                  <Col sm={12} className={`next-action-img-container next-action-img-container-mobile ${this.state.nextStep=="emailMeQuote" ? "active" : ""}`}>
                    {this.state.nextStep!="emailMeQuote" && <img src={"../images/email.svg"} className="hidden-xs"/>}
                    {this.state.nextStep=="emailMeQuote" && <img src={"../images/activeemail.png"} className="hidden-xs"/>}
                    <Row className="visible-xs">
                      <Col xs={2} style={{paddingRight: "0px"}}>
                        {this.state.nextStep!="emailMeQuote" && <img src={"../images/email.svg"}/>}
                        {this.state.nextStep=="emailMeQuote" && <img src={"../images/activeemail.png"}/>}
                      </Col>
                      <Col xs={7} style={{marginTop: "23px"}}>
                        Email me the quote
                      </Col>
                      <Col xs={3} className="next-steps-tool-tips">
                       <Tooltip content="Apply now" styles={toolTipStyles}>
                          <img style={{marginBottom: "7px"}} src={"../images/question-mark.svg"} />
                        </Tooltip>
                      </Col>
                    </Row>
                  </Col>
                </Col>
                <Col sm={4} className="next-action-phone-img-container" onClick={()=>{
                  this.selectNextStep("connectMeToAgent")
                }} style={{}}>
                  <Col sm={12} className={`next-action-img-container next-action-img-container-mobile ${this.state.nextStep=="connectMeToAgent" ? "active" : ""}`}>
                    {this.state.nextStep!="connectMeToAgent" && <img src={"../images/phone.svg"} className="hidden-xs"/>}
                    {this.state.nextStep=="connectMeToAgent" && <img src={"../images/activephone.png"} className="hidden-xs"/>}
                    <Row className="visible-xs">
                      <Col xs={2} style={{paddingRight: "0px"}}>
                      {this.state.nextStep!="connectMeToAgent" && <img src={"../images/phone.svg"}/>}
                      {this.state.nextStep=="connectMeToAgent" && <img src={"../images/activephone.png"}/>}
                      </Col>
                      <Col xs={7} style={{marginTop: "23px"}}>
                        Connect me to a licensed agent
                      </Col>
                      <Col xs={3} className="next-steps-tool-tips">
                       <Tooltip content="Apply now" styles={toolTipStyles}>
                          <img style={{marginBottom: "7px"}} src={"../images/question-mark.svg"} />
                        </Tooltip>
                      </Col>
                    </Row>
                  </Col>
                </Col>
              </Col>
            </Row>
            <Row className="hidden-xs">
              <Col sm={12} className="next-steps-footer">
                <Col sm={4}  onClick={()=>{
                  this.selectNextStep("continueToApplication")
                }}>
                  Continue to application
                </Col>
                <Col sm={4} onClick={()=>{
                  this.selectNextStep("emailMeQuote")
                }}>
                  Email me quote
                </Col>
                <Col sm={4}  onClick={()=>{
                  this.selectNextStep("connectMeToAgent")
                }}>
                  Connect me to a licensed agent
                </Col>
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

        <EmailModal
          showModalEmail={this.state.showModalEmail}
          saveQuote={this.saveQuote.bind(this)}
          handleChange={this.handleEmailChange.bind(this)}
          onCloseModal={this.closeEmailModal.bind(this)}
          noOfPersons={this.props.noOfPersons}
        />

        <EmailModalCapture
          showModalEmail={this.state.showModalEmailCapture}
          saveQuote={this.saveQuote.bind(this)}
          handleChange={this.handleEmailChange.bind(this)}
          onCloseModal={this.closeEmailCaptureModal.bind(this)}
          noOfPersons={this.props.noOfPersons}
        />
        <LicensedModal
          showModalPhone={this.state.showModalPhone}
          saveQuote={this.saveQuote.bind(this)}
          handlePhoneChange={this.handlePhoneChange.bind(this)}
          handleSlotChange={this.handleSlotChange.bind(this)}
          onCloseModal={this.closeLicensedModal.bind(this)}
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