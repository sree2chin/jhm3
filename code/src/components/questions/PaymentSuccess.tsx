import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { makePayment, postPayment, getQuestions, getQuestionsAndUpdateTagManager } from '../../actions/Questions';
import { browserHistory } from 'react-router';
import { isEmpty } from "underscore";
import {Button, Row, Col} from "react-bootstrap";
import { PAGES_LIST } from "./../../pages";

interface Props extends React.Props<paymentSuccess> {
    location: any
}

class paymentSuccess extends React.Component<Props, {}> {
  constructor(){
    super();
  }
  state = {};
  invoice_number: any = [];
  amount: any = [];
  transaction_id: any = [];
  card_number: any = [];
  componentWillMount() {
    if (this.props.confirmationData && this.props.confirmationData.LOGIN_URL && this.props.confirmationData.LOGIN_URL.length > 0) {
      window.location.href = this.props.confirmationData.LOGIN_URL;
      return;
    }
    if (this.props.confirmationData && this.props.confirmationData.redirect_url && this.props.confirmationData.redirect_url.length > 0) {
      window.location.href = this.props.confirmationData.redirect_url;
      return;
    }
    this.setState({
      allDone: false
    });
    console.log('query', this.props.location.query);
    let invoice_number = this.props.location.query.ssl_invoice_number;
    let amount = this.props.location.query.ssl_amount;
    let transaction_id = this.props.location.query.ssl_txn_id;
    let card_number = this.props.location.query.ssl_card_number;
    this.setState ({
      invoice_number: invoice_number,
      amount: amount,
      transaction_id: transaction_id,
      card_number: card_number
    });

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
    if (this.props.location && this.props.location.query && this.props.location.query.ssl_txn_id) {
      this.props.makePayment(this.props.location.query).then((res)=>{
        if (this.props.paymentData && this.props.paymentData.LOGIN_URL && this.props.paymentData.LOGIN_URL.length > 0) {
          window.location.href = this.props.paymentData.LOGIN_URL;
          return;
        }
        if (this.props.paymentData && this.props.paymentData.redirect_url && this.props.paymentData.redirect_url.length > 0) {
          window.location.href = this.props.paymentData.redirect_url;
          return;
        }
        var link = this.props.paymentData && this.props.paymentData.data &&
        this.props.paymentData.data.current_document_data && this.props.paymentData.data.current_document_data.sign_url;

        if (this.props.paymentData && this.props.paymentData.status == false) {
          browserHistory.push("/error" + queryParamsString);
          return;
        }

        if (this.props.paymentData.valid_user == 0) {
          browserHistory.push("/authorize" + queryParamsString);
          return;
        }
        if (!isEmpty(link)){
          window.location.href = link;
        } else if (isEmpty(this.props.paymentData.data.current_document_data) && !isEmpty(this.props.paymentData.data.offer_data)) {

          browserHistory.push("/offer" + queryParamsString);
        } else if(isEmpty(this.props.paymentData.data.offer_data) && isEmpty(this.props.paymentData.data.offer_data)) {
          this.setState({
            allDone: true
          });
          //browserHistory.push("/payment_success" + queryParamsString);
        }
      });
    } else {
      this.props.getQuestionsAndUpdateTagManager({}).then(()=>{ 
        var eventFired = false;
        window.initialTagManager = window.initialTagManager || [];
        for(var i=0; i<window.initialTagManager.length; i++) {
          if (window.initialTagManager[i].page_id == PAGES_LIST.PAYMENT_SUCCESS_PAGE.page_id) {
            eventFired = true;
            break;
          }
        }
        if (!eventFired) {
          this.props.getQuestionsAndUpdateTagManager({isFromPaymentSuccessPage: true});
          window.dataLayer.push({
            'event':'VirtualPageView',
            'virtualPageURL':'/' + PAGES_LIST.PAYMENT_SUCCESS_PAGE.page_id,
            'virtualPageTitle' : PAGES_LIST.PAYMENT_SUCCESS_PAGE.page_title 
          });
        }
      });
      this.setState({
        allDone: true
      });

      //browserHistory.push("/signature" + queryParamsString);
    }
  }
  shouldShowDefaultMessage() {
    return this.state.allDone &&
    !((this.props.paymentData && this.props.paymentData && this.props.paymentData.message) ||
      (this.props.confirmationData && this.props.confirmationData && this.props.confirmationData.message));
  }
  onPayment() {
    var elavonData = this.props.paymentData && this.props.paymentData.data && this.props.paymentData.data.elavon_data;
    var data = {};
    data.elavon_params = elavonData && elavonData.elavon_params ? elavonData.elavon_params : [];
    data.elavon_url =  elavonData.elavon_url;
    this.setState({
      onPaymentGoingTo: true
    });
    if (this.props.paymentData && this.props.paymentData.LOGIN_URL && this.props.paymentData.LOGIN_URL.length > 0) {
      window.location.href = this.props.paymentData.LOGIN_URL;
      return;
    }
    if (this.props.paymentData && this.props.paymentData.redirect_url && this.props.paymentData.redirect_url.length > 0) {
      window.location.href = this.props.paymentData.redirect_url;
      return;
    }
    this.props.postPayment(data).then(()=> {
      if (this.props.paymentInfo && this.props.paymentInfo.LOGIN_URL && this.props.paymentInfo.LOGIN_URL.length > 0) {
        window.location.href = this.props.paymentInfo.LOGIN_URL;
        return;
      }
      if (this.props.paymentInfo && this.props.paymentInfo.redirect_url && this.props.paymentInfo.redirect_url.length > 0) {
        window.location.href = this.props.paymentInfo.redirect_url;
        return;
      }
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
    var eventFired = false;
    for(var i=0; i<window.initialTagManager.length; i++) {
      if (window.initialTagManager[i].page_id == PAGES_LIST.OFFER_PAGE.page_id) {
        eventFired = true;
        break;
      }
    }
    if (!eventFired) {
      window.dataLayer.push({
        'event':'VirtualPageView',
        'virtualPageURL':'/' + PAGES_LIST.OFFER_PAGE.page_id,
        'virtualPageTitle' : PAGES_LIST.OFFER_PAGE.page_title 
      });
    }
          browserHistory.push("/offer" + queryParamsString);
        } else {
        var eventFired = false;
        window.initialTagManager = window.initialTagManager || [];
        for(var i=0; i<window.initialTagManager.length; i++) {
          if (window.initialTagManager[i].page_id == PAGES_LIST.PAYMENT_SUCCESS_PAGE.page_id) {
            eventFired = true;
            break;
          }
        }
        if (!eventFired) {
          window.dataLayer.push({
            'event':'VirtualPageView',
            'virtualPageURL':'/' + PAGES_LIST.PAYMENT_SUCCESS_PAGE.page_id,
            'virtualPageTitle' : PAGES_LIST.PAYMENT_SUCCESS_PAGE.page_title 
          });
        }
          browserHistory.push("/payment_success" + queryParamsString);
        }
        return;
      }
    var eventFired = false;
    for(var i=0; i<window.initialTagManager.length; i++) {
      if (window.initialTagManager[i].page_id == PAGES_LIST.PAYMENT_PAGE.page_id) {
        eventFired = true;
        break;
      }
    }
    if (!eventFired) {
      window.dataLayer.push({
        'event':'VirtualPageView',
        'virtualPageURL':'/' + PAGES_LIST.PAYMENT_PAGE.page_id,
        'virtualPageTitle' : PAGES_LIST.PAYMENT_PAGE.page_title 
      });
    }
      window.location.href = `/payment`;
      this.setState({
        onPaymentGoingTo: false
      });
      //browserHistory.push("/payment")
    });

    //window.location.href = `https://devlifeco.sureifylife.com/elevon/index.php?order_id=${data.order_id}&amount=${data.amount}`;
  }
  public render() {
       return (
         <div className="payment_styles_div">
          <Row className="questions-container c-center">
            {!this.state.allDone && <div className="questions-content-container final-loading-messages">
                <div>Loading .... </div>
                <i className="fa fa-spinner fa-spin fa-3x fa-fw main-loader"></i>
            </div>}
          </Row>
           <Row>
             <Col lg={3} md={3} sm={3}> </Col>
              {this.state.allDone &&
                <Col lg={6} md={6} sm={6} xs={12} className="text-center payment_styles pt10 pb20" >
                  <h1 className="pb20">{this.props.paymentData && this.props.paymentData.message}</h1>
                  <h1 className="pb20">{this.props.confirmationData && this.props.confirmationData.message}</h1>
                  <h1 className="pb20">{this.shouldShowDefaultMessage() && "Thanks for contacting us. We will reach you in sometime."}</h1>
                  {this.props.paymentData && this.props.paymentData && this.props.paymentData.data && this.props.paymentData.data.payment_fail==1 && <Button className={`c-button-default circular offer-start-coverage-btn action`} style={{marginLeft: "30px!important", width: "60%"}}  onClick={()=>{
                        this.onPayment()
                        }}
                    >
                        {this.props.paymentData && this.props.paymentData.data && this.props.paymentData.data.button_title}
                        {this.state.onPaymentGoingTo && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                    </Button>}
                </Col>
              }
           </Row>
        </div>
       );
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    paymentData:  state.questions.paymentData,
    confirmationData: state.questions.confirmationData,
    paymentInfo: state.questions.paymentInfo
  };
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
    makePayment: (data) => {
      return dispatch(makePayment(data))
    },
    postPayment: (data) => {
      return dispatch(postPayment(data));
    }
    getQuestionsAndUpdateTagManager: (data)=> {
      return dispatch(getQuestionsAndUpdateTagManager(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(paymentSuccess);