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
  s_birthDate: string,
  s_gender: number,
  state: string,
  isTobaccoUser: boolean,
  health: number,
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

    /*if(this.props.statesArray && this.props.statesArray.length > 0) {
      
    } else {
      this.props.loadStates();
    }*/
  },

  validateQuoteForm() {
    const {s_birthDate, s_gender, state, isTobaccoUser, health} = this.state;
    
    const s_birthDateError = !(s_birthDate && s_birthDate.format("YYYY-MM-DD").length > 0);
    const s_genderError = !(s_gender ==1 || s_gender ==0);
    const stateError = !(state && state.length > 0);
    const isTobaccoUserError = !(isTobaccoUser==true || isTobaccoUser==false);
    const healthError = !(health);

    this.setState({
      s_birthDateError,
      s_genderError,
      stateError, 
      isTobaccoUserError,
      healthError,
    });
    return !(s_birthDateError || s_genderError || stateError || isTobaccoUserError || healthError);
  },

  submitQuoteForm() {
    if(this.validateQuoteForm()) {
      const {s_birthDate, s_gender, state} = this.state;
      this.props.submitQuoteForm({
        s_birthDate: s_birthDate.format("YYYY-MM-DD"), 
        s_gender, 
        state
      }).then(()=>{
        this.submitProductsForm();
        this.submmitedQuoteForm = true;
      }).catch(()=>{
        this.submmitedQuoteForm = false;
      });
    } 
  },
  submitProductsForm() {
    const {s_birthDate, s_gender, state} = this.state;
    const sProductID = this.props.products.data.products_list[1].ProductID;
    this.props.submitProductsForm({
      sBirthDate: s_birthDate.format("YYYY-MM-DD"),
      sGender: s_gender,
      state,
      sProductID,
    }).then(() => {
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
  AddressChange() {
    return null;
  },
  handleStateInputChange(selectedElement) {
    this.setState({
      state: selectedElement.value
    });
    this.setState({
      selectedStateData: selectedElement
    });
  },  
  handleBirthDateChange(date) {
    this.setState({
      s_birthDate: date
    });
  },
  handleKeyChange(key, value) {
    this.setState({
      [key]: value
    });
  },
  handleHealthChange(selectedElement) {
    this.setState({
      health: selectedElement.value
    });
  },
  state = {      
    persons: [{}, {}]
  },
  handleNameChange (arrayIndex, e) {
    const persons = objectAssign({}, this.state.persons);

    persons[arrayIndex].name = e.target.value;
    this.setState({
      persons: persons
    });
  },
  public render() {
    var statesObjects = getStateObjects();
    const personsContainerWidth = this.props.noOfPersons == 1 ? 8 : 4;

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
                        onChange={(e) => {this.handleNameChange(0, e)} }
                      />
                    </Col>
                    <Col sm={12} className={"c-subheader-text"}>
                      Gender
                    </Col>
                    <Col sm={4} style={{paddingRight: "22px"}}>
                      <FormGroup>
                        <Radio name="s_gender" 
                            onClick={ ()=> {
                              this.handleKeyChange("s_gender", 1)
                            }}>
                          Male
                        </Radio>
                        {' '}
                        <Radio name="s_gender" 
                            onClick={ ()=> {
                              this.handleKeyChange("s_gender", 1)
                            }}>
                          Female
                        </Radio>
                        {' '}
                      </FormGroup>
                      { this.state.s_genderError && <Col sm={12} className={"c-subheader-text error"}>
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
                          selected={this.state.s_birthDate} 
                          onChange={this.handleBirthDateChange.bind(this)}
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                      </div>
                    </Col>
                    { this.state.s_birthDateError && <Col sm={12} className={"c-subheader-text error"}>
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
                        onChange={this.handleStateInputChange.bind(this)}
                      />
                    </Col>
                    { this.state.stateError && <Col sm={12} className={"c-subheader-text error"}>
                      Please select your state.
                    </Col> }
                  </div>
                  <div>
                    <Col sm={12} className={"c-subheader-text"} style={{marginTop: "35px"}}>
                      Overall health
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
                        onChange={this.handleHealthChange.bind(this)}
                      />
                    </Col>
                    { this.state.healthError && <Col sm={12} className={"c-subheader-text error"}>
                      Please select your health status.
                    </Col> }
                  </div>
                  <div>
                    <Col sm={12} className={"c-subheader-text"}>
                      Tobacco use
                    </Col>
                    <Col sm={4} style={{paddingRight: "22px"}}>
                      <FormGroup>
                        <Radio name="isTobaccoUser" 
                            onClick={ ()=> {
                              this.handleKeyChange("Smoke", "Yes")
                            }}>
                          Male
                        </Radio>
                        {' '}
                        <Radio name="isTobaccoUser" 
                            onClick={ ()=> {
                              this.handleKeyChange("Smoke", "No")
                            }}>
                          Female
                        </Radio>
                        {' '}
                      </FormGroup>
                    </Col>
                    { this.state.isTobaccoUserError && <Col sm={12} className={"c-subheader-text error"}>
                      Please select your Tobacco use.
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
    s_birthDate: state.s_birthDate,
    s_gender: state.s_gender,
    state: state.state,
    isTobaccoUser: state.isTobaccoUser,
    health: state.health,
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