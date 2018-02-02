import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SingleSelection from "./SingleSelection";
import {each, isEmpty, map} from "underscore";
import { browserHistory } from 'react-router';
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";

interface Props  extends React.Props<Payment> {

}

class Payment extends React.Component<Props, {}> {
  constructor(){
    super();
  }
  state = {};
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