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
import {getQuestions, authenticateUser, changePassword} from '../../actions/Questions';
const objectAssign = require('object-assign');
import { browserHistory } from 'react-router';
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";
import EnterPassword from "./EnterPassword";
import ResetPassword from "./ResetPassword";


interface Props  extends React.Props<Signature> {
  submitQuoteForm: ()=>void,
  submitProductsForm: ()=>void,
  getQuestions: any,
  postQuestions: any,
  confirmQuestions: any,
  questions: any,
  previousQuestionIds: any,
  getFactorsearch: any,
  authenticateUser: any,
  changePassword: any
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
    this.setState({
        gettingQuestions: true
    });
    this.props.getQuestions().then(()=>{
        this.setState({
            gettingQuestions: false,
            showEnterPassword: true
        });
    });
  }

  componentWillReceiveProps(nextProps) {
    if(!isEmpty(nextProps.questions)) {
      this.questions = JSON.parse(JSON.stringify(nextProps.questions));
    }
  }

  authenticateUser(cb) {
    var data = {};
    data.password = this.state.password;
    this.props.authenticateUser(data).then(() => {
      if (cb) { cb();}
      if (this.props.user.data.valid_user==1) {
        if (this.props.user.data.change_password==0) {
          if (this.props.user.data.access_token) {
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
            return browserHistory.push("/questions" + queryParamsString);
          } else {
            this.setState({
              enterPasswordErroMsg: this.props.user.message
            });
          }
        } else {
          this.setState({
            showResetPassword: true,
            showEnterPassword: false
          });
        }
      } else {
        this.setState({
          enterPasswordErroMsg: this.props.user.message
        });
      }

    }).catch(()=>{
      console.log(this.questions);
    });
  }

  resetPassword(cb) {
    var data = {};
    data.password = this.state.password;
    data.new_password = this.state.new_password;
    if (this.state.new_password != this.state.confirm_password) {
      this.setState({
        confirmPasswordError: true
      });
      if (cb) { cb(); }
      return;
    }
    this.setState({
      confirmPasswordError: false
    });
    this.props.changePassword(data).then(() => {
      if (cb) { cb(); }
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
      return browserHistory.push("/questions" + queryParamsString);
    }).catch(()=>{
      console.log(this.questions);
    });
  }

  handlePasswordChange(v) {
    console.log("dfddfdf");
    this.setState({
      password: v
    });
  }

  handleChange(key, v) {
    console.log("dfddfdf");
    this.setState({
        [key]: v
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
  getMainComponenets() {
      if (this.state.gettingQuestions) {
        return (<div className="questions-content-container final-loading-messages">
                <div>Loading .... </div>
                <i className="fa fa-spinner fa-spin fa-3x fa-fw main-loader"></i>
            </div>)
      } else if (this.state.showEnterPassword) {
        return (
            <EnterPassword
                submitPassword={this.authenticateUser.bind(this)}
                handleChange={this.handlePasswordChange.bind(this)}
                showModalPassword={true}
                onCloseModal={()=>{}}
                errorMsg={this.props.user && this.props.user.message}
            />
        )
      } else {
        return (
            <ResetPassword
                resetPassword={this.resetPassword.bind(this)}
                handleChange={this.handleChange.bind(this)}
                showModalResetPassword={true}
                onCloseModal={()=>{}}
                confirmPasswordError={this.state.confirmPasswordError}
            />
        )
      }
  }

  public render() {
    var breadCrumbs = this.getBreadCrumbs();
    return (
      <div>
        <Subheader
          breadCrumbs={breadCrumbs}
          noFoGroupsCompleted={[breadCrumbs.length-2]}
          location={this.props.location}
        />
        <Row className="questions-container c-center">
            {this.getMainComponenets()}
        </Row>
      </div>);
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    questions: state.questions.questions,
    user: state.questions.user
  }
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
    getQuestions: (data: any) => {
      return dispatch(getQuestions(data))
    },
    authenticateUser: (data: any) =>  {
      return dispatch(authenticateUser(data));
    },
    changePassword: (data: any) =>  {
        return dispatch(changePassword(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signature);