import * as React from 'react';
import * as Autocomplete from "react-autocomplete"
import * as moment from "moment";
import {Link} from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import {each, isEmpty} from "underscore";
import {submitQuoteForm, submitEmailForm, submitPlansForm, setPersonsData, saveQuoteForm} from '../../actions/Quote';
const objectAssign = require('object-assign');
import ProductHeader from "./ProductHeader";
import EmailModal from "./EmailModal";
import ThanksEmail from "./ThanksEmail";
import ProductContainer from "./ProductContainer";
import PersonInfo from "./PersonInfo";
import Subheader from "../common/subheader";
import Plan from "../common/Plan"
import { browserHistory } from 'react-router';
import {submitPlansForm } from '../../actions/Quote';

interface Props {
  plans: [any]
}

class PlansPage extends React.Component<Props, {}> {
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

  selectProduct(product) {
    this.setState({
      productId: product.ProductID
    });
  },
  submitPlansForm(data) {
    const persons = [];

    const personOne = JSON.parse(JSON.stringify(this.props.persons[0]));
    personOne.sBirthDate = moment(personOne.s_birthDate).format("YYYY-MM-DD");
    personOne.sPlanID = data[0].plan.PlanID;
    personOne.sFaceAmount = data[0].sFaceAmount;
    personOne.sClassNum="2";
    personOne.sDividendNum = "1";
    personOne.sWP="1";
    persons.push(personOne);

    if(this.props.noOfPersons == 2) {
      const personTwo = JSON.parse(JSON.stringify(this.props.persons[1]));
      personTwo.sBirthDate = moment(personTwo.s_birthDate).format("YYYY-MM-DD");
      personTwo.sPlanID = data[1].plan.PlanID;
      personTwo.sFaceAmount = data[1].plan.sFaceAmount;
      personOne.sClassNum="2";
      personOne.sDividendNum = "1";
      personOne.sWP="1";
      persons.push(personTwo);
    }

    this.props.setPersonsData(persons);

    this.props.saveQuoteForm(persons).then(() => {
      this.setState({
        showModalEmailThanks: true,
        showModalEmail: false
      });
    }).catch(()=>{
      this.submmitedProductForm = false;
    });
  },

  changeTypeOfSubmission(val) {
    this.setState({
      type_of_submission: val
    })
  },

  submitQuote() {
    this.props.submitQuote();
  }, 

  openEmailPopup() {
    this.setState({
      showModalEmail: true
    });
  },
  saveQuote() {
    const persons = [];

    const personOne = JSON.parse(JSON.stringify(this.props.persons[0]));
    personOne.sBirthDate = moment(personOne.s_birthDate).format("YYYY-MM-DD");
    personOne.email = this.state.email;
    personOne.type_of_submission = 10002;
    persons.push(personOne);

    if(this.props.noOfPersons == 2) {
      const personTwo = JSON.parse(JSON.stringify(this.props.persons[1]));
      personTwo.sBirthDate = moment(personTwo.s_birthDate).format("YYYY-MM-DD");
      personTwo.email = this.state.email;
      personTwo.premium_type = "monthly";
      persons.push(personTwo);
    }

    this.props.setPersonsData(persons);

    this.props.saveQuoteForm(persons).then(() => {
      this.setState({
        showModalEmailThanks: true,
        showModalEmail: false
      });
    }).catch(()=>{
      this.submmitedProductForm = false;
    });
  },
  handleEmailChange(v) {
    this.setState({
      email: v
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
          <Col sm={8} className="c-center customer-next-steps-container">
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
                <Col sm={4} onClick={this.openEmailPopup.bind(this)}>
                  <Col sm={12} className="next-action-img-container">
                    <img src={"../images/application.svg"} />
                  </Col>
                </Col>
                <Col sm={4} onClick={this.openEmailPopup.bind(this)}>
                  <Col sm={12} className="next-action-img-container">
                    <img src={"../images/email.svg"} />
                  </Col>
                </Col>
                <Col sm={4} onClick={this.openAgentInputPopup}>
                  <Col sm={12} className="next-action-img-container">
                    <img src={"../images/phone.svg"} />
                  </Col>
                </Col>
              </Col>
            </Row>
            <Row>
              <Col sm={12} className="next-steps-footer"> 
                <Col sm={4} onClick={this.openEmailPopup.bind(this)}>
                  Continue to application
                </Col>
                <Col sm={4} onClick={this.openEmailPopup.bind(this)}>
                  Email me quote
                </Col>
                <Col sm={4} onClick={this.openAgentInputPopup}>
                  Connect me to a licensed agent
                </Col>
              </Col>
            </Row>
          </Col>

        </Row>
        <Row>
          <Col sm={8} className="c-center">
            <Button  style={{width: "50%", float: "right"}} className="c-button-default circular" onClick={(){
                this.submitQuote()
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
        />

        <ThanksEmail
          showModalEmailThanks={this.state.showModalEmailThanks}
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
    submitPlansForm: (data) => {
      return dispatch(submitPlansForm(data))
    },
    saveQuoteForm: (data) => {
      return dispatch(saveQuoteForm(data))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlansPage);