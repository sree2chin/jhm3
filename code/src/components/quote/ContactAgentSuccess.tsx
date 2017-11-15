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

class ContactAgent extends React.Component<Props, {}> {
  constructor(){
    super();
  },
  state={},
  componentWillMount() {
    if (isEmpty(this.props.plans) && isEmpty(this.props.persons)) {
      const basePath = this.props.location.pathname.indexOf("agent") > 1 ? "/agent" : "/";
      browserHistory.push(basePath);
    }
  },

  handlePhoneChange(e) {
    this.setState({
      phone: e.target.value
    });
  },
  handleSlotChange(v) {
    this.setState({
      slot: v
    });
  },
  onTextAllowedChange(k, v) {
    this.setState({[k]: v});
  };
  directToCorrespondingPage() {
    if (this.state.nextStep == "continueToApplication") {
      browserHistory.push("/agent/connect-to-agent");
    } else if (this.state.nextStep == "connectMeToAgent") {
      browserHistory.push("/agent/connect-to-agent");
    } else {
      browserHistory.push("/agent/email-to-quote");
    }
  },
  goBack() {
      const basePath = this.props.location.pathname.indexOf("/agent") > 1 ? "/agent/" : "/";
      browserHistory.push(basePath);
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
      const basePath = this.props.location.pathname.indexOf("agent") > 1 ? "/agent/" : "/";
      browserHistory.push(basePath + "connect-agent-success");
    }).catch(()=>{
      this.submmitedProductForm = false;
    });
  },
  getExtraInfo(data) {
    if ( this.state.type_of_submission == 10003) {
      data.contact_time = this.state.slot;
      data.phone_number = this.state.phone;
    }
  },
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
      <div className="next-steps-container agent-success-page-container">
        <Row className="thanks-phone-img-container">
          <img style={{marginBottom: "34px", marginTop: "90px"}} src={"../images/thanks-phone.svg"} />
        </Row>
        <Row>
          <Col sm={12} className="confirmation-email-text">
            Thank you!
          </Col>
          <Col sm={12} className="confirmation-email-text">
            We will contact you soon
          </Col>
          <Col sm={12} className={"confirmation-email-desc"}>
            An agent will be in touch with you as soon as possible during your selected availability window.
          </Col>
        </Row>
          <Row>
          <Col xs={11} className="c-center agent-success-go-back-btn">
            <Button  style={{float: "right"}} className="c-button-default active" onClick={(){
                this.goBack()
              }}
            >
              GO BACK
              {this.state.savingQuote && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
            </Button>
          </Col>
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
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactAgent);