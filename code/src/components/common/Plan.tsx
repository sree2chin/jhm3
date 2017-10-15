import * as React from 'react';
import {Link} from 'react-router';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import { getStateObjects } from '../../utility/states';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import Input from "../common/textInput";
import ReactTooltip from 'react-tooltip';
import {Tooltip} from 'react-lightweight-tooltip';


interface Props extends React.Props<Plan> {
}

export default class Plan extends React.Component<Props, {}> {
  onChange(key, value) {
    this.props.onChange(this.props.index, key, value);
  },
  getPlansDetailsForDropdown() {
    const plans = JSON.parse(JSON.stringify(this.props.plans));
    for(var i=0; i<plans.length; i++) {
      plans[i].value = plans[i].PlanName;
      plans[i].lable = plans[i].PlanDisplayName;
    }
    return plans;
  },
  selectPlan(plan) {
    this.setState({
      plan: plan
    });
  },
  state = {},
  onChange(key, value) {
    this.props.onChange(this.props.index, key, value);
  },
  public render() {


    var statesObjects = getStateObjects();
    const personIndex = this.props.index;
    const {errors, person} = this.props;
    const healthRatingObjects = [
          {value: "Fair", label: "Fair"},
          {value: "Good", label: "Good"},
          {value: "Very Good", label: "Very Good"},
          {value: "Excellent", label: "Excellent"},
        ];

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
                  DROPDOWN
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="plan-details-container">
          <Col sm={8} className="c-center">
            <Row>
              <Col sm={2} style={{width: "14%", height: "90px", backgroundColor: "#317dbd"}}>
              </Col>
              <Col sm={8}>
                <Row>
                  Single Premium Whole Life
                </Row>
                <Row>
                  This is the fun part! Move the coverage slide to your desired amount of life insurance. Watch the monthly cost estimates change as you move. Then choose how long you want that coverage to last (plan length). Finally, click on your preferred  payment method! It's that simple.
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    );
  }
}