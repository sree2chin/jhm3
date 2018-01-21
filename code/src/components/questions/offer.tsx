import * as React from 'react';
import * as Autocomplete from "react-autocomplete"
import * as moment from "moment";
import {Link} from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {Button, Row, Col, FormGroup, Radio, NavItem, Nav} from "react-bootstrap";
import SingleSelection from "./SingleSelection";
import Label from "./Label"
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import AsyncCustomSelect from "./AsyncCustomSelect";
import QuestionsCustomDatePicker from "./QuestionsCustomDatePicker";
import Subheader from "../common/subheader";
import {each, isEmpty, map} from "underscore";
import {getQuestions, postQuestions, getFactorsearch, confirmQuestions} from '../../actions/Questions';
const objectAssign = require('object-assign');
import { browserHistory } from 'react-router';
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";
import PdfModal from "./PdfModal"


interface Props  extends React.Props<Offer> {
  submitQuoteForm: ()=>void,
  submitProductsForm: ()=>void,
  getQuestions: any,
  postQuestions: any,
  confirmQuestions: any,
  questions: any,
  previousQuestionIds: any,
  getFactorsearch: any
}

class Offer extends React.Component<Props, {}> {
  constructor(){
    super();
  }
  state = {};
  questions:any = {};
  actualQuestionLists: any = [];
  questionComponents: any = [];

  componentWillMount() {
    /*this.props.getQuestions().then(()=>{
        this.confirmQuestions();
    });*/
  }

  componentWillReceiveProps(nextProps) {
    if(!isEmpty(nextProps.questions)) {
      this.questions = JSON.parse(JSON.stringify(nextProps.questions));
    }
    if (nextProps.confirmationData.valid_user == 0) {
      browserHistory.push("/authorize");
      return;
    }
  }

  confirmQuestions() {
    var data = {};
    this.props.confirmQuestions(data).then(() => {
      //browserHistory.push("/signature");
      var link = this.props.confirmationData && this.props.confirmationData.data &&
      this.props.confirmationData.data.current_document_data && this.props.confirmationData.data.current_document_data.sign_url;
      if (this.props.confirmationData.valid_user == 0) {
        browserHistory.push("/authorize");
        return;
      }
      if (isEmpty(this.props.confirmationData.data.current_document_data)) {
        browserHistory.push("/offer");
      } else {
        window.location.href = link;
      }

    }).catch(()=>{
      browserHistory.push("/authorize");
      console.log(this.questions);
    });
  }

  getBreadCrumbs() {
    var breadCrumbs = [];
    var questions = this.questions;

    var questionsList = (questions && questions.data && questions.data.questionnaire &&
      questions.data.questionnaire.questions) || [];

    if (questionsList) {
      for(var i=0; i<questionsList.length; i++) {
        if(questionsList[i].type == "group") {
          breadCrumbs.push(questionsList[i].caption);
        }
      }
    }

    return breadCrumbs;
  }
  onPayment() {
    var offerData = this.props.confirmationData && this.props.confirmationData.data && this.props.confirmationData.data.offer_data;
    var {premium} = offerData;
    var order_id = premium.order_id;
    var amount = premium.premium_amount;
    window.location.href = `https://devlifeco.sureifylife.com/elevon/index.php?order_id=${order_id}&amount=${amount}`;
  }

  public render() {
    var breadCrumbs = this.getBreadCrumbs();
    var offerData = this.props.confirmationData && this.props.confirmationData.data && this.props.confirmationData.data.offer_data;
    offerData = offerData || {};
    var {premium, product} = offerData;
    premium = premium || {};
    product = product || {};

    return (
      <div>
        <Subheader
          breadCrumbs={breadCrumbs}
          noFoGroupsCompleted={[]}
        />
        <Row className="questions-container c-center offer-container">
            <Col sm={6} className="offer-product-payment-info">
                <Row>
                    <Col className="offer-price-text">
                        Price
                    </Col>
                    <Col className="offer-price-amount">
                        {premium.currency}{premium.premium_amount}
                    </Col>
                    <Col className="offer-per-month">
                        Per month for {premium.currency}{premium.coverage_amount}
                    </Col>
                    <Col className="offer-per-month" style={{marginBottom: "16px"}}>
                        coverage
                    </Col>
                    <Button className={`c-button-default circular offer-start-coverage-btn action`} style={{marginLeft: "30px!important"}}  onClick={()=>{
                        this.onPayment()
                        }}
                    >
                        START COVERAGE
                        {this.state.submittingQuestions && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                    </Button>
                </Row>
                <Row>
                    <p>Your final pricing is based on your application answers and health check results. How does this compare to my quote?</p>
                    <p>By starting your coverage, you agree to the offered plan and will be billed from the payment method you set up.</p>
                </Row>
            </Col>
            <Col sm={5} className="offer-product-info">
                <Row className="offer-product-header-text">
                    Selected product
                </Row>
                <Row className="offer-product-info-container">
                    <Col className="offer-product-name" style={{textAlign: "left"}} sm={12}>
                        {product.product_name}
                    </Col>
                    <Col sm={12} className="product-main-content offer-product-description" style={{paddingLeft: "20px"}}>
                    <Row className="text-left">
                        <ul className="c-product-desc-line">
                        {map(product.product_description.split("."), (descLine, index)=>{
                          if(index!=0 && descLine && descLine.trim().length >0) {
                            return <li key={"desc-" + index}>{descLine.trim()}</li>
                          } else {
                            return null
                          }
                        })}
                        </ul>
                    </Row>
                    </Col>
                </Row>
            </Col >


        </Row>
      </div>);
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    questions: state.questions.questions,
    confirmationData: state.questions.confirmationData
  }
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
    getQuestions: (data: any) => {
      return dispatch(getQuestions(data))
    },
    confirmQuestions: (data: any, moreInfo: any) =>  {
      return dispatch(confirmQuestions(data, moreInfo));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Offer);