import * as React from 'react';
import * as Autocomplete from "react-autocomplete"
import * as moment from "moment";
import {Link} from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import SingleSelection from "./SingleSelection";
import Label from "./Label"
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import AsyncCustomSelect from "./AsyncCustomSelect";
import QuestionsCustomDatePicker from "./QuestionsCustomDatePicker";
import Subheader from "../common/subheader";
import {each, isEmpty, map} from "underscore";
import {getQuestions, postQuestions, getFactorsearch} from '../../actions/Questions';
const objectAssign = require('object-assign');
import { browserHistory } from 'react-router';
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";


interface Props  extends React.Props<Main> {
  submitQuoteForm: ()=>void,
  submitProductsForm: ()=>void,
  getQuestions: any,
  postQuestions: any,
  questions: any,
  previousQuestionIds: any,
  getFactorsearch: any
}

class Main extends React.Component<Props, {}> {
  constructor(){
    super();
    this.keyDownTextField.bind(this);
    this.onQuestionSubmit.bind(this);
  }
  state = {};
  questions:any = {};
  actualQuestionLists: any = [];
  questionComponents: any = [];
  currentlyAnsweredQuestions: any = [];
  questionsSource: any = [];

  componentWillMount() {
    this.props.getQuestions().then(()=>{
        if (!this.alreadyAnsweredQueryQuestion && this.props.location.query && (this.props.location.query.fromReviewPage==true || this.props.location.query.fromReviewPage=="true")) {
            var questionIdFromQuery = this.props.location.query.questionId;
            var currentPageIndex = this.getCurrentPageIndex(this.props.location.query.questionId);
            if (currentPageIndex>=0) {
              for (var i=0; i<this.questions.extra_params.answered_questions[currentPageIndex].length; i++) {
                var qId = this.questions.extra_params.answered_questions[currentPageIndex][i];
                var question = this.findQuestionById(this.questions.data.questionnaire.questions, qId);
                if (question.hasReflexive) {
                  this.reflexiveQuestioninPage = JSON.parse(JSON.stringify(question));
                }
              }
              this.setState({
                  previousQuestionIds: this.questions.extra_params.answered_questions[currentPageIndex]
              });
              return;
            }
        }
    });
  }

  componentWillReceiveProps(nextProps) {
    if(!isEmpty(nextProps.questions)) {
      this.questions = JSON.parse(JSON.stringify(nextProps.questions));
      if (!this.alreadyAnsweredQueryQuestion && this.props.location.query && (this.props.location.query.fromReviewPage==true || this.props.location.query.fromReviewPage=="true")) {
          var questionIdFromQuery = this.props.location.query.questionId;
          var currentPageIndex = this.getCurrentPageIndex(this.props.location.query.questionId);
          if (currentPageIndex>=0) {
            for (var i=0; i<this.questions.extra_params.answered_questions[currentPageIndex].length; i++) {
              var qId = this.questions.extra_params.answered_questions[currentPageIndex][i];
              var question = this.findQuestionById(this.questions.data.questionnaire.questions, qId);
              if (question.hasReflexive) {
                this.reflexiveQuestioninPage = JSON.parse(JSON.stringify(question));
              }
            }
            this.setState({
                previousQuestionIds: this.questions.extra_params.answered_questions[currentPageIndex]
            });
            return;
          }
      }
    }
  }
  isOnlyQuestionSingleSelection() {
    if (this.actualQuestionLists.length==1) {
      if (this.actualQuestionLists[0] && this.actualQuestionLists[0].options && this.actualQuestionLists[0].options.length==2){
        return true;
      }
    };
    return false;
  }
  onChangeInput(q, answer) {
    q.answer = answer;
    if (q.hasReflexive) {
      if (this.reflexiveQuestioninPage && this.reflexiveQuestioninPage.id==q.id) {
        this.reflexiveQuestionModified = true;
      }
    }
    if (this.isOnlyQuestionSingleSelection()) {
      this.onQuestionSubmit();
    }
  }

  reRecursiveRender(data) {
    if (!isEmpty(data)) {
        return map(data, (qe)=> {
          var q = qe;
          q.key = q.id;
          if (q.type == "singleselection") {
            if(q.options && q.options.length ==2) {
              return <SingleSelection
                    question={q}
                    error={""}
                    onChange={this.onChangeInput.bind(this)}
                    alreadyOnceSubmitted={this.state.alreadyOnceSubmitted}
                  />
            } else {
              return <CustomSelect
                question={q}
                error={""}
                onChange={this.onChangeInput.bind(this)}
                alreadyOnceSubmitted={this.state.alreadyOnceSubmitted}
              />
            }
          } else if (q.type == "multiselection") {
            return <CustomSelect
                question={q}
                error={""}
                onChange={this.onChangeInput.bind(this)}
                alreadyOnceSubmitted={this.state.alreadyOnceSubmitted}
                multi={true}
              />
          } else if (q.type == "label") {
            return <Label
                    {...q}
                  />
          } else if (q.type == "group" || q.type =="assessment-factor-group") {
            return this.reRecursiveRender(q.questions);
          } else if (q.type == "number" || q.type=="text") {
            return <CustomInput
                    question={q}
                    error={""}
                    onChange={this.onChangeInput.bind(this)}
                    alreadyOnceSubmitted={this.state.alreadyOnceSubmitted}
                  />
          } else if (q.type == "date") {
            return <QuestionsCustomDatePicker
                    question={q}
                    error={""}
                    onChange={this.onChangeInput.bind(this)}
                  />
          }
        });
    } else {
      return null;
    }
  }

  questionsAlreadySubmitted(q) {
    var shouldInclude = !q.required;
    if (shouldInclude && this.props.questions && this.props.questions.extra_params && this.props.questions.extra_params.answered_questions) {
      var i=0, j=0;
      var qs = this.props.questions.extra_params.answered_questions;
      for(i=0; i < qs.length; i++) {
        var iqs = qs[i];
        for (j=0; j<iqs.length; j++) {
          if (iqs[j] == q.id) {
            console.log(" q.id: " +  q.id);
            return true;
          }
        }
      }
    }
    return false;
  }

  reRecursiveGetQuestions1(data, questionsList, preQ, actualQuestionLists) {
    questionsList.isQuestionsList = false;
    if (!isEmpty(data)) {
      var boundaryReached = false;
      for(var i=0; i<(data.length); i++) {
        var qe = data[i];
        var q = qe;
        if (q.type == "group") {
          questionsList.groupHeader = questionsList.groupHeader || [];
          questionsList.groupHeader.push(q.caption);
        }
        q.key = q.id;
        if (this.currentlyAnsweredQuestions.indexOf(q.id)>=0) {
          if (q.hasReflexive) {
            if (q.questions) {
              var reflexsiveQuestionList = this.reRecursiveGetQuestions1(q.questions, questionsList, preQ, actualQuestionLists);
              if(reflexsiveQuestionList.length > 0){
                questionsList.groupHeader = questionsList.groupHeader || [];
                questionsList.groupHeader.push(q.caption);
                return reflexsiveQuestionList;
              } else {
                continue;
              }
            }
          }
          continue;
        }
        if (preQ && preQ.hasReflexive) {
          if (questionsList.length > 0) {
            this.actualQuestionLists = actualQuestionLists;
            boundaryReached = true;
            return questionsList;
          }
        }
        if (q.type == "singleselection") {
          preQ = q;
          if(q.options.length ==2) {
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
          preQ = q;
          questionsList.push( <Label
                  {...q}
                />)
          actualQuestionLists.push(q);
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
          this.actualQuestionLists = actualQuestionLists;
          questionsList.isQuestionsList = true;
          return questionsList;

        } else if (q.type == "group" || q.type == "assessment-factor-group") {
          if (questionsList.length > 0) {
            var allQuestionsAreLabels = true;
            for(var i=0; i<questionsList.length; i++) {
              if (questionsList[i].props.type != "label"){
                allQuestionsAreLabels = false;
              }
            }
            if(!allQuestionsAreLabels) {
              this.actualQuestionLists = actualQuestionLists;
              return questionsList;
            }
          }
          var qL = q.questions;
          var questionsFromGroup = this.reRecursiveGetQuestions1(qL, questionsList, preQ, actualQuestionLists)
          if(questionsFromGroup.length > 0) {
            var allQuestionsAreLabels = true;
            for(var i=0; i<questionsFromGroup.length; i++) {
              if (questionsFromGroup[i].props.type != "label"){
                allQuestionsAreLabels = false;
              }
            }
            if(!allQuestionsAreLabels) {
              return questionsFromGroup;
            } else {
              //questionsList = questionsFromGroup;
            }
          }
        } else if (q.type == "struct") {
          if (questionsList.length > 0) {
            var allQuestionsAreLabels = true;
            for(var i=0; i<questionsList.length; i++) {
              if (questionsList[i].props.type != "label"){
                allQuestionsAreLabels = false;
              }
            }
            if(!allQuestionsAreLabels) {
              this.actualQuestionLists = actualQuestionLists;
              return questionsList;
            }
          }
          var questionsFromGroup = this.reRecursiveGetQuestions1(q.elements, questionsList, preQ, actualQuestionLists)
          if(questionsFromGroup.length > 0) {
            var allQuestionsAreLabels = true;
            for(var i=0; i<questionsFromGroup.length; i++) {
              if (questionsFromGroup[i].props.type != "label"){
                allQuestionsAreLabels = false;
              }
            }
            if(!allQuestionsAreLabels) {
              return questionsFromGroup;
            } else {
              //questionsList = questionsFromGroup;
            }
          }
        } else if (q.type == "number" || q.type=="text") {
          preQ = q;
          questionsList.push(<CustomInput
                  question={q}
                  error={""}
                  onChange={this.onChangeInput.bind(this)}
                  alreadyOnceSubmitted={this.state.alreadyOnceSubmitted}
                  key={q.id}
                />)
                actualQuestionLists.push(q);
        } else if (q.type == "date") {
          preQ = q;
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
      };
      this.actualQuestionLists = actualQuestionLists;
      return questionsList;
    } else {
      this.actualQuestionLists = actualQuestionLists;
      return questionsList;
    }
  }

  recursiveGetQuestions1() {
    if (!isEmpty(this.questionsSource) && !isEmpty(this.questionsSource.questions)) {
      if (this.questionsSource.questions) {
        var preQ = null;
        var questionsList = [];
        questionsList.isQuestionsList = false;
        var actualQuestionLists = [];
        var boundaryReached = false;
        for(var i=0; i<(this.questionsSource.questions.length); i++) {
          var qe = this.questionsSource.questions[i];
          if (qe.type == "group") {
            questionsList.groupHeader = [];
            questionsList.groupHeader.push(qe.caption);
          }
          var q = qe;
          q.key = q.id;
          if (this.currentlyAnsweredQuestions.indexOf(q.id)>=0) {
            if (q.hasReflexive) {
              if (q.questions){
                var reflexsiveQuestionList = this.reRecursiveGetQuestions1(q.questions, questionsList, preQ, actualQuestionLists);
                if(reflexsiveQuestionList.length > 0){
                  questionsList.groupHeader = questionsList.groupHeader || [];
                  questionsList.groupHeader.push(qe.caption);
                  return reflexsiveQuestionList;
                } else {
                  continue;
                }
              }
            }
            continue;
          }
          if (preQ && preQ.hasReflexive) {
            //this.setLastAnsweredQuestion(preQ);
            boundaryReached = true;
            if (questionsList.length > 0) {
              this.actualQuestionLists = actualQuestionLists;
              return questionsList;
            }
          }
          if (q.type == "singleselection") {
            if(q.options.length == 2) {
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
                /> )
                actualQuestionLists.push(q);
            }
          } else if (q.type == "multiselection") {
            questionsList.push(<CustomSelect
                question={q}
                error={""}
                onChange={this.onChangeInput.bind(this)}
                alreadyOnceSubmitted={this.state.alreadyOnceSubmitted}
                key={q.id}
                multi={true}
              />)
            actualQuestionLists.push(q);
          } else if (q.type == "label") {
            questionsList.push( <Label
                    {...q}
                  />)
            actualQuestionLists.push(q);
          } else if (q.type=="list") {
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
            this.actualQuestionLists = actualQuestionLists;
            questionsList.isQuestionsList = true
            return questionsList;
          } else if (q.type == "group" || q.type == "assessment-factor-group") {
              if (questionsList.length > 0) {
                var allQuestionsAreLabels = true;
                for(var i=0; i<questionsList.length; i++) {
                  if (questionsList[i].props.type != "label"){
                    allQuestionsAreLabels = false;
                  }
                }
                if(!allQuestionsAreLabels) {
                  this.actualQuestionLists = actualQuestionLists;
                  return questionsList;
                }
              }
              var qL = q.questions;
              var questionsFromGroup = this.reRecursiveGetQuestions1(qL, questionsList, preQ, actualQuestionLists)
              if(questionsFromGroup.length > 0) {
                var allQuestionsAreLabels = true;
                for(var i=0; i<questionsFromGroup.length; i++) {
                  if (questionsFromGroup[i].props.type != "label"){
                    allQuestionsAreLabels = false;
                  }
                }
                if(!allQuestionsAreLabels) {
                  return questionsFromGroup;
                } else {
                  questionsList = questionsFromGroup;
                }
              }
          } else if (q.type == "struct") {
            if (questionsList.length > 0) {
              var allQuestionsAreLabels = true;
              for(var i=0; i<questionsList.length; i++) {
                if (questionsList[i].props.type != "label"){
                  allQuestionsAreLabels = false;
                }
              }
              if(!allQuestionsAreLabels) {
                this.actualQuestionLists = actualQuestionLists;
                return questionsList;
              }
            }
            var questionsFromGroup = this.reRecursiveGetQuestions1(q.elements, questionsList, preQ, actualQuestionLists)
            if(questionsFromGroup.length > 0) {
              var allQuestionsAreLabels = true;
              for(var i=0; i<questionsFromGroup.length; i++) {
                if (questionsFromGroup[i].props.type != "label"){
                  allQuestionsAreLabels = false;
                }
              }
              if(!allQuestionsAreLabels) {
                return questionsFromGroup;
              } else {
                questionsList = questionsFromGroup;
              }
            }
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
          preQ = q;
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
          if (q.answer && String(q.answer).length > 0) {
            if (constraints.pattern) {
              if (q.answer) {
                return new RegExp(q.constraints.pattern).test(q.answer)
              } else {
                return false;
              }
            } else {
              return true;
            }
          } else {
            return true;
          }
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

  onQuestionSubmit() {
    var answered_questions = [];
    var allQuestionsValid = true;
    this.setState({
      alreadyOnceSubmitted: true
    })

    each(this.actualQuestionLists, (q)=> {
      this.currentlyAnsweredQuestions.push(q.id);
      answered_questions.push(q.id)
      if (q.type == "text") {
        allQuestionsValid = allQuestionsValid && !!this.validateTextField(q);
      } else if (q.type == "number") {
        allQuestionsValid = allQuestionsValid && !!this.validateTextField(q);
      } else if (q.type == "singleselection") {
        allQuestionsValid = allQuestionsValid && !!this.validateSingleSelection(q);
      } else if (q.type == "date") {
        allQuestionsValid = allQuestionsValid && !!this.validateCustomDatePicker(q);
      }
    });

    if (allQuestionsValid) {
      this.setState({
        submittingQuestions: true
      });
      var data = {
        questions: this.questions,
        answered_questions: answered_questions
      };

      this.props.postQuestions(data).then(() => {
        window.scrollTo(0, 0);
        if (this.state.previousQuestionHanldingIndex || this.state.previousQuestionHanldingIndex == 0) {
          if (this.props.questions && this.props.questions.extra_params &&
            this.props.questions.extra_params.answered_questions &&
            this.props.questions.extra_params.answered_questions.length > 0) {
              if (this.props.questions.extra_params.answered_questions-1 == this.state.previousQuestionHanldingIndex) {
                this.setState({
                  previousQuestionHanldingIndex: null,
                  previousQuestionIds: null
                });
              } else {
                this.setState({
                  previousQuestionHanldingIndex: this.state.previousQuestionHanldingIndex + 1,
                }, ()=> {
                  this.setState({
                    previousQuestionIds: this.props.questions.extra_params.answered_questions[this.state.previousQuestionHanldingIndex]
                  });
                });
              }
            }
        }
        this.alreadyAnsweredQueryQuestion = true;
        this.setState({
          alreadyOnceSubmitted: false,
          submittingQuestions: false,
          previousQuestionIds: null
        }, ()=> {
          var queryParams = this.props.location.query;
          var queryParamsString = "?";
          for(var k in queryParams) {
            if (k!="fromReviewPage" && k!="questionId") {
              if (queryParams[k]) {
                queryParamsString += k + "=" + queryParams[k] + "&";
              } else {
                queryParamsString += k + "&";
              }
            }
          }
          queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);
          if (this.questions.valid_user == 0) {
            browserHistory.push("/authorize" + queryParamsString + "fromEditPage=true");
            return;
          }
          if (this.reflexiveQuestionModified) {
            setTimeout(()=>{
              this.questionsSubmittedCount++;
              if (this.questionsSubmittedCount>=0) {
                var reflexiveQuestion = this.findQuestionById(this.questions.data.questionnaire.questions, this.reflexiveQuestioninPage.id)
                if (isEmpty(reflexiveQuestion.questions)) {
                  if (this.questions && this.questions.data && this.questions.data.completed) {
                    if (this.questions.application_confirm_status == 1) {
                      browserHistory.push("/signature" + queryParamsString);
                    } else {
                      browserHistory.push("/all-questions" +queryParamsString);
                    }
                    return;
                  }
                } else {
                  this.questionsSource = reflexiveQuestion;
                  this.setState({
                    questionsSource: this.questionsSource
                  });
                  if (this.getQuestions(null).length ==0) {
                    if (this.questions && this.questions.data && this.questions.data.completed) {
                      if (this.questions.application_confirm_status == 1) {
                        browserHistory.push("/signature" + queryParamsString);
                      } else {
                        browserHistory.push("/all-questions" +queryParamsString);
                      }
                      return;
                    }
                  }
                }
              } else {

              }
            }, 200)
          } else {
            if (this.questions && this.questions.data && this.questions.data.completed) {
              if (this.questions.application_confirm_status == 1) {
                browserHistory.push("/signature" + queryParamsString);
              } else {
                browserHistory.push("/all-questions" +queryParamsString);
              }
              return;
            }
          }
        });


      }).catch(()=>{
        console.log(this.props.questions);
      });
    }
  }
  questionsSubmittedCount = -1;

  setDuplicateQuestions(questions) {
    for(var i=0; i<questions.length; i++) {
      var duplicateQuestions = JSON.parse(JSON.stringify(questions))

    }


  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.addEventListener("keydown", this.keyDownTextField, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyDownTextField, false);
  }
  keyDownTextField(e){
    var keyCode = e.keyCode;
    if(keyCode==13) {
      this.onQuestionSubmit();
    } else {
    }
  }

  findQuestionById(actualQuestions, questionId) : any {
    if (!isEmpty(actualQuestions)) {
      var targetQuestion = {};
      for(var i=0; i<(actualQuestions.length); i++) {
        var qe = actualQuestions[i];
        var q = qe;
        q.key = q.id;

        if (qe.type == "group") {
          this.noFoGroupsCompleted = i;
        }

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
      if (this.questions.data.questionnaire.questions) {
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

  getCurrentPageIndex(questionId) {
    var currentPageIndex = -1;
    var answeredQuestions = [];
    if (this.questions && this.questions.extra_params && this.questions.extra_params.answered_questions) {
      answeredQuestions = this.questions.extra_params.answered_questions;
    }
    var pageQuestionsList = [];
    for (var i=0; (i<answeredQuestions.length && currentPageIndex==-1); i++) {
      pageQuestionsList = answeredQuestions[i];
      for(var j=0; (j<pageQuestionsList.length && currentPageIndex==-1); j++){
        if (questionId == pageQuestionsList[j]) {
          currentPageIndex = i;
        }
      }
    }
    return currentPageIndex;
  }

  getCurrentSetOfQuestions() {
    if (this.state.previousQuestionIds && this.state.previousQuestionIds.length > 0) {
      this.questionComponents = this.getPreviousQuestionComponents();
      return this.questionComponents;
    }

    if (this.questionsSource) {
      this.questionComponents = this.getQuestions(null);
      if (this.questionComponents && this.questionComponents.isQuestionsList) {
        var aQuestions = [];
        var siblingComponents = [];
        var qComps;
        for(var i=0; i<this.questionComponents.siblingAnswers.length; i++) {
          var answers = this.questionComponents.siblingAnswers[i].elements;
          qComps = [];
          for (var j=0; j<answers.length; j++) {
            qComps.push(this.getQuestionComponent(answers[j]));
          }
          siblingComponents.push(qComps);
         }
         this.questionComponents.siblingComponents = siblingComponents;
      }
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

  public render() {
    var breadCrumbs = this.getBreadCrumbs();
    var questionsList = this.getCurrentSetOfQuestions() || [];
    var noFoGroupsCompleted = this.noFoGroupsCompleted;
    return (
      <div>
        <ScrollToTopOnMount />
        <Subheader
          breadCrumbs={breadCrumbs}
          noFoGroupsCompleted={[noFoGroupsCompleted]}
          location={this.props.location}
        />
        <Row className="questions-container c-center edit-questions-container">
          <Row>
            { //map(questionsList.groupHeader, (p)=>{
              // return p  + " >>";
              //})
            }
          </Row>
          {!questionsList.isQuestionsList && <div className="questions-content-container">
            {questionsList}
            {!questionsList.isQuestionsList && !this.isOnlyQuestionSingleSelection() && <div className="question-action-btn-container">
              <Button className={`c-button-default circular action`} style={{marginLeft: "30px!important"}}  onClick={()=>{
                    this.onQuestionSubmit()
                  }}
                >
                  Submit
                  {this.state.submittingQuestions && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
              </Button>
            </div>}
          </div>}
          {questionsList.isQuestionsList &&
            map(questionsList.siblingComponents, (s, i)=>{
                return <div className="" key={i}>
                  <div  className="siblings-container">
                    {s}
                    {questionsList.isQuestionsList && i==questionsList.siblingComponents.length-1 && <div className="question-action-btn-container">
                      <Button className={`c-button-default circular action`} onClick={()=>{
                            this.addSibling()
                          }}>
                          ADD SIBLING
                          {this.state.goingBackQuestions && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                      </Button>
                      <Button className={`c-button-default circular next-step-btn action`} style={{marginLeft: "30px!important"}}  onClick={()=>{
                            this.deleteSibling()
                          }}
                        >
                          DELETE ENTRY
                          {this.state.submittingQuestions && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                      </Button>
                    </div>}
                  </div>
                  <div>
                  </div>
              </div>
            })}

        </Row>
        {questionsList.isQuestionsList && <Row className="questions-container c-center" style={{backgrounColor: "transparent", border: "none", boxShadow: "none"}}> <div className="question-action-btn-container">
            <Button className={`c-button-default circular next-step-btn action`} onClick={()=>{
                  this.handleBackSubmit()
                }}>
                Previous Step
                {this.state.goingBackQuestions && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
            </Button>
            {!this.isOnlyQuestionSingleSelection() && <Button className={`c-button-default circular action`} style={{marginLeft: "30px!important"}}  onClick={()=>{
                  this.onQuestionSubmit()
                }}
              >
                Next Step
                {this.state.submittingQuestions && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
            </Button>}
          </div>
          </Row>}
      </div>);
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    questions: state.questions.questions
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
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);