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


interface Props  extends React.Props<Main> {
  submitQuoteForm: ()=>void,
  submitProductsForm: ()=>void,
  getQuestions: any,
  postQuestions: any,
  confirmQuestions: any,
  questions: any,
  previousQuestionIds: any,
  getFactorsearch: any
}

class Main extends React.Component<Props, {}> {
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
      if (this.questions && this.questions.LOGIN_URL && this.questions.LOGIN_URL.length > 0) {
        window.location.href = this.questions.LOGIN_URL;
        return;
      }
      this.setState({
        gettingQuestions: false
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
      if (this.questions && this.questions.status == false) {
        browserHistory.push("/error" + queryParamsString);
        return;
      }

      if (this.questions && this.questions.valid_user == 0) {
        browserHistory.push("/authorize" + queryParamsString);
        return;
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    if(!isEmpty(nextProps.questions)) {
      var queryParams = this.props.location.query;
      var queryParamsString = "?";
      for(var k in queryParams) {
        if (queryParams[k]) {
          queryParamsString += k + "=" + queryParams[k] + "&";
        } else {
          queryParamsString += k + "&";
        }
      }
      if (nextProps.questions.valid_user == 0) {
        browserHistory.push("/authorize" + queryParamsString);
        return;
      }
      this.questions = JSON.parse(JSON.stringify(nextProps.questions));
      if (this.questions && this.questions.data && this.questions.data.questionnaire &&
        this.questions.data.questionnaire.questions && this.questions.data.questionnaire.questions[0] &&
        this.questions.data.questionnaire.questions[0].caption) {
        this.setState({
          activeGroup: this.questions.data.questionnaire.questions[0].caption
        })
      }

    }
  }
  onChangeInput(q, answer) {
    q.answer = answer;
  }

  reRecursiveGetQuestions1(data, questionsList, actualQuestionLists) {
    if (!isEmpty(data)) {
      for(var i=0; i<(data.length); i++) {
        var qe = data[i];
        var q = qe;

        q.key = q.id;

        if (q.type == "singleselection") {
          if(q.options.length==2) {
            questionsList.push(<SingleSelection
              question={q}
              error={""}
              onChange={this.onChangeInput.bind(this)}
              alreadyOnceSubmitted={this.state.alreadyOnceSubmitted}
              key={q.id}
            />);
            actualQuestionLists.push(q);
          } else {
            questionsList.push(<CustomSelect
              question={q}
              error={""}
              onChange={this.onChangeInput.bind(this)}
              alreadyOnceSubmitted={this.state.alreadyOnceSubmitted}
              key={q.id}
            />)
            actualQuestionLists.push(q);
          }
        } else if (q.type == "multiselection") {
          questionsList.push(<CustomSelect
              question={q}
              error={""}
              onChange={this.onChangeInput.bind(this)}
              alreadyOnceSubmitted={this.state.alreadyOnceSubmitted}
              multi={true}
              key={q.id}
            />)
          actualQuestionLists.push(q);
        } else if (q.type == "label") {
          questionsList.push( <Label
                  {...q}
                />)
        } else if (q.type == "list") {
          var qL = q.questions;
          if (q.prototype && q.prototype.elements) {
            if (!q.answer) {
              q.answer = [q.prototype];
            }
            questionsList.siblingAnswers = q.answer;
            qL = q.answer[0].elements;
          } else {
            qL = [];
          }

          for(var i=0; i<qL.length; i++) {
            questionsList.push(this.getQuestionComponent(qL[i]));
            actualQuestionLists.push(qL[i]);
          }

        } else if (q.type == "group" || q.type == "assessment-factor-group") {
          this.reRecursiveGetQuestions1(q.questions, questionsList, actualQuestionLists)
        } else if (q.type == "struct") {
          this.reRecursiveGetQuestions1(q.elements, questionsList, actualQuestionLists)
        } else if (q.type == "number" || q.type=="text") {
            questionsList.push(<CustomInput
                  question={q}
                  error={""}
                  onChange={this.onChangeInput.bind(this)}
                  alreadyOnceSubmitted={this.state.alreadyOnceSubmitted}
                  key={q.id}
                />)
            actualQuestionLists.push(q);
        } else if (q.type == "date") {
            questionsList.push(<QuestionsCustomDatePicker
                  question={q}
                  error={""}
                  onChange={this.onChangeInput.bind(this)}
                  alreadyOnceSubmitted={this.state.alreadyOnceSubmitted}
                  key={q.id}
                />)
            actualQuestionLists.push(q);
        } else if (q.type == "assessment-factor-search") {
            questionsList.push(<AsyncCustomSelect
                question={q}
                error={""}
                onChange={this.onChangeInput.bind(this)}
                alreadyOnceSubmitted={this.state.alreadyOnceSubmitted}
                getFactorsearch={this.props.getFactorsearch.bind(this)}
                key={q.id}
            />)
            actualQuestionLists.push(q);
        }
        if (q.hasReflexive) {
          if (q.questions) {
              this.reRecursiveGetQuestions1(q.questions, questionsList, actualQuestionLists);
          }
        }
      };
    }
  }

  recursiveGetQuestions1() {
    if (!isEmpty(this.questions) && !isEmpty(this.questions.data)) {
      if (this.questions.data.questionnaire && this.questions.data.questionnaire.questions) {

        var questionsList = [];
        var actualQuestionLists = [];
        this.noFoGroupsCompleted = [];
        for(var i=0; i<(this.questions.data.questionnaire.questions.length); i++) {
            var qe = this.questions.data.questionnaire.questions[i];
            questionsList.push([]);
            actualQuestionLists.push([]);
            questionsList[i].groupHeader = qe.caption;
            actualQuestionLists[i].groupHeader = qe.caption;
            var q = qe;
            if (q.questions && q.questions.length > 0 && i<this.questions.data.questionnaire.questions.length-2) {
              this.noFoGroupsCompleted.push(i);
            }
            this.reRecursiveGetQuestions1(q.questions, questionsList[i], actualQuestionLists[i]);
        };
        this.actualQuestionLists = actualQuestionLists;
        return questionsList;
      };
    } else {
      return null;
    }
  }

  getQuestions(lastAnsweredQuestion) {
    if (lastAnsweredQuestion) {

    } else {
      return this.recursiveGetQuestions1();
    }
  }

  validateTextField(q) {
    if (q.constraints) {
      var constraints = q.constraints;
      var isValid = true;

      if (constraints.required) {
        if (constraints.pattern) {
          if (q.answer) {
            return new RegExp(q.constraints.pattern).test(q.answer)
          } else {
            return false;
          }
        }
        return q.answer && String(q.answer).length > 0;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  validateSingleSelection(q) {
    if (q.constraints) {
      var constraints = q.constraints;
      if (constraints.required) {
        return q.answer && q.answer.id && q.answer.id.length > 0;
      }
      return true;
    } else {
      return true;
    }
  }

  validateCustomDatePicker(q) {
    if (q.constraints) {
      var constraints = q.constraints;
      var isValid = true;

      if (constraints.required) {
        if (q.answer) {
          if (constraints.minValue) {
            return constraints.minValue<=q.answer;
          } else {
            return q.answer;
          }
        }
        return false;
      }
    } else {
      return true;
    }
  }

  confirmQuestions() {

    var data = {};
    this.setState({
      confirmingQuestions: true
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
    data.review_confirm = 1;
    this.props.confirmQuestions(data).then(() => {
      if (this.questions && this.questions.LOGIN_URL && this.questions.LOGIN_URL.length > 0) {
        window.location.href = this.questions.LOGIN_URL;
        return;
      };

      if (this.props.confirmationData && this.props.confirmationData.LOGIN_URL && this.props.confirmationData.LOGIN_URL.length > 0) {
        window.location.href = this.props.confirmationData.LOGIN_URL;
        return;
      };

      var link = this.props.confirmationData && this.props.confirmationData.data &&
      this.props.confirmationData.data.current_document_data && this.props.confirmationData.data.current_document_data.sign_url;

      if (this.questions && this.questions.status == false) {
        browserHistory.push("/error" + queryParamsString);
        return;
      }

      if (this.props.confirmationData.valid_user == 0) {
        browserHistory.push("/authorize" + queryParamsString);
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
      console.log(this.props.questions);
    });
  }

  findQuestionById(actualQuestions, questionId) : any {
    if (!isEmpty(actualQuestions)) {
      var targetQuestion = {};
      for(var i=0; i<(actualQuestions.length); i++) {
        var qe = actualQuestions[i];
        var q = qe;
        q.key = q.id;

        if (q.id == questionId) {
          return q;
        }

        if (qe.type == "group" || qe.type == "assessment-factor-group" || qe.hasReflexive) {
          targetQuestion = this.findQuestionById(q.questions, questionId)
        }

        if (qe.type == "list" && q.answer && q.answer[0].elements) {
          targetQuestion = this.findQuestionById(q.answer[0].elements, questionId)
        }

        if (qe.type == "struct") {
          targetQuestion = this.findQuestionById(q.elements, questionId)
        }



        if (!isEmpty(targetQuestion)) {
          return targetQuestion;
        }
      }

      return {};
    } else {
      return {};
    }
  }
  counter = 0;
  getQuestionComponent(q): any {
    var qComponent = {};
    if (q.type == "singleselection") {
      if(q.options.length == 2) {
        qComponent = <SingleSelection
              question={q}
              error={""}
              onChange={this.onChangeInput.bind(this)}
              alreadyOnceSubmitted={this.state.alreadyOnceSubmitted}
              key={q.id}
              counter={this.counter++}
            />;
      } else {
        qComponent = <CustomSelect
            question={q}
            error={""}
            onChange={this.onChangeInput.bind(this)}
            alreadyOnceSubmitted={this.state.alreadyOnceSubmitted}
            key={q.id}
            counter={this.counter++}
          />;
      }
    } else if (q.type == "multiselection") {
      qComponent = <CustomSelect
          question={q}
          error={""}
          onChange={this.onChangeInput.bind(this)}
          alreadyOnceSubmitted={this.state.alreadyOnceSubmitted}
          key={q.id}
          multi={true}
          counter={this.counter++}
        />;
    } else if (q.type == "label") {
      /*questionsList.push( <Label
              {...q}
            />)*/
    } else if (q.type == "number" || q.type=="text") {
      qComponent = <CustomInput
        question={q}
        error={""}
        onChange={this.onChangeInput.bind(this)}
        alreadyOnceSubmitted={this.state.alreadyOnceSubmitted}
        key={q.id}
        counter={this.counter++}
      />;
    } else if (q.type == "date") {
      qComponent = <QuestionsCustomDatePicker
                question={q}
                error={""}
                onChange={this.onChangeInput.bind(this)}
                alreadyOnceSubmitted={this.state.alreadyOnceSubmitted}
                key={q.id}
                counter={this.counter++}
            />
    } else if (q.type == "assessment-factor-search") {
      qComponent = <AsyncCustomSelect
          question={q}
          error={""}
          onChange={this.onChangeInput.bind(this)}
          alreadyOnceSubmitted={this.state.alreadyOnceSubmitted}
          getFactorsearch={this.props.getFactorsearch.bind(this)}
          key={q.id}

      />;
    }
    return qComponent;
  }

  getPreviousQuestionComponents() {
    var previousQuestionIds = this.state.previousQuestionIds;
    var qComps = [];
    var aQuestions = [];
    if (!isEmpty(this.questions) && !isEmpty(this.questions.data)) {
      if (this.questions.data.questionnaire && this.questions.data.questionnaire.questions) {
        for(var i=0; i<previousQuestionIds.length; i++) {
          var question = this.findQuestionById(this.questions.data.questionnaire.questions, previousQuestionIds[i]);
          aQuestions.push(question);
          qComps.push(this.getQuestionComponent(question));
         }
      }
    }
    this.actualQuestionLists = aQuestions;
    return qComps;
  }

  deleteSibling() {
    if (this.questionComponents.siblingAnswers.length >1) {
      this.questionComponents.siblingAnswers.pop();
      var siblingsCount = this.state.siblingsCount;
      this.setState({
        siblingsCount: siblingsCount - 1
      });
    }
  }

  addSibling() {
    var siblingsCount = this.state.siblingsCount || 0;
    if (this.questionComponents.isQuestionsList) {
      if (this.questionComponents.siblingAnswers) {
        var a = JSON.parse(JSON.stringify(this.questionComponents.siblingAnswers[0]));
        this.questionComponents.siblingAnswers.push(a);
      }
    }
    this.setState({
      siblingsCount: siblingsCount + 1
    });
  };

  getCurrentSetOfQuestions() {
    if (this.questions) {
      this.questionComponents = this.getQuestions(null);
      return this.questionComponents;
    } else {
      return null;
    }
  }

  getBreadCrumbs() {
    var breadCrumbs = [];
    var questions = this.props.questions;

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

  handleBackSubmit(): any {
    if (this.state.previousQuestionsHandling) return;

    if (this.props.questions && this.props.questions.extra_params &&
      this.props.questions.extra_params.answered_questions &&
      this.props.questions.extra_params.answered_questions.length > 0) {
      if (this.state.previousQuestionHanldingIndex !=0) {
        if (this.state.previousQuestionHanldingIndex) {
          this.setState({
            previousQuestionHanldingIndex: this.state.previousQuestionHanldingIndex - 1,
            previousQuestionsHandling: true
          }, ()=> {
            this.setState({
              previousQuestionsHandling: false,
              previousQuestionIds: this.props.questions.extra_params.answered_questions[this.state.previousQuestionHanldingIndex]
            });
          });
        } else {
          this.setState({
            previousQuestionHanldingIndex: this.props.questions.extra_params.answered_questions.length - 1,
            previousQuestionsHandling: true
          }, ()=> {
            this.setState({
              previousQuestionsHandling: false,
              previousQuestionIds: this.props.questions.extra_params.answered_questions[this.state.previousQuestionHanldingIndex]
            });
          });
        }
      } else if (this.state.previousQuestionHanldingIndex == 0) {
        this.setState({
          previousQuestionsHandling: true
        }, ()=> {
          this.setState({
            previousQuestionsHandling: false,
            previousQuestionIds: this.props.questions.extra_params.answered_questions[this.state.previousQuestionHanldingIndex]
          });
        });
      }
    }


  }
  makeGroupActive(groupHeader) {
    if (this.state.activeGroup == groupHeader) {
      this.setState({
        activeGroup: null
      });
    } else {
      this.setState({
        activeGroup: groupHeader
      });
    }
  }

  goToEditQuestionPage(q, groupHeader) {
    var queryParams = this.props.location.query;
    var queryParamsString = "&";
    for(var k in queryParams) {
      if (queryParams[k]) {
        queryParamsString += k + "=" + queryParams[k] + "&";
      } else {
        queryParamsString += k + "&";
      }
    }
    queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);

    if (this.questions && this.questions.status == false) {
      browserHistory.push("/error" + queryParamsString);
      return;
    }

    if (groupHeader.toLowerCase().indexOf("beneficiaries") >-1) {
      browserHistory.push("/edit-questions/beneficiaries?" + queryParamsString);
      return;
    }
    browserHistory.push("/edit-questions?fromReviewPage=true&questionId=" + q.id + queryParamsString);
  }

  public render() {
    var breadCrumbs = this.getBreadCrumbs();
    var questionsList = this.getCurrentSetOfQuestions() || [];
    var actualQuestionLists = this.actualQuestionLists || [];
    var noFoGroupsCompleted = this.noFoGroupsCompleted;
    return (
      <div>
        <ScrollToTopOnMount />
        <Subheader
          breadCrumbs={breadCrumbs}
          noFoGroupsCompleted={noFoGroupsCompleted}
          location={this.props.location}
        />
        <div className="all-review-questions-container">
            <Nav className="all-questions-side-bar" bsStyle="pills" stacked onSelect={()=>{}}>
                <div className="all-questions-side-bar-header">
                    APPLICATION SECTIONS
                </div>
                <hr/>

                {map(actualQuestionLists, (qL)=>{
                        if (qL.length > 0) {
                          return (<div>
                              <NavItem className={`all-question-side-bar-link ${this.state.activeGroup == qL.groupHeader ? "active" : ""}`} eventKey={qL.groupHeader} onClick={()=>{
                                    this.makeGroupActive(qL.groupHeader)
                                  }}>
                                  <div className="all-questions-side-bar-header-text">
                                    <span>{qL.groupHeader}
                                    </span>
                                  </div>
                              </NavItem>
                              <hr/>
                            </div>)
                          } else {
                            return null;
                          }
                    })
                }
            </Nav>
            <Row className="questions-container all-questions-container">
              {this.state.gettingQuestions && <i className="fa fa-spinner fa-spin fa-3x fa-fw main-loader"></i>}
                {
                    map(actualQuestionLists, (qL)=>{
                        var ans;
                        if(qL.length >0) {
                          return (<div key={qL.groupHeader} onClick={()=>{
                                    this.makeGroupActive(qL.groupHeader)
                                  }}
                            className={`questions-content-container all-group-questions-container ${this.state.activeGroup == qL.groupHeader ? "active" : ""}`}>
                            <div className="all-group-header">
                                {qL.groupHeader}
                                {<span className="down-arrow-container">
                                      <img src="../images/down-arrow.svg"/>
                                    </span>}
                            </div>
                            <div className="question-answer-header hidden-xs">
                                <div className="question-text">Question</div>
                                <div className="answer-text">Answer</div>
                            </div>
                            {map(qL, (q)=>{
                                ans = q.answer;
                                if (Object.prototype.toString.call(q.answer) === '[object Array]') {
                                    ans = q.answer[0].label;
                                    for (var i=1; i<q.answer.length; i++) {
                                        ans += ", " + q.answer[i].label;
                                    }
                                } else {
                                    if (q.answer && q.answer.label) {
                                        ans = q.answer.label;
                                    } else if (q.answer && q.answer.id) {
                                        ans = q.answer.id;
                                    } else if (q.answer) {
                                      ans = q.answer;
                                    }
                                }

                                if (q.type == "date") {
                                  q.answer = moment(q.answer).format("MM/DD/YYYY");
                                }


                                console.log(ans);



                                return <div className="individual-question"  onClick={()=>{
                                            this.goToEditQuestionPage(q, qL.groupHeader);
                                        }}>
                                        <div className="question-text hidden-xs">
                                            <span className="question-actual-text">
                                                {q.caption}
                                            </span>
                                        </div>
                                        <div className="answer-text hidden-xs">
                                            <span>
                                                {ans}
                                            </span>
                                            <span className="edit-img-container">
                                            </span>
                                        </div>
                                        <div>
                                          <div className="question-answer-header visible-xs">
                                              <div className="question-text">Question</div>
                                              <span className="edit-img-container">
                                                  </span>
                                              <div className="question-text question-actual-text-container">
                                                  <span className="question-actual-text">
                                                      {q.caption}
                                                  </span>
                                              </div>
                                              <div className="answer-text">Answer</div>
                                              <div className="answer-text answer-text-container">
                                                  <span>
                                                      {ans}
                                                  </span>
                                              </div>
                                              <hr/>
                                          </div>

                                        </div>
                                        <hr className="hidden-xs"/>
                                        <div> </div>
                                    </div>
                            })}
                          </div>)
                        } else {
                          return null;
                        }
                    })
                }

            <div className="question-action-btn-container">
                <Button className={`c-button-default circular action`} onClick={()=>{
                        this.confirmQuestions()
                    }} style={{width: "auto"}}>
                    E SIGN AND SUBMIT
                    {this.state.confirmingQuestions && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                </Button>
                </div>
            </Row>
        </div>
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
    postQuestions: (data: any, moreInfo: any) => {
      return dispatch(postQuestions(data, moreInfo));
    },
    getFactorsearch: (data: any, moreInfo: any) => {
      return dispatch(getFactorsearch(data, moreInfo));
    },
    confirmQuestions: (data: any, moreInfo: any) =>  {
      return dispatch(confirmQuestions(data, moreInfo));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);