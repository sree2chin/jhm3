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
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";

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
    ];

    this.setState({
      paymentSchedules: p
    });

    this.onPaymentTypeChange(p[0]);
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
  submitPlansForm(personIndex, data, successCb) {
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
      if(successCb) { successCb(); }
      console.log("sdfds");
    }).catch(()=>{
      this.submmitedProductForm = false;
    });
  },

  setPlanFormSubmissionErrorMsg() {
    if(this.productSubmissionBtnClicked) {
      var errorMsg = null;
      if(this.props.noOfPersons == 2) {
        if(!(this.state.productIdPlan0)) {
          if(!(this.state.productIdPlan1)) {
            errorMsg = "Please select a plan for each applicant";
          } else {
            errorMsg = "Please select a plan for applicant 1";
          }
        } else {
          if(!(this.state.productIdPlan1)) {
            errorMsg = "Please select a plan for applicant 2";
          }
        }
      } else {
        if(!(this.state.productIdPlan0)) {
          errorMsg = "Please select one plan";
        }
      }
      this.setState({
        productSelectionErrorMsg: errorMsg
      });
    }
  },
  validatePlansSelections() {
    if(this.props.noOfPersons == 2) {
      return (this.state.productIdPlan0 && this.state.productIdPlan1)
    } else {
      return this.state.productIdPlan0;
    }
  },
  redirectToProductPage() {
    const basePath = this.props.location.pathname.indexOf("agent") >=0 ? "/agent/" : "/";
    browserHistory.push(basePath + "products");
  },

  redirectToNextSteps() {
    this.productSubmissionBtnClicked = true;
    if(this.validatePlansSelections()) {
      const persons = [];
      this.setState({
        movingToFinalStep: true
      });
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
    } else {
      this.setPlanFormSubmissionErrorMsg();
    }
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
    var self = this;
    setTimeout(function() {
      self.setPlanFormSubmissionErrorMsg();
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

  getTotalPaymentAmount() {
    var total = 0;
    var sProductID = this.props.persons && this.props.persons[0] && this.props.persons[0].sProductID || null;
    var sProductID1 = this.props.persons && this.props.persons[1] && this.props.persons[1].sProductID || null;

    if (this.props.premiums && this.props.premiums[0] && this.props.premiums[0] && this.props.premiums[0][sProductID] && sProductID && this.state.premium_type){
      if (this.props.premiums[0][sProductID].QuoteRateGrid && this.props.premiums[0][sProductID].QuoteRateGrid.Col1 && this.props.premiums[0][sProductID].QuoteRateGrid.Col1.Face1 && this.props.premiums[0][sProductID].QuoteRateGrid.Col1.Face1.Premium) {
        total = parseFloat(this.props.premiums[0][sProductID].QuoteRateGrid.Col1.Face1.Premium[this.state.premium_type].split("$")[1].replace(",", ""));
      }
    }


    if (this.props.premiums && this.props.premiums[1] && this.props.premiums[1] && this.props.premiums[1][sProductID1] && sProductID1 && this.state.premium_type){
      if (this.props.premiums[1][sProductID1].QuoteRateGrid && this.props.premiums[1][sProductID1].QuoteRateGrid.Col1 && this.props.premiums[1][sProductID1].QuoteRateGrid.Col1.Face1 && this.props.premiums[1][sProductID1].QuoteRateGrid.Col1.Face1.Premium) {
        total += parseFloat(this.props.premiums[1][sProductID1].QuoteRateGrid.Col1.Face1.Premium[this.state.premium_type].split("$")[1].replace(",", ""));
      }
    }
    total = "$" + Math.round(total*100)/100;

    return total;

  },
  shouldShowTotal () {
    if(!this.props.persons) return true;
    if(this.props.noOfPersons ==1) {
      if(this.props.persons[0].selected_products.length==1) return true;
      return this.state.productIdPlan0 && this.state.productIdPlan0.length > 0;
    } else {
      if(this.props.persons[0].selected_products.length==1) {
        if(this.props.persons[1].selected_products.length==1) {
          return true;
        } else {
          return this.state.productIdPlan1 && this.state.productIdPlan1.length>0;
        }
      } else {
        if(this.props.persons[1].selected_products.length==1) { 
          return this.state.productIdPlan0 && this.state.productIdPlan0.length > 0;
        } 
        return this.state.productIdPlan0 && this.state.productIdPlan0.length>0 && this.state.productIdPlan1 && this.state.productIdPlan1.length>0;
      }
    }

  },
  public render() {

    var {persons} = this.props;
    persons = persons || [];
    var self = this;
    const personsContainerWidth = this.props.noOfPersons == 2 ? 4 : 8;
    const individualPlanContainerWidth = this.props.noOfPersons == 2 ? 6 : 12;
    const paymentSchedules = this.state.paymentSchedules;
    var additionalPersonClass = this.props.noOfPersons==2 ? "all-plan-person-info-container" : "";

    return (
      <div className="product-pager-container">
        <ScrollToTopOnMount />
        <Subheader />
        {this.props.noOfPersons==2 && <Row className="plans-product-header visible-xs">
          <Col sm={8} className="c-center">
            <Row>
              <Col sm={8} className="c-plans-product-text">
                Selected Products
              </Col>
            </Row>
          </Col>
        </Row>
        }

        {this.props.noOfPersons==2 && <Row className="visible-xs">
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
        }
        <Row style={{backgroundColor: "rgb(247, 247, 247)"}}>
          <Col className={`person-info-main-container ${additionalPersonClass}`} style={{marginLeft: "auto",marginRight: "auto", float: "none"}}>
            { this.props.noOfPersons>=1 &&
              <PersonInfo 
                person={persons[0]}
                noOfPersons={this.props.noOfPersons}
                personIndex={0}
                index={0}
                openEditPersonModal={this.openEditPersonModal.bind(this)}
              />
            }
            {this.props.noOfPersons==1 && <Row className="plans-product-header plans-product-header-below-personinfo visible-xs">
              <Col sm={8} className="c-center">
                <Row>
                  <Col sm={8} className="c-plans-product-text">
                    Selected Products
                  </Col>
                </Row>
              </Col>
            </Row>
            }
            {this.props.noOfPersons==1 && <Row className="visible-xs">
              <Col className="c-center plan-selector-outer-container" style={{paddingLeft: "28px", paddingRight: "30px", marginBottom: "15px"}}>
                <Row className="plans-selector-container plans-selector-container-below-personinfo">
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
            }
            <div className="hidden-xs">
              { this.props.noOfPersons==2 &&
                <PersonInfo 
                  person={persons[1]}
                  noOfPersons={this.props.noOfPersons}
                  personIndex={1}
                  index={1}
                  openEditPersonModal={this.openEditPersonModal.bind(this)}
                />
              }
            </div>
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
                    productInfo={self.props.products[0]}
                    person={persons[0]}
                    key={p.product_id + "0"}
                  />
                })
              }
            </Col>
            <Row style={{backgroundColor: "rgb(247, 247, 247)"}} className="visible-xs mobile-second-person-info-in-plan-container">
              <Col className={`person-info-main-container ${additionalPersonClass}`} style={{marginLeft: "auto",marginRight: "auto", float: "none"}}>
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
                    person={persons[1]}
                    noOfPersons={self.props.noOfPersons}
                    productIdPlan={self.state.productIdPlan1}
                    selectedPaymentType={self.state.selectedPaymentType}
                    personIndex={1}
                    productInfo={self.props.products[1]}
                    person={persons[0]}
                    selectProductPlan={self.selectProductPlan.bind(self)}
                    key={p.product_id + "1"}
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
          <Col xs={12} className="c-center plan-total-container visible-xs">
            <Row className="plans-selector-container">
              <Col sm={8} className="c-center" style={{float: "right", marginRight: "15px"}}>
                <Row>
                  <Col sm={4} xs={6} className="plan-total-text">
                    {this.state.premium_type} Total
                  </Col>
                  <Col sm={8} xs={6} className="plan-total-amount">
                    {this.getTotalPaymentAmount()}
                  </Col>
                </Row>
                
              </Col>
            </Row>
          </Col>
          <Col sm={3} xs={12} className="c-center plan-total-container hidden-xs">
            <Row className="plans-selector-container">
              <Col sm={4} className="" style={{float: "right", marginRight: "15px"}}>
                <Row>
                  <Col sm={7} xs={6} className="plan-total-text">
                    {this.state.premium_type} Total
                  </Col>
                  {this.shouldShowTotal() && <Col sm={5} xs={6} className="plan-total-amount">
                    {this.getTotalPaymentAmount()}
                  </Col> }
                </Row>
                
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          {this.state.productSelectionErrorMsg && <Col style={{textAlign: "center", color: "red", paddingLeft: "0px", marginBottom: "-15px"}} sm={12} className={"c-subheader-text error"}>
                    {this.state.productSelectionErrorMsg}
                  </Col> }
          <Col sm={3} className="continue-to-next-steps" style={{ }}>
            <Button className="c-button-default circular hidden-xs" onClick={(){
                this.redirectToNextSteps()
              }}
            >
              CONTINUE TO THE NEXT STEP
              {this.state.movingToFinalStep && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
            </Button>

            <Button className="c-button-default visible-xs" onClick={(){
                this.redirectToNextSteps()
              }}
            >
              CONTINUE TO THE NEXT STEP
              {this.state.movingToFinalStep && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
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