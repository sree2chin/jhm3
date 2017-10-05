import * as React from 'react';
import * as Autocomplete from "react-autocomplete"
import {Link} from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {Button, Row, Col} from "react-bootstrap";
import Input from "../common/textInput"
import Subheader from "../common/subheader"
import StarsCustom from "../common/Stars"
import ReactStars from 'react-stars';
import StarRatingComponent from "react-star-rating-component";
import { getStateObjects } from '../../utility/states';
import loadStates from '../../actions/loadStates';
import DatePicker from 'react-datepicker';
import Plans from "./Plans";
import Confirmation from "./confirmation";
import { InfinityAutoComplete } from 'react-infinite-autocomplete';
import {submitQuoteForm, submitPlansForm, submitEmailForm, submitProductsForm} from '../../actions/Quote';

interface Props {
  s_birthDate: string,
  s_gender: number,
  state: string,
  isTobaccoUser: boolean,
  healthRating: number,
  submitQuoteForm: ()=>void,
  submitProductsForm: ()=>void,
  statesArray: any,
  statesList: any,
  products: any,
  plans: any
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
    const {s_birthDate, s_gender, state, isTobaccoUser, healthRating} = this.state;
    
    const s_birthDateError = !(s_birthDate && s_birthDate.format("YYYY-MM-DD").length > 0);
    const s_genderError = !(s_gender ==1 || s_gender ==0);
    const stateError = !(state && state.length > 0);
    const isTobaccoUserError = !(isTobaccoUser==true || isTobaccoUser==false);
    const healthRatingError = !(healthRating);

    this.setState({
      s_birthDateError,
      s_genderError,
      stateError, 
      isTobaccoUserError,
      healthRatingError,
    });
    return !(s_birthDateError || s_genderError || stateError || isTobaccoUserError || healthRatingError);
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
  handleStateInputChange(selectedElement, selectedData) {
    this.setState({
      state: selectedData.value
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
  handleHealthChange(newValue) {
    this.setState({
      healthRating: newValue
    });
  },
  state = {      
    healthRating: 4
  },
  starsConfig = {
    size: 35,
    count: 5,
    half: false,
    value: this.state.healthRating,
    color1: 'lightgrey',
    color2: '#317dbd',
    onChange: this.handleHealthChange.bind(this)
  },
  public render() {
    var statesObjects = getStateObjects();
    this.starsConfig.value = this.state.healthRating;

    return (
      <div>
        <Subheader />
        <div className="row c-quote" style={{backgroundColor: "#f7f7f7", paddingBottom: "160px"}}>
          {!this.props.isSubmmitedQuoteForm && <div> 
            <div className="header">
              <div style={{textAlign: "center"}}>
                Get a Quote
              </div>  
            </div>
            <Row>
              <Col md={6} style={{marginLeft: "auto", marginRight: "auto", float: "none", backgroundColor: "#fff"}}>
                <Col sm={12} style={{backgroundColor: "rgb(255, 255, 255)", paddingLeft: "20px", paddingRight: "20px", paddingBottom: "35px"}}>
                  <div>
                    <Col sm={12} className={"c-subheader-text"}>
                      I am
                    </Col>
                    <Col sm={4} style={{paddingRight: "22px"}}>
                      <Button onClick={()=> this.handleKeyChange("s_gender", 1)} className={`c-button-default ${this.state.s_gender==1 ? "active" : ""}`}>MALE</Button>
                    </Col>
                    <Col sm={4} style={{paddingLeft: "0px", paddingRight: "37px"}}>
                      <Button onClick={()=> this.handleKeyChange("s_gender", 0)} className={`c-button-default ${this.state.s_gender==0 ? "active" : ""}`}>FEMALE</Button>
                    </Col>
                    { this.state.s_genderError && <Col sm={12} className={"c-subheader-text error"}>
                      Please select your gender.
                    </Col> }
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
                      Tobacco use
                    </Col>
                    <Col sm={4} style={{paddingRight: "22px"}}>
                      <Button className={`c-button-default ${this.state.isTobaccoUser==true ? "active" : ""}`} onClick={()=> this.handleKeyChange("isTobaccoUser", true)}>YES</Button>
                    </Col>
                    <Col sm={4} style={{paddingLeft: "0px", paddingRight: "37px"}}>
                      <Button className={`c-button-default ${this.state.isTobaccoUser==false ? "active" : ""}`} onClick={()=> this.handleKeyChange("isTobaccoUser", false)}>NO</Button>
                    </Col>
                    { this.state.isTobaccoUserError && <Col sm={12} className={"c-subheader-text error"}>
                      Please select your Tobacco use.
                    </Col> }
                  </div>
                  <div>
                    <Col sm={12} className={"c-subheader-text"}>
                      Current Address
                    </Col>
                    <Col sm={12} className={"c-address-input"}>
                      <InfinityAutoComplete 
                        data={statesObjects}
                        onSelect={this.handleStateInputChange.bind(this)}
                      />
                    </Col>
                    { this.state.stateError && <Col sm={12} className={"c-subheader-text error"}>
                      Please select your state.
                    </Col> }
                  </div>
                  <div>
                    <Col sm={4} className={"c-subheader-text"} style={{width:"auto", marginTop: "35px"}}>
                      My overall health is
                    </Col>
                    <Col sm={8} style={{marginBottom: "23px", marginTop: "19px"}}>
                      <ReactStars
                        {...this.starsConfig}
                      />
                    </Col>
                    { this.state.healthRatingError && <Col sm={12} className={"c-subheader-text error"}>
                      Please select your health status.
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
    healthRating: state.healthRating,
    statesList: state.statesList,
    statesArray: state.statesArray
    isSubmmitedQuoteForm: state.quotes.isSubmmitedQuoteForm,
    isSubmmitedPlansForm: state.quotes.isSubmmitedPlansForm,
    products: state.quotes.products,
    plans: state.quotes.plans
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