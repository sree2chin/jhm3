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
import DatePicker from 'react-datepicker';
import Plans from "./Plans";
import {each, isEmpty} from "underscore";
import Confirmation from "./confirmation";
import SelectPersons from "./selectPersons";
import { InfinityAutoComplete } from 'react-infinite-autocomplete';
import {submitQuoteForm, submitPlansForm, submitEmailForm, submitProductsForm} from '../../actions/Quote';
const objectAssign = require('object-assign');

interface Props {
  person1_s_birthDate: string,
  person1_s_gender: number,
  person1_state: string,
  person1_smoke: string,
  person1_health: string,
  submitQuoteForm: ()=>void,
  submitProductsForm: ()=>void,
  statesArray: any,
  statesList: any,
  products: any,
  plans: any
}

import { InputComponent } from 'infinite-autocomplete';

class CustomInput extends InputComponent {
  render() {
    return '<input style="background: red;"/>';
  }
}

class Main extends React.Component<Props, {}> {
  constructor(){
    super();
    this.submitQuoteForm.bind(this);
  },
  componentWillMount() {
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

  submitQuoteForm() {
    if(this.validateQuoteForm()) {
      const {person1_s_birthDate, person1_s_gender, person1_state, person1_name, person1_health, person1_smoke} = this.state;
      const persons = [];

      const personOne = JSON.parse(JSON.stringify(this.state.persons[0]));
      personOne.s_birthDate = moment(personOne.s_birthDate).format("YYYY-MM-DD");
      personOne.applicant = "1";

      persons.push(personOne);

      if(this.props.noOfPersons == 2) {
        const personTwo = JSON.parse(JSON.stringify(this.state.persons[1]));
        personTwo.s_birthDate = moment(personTwo.s_birthDate).format("YYYY-MM-DD");
        personTwo.applicant = "2";
        persons.push(personTwo);
      }

      this.props.submitQuoteForm(persons).then(()=>{
        this.submitProductsForm();
        this.submmitedQuoteForm = true;
      }).catch(()=>{
        this.submmitedQuoteForm = false;
      });
    } 
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
  submitPlansForm() {
    this.props.submitPlansForm(this.props);
  },
  submitEmailForm() {
    this.props.submitEmailForm(this.props);
  }, 

  changePersonInfo(index, key, val) {
    var person = JSON.parse(JSON.stringify(this.state.persons[index]));

    if (person.s_birthDate) {
      person.s_birthDate = moment(person.s_birthDate);
    }

    person[key] = val;
    var persons = [];
    if(index ==0) {
      persons[0] = person;
      persons[1] = this.state.persons[1];
    } else {
      persons[0] = this.state.persons[0];
      persons[1] = person;
    }

    this.setState({persons});
  },

  state = {      
    persons: [{}, {}],
    errors: [{}, {}]
  },
  public render() {
    var statesObjects = getStateObjects();
    const personsContainerWidth = this.props.noOfPersons == 2 ? 4 : 8;
    const healthRatingObjects = [
          {value: "Fair", label: "Fair"},
          {value: "Good", label: "Good"},
          {value: "Very Good", label: "Very Good"},
          {value: "Excellent", label: "Excellent"},
        ];
    return (
      <div>
        <Subheader />
        <SelectPersons onSubmit={this.submitEmailForm.bind(this)} />
        <div className="row c-quote" style={{backgroundColor: "#f7f7f7", paddingBottom: "160px"}}>
          {this.props.noOfPersons && !this.props.isSubmmitedQuoteForm && <div> 
            <div className="header">
              <div style={{textAlign: "center"}}>
                Application information
              </div>  
            </div>
            <Row className={this.props.noOfPersons==2 ? "two-person-outer-container": "one-person-outer-container"}>
              <Col md={personsContainerWidth} className="one-person-content">
                <Person 
                  onChange={this.changePersonInfo.bind(this)}
                  index={0}
                  person={this.state.persons[0]}
                  errors={this.state.errors[0]}
                  submitQuoteForm={this.submitQuoteForm.bind(this)}
                />
              </Col>
              { this.props.noOfPersons==2 &&
                <Col md={personsContainerWidth} className="second-person-content">
                  <Person 
                    onChange={this.changePersonInfo.bind(this)}
                    index={1}
                    person={this.state.persons[1]}
                    errors={this.state.errors[1]}
                    submitQuoteForm={this.submitQuoteForm.bind(this)}
                  />
                </Col>
              }
              <div>
                <Col sm={4} style={{ marginLeft: "auto", marginRight: "auto", float: "none"}}>
                  <Button className="c-button-default circular" onClick={(){
                      this.submitQuoteForm()
                    }}
                  >
                    CONTINUE
                  </Button>
                </Col>
              </div>
            </Row>
          </div>}
          {this.props.isSubmmitedQuoteForm && !this.props.isSubmmitedPlansForm && <Plans plans={this.props.plans} submitForm={this.submitPlansForm.bind(this)} />}
          {this.props.isSubmmitedQuoteForm && !this.props.isSubmmitedPlansForm && <Plans plans={this.props.plans} submitForm={this.submitPlansForm.bind(this)} />}
          {this.props.isSubmmitedPlansForm && <Confirmation onSubmit={this.submitEmailForm.bind(this)} />}
        </div>
      </div>);
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    person1_s_birthDate: state.person1_s_birthDate,
    person1_s_gender: state.person1_s_gender,
    person1_state: state.person1_state,
    person1_smoke: state.person1_smoke,
    person1_health: state.person1_health,
    statesList: state.statesList,
    statesArray: state.statesArray
    isSubmmitedQuoteForm: state.quotes.isSubmmitedQuoteForm,
    isSubmmitedPlansForm: state.quotes.isSubmmitedPlansForm,
    products: state.quotes.products,
    plans: state.quotes.plans,
    noOfPersons: state.selectPersons.noOfPersons
  };
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
    submitQuoteForm: (data) => {return dispatch(submitQuoteForm(data))},
    submitProductsForm: (data) => {
      return dispatch(submitProductsForm(data))
    },
    submitPlansForm: (data) => {return dispatch(submitPlansForm(data))},
    submitEmailForm: (data) => {return dispatch(submitEmailForm(data))},
    loadStates: () => { return loadStates(); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);