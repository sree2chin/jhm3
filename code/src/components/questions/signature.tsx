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
    this.props.getQuestions().then(()=>{
        this.confirmQuestions();
    });
  }

  componentWillReceiveProps(nextProps) {
    if(!isEmpty(nextProps.questions)) {
      this.questions = JSON.parse(JSON.stringify(nextProps.questions));
    }
  }

  confirmQuestions() {
    var data = {};
    this.props.confirmQuestions(data).then(() => {
      //browserHistory.push("/signature");
      var link = this.props.confirmationData && this.props.confirmationData.data &&
      this.props.confirmationData.data.current_document_data && this.props.confirmationData.data.current_document_data.sign_url;
      if isEmpty(this.props.confirmationData.data.current_document_data) {
        this.setState({
            allDone: true
        });
      } else {
        window.location.href = link;
      }

    }).catch(()=>{
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
        />
        {this.props.confirmationData && this.props.confirmationData.data && this.props.confirmationData.data.no_of_signed_documents == 0 && <Row>
            <Col onClick={()=>
                browserHistory.push("/all-questions")
            }>
                Redirect to review page
            </Col>
        </Row> }
        <Row className="questions-container c-center">
            {~this.state.allDone && <div className="questions-content-container">
                {this.state.confirmingQuestions && <i className="fa fa-spinner fa-spin fa-3x fa-fw main-loader"></i>}
                <div>Loading PDF .... </div>
            </div>}
            {this.state.allDone && <div className="questions-content-container">
                <div>Thank you. We will contact you shortly.</div>
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