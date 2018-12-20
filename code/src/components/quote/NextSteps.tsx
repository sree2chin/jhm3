import * as React from 'react';
import * as Autocomplete from "react-autocomplete"
import * as moment from "moment";
import {Link} from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import {each, isEmpty} from "underscore";
import {submitQuoteForm, setPersonsData, saveQuoteForm, setTypeOfSubmission} from '../../actions/Quote';
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
import {Tooltip} from 'react-lightweight-tooltip';
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";
import { browserHistory } from 'react-router';
import * as _ from "underscore";

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
      const basePath = this.props.location.pathname.indexOf("agent") > 1 || this.props.is_agent ? "/agent" : "/";
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
      //browserHistory.push(basePath + queryParamsString);
      window.location.href = basePath + queryParamsString;
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

  /** returns visible next button */
  getNextButtonDOM(){
    var submit_button = document.querySelectorAll('button.next-step-submit-btn.forward-btn');
    for (var i = 0, max = submit_button.length; i < max; i++) {
      var style =  window.getComputedStyle(submit_button[i]);
      var isHidden = ((style.display === 'none') || (style.visibility === 'hidden'));
      if (!isHidden) {
        submit_button = submit_button[i];
        break;
      }
    }
    return submit_button;
  }

  focusNextBtn(){
    var submit_button = this.getNextButtonDOM();
    window.scrollTo(0,submit_button.offsetTop + 50);
    submit_button.focus();
  }

  selectNextStep (nextStep) {
    this.setState({
      nextStep
    });
    this.focusNextBtn();
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
    } else if (this.state.type_of_submission == 10001) {
      data.request_type = 1;
    } else if (this.state.type_of_submission == 10002) {
      data.request_type = 2;
    } else if (this.state.type_of_submission == 10004) {
      data.request_type = 4;
    } else if (this.state.type_of_submission == 10005) {
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
    } else if (this.state.type_of_submission == 10006) {
      data.request_type = 6;
    } else if (this.state.type_of_submission == 10007) {
      data.request_type = 6;
    }
    data.request_type = this.state.nextStep.request_type;
  }
  constructPersonsInfo(persons) {
    const personOne = JSON.parse(JSON.stringify(this.props.persons[0]));
    personOne.sBirthDate = moment(personOne.s_birthDate).format("YYYY-MM-DD");

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

      this.getExtraInfo(personTwo);
      persons.push(personTwo);
    }
  }
  redirectToPlanPage() {
    const basePath = this.props.location.pathname.indexOf("agent") >=0 || this.props.is_agent ? "/agent/" : "/";
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
    browserHistory.push(basePath + "plans" + queryParamsString);
  }
  saveQuote() {
    const persons = [];
    this.constructPersonsInfo(persons);
    var data = {
      applicants: JSON.stringify(persons)
    };

    this.getExtraInfo(data)

    this.props.setPersonsData(persons);

    return this.props.saveQuoteForm(data).then(() => {
      if (this.props.quoteResponse && this.props.quoteResponse.LOGIN_URL && this.props.quoteResponse.LOGIN_URL.length > 0) {
        window.location.href = this.props.quoteResponse.LOGIN_URL;
        return;
      }
      if (this.props.quoteResponse && this.props.quoteResponse.redirect_url && this.props.quoteResponse.redirect_url.length > 0) {
        window.location.href = this.props.quoteResponse.redirect_url;
        return;
      }
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
      if (this.props.quoteResponse && this.props.quoteResponse.redirect_url && this.props.quoteResponse.redirect_url.length>0) {
        window.location.href = this.props.quoteResponse.redirect_url;
      }
    }).catch(()=>{
      this.submmitedProductForm = false;
    });
  }
  handleEmailChange(personIndex, v) {
    this.setState({
      ["email" + personIndex]: String(v).trim()
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
  closePhoneThanksModal() {
    this.setState({
      showModalPhoneThanks: false
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
    if (this.state.nextStep.menu_item_id == "customer_continue_application") {
      this.openEmailCapturePopup();
    } else if (this.state.nextStep.menu_item_id == "customer_connect_to_agent") {
      this.openAgentInputPopup();
    } else {
      this.openEmailPopup();
    }
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
    if (this.state.nextStep.menu_item_id == "customer_continue_application") {
      this.setState({
        type_of_submission: 10001,
      });
      this.changeTypeOfSubmission(10001);
      setTimeout(() => {
        browserHistory.push("/connect-through-application" + queryParamsString);
      }, 100)
    } else if (this.state.nextStep.menu_item_id == "customer_connect_to_agent") {
      this.setState({
        type_of_submission: 10003,
      });
      this.changeTypeOfSubmission(10003);
      setTimeout(() => {
        browserHistory.push("/connect-to-agent" + queryParamsString);
      }, 100);
    } else {
      this.setState({
        type_of_submission: 10002,
      });
      this.changeTypeOfSubmission(10002);
      setTimeout(() => {
        browserHistory.push("/email-to-quote" + queryParamsString);
      }, 100);
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
        <Subheader
          location={this.props.location}
          products={this.props.products}
          plans={this.props.plans}
        />

        <Row>
          <Col className="c-center customer-next-steps-container container-max-width">
            <Row>
              <Col sm={6} className="c-center next-steps-header">
                OK... Let's Take Some Action
              </Col>
            </Row>
            <Row>
              <Col sm={8} className="next-steps-text c-center">
                This is where the rubber hits the road. You're well on your way to getting covered with life insurance! Click on the appropriate button to take the next step.
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                {
                  _.map(this.props.saveQuoteOptions, (saveQuoteOption)=>{
                    if (saveQuoteOption.enable) {
                      return (<Col sm={4} className="next-action-application-img-container" onClick={()=>{
                        this.selectNextStep(saveQuoteOption)
                      }}>
                        <Col sm={12} className={`next-action-img-container next-action-img-container-mobile ${this.state.nextStep && this.state.nextStep.menu_item_id == saveQuoteOption.menu_item_id ? "active" : ""}`}>

                          {(!this.state.nextStep || this.state.nextStep.menu_item_id != saveQuoteOption.menu_item_id) && <img src={"../images/" + saveQuoteOption.menu_item_id + ".svg"} className="hidden-xs"/>}
                          {this.state.nextStep && this.state.nextStep.menu_item_id == saveQuoteOption.menu_item_id && <img src={"../images/" + saveQuoteOption.menu_item_id + "_active.png"} className="hidden-xs"/>}

                          <Row className="visible-xs">
                            <Col xs={2} style={{paddingRight: "0px"}}>
                              {(!this.state.nextStep || this.state.nextStep.menu_item_id != saveQuoteOption.menu_item_id) && <img src={"../images/" + saveQuoteOption.menu_item_id + ".svg"} />}
                              {this.state.nextStep && this.state.nextStep.menu_item_id == saveQuoteOption.menu_item_id && <img src={"../images/" + saveQuoteOption.menu_item_id + "_active.png"} />}
                            </Col>
                            <Col xs={7} style={{marginTop: "23px"}}>
                              {saveQuoteOption.menu_item_title}
                            </Col>
                            <Col xs={3} className="next-steps-tool-tips">
                             <Tooltip content="Apply now" styles={toolTipStyles}>
                                <img style={{marginBottom: "7px"}} src={"../images/question-mark.svg"} />
                              </Tooltip>
                            </Col>
                          </Row>
                        </Col>
                      </Col>)
                    } else {
                      return null;
                    }
                  })
                }
              </Col>
            </Row>
            <Row className="hidden-xs">
              <Col sm={12} className="next-steps-footer">
                {
                  _.map(this.props.saveQuoteOptions, (saveQuoteOption)=> {
                    if (saveQuoteOption.enable) {
                      return (
                        <Col sm={4}  onClick={()=>{
                          this.selectNextStep(saveQuoteOption)
                        }}>
                          {saveQuoteOption.menu_item_title}
                        </Col>
                      );
                    } else {
                      return null;
                    }
                  })
                }
              </Col>
            </Row>
          </Col>

        </Row>
        <Row className="next-step-submit-btn-outer-container">
          <Col className="c-center next-step-submit-btn-container">
            <span className={`hidden-xs previous-btn-text ${this.state.nextStep ? "active" : ""}`} onClick={()=>{
                this.redirectToPlanPage()
              }}
            >
              PREVIOUS
            </span>
            <Button className={`hidden-xs c-button-default forward-btn next-step-submit-btn ${this.state.nextStep ? "active" : ""}`} onClick={()=>{
                this.openCorrespondingPopup()
              }}
            >
              NEXT
            </Button>
            <Button className={`visible-xs back-btn c-button-default next-step-submit-btn ${this.state.nextStep ? "active" : ""}`} onClick={()=>{
                this.redirectToPlanPage()
              }}
              style={{backgroundColor: "#fb4d3d!important"}}
            >
              PREVIOUS
            </Button>
            <Button className={`visible-xs c-button-default forward-btn next-step-submit-btn ${this.state.nextStep ? "active" : ""}`} onClick={()=>{
                this.directToCorrespondingPage()
              }}
            >
              NEXT
            </Button>
          </Col>
        </Row>

        <EmailModal
          showModalEmail={this.state.showModalEmail}
          saveQuote={this.saveQuote.bind(this)}
          handleChange={this.handleEmailChange.bind(this)}
          onCloseModal={this.closeEmailModal.bind(this)}
          noOfPersons={this.props.noOfPersons}
          fromAgentPage={false}
        />

        <EmailModalCapture
          showModalEmail={this.state.showModalEmailCapture}
          saveQuote={this.saveQuote.bind(this)}
          handleChange={this.handleEmailChange.bind(this)}
          onCloseModal={this.closeEmailCaptureModal.bind(this)}
          noOfPersons={this.props.noOfPersons}
          fromAgentPage={false}
        />
        
        <LicensedModal
          showModalPhone={this.state.showModalPhone}
          saveQuote={this.saveQuote.bind(this)}
          handlePhoneChange={this.handlePhoneChange.bind(this)}
          handleSlotChange={this.handleSlotChange.bind(this)}
          onCloseModal={this.closeLicensedModal.bind(this)}
          keyValueChange={this.keyValueChange.bind(this)}
          noOfPersons={this.props.noOfPersons}
          handleChange={this.handleEmailChange.bind(this)}
          fromAgentPage={false}
        />

        <ThanksEmail
          showModalEmailThanks={this.state.showModalEmailThanks}
          onCloseModal={this.closeEmailThanksModal.bind(this)}
        />

        <ThanksPhone
          showModalPhoneThanks={this.state.showModalPhoneThanks}
          onCloseModal={this.closePhoneThanksModal.bind(this)}
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
    premiums: state.quotes.premiums,
    is_agent: state.quotes.is_agent,
    quoteResponse: state.quotes.quoteResponse,
    saveQuoteOptions: state.quotes.saveQuoteOptions
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