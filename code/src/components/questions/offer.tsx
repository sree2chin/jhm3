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
import {getQuestions, postQuestions, getFactorsearch, confirmQuestions, postPayment} from '../../actions/Questions';
const objectAssign = require('object-assign');
import { browserHistory } from 'react-router';
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";
import PdfModal from "./PdfModal";
import RawHtml from "react-raw-html";


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
    if(!isEmpty(nextProps.questions)) {
      this.questions = JSON.parse(JSON.stringify(nextProps.questions));
    }
    if (nextProps.confirmationData.valid_user == 0) {
      browserHistory.push("/authorize" + queryParamsString);
      return;
    }
  }

  confirmQuestions() {
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
    var data = {};
    this.props.confirmQuestions(data).then(() => {
      //browserHistory.push("/signature");
      var link = this.props.confirmationData && this.props.confirmationData.data &&
      this.props.confirmationData.data.current_document_data && this.props.confirmationData.data.current_document_data.sign_url;

      if (this.props.confirmationData.status == false) {
        browserHistory.push("/error" + queryParamsString);
        return;
      }

      if (this.props.confirmationData.application_complete_status == false || this.props.confirmationData.application_complete_status == "false") {
        browserHistory.push("/questions" + queryParamsString);
        return;
      }

      if (this.props.confirmationData.valid_user == 0) {
        browserHistory.push("/authorize" + queryParamsString);
        return;
      }
      if (!isEmpty(link)){
        window.location.href = link;
      } else if (isEmpty(this.props.confirmationData.data.current_document_data)) {
        browserHistory.push("/offer" + queryParamsString);
      } else if(isEmpty(this.props.confirmationData.data.offer_data)) {
        browserHistory.push("/payment_success" + queryParamsString);
      }

    }).catch(()=>{
      browserHistory.push("/authorize" + queryParamsString);
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
    var data = {};
    data.order_id = premium.order_id;
    data.amount = premium.premium_amount;
    data.elavon_params = offerData && offerData.elavon_params ? offerData.elavon_params : [];
    data.elavon_url =  offerData.elavon_url;
    this.setState({
      onPaymentGoingTo: true
    });
    this.props.postPayment(data).then(()=> {

      if (this.props.paymentInfo && isEmpty(data.elavon_params)) {
        var questionsInfo = JSON.parse(this.props.paymentInfo);

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

        var link = questionsInfo && questionsInfo.data &&
        questionsInfo.data.current_document_data && questionsInfo.data.current_document_data.sign_url;
        if (questionsInfo.valid_user == 0) {
          browserHistory.push("/authorize" + queryParamsString);
          return;
        }

        if (questionsInfo.application_complete_status == false || questionsInfo.application_complete_status == "false") {
          browserHistory.push("/questions" + queryParamsString);
          return;
        }
        if (!isEmpty(link)){
          window.location.href = link;
        } else if (!isEmpty(questionsInfo.data) && isEmpty(questionsInfo.data.current_document_data) && !isEmpty(questionsInfo.data.offer_data)) {
          browserHistory.push("/offer" + queryParamsString);
        } else {
          browserHistory.push("/payment_success" + queryParamsString);
        }
        return;
      }

      window.location.href = `/payment?order_id=${data.order_id}&amount=${data.amount}`;
      this.setState({
        onPaymentGoingTo: false
      });
      //browserHistory.push("/payment")
    });

    //window.location.href = `https://devlifeco.sureifylife.com/elevon/index.php?order_id=${data.order_id}&amount=${data.amount}`;
  }

  public render() {
    var breadCrumbs = this.getBreadCrumbs();
    var offerData = this.props.confirmationData && this.props.confirmationData.data && this.props.confirmationData.data.offer_data;
    offerData = offerData || {};
    var {premium, product} = offerData;
    premium = premium || {};
    product = product || {};
    RawHtml.addTag("mycooltag");

    return (
      <div>
        <Subheader
          breadCrumbs={breadCrumbs}
          noFoGroupsCompleted={[]}
          location={this.props.location}
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
                      {premium.premium_type_title} for {premium.currency}{premium.coverage_amount}
                    </Col>
                    <Col className="offer-per-month" style={{marginBottom: "16px"}}>
                        coverage
                    </Col>
                    <Button className={`c-button-default circular offer-start-coverage-btn action`} style={{marginLeft: "30px!important"}}  onClick={()=>{
                        this.onPayment()
                        }}
                    >
                        START COVERAGE
                        {this.state.onPaymentGoingTo && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                    </Button>
                </Row>
                {offerData && offerData.offer_description && <Row>
                    <RawHtml.mycooltag>
                        {offerData.offer_description}
                    </RawHtml.mycooltag>
                  </Row>
                }
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
                          <RawHtml.mycooltag>
                            {product.product_description}
                          </RawHtml.mycooltag>
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
    confirmationData: state.questions.confirmationData,
    paymentInfo: state.questions.paymentInfo
  }
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
    getQuestions: (data: any) => {
      return dispatch(getQuestions(data))
    },
    confirmQuestions: (data: any, moreInfo: any) =>  {
      return dispatch(confirmQuestions(data, moreInfo));
    },
    postPayment: (data) => {
      return dispatch(postPayment(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Offer);