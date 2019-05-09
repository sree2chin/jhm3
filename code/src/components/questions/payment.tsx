import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SingleSelection from "./SingleSelection";
import {each, isEmpty, map} from "underscore";
import { browserHistory } from 'react-router';
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";
import { PAGES_LIST } from "./../../pages";

interface Props  extends React.Props<Payment> {

}

class Payment extends React.Component<Props, {}> {
  constructor(){
    super();
  }
  state = {};
  componentWillMount() {
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
  }
  htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }
  public render() {
    if (this.props.paymentInfo) {
        return <div
            dangerouslySetInnerHTML={{ __html: this.props.paymentInfo }}
        />
    }
    return null;
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    paymentInfo: state.questions.paymentInfo
  }
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);