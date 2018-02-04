import * as React from 'react';
import {Link} from 'react-router';
import { Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {makePayment} from '../../actions/Questions';

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
    this.props.makePayment(this.props.location.query).then((res)=>{
      if (this.props.paymentData && this.props.paymentData.valid_user==0) {

      }
    });
  }
  public render() {
       return (
         <div className="payment_styles_div">
           <Row>
             <Col lg={3} md={3} sm={3}> </Col>
             <Col lg={6} md={6} sm={6} xs={12} className="text-center payment_styles pt10 pb20" >
                <h1 className="pb20">{this.props.paymentData && this.props.paymentData.message}</h1>
                <Row className="mb10">
                  <Col lg={6} md={6} sm={6} xs={12} className="text-right"><h4>Your Card number : </h4></Col>
                  <Col lg={6} md={6} sm={6} xs={12} className="text-left"><h4> {this.state.card_number}</h4></Col>
                </Row>
                <Row className="mb10">
                  <Col lg={6} md={6} sm={6} xs={12} className="text-right"><h4>Transaction ID : </h4></Col>
                  <Col lg={6} md={6} sm={6} xs={12} className="text-left"><h4> {this.state.transaction_id}</h4></Col>
                </Row>
                <Row className="mb10">
                  <Col lg={6} md={6} sm={6} xs={12} className="text-right"><h4>Invoice number : </h4></Col>
                  <Col lg={6} md={6} sm={6} xs={12} className="text-left"><h4> {this.state.invoice_number}</h4></Col>
                </Row>
                <Row className="mb10">
                  <Col lg={6} md={6} sm={6} xs={12} className="text-right"><h4>Amount for order : </h4></Col>
                  <Col lg={6} md={6} sm={6} xs={12} className="text-left"><h4> {this.state.amount}</h4></Col>
                </Row>
              </Col>
              <Col lg={3} md={3} sm={3}> </Col>
           </Row>
        </div>
       );
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    paymentData:  state.questions.paymentData
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