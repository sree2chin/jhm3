import * as React from 'react';
import {Link} from 'react-router';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import Select from 'react-select';
import {each, isEmpty, deepEqual} from "lodash";
import Slider from 'react-rangeslider';

interface Props extends React.Props<Plan> {
}

export default class Plan extends React.Component<Props, {}> {
  onPlanChange(key, obj) {
    this.setState({
      [key]: obj.value,
      selectedPlan: obj,
      sFaceAmount: obj.FaceMin
    })
    this.props.submitPlansForm([{plan: obj, sFaceAmount: obj.FaceMin}]);
  },
  onsFaceAmountChange() {
    this.props.submitPlansForm({sFaceAmount: this.state.sFaceAmount);
  },
  componentWillReceiveProps(nextProps) {
    if(isEmpty(this.props.plans) && !isEmpty(nextProps.plans)) {
      const plan = JSON.parse(JSON.stringify(nextProps.plans.plans_data.plans_list[0]));
      plan.value = plan.PlanID;
      plan.label = plan.PlanDisplayName;
      this.onPlanChange("sPlanID", plan);
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
  
  state = {},

  public render() {
    const personIndex = this.props.index;
    const plansObjs = this.getPlansDetailsForDropdown();

    return (
      <Col sm={12} className="c-one-person-container">
        <Row>
          <Col sm={8} className="c-center plans-selector-container">
            <Row>
              <Col sm={6} className="c-center">
                <Col sm={6}>
                  Payment schedule
                </Col>
                <Col sm={6}>

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
                  
                </Row>
                <Row className="plan-sider-info-text">
                  This is the fun part! Move the coverage slide to your desired amount of life insurance. Watch the monthly cost estimates change as you move. Then choose how long you want that coverage to last (plan length). Finally, click on your preferred  payment method! It's that simple.
                </Row>
              </Col>
            </Row>
            <Row className="plan-sider-info-text">
              <Col sm={6}>
                <Row className="plan-coverage-container">
                  ${this.state.sFaceAmount} {this.state.sFaceAmount && "of"} Coverage
                </Row>
                <Row>
                  {this.state.selectedPlan && 
                    <Col className="plan-faceMin" sm={2}>
                      ${this.state.selectedPlan.FaceMin}
                    </Col>

       
                  }
                </Row>
              </Col>
              <Col sm={3}>
                <Select
                  name="form-field-plans"
                  options={plansObjs}
                  value={this.state.sPlanID}
                  onChange={(stateObj)=>{
                    this.onPlanChange("sPlanID", stateObj)
                  }}
                />
              </Col>
              <Col sm={3}>
                <Row>
                  <Col sm={6}>
                    Cost
                  </Col>
                  <Col sm={6}>
                    $
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