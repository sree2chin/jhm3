import * as React from 'react';
import {Link} from 'react-router';
import { Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {makePayment} from '../../actions/Questions';
import { browserHistory } from 'react-router';
import {each, isEmpty, map} from "underscore";

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
    confirmationData: state.questions.confirmationData
  };
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
    makePayment: (data) => {
      return dispatch(makePayment(data))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(paymentSuccess);