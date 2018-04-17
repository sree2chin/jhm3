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
import EditPerson from "./EditPerson";
import Riders from "./Riders";
import Select from 'react-select';
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";

interface Props {
  plans: [any],
  persons: any,
  noOfPersons: any,
  premiums: any
}

class PlansPage extends React.Component<Props, {}> {
  constructor(){
    super();
  }

  state ={}

  componentWillMount() {
    if (isEmpty(this.props.plans) && isEmpty(this.props.persons)) {
      const basePath = this.props.location.pathname.indexOf("agent") > 1 || this.props.is_agent ? "/agent" : "/";
      var queryParams = this.props.location.query;
      var queryParamsString = "?";
      for(var k in queryParams) {
        if (queryParams[k]) {
          queryParamsString += k + "=" + queryParams[k] + "&";
        } else {
          queryParamsString += k + "&"
        }
      }
      queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);
      browserHistory.push(basePath + queryParamsString);
    }
  }

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
  }

  selectProduct(product) {
    this.setState({
      productId: product.ProductID
    });
  }

  onPaymentTypeChange(ob) {
    this.setState({
      premium_type: ob.label,
      selectedPaymentType: ob
    });
  }

  submitPlansForm(personIndex, data, successCb) {
    const persons = [];

    const personOne = JSON.parse(JSON.stringify(this.props.persons[personIndex]));
    personOne.sBirthDate = moment(personOne.s_birthDate).format("YYYY-MM-DD");
    personOne.sPlanID = data[0].plan.PlanID;
    personOne.sProductID = data[0].productId;
    personOne.sFaceAmount = data[0].sFaceAmount;

    if (data[0].plan.SpwlFlag == "1") {
      personOne.sFaceAmount = 0;
      personOne.sPremiumAmount = data[0].sFaceAmount;
      personOne.sWP = "1";
    } else {
      personOne.sWP = "0";
    }

    personOne.sClassNum="2";
    personOne.sDividendNum = "1";
    personOne.duration = data[0].plan && data[0].plan.PlanName && data[0].plan.PlanName.split(" ")[0] ? data[0].plan.PlanName.split(" ")[0] : "";

    persons.push(personOne);

    if (this.props.noOfPersons == 2) {
      if(personIndex ==0) {
        persons[0] = personOne;
        persons[1] = this.props.persons[1];
      } else {
        persons[0] = this.props.persons[0];
        persons[1] = personOne;
      }
    }

    this.props.setPersonsData(persons);

    this.props.submitPlansForm(persons).then(() => {
      if(successCb) { successCb(); }
      console.log("sdfds");
    }).catch(()=>{
      this.submmitedProductForm = false;
    });
  }

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
  }
  validatePlansSelections() {
    if(this.props.noOfPersons == 2) {
      return (this.state.productIdPlan0 && this.state.productIdPlan1)
    } else {
      return this.state.productIdPlan0;
    }
  }
  redirectToProductPage() {
    const basePath = this.props.location.pathname.indexOf("agent") >=0 || this.props.is_agent ? "/agent/" : "/";
    var queryParams = this.props.location.query;
    var queryParamsString = "?";
    for(var k in queryParams) {
      if (queryParams[k]) {
        queryParamsString += k + "=" + queryParams[k] + "&";
      } else {
        queryParamsString += k + "&";
      }
    }
    queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);
    browserHistory.push(basePath + "products" + queryParamsString);
  }

  redirectToNextSteps() {
    this.productSubmissionBtnClicked = true;
    if(this.validatePlansSelections()) {
      const persons = [];
      const personOne = JSON.parse(JSON.stringify(this.props.persons[0]));
      if (this.props.premiums && this.props.premiums[0] && this.props.premiums[0][this.state.productIdPlan0] && this.props.premiums[0][this.state.productIdPlan0].Plan && this.props.premiums[0][this.state.productIdPlan0].Plan.SpwlFlag != "1") {
        if(false){ //this.props.premiums && this.props.premiums[0] && this.props.premiums[0][this.state.productIdPlan0] && this.props.premiums[0][this.state.productIdPlan0].QuoteRateGrid && this.props.premiums[0][this.state.productIdPlan0].QuoteRateGrid.Col1 && this.props.premiums[0][this.state.productIdPlan0].QuoteRateGrid.Col1.Face1 && this.props.premiums[0][this.state.productIdPlan0].QuoteRateGrid.Col1.Face1.Premium ) {
          var amount = this.props.premiums[0][this.state.productIdPlan0].QuoteRateGrid.Col1.Face1.Premium[this.state.premium_type];
          amount = amount ? parseFloat(amount.split("$")[1]) : 0;

          personOne.premium_amount = String(amount);
          personOne.premium_type=this.state.premium_type;
        } else {
          this.setState({
            showPremiumAmountNotpresentError: true
          });
          return;
        }
      }
      this.setState({
        showPremiumAmountNotpresentError: false
      });


      this.props.premiums[0][this.state.productIdPlan0].QuoteRateGrid.Col1.Face1.PremiumAmount
      persons.push(personOne);

      if(this.props.noOfPersons == 2) {
        const personTwo = JSON.parse(JSON.stringify(this.props.persons[1]));
        if (this.props.premiums && this.props.premiums[1] && this.props.premiums[1][this.state.productIdPlan0] && this.props.premiums[1][this.state.productIdPlan0].Plan && this.props.premiums[1][this.state.productIdPlan0].Plan.SpwlFlag != "1") {
          if(this.props.premiums && this.props.premiums[1] && this.props.premiums[1][this.state.productIdPlan1] && this.props.premiums[1][this.state.productIdPlan1].QuoteRateGrid && this.props.premiums[1][this.state.productIdPlan1].QuoteRateGrid.Col1 && this.props.premiums[1][this.state.productIdPlan1].QuoteRateGrid.Col1.Face1 && this.props.premiums[1][this.state.productIdPlan1].QuoteRateGrid.Col1.Face1.Premium ) {
            var amount = this.props.premiums[1][this.state.productIdPlan1].QuoteRateGrid.Col1.Face1.Premium[this.state.premium_type];
            amount = amount ? parseFloat(amount.split("$")[1]) : 0;

            personTwo.premium_amount = String(amount);
            personTwo.premium_type=this.state.premium_type;
          } else {
            this.setState({
              showPremiumAmountNotpresentError: true
            });
            return;
          }
        }
        persons.push(personTwo);
        this.setState({
          showPremiumAmountNotpresentError: false
        });
      }

      this.setState({
        movingToFinalStep: true
      });

      this.props.setPersonsData(persons);
      var queryParams = this.props.location.query;
      var queryParamsString = "?";
      for(var k in queryParams) {
        if (queryParams[k]) {
          queryParamsString += k + "=" + queryParams[k] + "&";
        } else {
          queryParamsString += k + "&";
        }
      }
      queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);
      const basePath = this.props.location.pathname.indexOf("agent") >=0 || this.props.is_agent ? "/agent/" : "/";
      browserHistory.push(basePath + "next-steps" + queryParamsString);
    } else {
      this.setPlanFormSubmissionErrorMsg();
    }
  }
  openEditPersonModal = (person, personIndex) => {
    this.props.openEditPersonModal(person, personIndex);
  }
  handleEditChange(person) {
    this.props.handleEditChange(person);
    setTimeout(()=> {
      this.submitProductsFormOnEditPerson();
    });
  }

  selectProductPlan(personIndex, productId) {
    this.setState({
      ["productIdPlan"+personIndex]: productId
    });
    var self = this;
    setTimeout(function() {
      self.setPlanFormSubmissionErrorMsg();
    });
  }
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
    var queryParams = this.props.location.query;
    var queryParamsString = "?";
    for(var k in queryParams) {
      if (queryParams[k]) {
        queryParamsString += k + "=" + queryParams[k] + "&";
      } else {
        queryParamsString += k + "&";
      }
    }
    queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);
    this.props.submitQuoteForm(persons).then(() => {
      const basePath = this.props.location.pathname.indexOf("agent") >=0 || this.props.is_agent ? "/agent/" : "/";
      browserHistory.push(basePath + "products" + queryParamsString);
    }).catch(()=>{
      this.submmitedProductForm = false;
    });
  }

  getTotalPaymentAmount() {
    var total = 0;
    var sProductID = this.props.persons && this.props.persons[0] && this.props.persons[0].sProductID || null;
    var sProductID1 = this.props.persons && this.props.persons[1] && this.props.persons[1].sProductID || null;

    if (this.props.premiums && this.props.premiums[0] && this.props.premiums[0] && this.props.premiums[0][sProductID] && sProductID && this.state.premium_type){
      if (this.props.premiums[0][sProductID].QuoteRateGrid && this.props.premiums[0][sProductID].QuoteRateGrid.Col1 && this.props.premiums[0][sProductID].QuoteRateGrid.Col1.Face1 && this.props.premiums[0][sProductID].QuoteRateGrid.Col1.Face1.Premium) {
        total = parseFloat(this.props.premiums[0][sProductID].QuoteRateGrid.Col1.Face1.Premium[this.state.premium_type].split("$")[1].replace(",", ""));
      }
      if (this.state.selectedRider0) {
        var riderAmount = this.state.selectedRider0.Premium[this.state.premium_type] ? parseFloat(this.state.selectedRider0.Premium[this.state.premium_type].split("$")[1]) : 0;
        total += riderAmount;
      }
    }


    if (this.props.premiums && this.props.premiums[1] && this.props.premiums[1] && this.props.premiums[1][sProductID1] && sProductID1 && this.state.premium_type){
      if (this.props.premiums[1][sProductID1].QuoteRateGrid && this.props.premiums[1][sProductID1].QuoteRateGrid.Col1 && this.props.premiums[1][sProductID1].QuoteRateGrid.Col1.Face1 && this.props.premiums[1][sProductID1].QuoteRateGrid.Col1.Face1.Premium) {
        total += parseFloat(this.props.premiums[1][sProductID1].QuoteRateGrid.Col1.Face1.Premium[this.state.premium_type].split("$")[1].replace(",", ""));
      }
      if (this.state.selectedRider1) {
        var riderAmount = this.state.selectedRider1.Premium[this.state.premium_type] ? parseFloat(this.state.selectedRider1.Premium[this.state.premium_type].split("$")[1])  : 0;
        total += riderAmount;
      }
    }
    total = "$" + String(Math.round(total*100)/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (total.split(".") && total.split(".")[1] && total.split(".")[1].length==1) {
      total += "0";
    }
    return total;

  }
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

  }
  selectRider(rider, index) {
    this.setState({
      ["selectedRider" + index]: rider
    });
  }
  containsOnlySPWL() {
    var containOnlySPWLProducts = false;
    if (this.props.plans) {
      if (this.props.noOfPersons == 2) {
        if (this.props.plans[0] && this.props.plans[0].plans_data && this.props.plans[1] && this.props.plans[1].plans_data) {
          containOnlySPWLProducts = this.props.plans[0].plans_data.length == 1 && this.props.plans[0].plans_data[0].spwl_flag == 1 &&
          this.props.plans[1].plans_data.length == 1 && this.props.plans[1].plans_data[0].spwl_flag == 1;
        }
      } else {
        if (this.props.plans[0] && this.props.plans[0].plans_data) {
          containOnlySPWLProducts = this.props.plans[0].plans_data.length == 1 && this.props.plans[0].plans_data[0].spwl_flag == 1;
        }
      }
    }
    return containOnlySPWLProducts;
  }
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
        <Subheader
          location={this.props.location}
          products={this.props.products}
          plans={this.props.plans}
          premiums={this.props.premiums}
        />
        {this.props.noOfPersons==2 &&
          <Row className="plans-product-header visible-xs">
            <Col sm={8} className="c-center">
              <Row>
                <Col sm={8} className="c-plans-product-text">
                  Selected Products
                </Col>
              </Row>
            </Col>
          </Row>
        }

        {this.props.noOfPersons==2 && !this.containsOnlySPWL() && <Row className="visible-xs">
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
          <Col className={`person-info-main-container container-max-width ${additionalPersonClass}`} style={{marginLeft: "auto",marginRight: "auto", float: "none"}}>
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
            {this.props.noOfPersons==1 && !this.containsOnlySPWL() && <Row className="visible-xs">
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
          <Col className="c-center plans-product-header-text-container container-max-width">
            <Row>
              <Col sm={7} className="c-plans-product-text">
                Selected Products
              </Col>
              <Col sm={5} className="c-select-diff-product-link hidden-xs" onClick={this.redirectToProductPage.bind(this)}>
                SELECT DIFFERENT PRODUCTS
              </Col>
            </Row>
          </Col>
        </Row>

        {!this.containsOnlySPWL() && <Row className="hidden-xs">
          <Col className="c-center plan-selector-outer-container container-max-width" style={{paddingLeft: "15px", paddingRight: "15px", marginBottom: "15px"}}>
            <Row className="plans-selector-container">
              <Col lg={6} sm={10} md={8} className="c-center" style={{paddingTop: "0px"}}>
                <Col sm={6} className="payment-schedule-text" style={{paddingTop: "20px", paddingRight: "30px", textAlign: "right"}}>
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
        </Row>}

        <Row>
          <Col className="c-center all-plans-main-container container-max-width">
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
                    shouldShowSelectProductBtn={self.props.plans[0].plans_data && self.props.plans[0].plans_data.length > 1}
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
                    selectProductPlan={self.selectProductPlan.bind(self)}
                    key={p.product_id + "1"}
                    shouldShowSelectProductBtn={self.props.plans[1].plans_data && self.props.plans[1].plans_data.length > 1}
                  />
                })
              }
            </Col>
          </Col>
        </Row>

        {this.props.premiums && this.props.premiums[0] &&
          this.props.premiums[0][this.state.productIdPlan0] &&
          this.props.premiums[0][this.state.productIdPlan0].Plan &&
          this.props.premiums[0][this.state.productIdPlan0].Plan.Rider && <Row>
          <Col>
            <Riders
              person={persons[0]}
              riders={this.props.premiums[0][this.state.productIdPlan0].Plan.Rider}
              index={0}
              selectRider={this.selectRider.bind(this)}
              premium_type={this.state.premium_type}
            />
          </Col>
        </Row>
        }
        {this.props.premiums && this.props.premiums[1] &&
          this.props.premiums[1][this.state.productIdPlan1] &&
          this.props.premiums[1][this.state.productIdPlan1].Plan &&
          this.props.premiums[1][this.state.productIdPlan1].Plan.Rider && <Row>
          <Col>
            <Riders
              person={persons[1]}
              riders={this.props.premiums[1][this.state.productIdPlan1].Plan.Rider}
              index={1}
              selectRider={this.selectRider.bind(this)}
              premium_type={this.state.premium_type}
            />
          </Col>
        </Row>
        }

        {<Row>
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
          <Col sm={3} xs={12} className="c-center plan-total-container hidden-xs container-max-width">
            <Row className="plans-selector-container" style={{marginLeft: "0px"}}>
              <Col md={4} sm={5} className="" style={{float: "right", marginRight: "15px"}}>
                <Row>
                  <Col sm={7} md={6} className="plan-total-text">
                    {this.state.premium_type} Total
                  </Col>
                  {this.shouldShowTotal() && <Col sm={5} xs={6} className="plan-total-amount">
                    {this.getTotalPaymentAmount()}
                  </Col> }
                </Row>

              </Col>
            </Row>
          </Col>
        </Row>}

        <Row className="plans-continue-to-next-steps-container">
          {this.state.productSelectionErrorMsg && <Col style={{textAlign: "center", color: "red", paddingLeft: "0px", marginBottom: "15px"}} sm={12} className={"c-subheader-text error"}>
                    {this.state.productSelectionErrorMsg}
                  </Col> }
          {this.state.showPremiumAmountNotpresentError && <Col style={{textAlign: "center", color: "red", paddingLeft: "0px", marginBottom: "15px"}} sm={12} className={"c-subheader-text error"}>
            {"Something gone wrong. Please try again."}
          </Col> }
          <Col className="continue-to-next-steps c-center" style={{ }}>

            <Button style={{marginTop: "0px", marginRight: "14px", backgroundColor: "#fb4d3d!important"}} className="c-button-default circular hidden-xs back-btn" onClick={(){
                this.redirectToProductPage()
              }}
            >
              BACK
              {this.state.movingToFinalStep && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
            </Button>
            <Button style={{marginTop: "0px"}} className="c-button-default circular hidden-xs" onClick={(){
                this.redirectToNextSteps()
              }}
            >
              CONTINUE TO THE NEXT STEP
              {this.state.movingToFinalStep && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
            </Button>

            <Button className="c-button-default visible-xs back-btn" onClick={() => {
                this.redirectToProductPage()
              }}
              style={{backgroundColor: "#fb4d3d!important", marginBottom: "15px"}}
            >
              BACK
              {this.state.movingToFinalStep && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
            </Button>
            <Button  style={{marginBottom: "15px"}} className="c-button-default visible-xs" onClick={(){
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
    premiums: state.quotes.premiums,
    is_agent: state.quotes.is_agent
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