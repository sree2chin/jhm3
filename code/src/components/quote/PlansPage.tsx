import * as React from 'react';
import * as Autocomplete from "react-autocomplete"
import * as moment from "moment";
import {Link} from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import {each, isEmpty, map} from "underscore";
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
import Riders from "./Riders";
import Select from 'react-select';

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
  componentDidMount () {

  },
  selectProduct(product) {
    this.setState({
      productId: product.ProductID
    });
  },
  onPaymentTypeChange(ob) {
    this.setState({
      premium_type: ob.label,
      selectedPaymentType: ob
    });
  },
  submitPlansForm(personIndex, data) {
    const persons = [];

    const personOne = JSON.parse(JSON.stringify(this.props.persons[personIndex]));
    personOne.sBirthDate = moment(personOne.s_birthDate).format("YYYY-MM-DD");
    personOne.sPlanID = data[0].plan.PlanID;
    personOne.sProductID = data[0].productId;
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
    if(this.props.premiums && this.props.premiums[0] && this.props.premiums[0][this.state.productIdPlan0] && this.props.premiums[0][this.state.productIdPlan0].QuoteRateGrid && this.props.premiums[0][this.state.productIdPlan0].QuoteRateGrid.Col1 && this.props.premiums[0][this.state.productIdPlan0].QuoteRateGrid.Col1.Face1 && this.props.premiums[0][this.state.productIdPlan0].QuoteRateGrid.Col1.Face1.Premium ) {
      var amount = this.props.premiums[0][this.state.productIdPlan0].QuoteRateGrid.Col1.Face1.Premium[this.state.premium_type];
      amount = amount ? parseFloat(amount.split("$")[1]) : 0;

      personOne.premium_amount=amount;
      personOne.premium_type=this.state.premium_type;
    }
    persons.push(personOne);

    if(this.props.noOfPersons == 2) {
      const personTwo = JSON.parse(JSON.stringify(this.props.persons[1]));
      if(this.props.premiums && this.props.premiums[1] && this.props.premiums[1][this.state.productIdPlan1] && this.props.premiums[1][this.state.productIdPlan1].QuoteRateGrid && this.props.premiums[1][this.state.productIdPlan1].QuoteRateGrid.Col1 && this.props.premiums[1][this.state.productIdPlan1].QuoteRateGrid.Col1.Face1 && this.props.premiums[1][this.state.productIdPlan1].QuoteRateGrid.Col1.Face1.Premium ) {
        var amount = this.props.premiums[1][this.state.productIdPlan1].QuoteRateGrid.Col1.Face1.Premium[this.state.premium_type];
        amount = amount ? parseFloat(amount.split("$")[1]) : 0;

        personTwo.premium_amount=amount;
        personTwo.premium_type=this.state.premium_type;
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

  selectProductPlan(personIndex, productId) {
    this.setState({
      ["productIdPlan"+personIndex]: productId
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
  getPaymentSchedules() {
    if(isEmpty(this.props.premiums) || isEmpty(this.props.premiums[0].plans_data) || isEmpty(this.props.premiums[0].plans_data.QuoteRateGrid) || isEmpty(this.props.premiums[0].plans_data.QuoteRateGrid.Col1)) {
      return [];
    }
    var p;

    p = [
      {
        value: "Monthly",
        label: "Monthly"
      },
      {
        value: "Quarterly",
        label: "Quarterly"
      },
      {
        value: "Semi-Annual",
        label: "Semi-Annual"
      },
      {
        value: "Annual",
        label: "Annual"
      }
    ]

    return p;
  },
  getTotalPaymentAmount() {
    var total = 0;
    var sProductID = this.props.persons && this.props.persons[0] && this.props.persons[0].sProductID || null;
    var sProductID1 = this.props.persons && this.props.persons[1] && this.props.persons[1].sProductID || null;

    if (this.props.premiums && this.props.premiums[0] && this.props.premiums[0] && sProductID && this.state.premium_type){
      if (this.props.premiums[0][sProductID].QuoteRateGrid && this.props.premiums[0][sProductID].QuoteRateGrid.Col1 && this.props.premiums[0][sProductID].QuoteRateGrid.Col1.Face1 && this.props.premiums[0][sProductID].QuoteRateGrid.Col1.Face1.Premium) {
        total = parseFloat(this.props.premiums[0][sProductID].QuoteRateGrid.Col1.Face1.Premium[this.state.premium_type].split("$")[1]) ;
      }
    }


    if (this.props.premiums && this.props.premiums[1] && this.props.premiums[1] && sProductID1 && this.state.premium_type){
      if (this.props.premiums[1][sProductID1].QuoteRateGrid && this.props.premiums[1][sProductID1].QuoteRateGrid.Col1 && this.props.premiums[1][sProductID1].QuoteRateGrid.Col1.Face1 && this.props.premiums[1][sProductID1].QuoteRateGrid.Col1.Face1.Premium) {
        total += parseFloat(this.props.premiums[1][sProductID1].QuoteRateGrid.Col1.Face1.Premium[this.state.premium_type].split("$")[1]) ;
      }
    }
    total = "$" + total;

    return total;

  },
  public render() {

    var {persons} = this.props;
    persons = persons || [];
    var self = this;
    const personsContainerWidth = this.props.noOfPersons == 2 ? 4 : 8;
    const individualPlanContainerWidth = this.props.noOfPersons == 2 ? 6 : 12;
    const paymentSchedules = this.getPaymentSchedules();
    return (
      <div className="product-pager-container">
        <Subheader />
        <Row className="plans-product-header visible-xs">
          <Col sm={8} className="c-center">
            <Row>
              <Col sm={8} className="c-plans-product-text">
                Selected Products
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="visible-xs">
          <Col className="c-center plan-selector-outer-container" style={{paddingLeft: "28px", paddingRight: "30px", marginBottom: "15px"}}>
            <Row className="plans-selector-container">
              <Col sm={6} className="c-center" style={{paddingTop: "0px"}}>
                <Col sm={6} className="payment-schedule-text" style={{paddingTop: "20px", paddingRight: "0px"}}>
                  Payment schedule
                </Col>
                <Col sm={6} className="plan-schedule-container" style={{paddingTop: "10px", paddingLeft: "0px"}}>
                  <Select
                    name="form-field-plans-3"
                    options={paymentSchedules}
                    value={this.state.premium_type}
                    onChange={(payment)=>{
                      this.onPaymentTypeChange(payment)
                    }}
                  />
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{backgroundColor: "rgb(247, 247, 247)"}}>
          <Col sm={12} style={{marginLeft: "auto",marginRight: "auto", float: "none"}} className="person-info-main-container">
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
        <Row className="plans-product-header hidden-xs">
          <Col className="c-center plans-product-header-text-container">
            <Row>
              <Col sm={8} className="c-plans-product-text">
                Selected Products
              </Col>
              <Col sm={4} className="c-select-diff-product-link hidden-xs">
                SELECT DIFFERENT PRODUCTS
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="hidden-xs">
          <Col className="c-center plan-selector-outer-container" style={{paddingLeft: "15px", paddingRight: "15px", marginBottom: "15px"}}>
            <Row className="plans-selector-container">
              <Col sm={6} className="c-center" style={{paddingTop: "0px"}}>
                <Col sm={6} className="payment-schedule-text" style={{paddingTop: "20px", paddingRight: "0px"}}>
                  Payment schedule
                </Col>
                <Col sm={6} className="plan-schedule-container" style={{paddingTop: "10px", paddingLeft: "0px"}}>
                  <Select
                    name="form-field-plans-3"
                    options={paymentSchedules}
                    value={this.state.premium_type}
                    onChange={(payment)=>{
                      this.onPaymentTypeChange(payment)
                    }}
                  />
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col className="c-center all-plans-main-container">
            <Col sm={individualPlanContainerWidth} className="one-person-plan-container">
              { this.props.noOfPersons>=1 &&
                map(this.props.plans[0].plans_data, (p)=>{
                  var pl = {
                    plans_data: p
                  };
                  var premiums =  this.props.premiums && this.props.premiums[0] &&  this.props.premiums[0][p.product_id] ? this.props.premiums[0][p.product_id] : {};
                  premiums = {plans_data: premiums};
                  return <Plan 
                    plans={pl}
                    submitPlansForm={self.submitPlansForm.bind(self)}
                    premiums={premiums}
                    productIdPlan={self.state.productIdPlan0}
                    noOfPersons={self.props.noOfPersons}
                    selectedPaymentType={self.state.selectedPaymentType}
                    selectProductPlan={self.selectProductPlan.bind(self)}
                    personIndex={0}
                  />
                })
              }
            </Col>
            <Col sm={individualPlanContainerWidth} className="second-person-plan-container">
              { this.props.noOfPersons==2 &&
                map(this.props.plans[1].plans_data, (p)=>{
                  var pl = {
                    plans_data: p
                  };
                  var premiums =  this.props.premiums && this.props.premiums[1] &&  this.props.premiums[1][p.product_id] ? this.props.premiums[1][p.product_id] : {};
                  premiums = {plans_data: premiums};
                  return <Plan 
                    plans={pl}
                    submitPlansForm={self.submitPlansForm.bind(self)}
                    premiums={premiums}
                    noOfPersons={self.props.noOfPersons}
                    productIdPlan={self.state.productIdPlan1}
                    selectedPaymentType={self.state.selectedPaymentType}
                    personIndex={1}
                    selectProductPlan={self.selectProductPlan.bind(self)}
                  />
                })
              }
            </Col>
          </Col>
        </Row>

        <Row>
          <Riders 
            persons={persons}
          />
        </Row>

        <Row>
          <Col sm={8} className="c-center" style={{paddingLeft: "26px", paddingRight: "30px"}}>
            <Row className="plans-selector-container">
              <Col sm={3} style={{float: "right", marginRight: "15px"}}>
                <Row>
                  <Col sm={4} className="plan-total-text">
                    Total
                  </Col>
                  <Col sm={8} className="plan-total-amount">
                    {this.getTotalPaymentAmount()}
                  </Col>
                </Row>
                
              </Col>
            </Row>

          </Col>
        </Row>

        <Row>
          <Col sm={4} className="continue-to-next-steps" style={{ }}>
            <Button className="c-button-default circular hidden-xs" onClick={(){
                this.redirectToNextSteps()
              }}
            >
              CONTINUE TO THE NEXT STEP
            </Button>

            <Button className="c-button-default visible-xs" onClick={(){
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