import * as React from 'react';
import * as Autocomplete from "react-autocomplete"
import * as moment from "moment";
import {Link} from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import Input from "../common/textInput"
import Subheader from "../common/subheader";
import Person from "../common/Person";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import {each, isEmpty} from "underscore";
import Confirmation from "./confirmation";
import SelectPersons from "./selectPersons";
import { InfinityAutoComplete } from 'react-infinite-autocomplete';
import {submitQuoteForm, submitPlansForm, submitEmailForm, submitProductsForm, setPersonsData} from '../../actions/Quote';
const objectAssign = require('object-assign');
import { browserHistory } from 'react-router';
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";

interface Props {
  submitQuoteForm: ()=>void,
  submitProductsForm: ()=>void,
}

class Main extends React.Component<Props, {}> {
  constructor(){
    super();
    this.submitQuoteForm.bind(this);
  },

  setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  },
  componentDidMount() {

  },
  componentWillMount() {
    if(this.props.location.query.agent_id) {
      this.setCookie("agent_id", this.props.location.query.agent_id, 1)
    }
    if(!isEmpty(this.props.persons) && !isEmpty(this.props.persons[0])) {
      const persons = JSON.parse(JSON.stringify(this.props.persons));
      if(persons[0] && persons[0].s_birthDate) {
        persons[0].s_birthDate = moment(persons[0].s_birthDate)
      }
      if(persons[1] && persons[1].s_birthDate) {
        persons[1].s_birthDate = moment(persons[1].s_birthDate)
      }
      this.setState({
        persons: persons
      });
    }
  },

  validateQuoteForm() {
    var result = true;
    var errors = [];
    each (this.state.persons, (person, index) => {
      
        const {s_birthDate, s_gender, state, smoke, health, name} = person;

        const s_birthDateError = !(s_birthDate && moment(s_birthDate).format("YYYY-MM-DD").length > 0);
        const s_genderError = !(s_gender ==1 || s_gender ==2);
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

    });
    this.setState({
      errors
    });

    return result;
  },

  submitQuoteForm() {
    if(this.validateQuoteForm()) {

      const persons = [];
      this.setState({
        submittingUserInfo: true
      });
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

      this.props.setPersonsData(persons);

      this.props.submitQuoteForm(persons).then(() => {
        const basePath = this.props.location.pathname.indexOf("agent") >=0 ? "/agent/" : "/";
        browserHistory.push(basePath + "products");
        this.setState({
          submittingUserInfo: false
        });
      }).catch(()=>{
        browserHistory.push("/products");
        this.setState({
          submittingUserInfo: false
        });
      });
    } 
  },
  submitEmailForm() {
    this.props.submitEmailForm(this.props);
  }, 
  componentWillReceiveProps(nextProps) {
    if(!isEmpty(nextProps.persons) && isEmpty(this.state.persons)) {
      this.setState({
        persons: nextProps.persons
      });
    }
  },
  changePersonInfo(index, key, val) {
    var person = JSON.parse(JSON.stringify(this.state.persons[index]));

    if (person.s_birthDate) {
      person.s_birthDate = moment(person.s_birthDate);
    }

    person[key] = val;
    var persons = [];
    if(this.props.noOfPersons ==2) {
      if(index ==0) {
        persons[0] = person;
        persons[1] = this.state.persons[1];
      } else {
        persons[0] = this.state.persons[0];
        persons[1] = person;
      }
      } else {
        persons.push(person);
        persons.push({});
      }

    this.setState({persons});
  },

  state = {      
    persons: [{}, {}],
    errors: [{}, {}]
  },
  getContinueBtnActiveClass() {

    var result = true;
    var errors = [];
    each (this.state.persons, (person, index) => {
      if (index==0 || (!isEmpty(person))) {
        const {s_birthDate, s_gender, state, smoke, health, name} = person;

        const s_birthDateError = !(s_birthDate && moment(s_birthDate).format("YYYY-MM-DD").length > 0);
        const s_genderError = !(s_gender ==1 || s_gender ==2);
        const stateError = !(state && state.length > 0);
        const smokeError = !(smoke=="Yes" || smoke=="No");
        const healthError = !(health);
        const nameError = !(name && name.length > 0);

        result = result && !(s_birthDateError || s_genderError || stateError || smokeError || healthError);
      }
    });

    if(result) {
      return "active";
    } else {
      return "";
    }

  },

  getMobileContinueBtnActiveClass() {

    if(this.props.noOfPersons > 0) {
      return "active";
    } 
    return "";

  },
  public render() {
    const personsContainerWidth = this.props.noOfPersons == 2 ? 4 : 8;
    const healthRatingObjects = [
          {value: "Fair", label: "Fair"},
          {value: "Good", label: "Good"},
          {value: "Very Good", label: "Very Good"},
          {value: "Excellent", label: "Excellent"},
        ];
    return (
      <div>
        <ScrollToTopOnMount />
        <Subheader />
        <SelectPersons onSubmit={this.submitEmailForm.bind(this)} />
        <div className="row c-quote">
          {this.props.noOfPersons && <div> 
            <div className="header hidden-xs">
              <div style={{textAlign: "center", fontSize: "26px"}}>
                Application information
              </div>  
            </div>
            <div className={this.props.noOfPersons==2 ? "two-person-outer-container c-center": "one-person-outer-container"}>
              <Col sm={personsContainerWidth} className="one-person-content">
                <Person 
                  onChange={this.changePersonInfo.bind(this)}
                  index={0}
                  person={this.state.persons[0]}
                  errors={this.state.errors[0]}
                  submitQuoteForm={this.submitQuoteForm.bind(this)}
                />
              </Col>
              { this.props.noOfPersons==2 &&
                <Col sm={personsContainerWidth} className="second-person-content">
                  <Person 
                    onChange={this.changePersonInfo.bind(this)}
                    index={1}
                    person={this.state.persons[1]}
                    errors={this.state.errors[1]}
                    submitQuoteForm={this.submitQuoteForm.bind(this)}
                  />
                </Col>
              }
              <div className="c-submit-person-info-btn c-center">
                  <Button  className={`c-button-default circular hidden-xs ${this.getContinueBtnActiveClass()}`} onClick={(){
                      this.submitQuoteForm()
                    }}
                  >
                    CONTINUE
                    {this.state.submittingUserInfo && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                  </Button>
                  <Button className={`c-button-default circular visible-xs`}  onClick={(){
                      this.submitQuoteForm()
                    }}
                  >
                    CONTINUE
                    {this.state.submittingUserInfo && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                  </Button>
              </div>
            </div>
          </div>}
        </div>
      </div>);
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    products: state.quotes.products,
    plans: state.quotes.plans,
    persons: state.quotes.persons,
    noOfPersons: state.selectPersons.noOfPersons
  };
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
    submitQuoteForm: (data) => {return dispatch(submitQuoteForm(data))},
    setPersonsData: (data) => {
      return dispatch(setPersonsData(data))
    },
    submitPlansForm: (data) => {
      return dispatch(submitPlansForm(data))
    },
    submitEmailForm: (data) => {
      return dispatch(submitEmailForm(data))
    },
    loadStates: () => { 
      return loadStates(); 
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);