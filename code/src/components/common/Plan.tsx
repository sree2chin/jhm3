import * as React from 'react';
import {Link} from 'react-router';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import Select from 'react-select';
import {each, isEmpty, find} from "underscore";

import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
const Handle = Slider.Handle;


interface Props extends React.Props<Plan> {
}

export default class Plan extends React.Component<Props, {}> {
  constructor(){
    super();
    this.onFaceValChange.bind(this);
    this.handleChange.bind(this);
    this.stopSliderChanging.bind(this);
  },
  onPlanChange(key, obj) {
    this.setState({
      [key]: obj.value,
      selectedPlan: obj,
      sFaceAmount: parseInt(obj.FaceMin)
    })
    this.props.submitPlansForm(this.props.personIndex, [{
      plan: obj,
      sFaceAmount: obj.FaceMin,
      productId: this.props.plans.plans_data.product_id
    }]);
  },
  onPaymentTypeChange(key, obj) {
    this.setState({
      [key]: obj.value,
      selectedPaymentType: obj,
      payment_amount: parseFloat((obj.amount).split("$")[1])
    })
    this.props.onPaymentTypeChange(this.props.personIndex, obj);
  },
  getProductName(){

  },
  getPlan(plansData) {
    var plansList = plansData.plans_list;
    if (plansData.plans_list.constructor.toString().indexOf("Array") == -1) {
      plansList = [plansList];
    };

    var plan = JSON.parse(JSON.stringify(plansList[0]));

    var tenYearPlanLengthProducts = ["Vantis Velocity Term".toLowerCase(), "Vantis Velocity Term with ROP".toLowerCase()];
    var straightLifeProducts = ["Vantis Velocity Whole Life".toLowerCase(), "Vantis Velocity Whole Life Plus".toLowerCase(), "Gauranteed Golden".toLowerCase()];

    var productId = this.props.plans && this.props.plans.plans_data && this.props.plans.plans_data.product_id; 
    var productList = this.props.productInfo && this.props.productInfo.products_data && this.props.productInfo.products_data.products_list;
    
    productList = productList || [];
    var product = find(productList, (product)=>{
      return product.ProductID == productId
    });
    var productName =  product && product.ProductDisplayName;


    for(var i=0; i<plansList.length; i++) {
      if (tenYearPlanLengthProducts.indexOf(productName)>=0) {
        plan = find(plansList, function(plan) {
          return "10 Year Level Term".toLowerCase() == plan.PlanDisplayName.toLowerCase()
        });
      } else if (straightLifeProducts.indexOf(productName)>=0) {
        plan = find(plansList, function(plan) {
          return "Straight Life".toLowerCase() == plan.PlanDisplayName.toLowerCase()
        });
      }
    }
    if (isEmpty(plan)) {
      plan = JSON.parse(JSON.stringify(plansList[0]));
    }
    
    return plan;
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.plans && nextProps.plans.plans_data) {
      var plan = this.getPlan(nextProps.plans.plans_data);
      if(!this.props.selectedPaymentType && nextProps.selectedPaymentType && plan) {
        plan.value = plan.PlanID;
        plan.label = plan.PlanDisplayName;
        this.onPlanChange("sPlanID", plan);
      }
    }
  },
  getAmountFormat(amount) {
    var a = parseInt(amount);

    if(a/1000000 >=1) {
      return (a/1000000) + "m";
    } else {
      return (a/1000) + "k";
    }
  },
  getPlansDetailsForDropdown() {
    if(isEmpty(this.props.plans) || isEmpty(this.props.plans.plans_data) || (isEmpty(this.props.plans.plans_data.plans_list))) {
      return [];
    }

    var plans = JSON.parse(JSON.stringify(this.props.plans.plans_data.plans_list));
    if (plans.constructor.toString().indexOf("Array") == -1) {
      plans = [plans];
    };
    const plansObj = []
    for(var i=0; i<plans.length; i++) {
      plans[i].value = plans[i].PlanID;
      plans[i].label = plans[i].PlanDisplayName;
      plansObj.push({
        value:plans[i].PlanID,
        label: plans[i].PlanDisplayName
      })
    }
    return plans;
  },

  getPaymentSchedules() {
    if(isEmpty(this.props.premiums) || isEmpty(this.props.premiums.plans_data) || isEmpty(this.props.premiums.plans_data.QuoteRateGrid) || isEmpty(this.props.premiums.plans_data.QuoteRateGrid.Col1)) {
      return [];
    }

    var paymentSchedules = JSON.parse(JSON.stringify(this.props.premiums.plans_data.QuoteRateGrid.Col1));
    var sFaceAmount;
    if(this.state.sFaceAmount == 0) {
      if(this.state.selectedPlan && this.state.selectedPlan.FaceMin) {
        sFaceAmount = this.state.selectedPlan.FaceMin;
      }
    } else {
      sFaceAmount = this.state.sFaceAmount;
    }
    var face = find(paymentSchedules, (paymentSchedule)=>{
      return (parseInt(paymentSchedule.FaceAmount) <= parseInt(sFaceAmount)) 
    });
    var p = [];

    if(isEmpty(face)) {
      face=paymentSchedules["Face1"];
    }
    if(face && face.Premium) {
      each(face.Premium, (k, v)=> {
        var f = {};
        f.value = v;
        f.label = v;
        f.amount=k;
        p.push(f);
      });
    }

    return p;
  },
  
  state = {},
  stopSliderChanging() {
    this.setState({
      sliderSliding: false
    });
  },
  handleChange(value) {
    this.setState({
      sFaceAmount: parseInt(value)
    });
    var f = function() {
      this.props.submitPlansForm(this.props.personIndex, [{
        plan: this.state.selectedPlan,
        sFaceAmount: parseInt(value),
        productId: this.props.plans.plans_data.product_id
      }], this.stopSliderChanging.bind(this));
    }.bind(this);
    setTimeout(f);
  },
  duringSliderChanging(value) {
    this.setState({
      sFaceAmount: parseInt(value),
      sliderSliding: true
    });
  },
  handleSliderChange(value) {
    this.sFaceAmount = value;
  },
  onFaceValChange(key, value) {
    this.setState({
      [key]: value
    })
  },
  selectThisProduct() {
    this.props.selectProductPlan(this.props.personIndex, this.props.premiums.plans_data.ProductID);
    if(this.state.selectedPlan && this.state.sFaceAmount) {
      this.props.submitPlansForm(this.props.personIndex, [{
        plan: this.state.selectedPlan,
        sFaceAmount: this.state.sFaceAmount,
        productId: this.props.plans.plans_data.product_id
      }]);
    }
  },
  getProductDisplayName() {
    var productId = this.props.plans && this.props.plans.plans_data && this.props.plans.plans_data.product_id; 
    var productList = this.props.productInfo && this.props.productInfo.products_data && this.props.productInfo.products_data.products_list;
    
    productList = productList || [];
    var product = find(productList, (product)=>{
      return product.ProductID == productId
    });
    return product && product.ProductDisplayName;
  },
  isProductSPWL() {
    return this.props.plans && this.props.plans.plans_data && this.props.plans.plans_data.spwl_flag==1;
  },
  public render() {
    const personIndex = this.props.personIndex;
    const plansObjs = this.getPlansDetailsForDropdown();
    const personsContainerWidth = this.props.noOfPersons == 2 ? 6 : 12;

    return (
      <Col sm={12} className={`single-plan-container ${this.props.noOfPersons==2 ? "two-persons-plan-container" : ""}`}>
        <Row className="plan-details-container">
          <Col sm={12} className="c-center">
            <Row>
              <Col sm={2} style={{width: "16%", height: "90px", backgroundColor: "#317dbd", margin: "20px"}} className="blue-plan-container hidden-xs">
              </Col>
              <Col sm={8} className={`plan-product-info-text`}>
                <Row className={`plan-product-name ${window.location.pathname.indexOf("/agent")>=0 ? "agent-page" : ""}`}>
                  {this.getProductDisplayName()}
                </Row>
                {!(window.location.pathname.indexOf("/agent")>=0) && <Row className="plan-sider-info-text1">
                  This is the fun part! Move the coverage slide to your desired amount of life insurance. Watch the monthly cost estimates change as you move. Then choose how long you want that coverage to last (plan length). Finally, click on your preferred  payment method! It's that simple.
                </Row>}
              </Col>
            </Row>
            <Row className="plan-sider-info-text">
              <Col sm={6} className="plan-sider-coverage-container">
                <Row className="plan-coverage-container">
                  {(this.state.sFaceAmount && this.state.sFaceAmount !=0) ? 
                    [<span key="1" style={{fontSize: "26px", textAlign: "right", color: "#009c91"}}>${this.state.sFaceAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </span] : null 
                  }
                  {(this.state.sFaceAmount && this.state.sFaceAmount !=0) ?
                    [<span key="2" style={{fontSize: "14px", textAlign: "left", color: "#666666"}}> of</span>] : null
                  }
                  {this.isProductSPWL() ? <span key="3" style={{fontSize: "14px", textAlign: "left", color: "#666666"}}> Premium </span> : <span key="3" style={{fontSize: "14px", textAlign: "left", color: "#666666"}}> Coverage </span>}
                </Row>
                <Row>
                  {this.state.selectedPlan && 
                    <Col className="plan-faceMin" xs={2}>
                      ${this.getAmountFormat(this.state.selectedPlan.FaceMin)}
                    </Col>
                  }
                  {this.state.selectedPlan && 
                      <Col className="plan-face-val-slider" xs={8}>
                        <Slider
                          min={parseInt(this.state.selectedPlan.FaceMin)}
                          max={parseInt(this.state.selectedPlan.FaceMax)}
                          step={25000}
                          onChange={this.duringSliderChanging.bind(this)}
                          onAfterChange={this.handleChange.bind(this)}
                          trackStyle={{ backgroundColor: '#ffffff', height: 10, border: "solid 1px #999999" }}
                          handleStyle={{
                            height: 24,
                            width: 24,
                            marginLeft: -14,
                            marginTop: -9,
                            backgroundColor: "#009c91",
                            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.15)",
                            border: "solid 1px rgba(0, 0, 0, 0.75)"
                          }}
                          railStyle={{ backgroundColor: '#ffffff', border: "solid 1px #999999", height: 10 }}
                        />
                      </Col>
                  }
                  {this.state.selectedPlan && 
                    <Col className="plan-faceMax" xs={2}>
                      ${this.getAmountFormat(this.state.selectedPlan.FaceMax)}
                    </Col>
                  }
                </Row>
              </Col>
              {this.isProductSPWL() ? null : <Col sm={3} className="plan-length-container">
                <Row style={{ marginTop: "16px"}}  className="plan-length-container-text">
                  Plan Choice
                </Row>
                <Row className="plan-length-container-selector">
                  <Select
                    name="form-field-plans"
                    options={plansObjs}
                    value={this.state.sPlanID}
                    onChange={(stateObj)=>{
                      this.onPlanChange("sPlanID", stateObj)
                    }}
                  />
                </Row>
              </Col>}
              {this.isProductSPWL() ? <Col sm={6} className="plan-cost-container">
                <Row style={{marginTop: "30px"}}>
                  <Col sm={12}>
                    <Col xs={5} className="plan-cost-text">
                      Coverage
                    </Col>
                    <Col sm={7} className="plan-cost-amount">
                      {this.state.sliderSliding && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                      {!this.state.sliderSliding && this.state.sFaceAmount}
                    </Col>
                  </Col>
                </Row>
              </Col> : <Col sm={3} className="plan-cost-container">
                <Row style={{marginTop: "30px"}}>
                  <Col sm={12}>
                    <Col xs={4} className="plan-cost-text">
                      Cost
                    </Col>
                    <Col sm={4} className="plan-cost-text-two-person">
                      Cost (billed {this.props.selectedPaymentType && this.props.selectedPaymentType.label})
                    </Col>
                    <Col sm={4} className="plan-cost-amount">
                      {this.state.sliderSliding && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                      {!this.state.sliderSliding && this.props.selectedPaymentType && this.props.selectedPaymentType.label && this.props.premiums && this.props.premiums && this.props.premiums.plans_data && this.props.premiums.plans_data.QuoteRateGrid && this.props.premiums.plans_data.QuoteRateGrid.Col1 && this.props.premiums.plans_data.QuoteRateGrid.Col1.Face1 && this.props.premiums.plans_data.QuoteRateGrid.Col1.Face1.Premium && this.props.premiums.plans_data.QuoteRateGrid.Col1.Face1.Premium[this.props.selectedPaymentType.label]}
                    </Col>
                  </Col>
                </Row>
              </Col>}
            </Row>
            <Row className={"select-this-product-container" + (this.props.productIdPlan == this.props.plans.plans_data.product_id ? " active" : "")} onClick={this.selectThisProduct.bind(this)}>
              SELECT THIS PRODUCT
            </Row>
          </Col>
        </Row>
      </Col>
    );
  }
}