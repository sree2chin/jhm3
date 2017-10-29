import * as React from 'react';
import * as Autocomplete from "react-autocomplete"
import * as moment from "moment";
import {Link} from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import {each, isEmpty} from "underscore";
import {submitQuoteForm, submitEmailForm, submitPlansForm, setPersonsData, openEditPersonModal, closeEditPersonModal, handleEditChange} from '../../actions/Quote';
const objectAssign = require('object-assign');
import ProductHeader from "./ProductHeader";
import ProductContainer from "./ProductContainer";
import PersonInfo from "./PersonInfo";
import Subheader from "../common/subheader";
import Plan from "../common/Plan"
import { browserHistory } from 'react-router';
import {submitPlansForm } from '../../actions/Quote';
import { browserHistory } from 'react-router';
import EditPerson from "./EditPerson";

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

    const personOne = JSON.parse(JSON.stringify(this.props.persons[personIndex]));
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
    if(this.state.selectedPaymentType0 && this.state.selectedPaymentType0.amount) {
      personOne.premium_amount=parseFloat(this.state.selectedPaymentType0.amount.split("$")[1]);
      personOne.premium_type=this.state.selectedPaymentType0.label;
    }
    persons.push(personOne);

    if(this.props.noOfPersons == 2) {
      const personTwo = JSON.parse(JSON.stringify(this.props.persons[1]));
      if(this.state.selectedPaymentType1 && this.state.selectedPaymentType1.amount) {
        personTwo.premium_amount=parseFloat(this.state.selectedPaymentType1.amount.split("$")[1]);
        personTwo.premium_type=this.state.selectedPaymentType1.label;
      }
      persons.push(personTwo);
    }

    this.props.setPersonsData(persons);

    const basePath = this.props.location.pathname.indexOf("agent") >=0 ? "/agent/" : "/";
    browserHistory.push(basePath + "next-steps");
  },
  openEditPersonModal = (person, personIndex) => {
    this.props.openEditPersonModal(person, personIndex);
  },
  handleEditChange(person) {
    this.props.handleEditChange(person);
    setTimeout(()=> {
      this.submitProductsFormOnEditPerson();
    });
  },
  submitProductsFormOnEditPerson() {

    const persons = [];

    const personOne = JSON.parse(JSON.stringify(this.props.persons[0]));
    personOne.sBirthDate = moment(personOne.s_birthDate).format("YYYY-MM-DD");
    personOne.applicant = "1";
    personOne.sGender = personOne.s_gender;

    persons.push(personOne);

    if(this.props.noOfPersons == 2) {
      const personTwo = JSON.parse(JSON.stringify(this.props.persons[1]));
      personTwo.sBirthDate = moment(personTwo.s_birthDate).format("YYYY-MM-DD");
      personTwo.applicant = "2";
      personTwo.sGender = personTwo.s_gender;
      persons.push(personTwo);
    }

    this.props.setPersonsData(persons);

    this.props.submitQuoteForm(persons).then(() => {
      const basePath = this.props.location.pathname.indexOf("agent") >=0 ? "/agent/" : "/";
      browserHistory.push(basePath + "products");
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
        <Row style={{backgroundColor: "rgb(247, 247, 247)"}}>
          <Col sm={8} style={{marginLeft: "auto",marginRight: "auto", float: "none"}}>
            { this.props.noOfPersons>=1 &&
              <PersonInfo 
                person={persons[0]}
                noOfPersons={this.props.noOfPersons}
                personIndex={0}
                index={0}
                openEditPersonModal={this.openEditPersonModal.bind(this)}
              />
            }
            { this.props.noOfPersons==2 &&
              <PersonInfo 
                person={persons[1]}
                noOfPersons={this.props.noOfPersons}
                personIndex={1}
                index={1}
                openEditPersonModal={this.openEditPersonModal.bind(this)}
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
            premiums={this.props.premiums ? this.props.premiums[0] : {}}
            onPaymentTypeChange={this.onPaymentTypeChange.bind(this)}
            personIndex={0}
          />
        }
        { this.props.noOfPersons==2 &&
          <Plan 
            plans={this.props.plans[1]}
            submitPlansForm={this.submitPlansForm.bind(this)}
            premiums={this.props.premiums ? this.props.premiums[1] : {}}
            onPaymentTypeChange={this.onPaymentTypeChange.bind(this)}
            personIndex={1}
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

        <EditPerson 
          showModalEditPerson={this.props.showModalEditPerson}
          onCloseModal={this.props.closeEditPersonModal.bind(this)}
          editablePerson={this.props.editablePerson}
          personIndex={this.props.editablePersonIndex}
          handleChange={this.handleEditChange.bind(this)}
        />

      </div>);
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    persons: state.quotes.persons,
    products: state.quotes.products,
    noOfPersons: state.selectPersons.noOfPersons,
    showModalEditPerson: state.quotes.showModalEditPerson,
    plans: state.quotes.plans,
    editablePerson: state.quotes.editablePerson,
    editablePersonIndex: state.quotes.editablePersonIndex,
    premiums: state.quotes.premiums
  };
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
    submitQuoteForm: (data) => {return dispatch(submitQuoteForm(data))},
    setPersonsData: (data) => {
      return dispatch(setPersonsData(data))
    },
    openEditPersonModal: (person, personIndex) => {
      return dispatch(openEditPersonModal(person, personIndex))
    },
    closeEditPersonModal: () => {
      return dispatch(closeEditPersonModal())
    }, 
    submitPlansForm: (data) => {
      return dispatch(submitPlansForm(data))
    },
    handleEditChange: (person) => {
      return dispatch(handleEditChange(person));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlansPage);