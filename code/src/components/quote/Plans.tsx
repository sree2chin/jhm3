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
  plans: Array<any>,
  submitForm : (event:any) => any;
}

interface State {
}

export default class Plans extends React.Component<Props, State> {
  constructor(props : Props, context){
    super(props);
    this.state = {
      value: 10,
      selectedPlan:    {
          "PlanID": "41",
          "PlanName": "10 Year Level Term",
          "PlanDisplayName": "10 Year Level Term",
          "PlanDisplayFaceAmtIncrementValue": "100000",
          "PlanDisplayDescription": "10 Year Level Term",
          "PlanDisplayURL": "http://training.goagentweb.com/webiq/rc/webservice/Consumer_ProductDescription.asp",
          "PlanDisplayOrder": "37",
          "FaceMin": "100000",
          "FaceMax": "5000000",
          "WPF": "1",
          "RatingF": "1",
          "FlatF": "1",
          "QuotationAge": "29",
          "Class": [
              {
                  "ClassName": "Select",
                  "ClassDisplayName": "Select",
                  "ClassDisplayNum": "1",
                  "ClassNum": "1",
                  "ClassDisplayDescription": "Description 1",
                  "ClassDisplayOrder": "3"
              },
              {
                  "ClassName": "Standard Non-Tobacco",
                  "ClassDisplayName": "Standard Non-Tobacco",
                  "ClassDisplayNum": "2",
                  "ClassNum": "2",
                  "ClassDisplayDescription": "Description 2",
                  "ClassDisplayOrder": "4"
              },
              {
                  "ClassName": "Standard Tobacco",
                  "ClassDisplayName": "Standard Tobacco",
                  "ClassDisplayNum": "3",
                  "ClassNum": "3",
                  "ClassDisplayDescription": "Description 3",
                  "ClassDisplayOrder": "6"
              },
              {
                  "ClassName": "SelectPlus",
                  "ClassDisplayName": "SelectPlus",
                  "ClassDisplayNum": "4",
                  "ClassNum": "4",
                  "ClassDisplayDescription": "Description 4",
                  "ClassDisplayOrder": "2"
              },
              {
                  "ClassName": "Ultra Select",
                  "ClassDisplayName": "Ultra Select",
                  "ClassDisplayNum": "5",
                  "ClassNum": "5",
                  "ClassDisplayDescription": "Description 5",
                  "ClassDisplayOrder": "1"
              }
          ],
          "Dividend": {
              "DivName": "Paid In Cash",
              "DivNum": "1"
          }
      }
    }
  },
  handleChangeStart = () => {
    console.log('Change event started')
  };

  handleChange = value => {
    this.setState({
      value: value
    })
  };

  handleChangeComplete = () => {
    console.log('Change event completed')
  };

  selectPlan = (plan) => {
    this.setState({
      selectedPlan: plan
    });
  };

  public render() {
    const { value } = this.state;
    const plans = this.props.plans ? this.props.plans.data.plans_list: [];
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
