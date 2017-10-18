import * as React from 'react';
import * as Autocomplete from "react-autocomplete"
import * as moment from "moment";
import {Link} from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import {each, isEmpty} from "underscore";
import {submitQuoteForm, submitEmailForm, submitPlansForm, setPersonsData} from '../../actions/Quote';
const objectAssign = require('object-assign');
import ProductHeader from "./ProductHeader";
import ProductContainer from "./ProductContainer";
import PersonInfo from "./PersonInfo";
import Subheader from "../common/subheader";
import Plan from "../common/Plan"
import { browserHistory } from 'react-router';
import {submitPlansForm } from '../../actions/Quote';
import { browserHistory } from 'react-router';

interface Props {
  plans: [any]
}

class PlansPage extends React.Component<Props, {}> {
  constructor(){
    super();
  },
  state ={},
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
  onPaymentTypeChange(personIndex, ob) {
    this.setState({
      ["selectedPaymentType" + personIndex]: ob
    });
  },
  submitPlansForm(personIndex, data) {
    const persons = [];

    const personOne = JSON.parse(JSON.stringify(this.props.persons[0]));
    personOne.sBirthDate = moment(personOne.s_birthDate).format("YYYY-MM-DD");
    personOne.sPlanID = data[0].plan.PlanID;
    personOne.sFaceAmount = data[0].sFaceAmount;
    personOne.sClassNum="2";
    personOne.sDividendNum = "1";
    personOne.duration = data[0].plan.PlanName.split(" ")[0];
    personOne.sWP="1";
    persons.push(personOne);
    
    var persons = [];
    if(this.props.noOfPersons ==2) {
      if(personIndex ==0) {
        persons[0] = personOne;
        persons[1] = this.props.persons[1];
      } else {
        persons[0] = this.props.persons[0];
        persons[1] = personOne;
      }
    } else {
      persons.push(personOne);
    }

    this.props.setPersonsData(persons);

    this.props.submitPlansForm(persons).then(() => {
      console.log("sdfds");
    }).catch(()=>{
      this.submmitedProductForm = false;
    });
  },
  redirectToNextSteps() {
    const persons = [];

    const personOne = JSON.parse(JSON.stringify(this.props.persons[0]));
    if(this.state.selectedPaymentType0) {
      personOne.premium_amount=this.state.selectedPaymentType0.label;
      personOne.premium_type=this.state.selectedPaymentType0.value;
    }
    persons.push(personOne);

    if(this.props.noOfPersons == 2) {
      const personTwo = JSON.parse(JSON.stringify(this.props.persons[1]));
      if(this.state.selectedPaymentType1) {
        personTwo.premium_amount=this.state.selectedPaymentType1.label;
        personTwo.premium_type=this.state.selectedPaymentType1.value;
      }
      persons.push(personTwo);
    }

    this.props.setPersonsData(persons);

      const basePath = this.props.location.pathname.indexOf("agent") > 1 ? "/agent/" : "/";
      browserHistory.push(basePath + "next-steps");
  }
  public render() {

    var {persons} = this.props;
    persons = persons || [];
    const personsContainerWidth = this.props.noOfPersons == 2 ? 4 : 8;
    return (
      <div className="product-pager-container">
        <Subheader />
        <Row style={{backgroundColor: "rgb(247, 247, 247)"}}>
          <Col sm={8} style={{marginLeft: "auto",marginRight: "auto", float: "none"}}>
            { this.props.noOfPersons>=1 &&
              <PersonInfo 
                person={persons[0]}
              />
            }
            { this.props.noOfPersons==2 &&
              <PersonInfo 
                person={persons[1]}
              />
            }
          </Col>
        </Row>
        <Row className="plans-product-header">
          <Col sm={8} className="c-center">
            <Row>
              <Col sm={8} className="c-plans-product-text">
                Selected Products
              </Col>
              <Col sm={4} className="c-select-diff-product-link">
                SELECT DIFFERENT PRODUCTS
              </Col>
            </Row>
          </Col>
        </Row>
        { this.props.noOfPersons>=1 &&
          <Plan 
            plans={this.props.plans[0]}
            submitPlansForm={this.submitPlansForm.bind(this)}
            premiums={this.props.premiums}
            onPaymentTypeChange={this.onPaymentTypeChange.bind(this)}
            personIndex={0}
          />
        }
        { this.props.noOfPersons==2 &&
          <Plan 
            plans={this.props.plans[1]}
            submitPlansForm={this.submitPlansForm.bind(this)}
            premiums={this.props.premiums}
            onPaymentTypeChange={this.onPaymentTypeChange.bind(this)}
            personIndex={0}
          />
        }

        <Row>
          <Col sm={4} style={{  marginRight: "16%", float: "right"}}>
            <Button className="c-button-default circular" onClick={(){
                this.redirectToNextSteps()
              }}
            >
              CONTINUE TO THE NEXT STEP
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
    submitPlansForm: (data) => {
      return dispatch(submitPlansForm(data))
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlansPage);