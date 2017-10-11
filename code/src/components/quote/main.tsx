import * as React from 'react';
import * as Autocomplete from "react-autocomplete"
import {Link} from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import Input from "../common/textInput"
import CustomCheckbox from "../common/CustomCheckbox"
import Subheader from "../common/subheader"
import StarsCustom from "../common/Stars"
import ReactStars from 'react-stars';
import Select from 'react-select';
import StarRatingComponent from "react-star-rating-component";
import { getStateObjects } from '../../utility/states';
import loadStates from '../../actions/loadStates';
import DatePicker from 'react-datepicker';
import Plans from "./Plans";
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
  },
  componentWillMount() {
  },

  validateQuoteForm() {
    const {person1_s_birthDate, person1_s_gender, person1_state, person1_smoke, person1_health} = this.state;
    
    const person1_s_birthDateError = !(person1_s_birthDate && person1_s_birthDate.format("YYYY-MM-DD").length > 0);
    const person1_s_genderError = !(person1_s_gender ==1 || person1_s_gender ==0);
    const person1_stateError = !(person1_state && person1_state.length > 0);
    const person1_smokeError = !(person1_smoke=="Yes" || person1_smoke=="No");
    const person1_healthError = !(person1_health);

    this.setState({
      person1_s_birthDateError,
      person1_s_genderError,
      person1_stateError, 
      person1_smokeError,
      person1_healthError,
    });
    return !(person1_s_birthDateError || person1_s_genderError || person1_stateError || person1_smokeError || person1_healthError);
  },
  submitQuoteForm() {
    if(this.validateQuoteForm()) {
      const {person1_s_birthDate, person1_s_gender, person1_state, person1_name, person1_health, person1_smoke} = this.state;
      const persons = [
        {
          "applicant":"1",
          s_birthDate: person1_s_birthDate.format("YYYY-MM-DD"),
          s_gender: person1_s_gender,
          state: person1_state, 
          smoke: person1_smoke,
          health: person1_health
        }
      ];
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
  handlePerson1StateInputChange(selectedElement) {
    this.setState({
      person1_state: selectedElement.value
    });
    this.setState({
      person1_selectedStateData: selectedElement
    });
  },  
  handlePerson1BirthDateChange(date) {
    this.setState({
      person1_s_birthDate: date
    });
  },
  handleKeyChange(key, value) {
    this.setState({
      [key]: value
    });
  },
  handleperson1_HealthChange(selectedElement) {
    this.setState({
      person1_health: selectedElement.value
    });
  },
  state = {      
    persons: [{}, {}]
  },
  handleNameChange (key, e) {
    this.setState({
      [key]: e.target.value
    });
  },
  public render() {
    var statesObjects = getStateObjects();
    const personsContainerWidth = this.props.noOfPersons == 2 ? 4 : 8;

    return (
      <div>
        <Subheader />
        <SelectPersons onSubmit={this.submitEmailForm.bind(this)} />
        <div className="row c-quote" style={{backgroundColor: "#f7f7f7", paddingBottom: "160px"}}>
          {!this.props.isSubmmitedQuoteForm && <div> 
            <div className="header">
              <div style={{textAlign: "center"}}>
                Application information
              </div>  
            </div>
            <Row>
              <Col md={personsContainerWidth} style={{marginLeft: "auto", marginRight: "auto", float: "none", backgroundColor: "#fff"}}>
                <Col sm={12} className="c-one-person-container">
                  <div>
                    <Col sm={12} className={"c-person-header-text"}>
                      Applicant 1
                    </Col>
                    <Col sm={12}>
                      <Input 
                        name="first-applicant-name"
                        label="Name"
                        placeholder="Name"
                        onChange={(e) => {this.handleNameChange("person1_name", e)} }
                      />
                      { this.state.person1_nameError && <Col sm={12} className={"c-subheader-text error"}>
                        Please enter your name.
                      </Col> }
                    </Col>
                    <Col sm={12} className={"c-subheader-text"}>
                      Gender
                    </Col>
                    <Col sm={4} style={{paddingRight: "22px"}}>
                      <FormGroup>
                        <Radio name="person1_s_gender" 
                            onClick={ ()=> {
                              this.handleKeyChange("person1_s_gender", "1")
                            }}>
                          Male
                        </Radio>
                        {' '}
                        <Radio name="person1_s_gender" 
                            onClick={ ()=> {
                              this.handleKeyChange("person1_s_gender", "0")
                            }}>
                          Female
                        </Radio>
                        {' '}
                      </FormGroup>
                      { this.state.person1_s_genderError && <Col sm={12} className={"c-subheader-text error"}>
                        Please select your gender.
                      </Col> }
                    </Col>
                  </div>
                  <div>
                    <Col sm={12} className={"c-subheader-text"}>
                      Birth date
                    </Col>
                    <Col sm={12}>
                      <div>
                        <div className={"c-calendar-container"}>
                          <img src={"../images/calendar.svg"} />
                        </div>
                        <DatePicker 
                          selected={this.state.person1_s_birthDate} 
                          onChange={this.handlePerson1BirthDateChange.bind(this)}
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                      </div>
                    </Col>
                    { this.state.person1_s_birthDateError && <Col sm={12} className={"c-subheader-text error"}>
                      Please select your birth date.
                    </Col> }
                  </div>
                  <div>
                    <Col sm={12} className={"c-subheader-text"}>
                      State
                    </Col>
                    <Col sm={12} className={"c-address-input"}>
                      <Select
                        name="form-field-name"
                        options={statesObjects}
                        onChange={this.handlePerson1StateInputChange.bind(this)}
                      />
                    </Col>
                    { this.state.stateError && <Col sm={12} className={"c-subheader-text error"}>
                      Please select your state.
                    </Col> }
                  </div>
                  <div>
                    <Col sm={12} className={"c-subheader-text"} style={{marginTop: "35px"}}>
                      Overall person1_health
                    </Col>
                    <Col sm={12} style={{marginBottom: "23px", marginTop: "19px"}}>
                      <Select
                        name="form-field-name"
                        options={[
                          {value: "Fair", label: "Fair"},
                          {value: "Good", label: "Good"},
                          {value: "Very Good", label: "Very Good"},
                          {value: "Excellent", label: "Excellent"},
                        ]}
                        onChange={this.handleperson1_HealthChange.bind(this)}
                      />
                    </Col>
                    { this.state.person1_healthError && <Col sm={12} className={"c-subheader-text error"}>
                      Please select your person1_health status.
                    </Col> }
                  </div>
                  <div>
                    <Col sm={12} className={"c-subheader-text"}>
                      Tobacco use
                    </Col>
                    <Col sm={4} style={{paddingRight: "22px"}}>
                      <FormGroup>
                        <Radio name="person1_smoke" 
                            onClick={ ()=> {
                              this.handleKeyChange("person1_smoke", "Yes")
                            }}>
                          Yes
                        </Radio>
                        {' '}
                        <Radio name="person1_smoke" 
                            onClick={ ()=> {
                              this.handleKeyChange("person1_smoke", "No")
                            }}>
                          No
                        </Radio>
                        {' '}
                      </FormGroup>
                    </Col>
                    { this.state.person1_smokeError && <Col sm={12} className={"c-subheader-text error"}>
                      Please select whether you smoke or not.
                    </Col> }
                  </div>
                  <div>
                    <Col sm={12}>
                      <Button className="c-button-default big" onClick={this.submitQuoteForm.bind(this)}>CONTINUE</Button>
                    </Col>
                  </div>
                </Col>
              </Col>
            </Row>
          </div>}
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