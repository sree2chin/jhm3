import * as React from 'react';
import * as Autocomplete from "react-autocomplete"
import * as moment from "moment";
import {Link} from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import Input from "../common/textInput"
import Subheader from "../common/subheader"
import Person from "../common/Person"
import Select from 'react-select';
import { getStateObjects } from '../../utility/states';
import loadStates from '../../actions/loadStates';
import {store} from '../app';
import DatePicker from 'react-datepicker';
import Plans from "./Plans";
import {each, isEmpty} from "underscore";
import Confirmation from "./confirmation";
import SelectPersons from "./selectPersons";
import {submitQuoteForm, submitPlansForm, submitEmailForm, submitProductsForm} from '../../actions/Quote';
const objectAssign = require('object-assign');

interface Props {
  persons: [any]
}

class ProductsPage extends React.Component<Props, {}> {
  constructor(){
    super();
  },

  validateQuoteForm() {
    var result = true;
    var errors = [];
    each (this.state.persons, (person, index) => {
      if (index==0 || (!isEmpty(person))) {
        const {s_birthDate, s_gender, state, smoke, health, name} = person;

        const s_birthDateError = !(s_birthDate && moment(s_birthDate).format("YYYY-MM-DD").length > 0);
        const s_genderError = !(s_gender ==1 || s_gender ==0);
        const stateError = !(state && state.length > 0);
        const smokeError = !(smoke=="Yes" || smoke=="No");
        const healthError = !(health);
        const nameError = !(name && name.length > 0);

        errors.push({
          s_birthDateError, 
          s_genderError,
          stateError, 
          smokeError, 
          healthError,
          nameError
        });
        result = result && !(s_birthDateError || s_genderError || stateError || smokeError || healthError);
      }
    });
    this.setState({
      errors
    });

    return result;
  },

  submitProductsForm() {
    const {person1_s_birthDate, person1_s_gender, person1_state, person1_name, person1_health} = this.state;
    const sProductID = this.props.products.data.products_list[1].ProductID;
    const persons = [
      { 
        "applicant":"1"
        s_birthDate: person1_s_birthDate.format("YYYY-MM-DD"),
        s_gender: person1_s_gender,
        state: person1_state, 
        smoke: person1_smoke,
        health: person1_health,
        sProductID
      }
    ];
    this.props.submitProductsForm(persons).then(() => {
      this.submmitedProductForm = true;
    }).catch(()=>{
      this.submmitedProductForm = false;
    });
  },
  public render() {
    return (
      <div>
        HEADER
      </div>);
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    persons: state.quotes.persons,
    products: state.quotes.products,
  };
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);