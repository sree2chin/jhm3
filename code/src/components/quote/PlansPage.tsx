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
import { browserHistory } from 'react-router';

interface Props {
  persons: [any]
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

  submitProductsForm() {

    const persons = [];

    const personOne = JSON.parse(JSON.stringify(this.props.persons[0]));
    personOne.s_birthDate = moment(personOne.s_birthDate).format("YYYY-MM-DD");
    personOne.sProductID = this.state.productId;

    persons.push(personOne);

    if(this.props.noOfPersons == 2) {
      const personTwo = JSON.parse(JSON.stringify(this.props.persons[1]));
      personTwo.s_birthDate = moment(personTwo.s_birthDate).format("YYYY-MM-DD");
      personTwo.applicant = "2";
      persons.push(personTwo);
    }

    this.props.setPersonsData(persons);

    this.props.submitProductsForm(persons).then(() => {
      this.submmitedProductForm = true;
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
         APPEND EXISTING PLANS COMPONENTS
      </div>);
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    persons: state.quotes.persons,
    products: state.quotes.products,
    noOfPersons: state.selectPersons.noOfPersons,
    plans: state.quotes.plans
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