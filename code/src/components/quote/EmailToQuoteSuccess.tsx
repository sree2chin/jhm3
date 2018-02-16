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
      const basePath = this.props.location.pathname.indexOf("agent") > 1 || this.props.is_agent ? "/agent" : "/";
      browserHistory.push(basePath + queryParamsString);
    }
  };

  handlePhoneChange(e) {
    this.setState({
      phone: e.target.value
    });
  };
  handleSlotChange(v) {
    this.setState({
      slot: v
    });
  };
  onTextAllowedChange(k, v) {
    this.setState({[k]: v});
  };
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
    if (this.state.nextStep == "continueToApplication") {
      browserHistory.push("/agent/connect-to-agent" + queryParamsString);
    } else if (this.state.nextStep == "connectMeToAgent") {
      browserHistory.push("/agent/connect-to-agent" + queryParamsString);
    } else {
      browserHistory.push("/agent/email-to-quote" + queryParamsString);
    }
  };
  goBack() {
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
    const basePath = this.props.location.pathname.indexOf("/agent") > 1 || this.props.is_agent ? "/agent/" : "/";
    browserHistory.push(basePath + queryParamsString);
  };
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
      const basePath = this.props.location.pathname.indexOf("agent") > 1 || this.props.is_agent ? "/agent/" : "/";
      browserHistory.push(basePath + "connect-agent-success" + queryParamsString);
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
          <img style={{marginBottom: "34px", marginTop: "90px"}} src={"../images/thanks-email.svg"} />
        </Row>
        <Row>
          <Col sm={12} className="confirmation-email-text">
            We’ve sent you an email!
          </Col>
          <Col sm={12} className={"confirmation-email-desc"}>
            We sent your email a link where you can view the rest of the form and fill it out when you have time.
          </Col>
        </Row>
          <Row>
          <Col xs={11} className="c-center agent-success-go-back-btn">
            <Button  style={{float: "right"}} className="c-button-default active" onClick={()=>{
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
    premiums: state.quotes.premiums,
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