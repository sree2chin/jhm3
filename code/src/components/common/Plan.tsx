import * as React from 'react';
import {Link} from 'react-router';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import Select from 'react-select';
import {each, isEmpty, find} from "underscore";

import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
const Handle = Slider.Handle;
import RawHtml from "react-raw-html";


interface Props extends React.Props<Plan> {
  premiums: any
}

export default class Plan extends React.Component<Props, {}> {
  constructor(){
    super();
    this.onFaceValChange.bind(this);
    this.handleChange.bind(this);
    this.stopSliderChanging.bind(this);
  }
  onPlanChange(key, obj) {
    var sFaceAmount = this.state.sFaceAmount;

    if (sFaceAmount >=  parseInt(obj.FaceMin) && sFaceAmount <=  parseInt(obj.FaceMax)) {
      sFaceAmount = this.state.sFaceAmount;
    } else {
      sFaceAmount = parseInt(obj.FaceMin);
    }
    this.setState({
      [key]: obj.value,
      selectedPlan: obj,
      sFaceAmount: sFaceAmount
    })
    this.props.submitPlansForm(this.props.personIndex, [{
      plan: obj,
      sFaceAmount: String(sFaceAmount),
      productId: this.props.plans.plans_data.product_id
    }], this.stopSliderChanging.bind(this));
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
    if (isEmpty(plansData.plans_list)) { return {};}
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
  };

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

  shouldShowPlanDropdowns() {
    return this.getPlansDetailsForDropdown().length > 1;
  }

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
  }

  state = {}
  stopSliderChanging() {
    this.setState({
      sliderSliding: false
    });
    if (!this.props.shouldShowSelectProductBtn) {
      setTimeout(()=> {
        this.props.selectProductPlan(this.props.personIndex, this.props.premiums.plans_data.ProductID);
        //this.selectThisProduct();
      }, 100);
    }
  }
  handleChange(value) {
    var sFaceAmount = parseInt(value);
    if ( sFaceAmount > parseInt(this.state.selectedPlan.FaceMax)) {
      sFaceAmount = parseInt(this.state.selectedPlan.FaceMax)
    }
    this.setState({
      sFaceAmount: sFaceAmount
    });
    var f = function() {
      this.props.submitPlansForm(this.props.personIndex, [{
        plan: this.state.selectedPlan,
        sFaceAmount: sFaceAmount,
        productId: this.props.plans.plans_data.product_id
      }], this.stopSliderChanging.bind(this));
    }.bind(this);
    setTimeout(f);
  }
  duringSliderChanging(value) {
    var sFaceAmount = parseInt(value);
    if ( sFaceAmount > parseInt(this.state.selectedPlan.FaceMax)) {
      sFaceAmount = parseInt(this.state.selectedPlan.FaceMax)
    }
    this.setState({
      sFaceAmount: sFaceAmount,
      sliderSliding: true
    });
  }
  handleSliderChange(value) {
    this.sFaceAmount = value;
  }
  onFaceValChange(key, value) {
    this.setState({
      [key]: value
    })
  }
  selectThisProduct() {
    this.props.selectProductPlan(this.props.personIndex, this.props.premiums.plans_data.ProductID);
    /*if(this.state.selectedPlan && this.state.sFaceAmount) {
      this.props.submitPlansForm(this.props.personIndex, [{
        plan: this.state.selectedPlan,
        sFaceAmount: this.state.sFaceAmount,
        productId: this.props.plans.plans_data.product_id
      }]);
    }*/
  }
  getProductDisplayName() {
    var productId = this.props.plans && this.props.plans.plans_data && this.props.plans.plans_data.product_id;
    var productList = this.props.productInfo && this.props.productInfo.products_data && this.props.productInfo.products_data.products_list;

    productList = productList || [];
    var product = find(productList, (product)=>{
      return product.ProductID == productId
    });
    return product && product.ProductDisplayName;
  }

  getProductImage() {
    var productId = this.props.plans && this.props.plans.plans_data && this.props.plans.plans_data.product_id;
    var productList = this.props.productInfo && this.props.productInfo.products_data && this.props.productInfo.products_data.products_list;

    productList = productList || [];
    var product = find(productList, (product)=>{
      return product.ProductID == productId
    });
    return product && product.product_image;
  }
  isProductSPWL() {
    return this.props.plans && this.props.plans.plans_data && this.props.plans.plans_data.spwl_flag==1;
  }
  getFaceAmount(sFaceAmount) {
    var faceAmount = sFaceAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (faceAmount.split(".") && faceAmount.split(".")[1] && faceAmount.split(".")[1].length==1) {
      faceAmount += "0";
    }
    return faceAmount;
  }
  componentDidMount () {
  }
  getProductPlanInstructions() {
    var msg = "";
    if (this.props.plans && this.props.plans.plans_data && this.props.plans.plans_data.product_data &&
      this.props.plans.plans_data.product_data.product_plan_instructions && this.props.plans.plans_data.product_data.product_plan_instructions.length > 0) {
        msg = this.props.plans.plans_data.product_data.product_plan_instructions;
    }

    return msg;
  }
  public render() {
    const personIndex = this.props.personIndex;
    const plansObjs = this.getPlansDetailsForDropdown();
    const personsContainerWidth = this.props.noOfPersons == 2 ? 6 : 12;

    RawHtml.addTag("mycooltag");
    const product_image_name = this.getProductImage();
    const product_image = "http://ec2-107-23-131-50.compute-1.amazonaws.com/assets/img/" + product_image_name;
    return (
      <Col sm={12} className={`single-plan-container ${this.props.noOfPersons==2 ? "two-persons-plan-container" : ""}`}>
        <Row className="plan-details-container">
          <Col sm={12} className="c-center">
            <Row>
              <Col sm={2} style={{textAlign: "center"}} className={`${this.props.noOfPersons==2 ? "two_products_conainer_width" : ""}`}>
                  <img
                    className={`plan-product-image hidden-xs ${product_image_name}`}
                    src={`${product_image}`}
                  />
              </Col>
              <Col sm={9} className={`plan-product-info-text`}>
                <Row className={`plan-product-name ${window.location.pathname.indexOf("/agent")>=0 ? "agent-page" : ""}`}>

                  {this.getProductDisplayName()}
                </Row>
                {!(window.location.pathname.indexOf("/agent")>=0) && <Row className="plan-sider-info-text1">
                  <RawHtml.mycooltag>
                    {this.getProductPlanInstructions()}
                  </RawHtml.mycooltag>
                </Row>}
              </Col>
            </Row>
            <Row className="plan-sider-info-text">
              <Col sm={6} className="plan-sider-coverage-container">
                <Row className="plan-coverage-container">
                  {(this.state.sFaceAmount && this.state.sFaceAmount !=0) ?
                    [<span className="s-face-amount" key="1" style={{fontSize: "26px", textAlign: "right", color: "#009c91"}}>${this.getFaceAmount(this.state.sFaceAmount)} </span>] : null
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
                          min={parseInt(this.state.selectedPlan.slider_min)}
                          max={parseInt(this.state.selectedPlan.slider_max)}
                          step={parseInt(this.state.selectedPlan.slider_step_value) == 0 ? 1 : parseInt(this.state.selectedPlan.slider_step_value)}
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
              {this.isProductSPWL() || !this.shouldShowPlanDropdowns() ? null : <Col sm={3} className="plan-length-container">
                <Row style={{ marginTop: "16px", marginLeft: "5px"}}  className="plan-length-container-text">
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
              {this.isProductSPWL() ? (this.isProductSPWL() ? <Col sm={6} className="plan-length-container">
                 <Row>
                  <Col sm={6} className="plan-length-container-text death-benefit-key-text">
                    Death Benefit
                  </Col>
                  <Col sm={6} className="plan-length-container-selector death-benefit-key-value">
                    { this.props.premiums && this.props.premiums.plans_data && this.props.premiums.plans_data.Plan && this.props.premiums.plans_data.Plan.DeathBenefit}
                  </Col>
                 </Row>
               </Col> : <Col sm={6} className="plan-cost-container">
                <Row style={{marginTop: "30px"}}>
                  <Col sm={12}>
                    <Col xs={5} className="" style={{marginTop: "6px"}}>
                      Coverage
                    </Col>
                    <Col sm={7} className="plan-cost-amount">
                      {this.state.sliderSliding && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                      {!this.state.sliderSliding && this.isProductSPWL() && "$"}
                      {!this.state.sliderSliding && this.isProductSPWL() && this.state.sFaceAmount}
                      {!this.state.sliderSliding && !this.isProductSPWL() && this.props.selectedPaymentType && this.props.selectedPaymentType.label && this.props.premiums && this.props.premiums && this.props.premiums.plans_data && this.props.premiums.plans_data.QuoteRateGrid && this.props.premiums.plans_data.QuoteRateGrid.Col1 && this.props.premiums.plans_data.QuoteRateGrid.Col1.Face1 && this.props.premiums.plans_data.QuoteRateGrid.Col1.Face1.Premium && this.props.premiums.plans_data.QuoteRateGrid.Col1.Face1.Premium[this.props.selectedPaymentType.label]}
                    </Col>
                  </Col>
                </Row>
                </Col>) : <Col sm={3} className="plan-cost-container">
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
            {this.props.shouldShowSelectProductBtn && <Row className={"select-this-product-container" + (this.props.productIdPlan == this.props.plans.plans_data.product_id ? " active" : "")} onClick={this.selectThisProduct.bind(this)}>
              SELECT THIS PRODUCT
            </Row>}
          </Col>
        </Row>
      </Col>
    );
  }
}
