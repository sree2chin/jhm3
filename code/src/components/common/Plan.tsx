import * as React from 'react';
import {Link} from 'react-router';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import Select from 'react-select';
import {each, isEmpty, deepEqual, find} from "lodash";

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
  },
  onPlanChange(key, obj) {
    this.setState({
      [key]: obj.value,
      selectedPlan: obj,
      sFaceAmount: parseInt(obj.FaceMin)
    })
    this.props.submitPlansForm(this.props.personIndex, [{
      plan: obj,
      sFaceAmount: obj.FaceMin
    }]);
  },
  onPaymentTypeChange(key, obj) {
    this.setState({
      [key]: obj.value,
      selectedPaymentType: obj,
      payment_amount: parseFloat((obj.label).split("$")[1])
    })
    this.props.onPaymentTypeChange(this.props.personIndex, obj);
  },
  componentWillReceiveProps(nextProps) {
    if(isEmpty(this.props.plans) && !isEmpty(nextProps.plans)) {
      const plan = JSON.parse(JSON.stringify(nextProps.plans.plans_data.plans_list[0]));
      plan.value = plan.PlanID;
      plan.label = plan.PlanDisplayName;
      this.onPlanChange("sPlanID", plan);
    }
    if(!isEmpty(this.props.premiums) && !isEmpty(this.props.premiums.plans_data) && !isEmpty(this.props.premiums.plans_data)) {
      this.setState({
        sFaceAmount: parseInt(this.props.premiums.plans_data.FaceAmount)
      });
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

    const plans = JSON.parse(JSON.stringify(this.props.plans.plans_data.plans_list));
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

    const paymentSchedules = JSON.parse(JSON.stringify(this.props.premiums.plans_data.QuoteRateGrid.Col1));
    var sFaceAmount;
    if(this.state.sFaceAmount == 0) {
      if(this.state.selectedPlan && this.state.selectedPlan.FaceMin) {
        sFaceAmount = this.state.selectedPlan.FaceMin;
        this.setState({
          sFaceAmount
        });
      }
    } else {
      sFaceAmount = this.state.sFaceAmount;
    }
    var face = find(paymentSchedules, (paymentSchedule)=>{
      return (parseInt(paymentSchedule.FaceAmount) <= parseInt(sFaceAmount)) 
    });
    var p = [];

    if(isEmpty(face)) {
      face=paymentSchedules[0];
    }
    if(face && face.Premium) {
      each(face.Premium, (k, v)=> {
        var f = {};
        f.value = k;
        f.label = v;
        p.push(f);
      });
    }

    return p;
  },
  
  state = {},
  handleChange(value) {
    this.setState({
      sFaceAmount: parseInt(value)
    });
    var f = function() {
      this.props.submitPlansForm(this.props.personIndex, [{
        plan: this.state.selectedPlan,
        sFaceAmount: value
      }]);
    }.bind(this);
    setTimeout(f);
  },
  handleSliderChange(value) {
    this.setState({
      sFaceAmount: parseInt(value)
    });
  },
  onFaceValChange(key, value) {
    this.setState({
      [key]: value
    })
  },
  public render() {
    const personIndex = this.props.personIndex;
    const plansObjs = this.getPlansDetailsForDropdown();
    const paymentSchedules = this.getPaymentSchedules();
  

    return (
      <Col sm={12} className="c-one-person-container">
        <Row>
          <Col sm={8} className="c-center plans-selector-container">
            <Row>
              <Col sm={6} className="c-center" style={{paddingTop: "0px"}}>
                <Col sm={6} style={{paddingTop: "20px", paddingRight: "0px"}}>
                  Payment schedule
                </Col>
                <Col sm={6} className="plan-schedule-container" style={{paddingTop: "10px", paddingLeft: "0px"}}>
                  <Select
                    name="form-field-plans-3"
                    options={paymentSchedules}
                    value={this.state.premium_type}
                    onChange={(payment)=>{
                      this.onPaymentTypeChange("premium_type", payment)
                    }}
                  />
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="plan-details-container">
          <Col sm={8} className="c-center">
            <Row>
              <Col sm={2} style={{width: "16%", height: "90px", backgroundColor: "#317dbd", margin: "20px"}}>
              </Col>
              <Col sm={8}>
                <Row className="plan-product-name">
                  {this.state.selectedPlan && this.state.selectedPlan.PlanName}
                </Row>
                <Row className="plan-sider-info-text1">
                  This is the fun part! Move the coverage slide to your desired amount of life insurance. Watch the monthly cost estimates change as you move. Then choose how long you want that coverage to last (plan length). Finally, click on your preferred  payment method! It's that simple.
                </Row>
              </Col>
            </Row>
            <Row className="plan-sider-info-text">
              <Col sm={6}>
                <Row className="plan-coverage-container">
                  {this.state.sFaceAmount && 
                    <span style={{fontSize: "26px", textAlign: "right", color: "#009c91"}}>${this.state.sFaceAmount} </span> 
                  }
                  {this.state.sFaceAmount && 
                    <span style={{fontSize: "14px", textAlign: "left", color: "#666666"}}> of</span> 
                  }
                  <span style={{fontSize: "14px", textAlign: "left", color: "#666666"}}> Coverage </span>
                </Row>
                <Row>
                  {this.state.selectedPlan && 
                    <Col className="plan-faceMin" sm={2}>
                      ${this.state.selectedPlan.FaceMin}
                    </Col>
                  }
                  {this.state.selectedPlan && 
                      <Col className="plan-face-val-slider" sm={8}>
                        <Slider
                          min={parseInt(this.state.selectedPlan.FaceMin)}
                          max={parseInt(this.state.selectedPlan.FaceMax)}
                          value={this.state.sFaceAmount}
                          onChange={this.handleSliderChange.bind(this)}
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
                    <Col className="plan-faceMax" sm={2}>
                      ${this.state.selectedPlan.FaceMax}
                    </Col>
                  }
                </Row>
              </Col>
              <Col sm={3} className="plan-length-container">
                <Row style={{marginLeft: "5px", marginTop: "16px"}}>
                  Plan length
                </Row>
                <Row>
                  <Select
                    name="form-field-plans"
                    options={plansObjs}
                    value={this.state.sPlanID}
                    onChange={(stateObj)=>{
                      this.onPlanChange("sPlanID", stateObj)
                    }}
                  />
                </Row>
              </Col>
              <Col sm={3} className="plan-cost-container">
                <Row style={{marginTop: "30px"}}>
                  <Col sm={6}>
                    <Col sm={3} className="plan-cost-text">
                      Cost
                    </Col>
                    <Col sm={3} className="plan-cost-amount">
                      {this.state.selectedPaymentType && this.state.selectedPaymentType.value}
                    </Col>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col sm={8} className="plans-selector-container c-center">
            <Row>
              <Col sm={3} style={{float: "right", marginRight: "15px"}}>
                <Row>
                  <Col sm={4} className="plan-total-text">
                    Total
                  </Col>
                  <Col sm={8} className="plan-total-amount">
                    {this.props.premiums && this.props.premiums && this.props.premiums.plans_data && this.props.premiums.plans_data.QuoteRateGrid && this.props.premiums.plans_data.QuoteRateGrid.Col1 && this.props.premiums.plans_data.QuoteRateGrid.Col1.Face1 && this.props.premiums.plans_data.QuoteRateGrid.Col1.Face1.Premium && this.props.premiums.plans_data.QuoteRateGrid.Col1.Face1.Premium.Annual}
                  </Col>
                </Row>
                
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    );
  }
}