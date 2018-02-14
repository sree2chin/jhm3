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
  }
  state = {};
  questions:any = {};
  actualQuestionLists: any = [];
  questionComponents: any = [];

  componentWillMount() {
    this.setState({
      gettingQuestions: true
    });
    this.props.getQuestions().then(()=> {
      if (this.questions && this.questions.data && this.questions.data.completed) {
        browserHistory.push("/all-questions");
        return;
      }
      if (this.questions && this.questions.valid_user == 0) {
        browserHistory.push("/authorize");
        return;
      }
      this.setState({
        gettingQuestions: false
      });
    });
  }
  componentWillReceiveProps(nextProps) {
    if(!isEmpty(nextProps.questions)) {
      this.questions = JSON.parse(JSON.stringify(nextProps.questions));
    }
    if (this.questions && this.questions.data && this.questions.data.completed) {
      browserHistory.push("/all-questions");
      return;
    }
    if (this.questions.valid_user == 0) {
      browserHistory.push("/authorize");
      return;
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
    if (this.isOnlyQuestionSingleSelection()) {
      this.setState({
        singleselectionQuestionsSubmitting: true
      });
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
        if (q.answerState == "valid" || this.questionsAlreadySubmitted(q)) {
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
          /*preQ = q;
          questionsList.push( <Label
                  {...q}
                />)*/
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
              questionsFromGroup.questionStructCaption = q.caption;
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
    if (!isEmpty(this.questions) && !isEmpty(this.questions.data)) {
      if (this.questions.data.questionnaire.questions) {
        var preQ = null;
        var questionsList = [];
        questionsList.isQuestionsList = false;
        var actualQuestionLists = [];
        var boundaryReached = false;
        this.noFoGroupsCompleted = 0;
        for(var i=0; i<(this.questions.data.questionnaire.questions.length); i++) {
          var qe = this.questions.data.questionnaire.questions[i];
          if (qe.type == "group") {
            questionsList.groupHeader = [];
            questionsList.groupHeader.push(qe.caption);
          }
          this.noFoGroupsCompleted = i;
          var q = qe;
          q.key = q.id;
          if (q.answerState == "valid") {
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
            /*questionsList.push( <Label
                    {...q}
                  />)*/
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
            if (q.id == "Velocity.BeneficiaryInformation") {
              questionsList.isQuestionsBeneficiaries = true;
              actualQuestionLists.primaryBeneficiariesMainQuestion = qL[0];
              actualQuestionLists.contingencyBeneficiariesMainQuestion = qL[1];
              this.actualQuestionLists = actualQuestionLists;
              return questionsList;
            }
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
                questionsFromGroup.questionStructCaption = q.caption;
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

  onQuestionSubmit(notAddingOrDeletingBeneficiary, noOfBeneficiaryDeleted) {
    var answered_questions = [];
    var allQuestionsValid = true;
    if (!notAddingOrDeletingBeneficiary) {
      this.setState({
        alreadyOnceSubmitted: true
      })
    }

    each(this.actualQuestionLists, (q)=> {
      answered_questions.push(q.id)
      if (q.type == "text") {
        allQuestionsValid = allQuestionsValid && !!this.validateTextField(q);
      } else if (q.type == "singleselection") {
        allQuestionsValid = allQuestionsValid && !!this.validateSingleSelection(q);
      } else if (q.type == "date") {
        allQuestionsValid = allQuestionsValid && !!this.validateCustomDatePicker(q);
      }
    });


    if (this.questionComponents && this.questionComponents.isQuestionsList) {
      for(var i=0; i<this.questionComponents.siblingAnswers.length; i++) {
        var answers = this.questionComponents.siblingAnswers[i].elements;
        each(answers, (q)=> {
          answered_questions.push(q.id)
          if (q.type == "text") {
            allQuestionsValid = allQuestionsValid && !!this.validateTextField(q);
          } else if (q.type == "singleselection") {
            allQuestionsValid = allQuestionsValid && !!this.validateSingleSelection(q);
          } else if (q.type == "date") {
            allQuestionsValid = allQuestionsValid && !!this.validateCustomDatePicker(q);
          }
        });
       }
    }

    if (this.questionComponents.isQuestionsBeneficiaries && !notAddingOrDeletingBeneficiary) {
      if (this.actualQuestionLists.primaryBeneficiariesMainQuestion.questions) {
        for(var i=0; i<this.actualQuestionLists.primaryBeneficiariesMainQuestion.questions.length; i++) {
          var answers = this.actualQuestionLists.primaryBeneficiariesMainQuestion.questions[i].questions;
          each(answers, (q)=> {
            answered_questions.push(q.id)
            if (q.type == "text") {
              allQuestionsValid = allQuestionsValid && !!this.validateTextField(q);
            } else if (q.type == "singleselection") {
              allQuestionsValid = allQuestionsValid && !!this.validateSingleSelection(q);
            } else if (q.type == "date") {
              allQuestionsValid = allQuestionsValid && !!this.validateCustomDatePicker(q);
            }
          });
        }
      }

      if (this.actualQuestionLists.contingencyBeneficiariesMainQuestion.questions) {
        for(var i=0; i<this.actualQuestionLists.contingencyBeneficiariesMainQuestion.questions.length; i++) {
          var answers = this.actualQuestionLists.contingencyBeneficiariesMainQuestion.questions[i].questions;
          each(answers, (q)=> {
            answered_questions.push(q.id)
            if (q.type == "text") {
              allQuestionsValid = allQuestionsValid && !!this.validateTextField(q);
            } else if (q.type == "singleselection") {
              allQuestionsValid = allQuestionsValid && !!this.validateSingleSelection(q);
            } else if (q.type == "date") {
              allQuestionsValid = allQuestionsValid && !!this.validateCustomDatePicker(q);
            }
          });
        }
      }
    }

    if (allQuestionsValid) {
      this.setState({
        submittingQuestions: true
      });
      var data = {
        questions: this.questions,
        answered_questions: answered_questions
      };

      this.props.postQuestions(data).then(() => {
        this.setState({
          addingPrimaryBeneficiary: false,
          addingContingencyBeneficiary: false,
          singleselectionQuestionsSubmitting: false,
          deletingContingencyBeneficiary: false,
          deletingPrimaryBeneficiary: false
        });
        if (noOfBeneficiaryDeleted) {
          this.setState({
            ["deletingContingencyBeneficiary_" +  noOfBeneficiaryDeleted]: false,
            ["deletingPrimaryBeneficiary_" +  noOfBeneficiaryDeleted]: false
          });
        }
        if (this.questions.valid_user == 0) {
          browserHistory.push("/authorize");
          return;
        }
        if (this.questions.data.completed ==true || this.questions.data.completed =="true") {
          browserHistory.push("/all-questions");
          return;
        }
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

        this.setState({
          alreadyOnceSubmitted: false,
          submittingQuestions: false
        })

      }).catch(()=>{
        console.log(this.props.questions);
      });
    }
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
    if (this.props.questions && this.props.questions.extra_params && this.props.questions.extra_params.answered_questions) {
      answeredQuestions = this.props.questions.extra_params.answered_questions;
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
      if (this.questionComponents && this.questionComponents.isQuestionsList) {

      }
      return this.questionComponents;
    }
    if (this.props.location.query && (this.props.location.query.fromEditablePage==true || this.props.location.query.fromEditablePage=="true")) {
      var questionIdFromQuery = this.props.location.query.questionId;
      var currentPageIndex = this.getCurrentPageIndex(this.props.location.query.questionId);
      if (currentPageIndex>=0) {
        this.setState({
          previousQuestionIds: this.props.questions.extra_params.answered_questions[currentPageIndex]
        });
        return;
      }
    }
    if (this.questions) {
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

      if (this.questionComponents && this.questionComponents.isQuestionsBeneficiaries) {

        var aQuestions = [];
        var beneficiaryQuestions = [];
        var qComps;
        if (this.actualQuestionLists.primaryBeneficiariesMainQuestion.questions) {
          for(var i=0; i<this.actualQuestionLists.primaryBeneficiariesMainQuestion.questions.length; i++) {
            var answers = this.actualQuestionLists.primaryBeneficiariesMainQuestion.questions[i].questions;
            qComps = [];
            for (var j=0; j<answers.length; j++) {
              qComps.push(this.getQuestionComponent(answers[j]));
            }
            beneficiaryQuestions.push(qComps);
          }
        }
        this.questionComponents.primaryBeneficiaryQuestionsComps = beneficiaryQuestions;

        beneficiaryQuestions = [];
        if (this.actualQuestionLists.contingencyBeneficiariesMainQuestion.questions) {
          for(var i=0; i<this.actualQuestionLists.contingencyBeneficiariesMainQuestion.questions.length; i++) {
            var answers = this.actualQuestionLists.contingencyBeneficiariesMainQuestion.questions[i].questions;
            qComps = [];
            for (var j=0; j<answers.length; j++) {
              qComps.push(this.getQuestionComponent(answers[j]));
            }
            beneficiaryQuestions.push(qComps);
          }
        }
         this.questionComponents.contingencyBeneficiaryQuestionsComps = beneficiaryQuestions;
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

  handleBackSubmit(): any {
    console.log("sdfds");
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
  deletePrimaryBeneficiary(i) {
      if (this.questionComponents.primaryBeneficiaryQuestionsComps.length >0) {
        this.setState({
          ["deletingPrimaryBeneficiary_" + i] : true
        });
        this.questionComponents.primaryBeneficiaryQuestionsComps.pop();
        this.actualQuestionLists.primaryBeneficiariesMainQuestion &&
        this.actualQuestionLists.primaryBeneficiariesMainQuestion.answer &&
        this.actualQuestionLists.primaryBeneficiariesMainQuestion.answer.splice(i, 1);
        this.onQuestionSubmit(true, i);
      }
  }
  deleteContingencyBeneficiary(i) {
    if (this.questionComponents.contingencyBeneficiaryQuestionsComps.length >0) {
      this.setState({
        ["deletingContingencyBeneficiary_" + i]: true
      });
      this.questionComponents.contingencyBeneficiaryQuestionsComps.splice(i, 1);
      this.actualQuestionLists.contingencyBeneficiariesMainQuestion &&
      this.actualQuestionLists.contingencyBeneficiariesMainQuestion.answer &&
      this.actualQuestionLists.contingencyBeneficiariesMainQuestion.answer.splice(i, 1);
      this.onQuestionSubmit(true, i);
    }
  }
  addPrimaryBeneficiary(): any {
    var qs = this.actualQuestionLists.primaryBeneficiariesMainQuestion;
    var data = {};
    data.questionId = qs.links[0].params.questionId;
    data.assessment_factor_url = qs.links[0].href;
    data.q = "*";
    var self = this;
    this.setState({
      addingPrimaryBeneficiary: true,
      addingContingencyBeneficiary: false
    });
    self.props.getFactorsearch(data).then(response => {
      if (response && response.questions && response.questions.data) {
        self.beneficiariesIds = self.beneficiariesIds || {};
        self.beneficiariesIds[qs.id] = response.questions.data;
        if (qs.answerState == "valid" && qs.questions && qs.questions.length > 0) {
          var notFound = false, done=false, rq={};
          var i, foundIndex;
          for (i=0; (i<self.beneficiariesIds[qs.id].length && !done); i++) {
            foundIndex = i;
            notFound = false;
            for(var j=0; (j<qs.answer.length && !notFound); j++) {
              if (qs.answer[j].id == self.beneficiariesIds[qs.id][i].id) {
                notFound = true;
              }
            }
            done = !notFound;
          }
          qs.answer.push(self.beneficiariesIds[qs.id][foundIndex]);
        } else {
          this.onChangeInput(qs, [self.beneficiariesIds[qs.id][0]]);
        }
        this.onQuestionSubmit(true);
      }
    }, err => {
      self.setState({
        beneficiariesIdsLoaded: self.state.beneficiariesIdsLoaded ? self.state.beneficiariesIdsLoaded++ : 1
      });
    });
  }

  addContingencyBeneficiary(): any {
    var qs = this.actualQuestionLists.contingencyBeneficiariesMainQuestion;
    var data = {};
    data.questionId = qs.links[0].params.questionId;
    data.assessment_factor_url = qs.links[0].href;
    data.q = "*";
    var self = this;
    this.setState({
      addingPrimaryBeneficiary: false,
      addingContingencyBeneficiary: true
    });
    self.props.getFactorsearch(data).then(response => {
      if (response && response.questions && response.questions.data) {
        self.beneficiariesIds = self.beneficiariesIds || {};
        self.beneficiariesIds[qs.id] = response.questions.data;
        if (qs.answerState == "valid" && qs.questions && qs.questions.length > 0) {
          var notFound = false, done=false, rq={};
          var i, foundIndex;
          for (i=0; (i<self.beneficiariesIds[qs.id].length && !done); i++) {
            foundIndex = i;
            notFound = false;
            for(var j=0; (j<qs.answer.length && !notFound); j++) {
              if (qs.answer[j].id == self.beneficiariesIds[qs.id][i].id) {
                notFound = true;
              }
            }
            done = !notFound;
          }
          qs.answer.push(self.beneficiariesIds[qs.id][foundIndex]);
        } else {
          this.onChangeInput(qs, [self.beneficiariesIds[qs.id][0]]);
        }
        this.onQuestionSubmit(true);
      }
    }, err => {
      self.setState({
        beneficiariesIdsLoaded: self.state.beneficiariesIdsLoaded ? self.state.beneficiariesIdsLoaded++ : 1
      });
    });

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
        />
        <Row className="questions-container c-center">
          <Row>
            { //map(questionsList.groupHeader, (p)=>{
               //return p  + " >>";
              //})
            }
          </Row>
          {questionsList.isQuestionsBeneficiaries && <div className="primary-beneficiary-main-header">Primary beneficiaries</div>}
          {questionsList.isQuestionsBeneficiaries &&
            map(questionsList.primaryBeneficiaryQuestionsComps, (s, i)=>{
                return <div className="" key={i}>
                  <div  className="siblings-container generic-beneficiary-container">
                    {questionsList.isQuestionsBeneficiaries && <div className="question-action-btn-container">
                      <div className="single-add-primary-beneficiary-text">
                        Add Primary Beneficiary
                        {!this.state["deletingPrimaryBeneficiary_" + i] && <img style={{float: "right", marginBottom: "25px", width: "24px", height: "24px"}} src={"../images/delete_beneficiary.svg"} onClick={()=>{
                              this.deletePrimaryBeneficiary(i)
                        }}/>}
                        {this.state["deletingPrimaryBeneficiary_" + i] && <i className="fa fa-circle-o-notch fa-spin fa-fw fa-3x" style={{float: "right"}}></i> }
                      </div>
                    </div>}
                    {s}
                  </div>
                  <div>
                  </div>
              </div>
            })}
          {questionsList.isQuestionsBeneficiaries && <div className="question-action-btn-container questions-content-container Add-a-Primary-Benefi">
              Add a Primary Beneficiary
              <Button className={`c-button-default circular action`} style={{marginLeft: "20px"}} onClick={()=>{
                    this.addPrimaryBeneficiary()
                  }}>
                  ADD PRIMARY BENEFICIARY
                  {this.state.addingPrimaryBeneficiary && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
              </Button>
            </div>
          }
          {questionsList.isQuestionsBeneficiaries && <div className="primary-beneficiary-main-header">Contingent beneficiaries</div>}
          {questionsList.isQuestionsBeneficiaries &&
            map(questionsList.contingencyBeneficiaryQuestionsComps, (s, i)=>{
                return <div className="" key={i}>
                  <div  className="siblings-container generic-beneficiary-container">
                  {questionsList.isQuestionsBeneficiaries && <div className="question-action-btn-container">
                    <div className="single-add-primary-beneficiary-text">
                      Add Contingency Beneficiary
                      {!this.state["deletingContingencyBeneficiary_" + i] && <img style={{float: "right", marginBottom: "25px", width: "24px", height: "24px"}} src={"../images/delete_beneficiary.svg"} onClick={()=>{
                            this.deleteContingencyBeneficiary(i)
                      }}/>}
                      {this.state["deletingContingencyBeneficiary_" + i] && <i className="fa fa-circle-o-notch fa-spin fa-fw fa-3x" style={{float: "right"}}></i> }
                    </div>
                    </div>}
                    {s}
                  </div>
                  <div>
                  </div>
              </div>
            })}
          {questionsList.isQuestionsBeneficiaries && <div className="question-action-btn-container questions-content-container Add-a-Primary-Benefi">
              Add a Contingent Beneficiary
              <Button className={`c-button-default circular action`} style={{marginLeft: "20px"}} onClick={()=>{
                  this.addContingencyBeneficiary()
                }}>
                ADD CONTINGENT BENEFICIARY
                {this.state.addingContingencyBeneficiary && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
              </Button>
            </div>
          }
          {!questionsList.isQuestionsList && <div className="questions-content-container">
            {this.state.gettingQuestions && <i className="fa fa-spinner fa-spin fa-3x fa-fw main-loader"></i>}
            <Row className="questions-sub-group-header">
            {
              questionsList.questionStructCaption
            }
            </Row>
            {questionsList}
            {!questionsList.isQuestionsList && <div className="question-action-btn-container">
              <Button className={`c-button-default circular next-step-btn action`} onClick={()=>{
                    this.handleBackSubmit()
                  }}>
                  Previous
                  {this.state.goingBackQuestions && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
              </Button>
              {this.state.singleselectionQuestionsSubmitting && <i className="fa fa-circle-o-notch fa-spin fa-fw fa-3x" style={{position: "relative", top: "14px"}}></i>}
              {!this.isOnlyQuestionSingleSelection() && <Button className={`c-button-default circular  action`} style={{marginLeft: "30px!important"}}  onClick={()=>{
                    this.onQuestionSubmit()
                  }}
                >
                  Next
                  {this.state.submittingQuestions && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
              </Button>}
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
            <Button className={`c-button-default circular action`} onClick={()=>{
                  this.handleBackSubmit()
                }}>
                Previous Step
                {this.state.goingBackQuestions && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
            </Button>
            {<Button className={`c-button-default circular next-step-btn action`} style={{marginLeft: "30px!important"}}  onClick={()=>{
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