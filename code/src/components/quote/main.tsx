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

interface Props {
  submitQuoteForm: ()=>void,
  submitProductsForm: ()=>void,
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

      this.props.setPersonsData(persons);

      this.props.submitQuoteForm(persons).then(() => {
        const basePath = this.props.location.pathname.length > 1 ? this.props.location.pathname + "/" : this.props.location.pathname;
        browserHistory.push(basePath + "products");
      }).catch(()=>{
        browserHistory.push("/products");
      });
    } 
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
      }

    this.setState({persons});
  },

  state = {      
    persons: [{}, {}],
    errors: [{}, {}]
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
                <Col sm={4} style={{ marginLeft: "33%"}}>
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
        </div>
      </div>);
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    products: state.quotes.products,
    plans: state.quotes.plans,
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