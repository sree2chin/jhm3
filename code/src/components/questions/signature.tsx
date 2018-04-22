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


interface Props  extends React.Props<Signature> {
  submitQuoteForm: ()=>void,
  submitProductsForm: ()=>void,
  getQuestions: any,
  postQuestions: any,
  confirmQuestions: any,
  questions: any,
  previousQuestionIds: any,
  getFactorsearch: any
}

class Signature extends React.Component<Props, {}> {
  constructor(){
    super();
  }
  state = {};
  questions:any = {};
  actualQuestionLists: any = [];
  questionComponents: any = [];

  componentWillMount() {
    this.confirmQuestions();
    /*this.props.getQuestions().then(()=>{
        this.confirmQuestions();
    });*/
  }

  componentWillReceiveProps(nextProps) {
    if(!isEmpty(nextProps.questions)) {
      this.questions = JSON.parse(JSON.stringify(nextProps.questions));
    }
  }

  confirmQuestions() {
    var data = {};
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
    this.props.confirmQuestions(data).then(() => {
      //browserHistory.push("/signature");
      var link = this.props.confirmationData && this.props.confirmationData.data &&
      this.props.confirmationData.data.current_document_data && this.props.confirmationData.data.current_document_data.sign_url;

      if (this.props.confirmationData && this.props.confirmationData.status == false) {
        browserHistory.push("/error" + queryParamsString);
        return;
      }

      if (this.props.confirmationData.valid_user == 0) {
        browserHistory.push("/authorize" + queryParamsString);
        return;
      }

      if (this.props.confirmationData.application_complete_status == false || this.props.confirmationData.application_complete_status == "false") {
        browserHistory.push("/questions" + queryParamsString);
        return;
      }
      if (!isEmpty(link)){
        window.location.href = link;
      } else if (isEmpty(this.props.confirmationData.data.current_document_data) && !isEmpty(this.props.confirmationData.data.offer_data)) {
        browserHistory.push("/offer" + queryParamsString);
      } else if(isEmpty(this.props.confirmationData.data.offer_data) && isEmpty(this.props.confirmationData.data.offer_data)) {
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

  public render() {
    var breadCrumbs = this.getBreadCrumbs();
    //var link = this.props.confirmationData && this.props.confirmationData.data &&
       // this.props.confirmationData.data.current_document_data && this.props.confirmationData.data.current_document_data.sign_url;
    return (
      <div>
        <Subheader
          breadCrumbs={breadCrumbs}
          noFoGroupsCompleted={[breadCrumbs.length-2]}
          location={this.props.location}
        />
        {this.props.confirmationData && this.props.confirmationData.data && this.props.confirmationData.data.no_of_signed_documents == 0 && <Row>
            <Col onClick={()=>{
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
                //browserHistory.push("/all-questions" + queryParamsString);
              }
            }>
            </Col>
        </Row> }
        <Row className="questions-container c-center">
            {!this.state.allDone && <div className="questions-content-container final-loading-messages">
                <div>LOADING</div>
                <i className="fa fa-spinner fa-spin fa-3x fa-fw main-loader"></i>
            </div>}
            {this.state.allDone && <div className="questions-content-container final-thank-you-messages">
                <div>{this.props.confirmationData.data.message}</div>
            </div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(Signature);