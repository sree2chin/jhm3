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

interface Props {
  plans: [any]
}

class PlansPage extends React.Component<Props, {}> {
  constructor(){
    super();
  },
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

    this.props.submitPlansForm(persons).then(() => {
      console.log("sdfds");
    }).catch(()=>{
      this.submmitedProductForm = false;
    });
  },

  public render() {

    var {persons} = this.props;
    persons = persons || [];
    const personsContainerWidth = this.props.noOfPersons == 2 ? 4 : 8;
    return (
      <div className="product-pager-container">
        <Subheader />
        { this.props.noOfPersons==1 &&
          <PersonInfo 
            person={persons[0]}
          />
        }
        { this.props.noOfPersons==2 &&
          <PersonInfo 
            person={persons[1]}
          />
        }
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
        { this.props.noOfPersons==1 &&
          <Plan 
            plans={this.props.plans[0]}
            submitPlansForm={this.submitPlansForm.bind(this)}
            premiums={this.props.premiums}
          />
        }
        { this.props.noOfPersons==2 &&
          <Plan 
            plans={this.props.plans[1]}
            submitPlansForm={this.submitPlansForm.bind(this)}
            premiums={this.props.premiums}
          />
        }


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