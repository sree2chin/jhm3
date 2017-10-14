import * as React from 'react';
import Input from './../common/textInput';
import {Button, Row, Col} from "react-bootstrap";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
const Handle = Slider.Handle;
import Slider from 'react-rangeslider';
import {map} from "underscore";

interface Props {
  products: Array<any>,
  submitForm : (event:any) => any;
}

interface State {
}

export default class Products extends React.Component<Props, State> {
  constructor(props : Props, context){
    super(props);
    this.state = {
      value: 10,
      products: {}
    }
  },

  handleChange = value => {
    this.setState({
      value: value
    })
  };

  selectPlan = (plan) => {
    this.setState({
      selectedPlan: plan
    });
  };

  public render() {
    const { value } = this.state;
    const products = this.props.products ? this.props.products.data.products_list: [];
    return (
      <div>
        <div className="header">
          <div style={{textAlign: "center"}}>
            Coverage Type
          </div>  
        </div>
        <Row>
          <Col md={5} className="l-main-content c-coverage">
            <Row className="text-center">
              <div className="c-coverage-amount">${this.state.value}</div>
              <div style={{color: "#333333"}}> of coverage</div>
            </Row>
            <div>
              <Slider
                min={100000}
                max={8000000}
                step={1000}
                value={value}
                onChangeStart={this.handleChangeStart}
                onChange={this.handleChange}
                onChangeComplete={this.handleChangeComplete}
              />
            </div>
            <Row className="text-center sub-header">
              How much coverage do I need?
            </Row>
            <Row>
              {map(plans, (plan) =>
                <Row key={plan.PlanID} className={"l-plan-container" + (this.state.selectedPlan.PlanID == plan.PlanID ? " active" : "")} onClick={() => this.selectPlan(plan)}>
                  <Col sm={7} className={"p-display-name"}>
                    {plan.PlanDisplayName}
                  </Col>
                  <Col sm={5} style={{marginTop: "10px"}}>
                    <Col sm={12} className={"p-increment-val"}>
                      ${plan.PlanDisplayFaceAmtIncrementValue}
                    </Col>
                    <Col sm={12} className={"p-per-month"}>
                      per month
                    </Col>
                  </Col>
                </Row>
              )}
            </Row>
            <Row>
              <Row>
                <Button style={{marginTop: "20px", marginBottom: "75px"}} className="c-button-default big" onClick={this.props.submitForm}>APPLY</Button>
              </Row>
            <Row>
          </Col>
        </Row>
      </div>
     );
  }
}
