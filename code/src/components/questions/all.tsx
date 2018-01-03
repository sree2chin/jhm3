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
    this.props.getQuestions();
  }
  componentWillReceiveProps(nextProps) {
    if(!isEmpty(nextProps.questions)) {
      this.questions = JSON.parse(JSON.stringify(nextProps.questions));
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

        if (q.hasReflexive) {
            if (q.questions) {
                this.reRecursiveGetQuestions1(q.questions, questionsList, actualQuestionLists);
            }
        }

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
          this.actualQuestionLists = actualQuestionLists;

        } else if (q.type == "group" || q.type == "assessment-factor-group") {
          this.reRecursiveGetQuestions1(qL, questionsList, actualQuestionLists)
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
      };
    }
  }

  recursiveGetQuestions1() {
    if (!isEmpty(this.questions) && !isEmpty(this.questions.data)) {
      if (this.questions.data.questionnaire.questions) {

        var questionsList = [];
        var actualQuestionLists = [];

        for(var i=0; i<(this.questions.data.questionnaire.questions.length); i++) {
            var qe = this.questions.data.questionnaire.questions[i];
            questionsList.push([]);
            actualQuestionLists.push([]);

            questionsList[i].groupHeader = qe.caption;

            var q = qe;

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

  onQuestionSubmit() {
    var answered_questions = [];
    var allQuestionsValid = true;
    this.setState({
      alreadyOnceSubmitted: true
    })

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

    if (allQuestionsValid) {
      this.setState({
        submittingQuestions: true
      });
      var data = {
        questions: this.questions,
        answered_questions: answered_questions
      };

      this.props.postQuestions(data).then(() => {
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
            console.log("sdfds");
            console.log("sdfds");
            console.log("sdfds");
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
          console.log("sdfds-1");
          console.log("sdfds-1");
          console.log("sdfds-1");
          console.log("sdfds-1");
          this.setState({
            previousQuestionsHandling: false,
            previousQuestionIds: this.props.questions.extra_params.answered_questions[this.state.previousQuestionHanldingIndex]
          });
        });
      }
    }


  }

  public render() {
    var breadCrumbs = this.getBreadCrumbs();
    var questionsList = this.getCurrentSetOfQuestions() || [];
    return (
      <div>
        <ScrollToTopOnMount />
        <Subheader
          breadCrumbs={breadCrumbs}
        />
        <Row className="questions-container c-center">
          <Row>
            { map(questionsList.groupHeader, (p)=>{
               return p  + " >>";
              })
            }
          </Row>
            {
                map(questionsList, (q)=>{
                    return <div className="questions-content-container all-group-questions-container">
                        <div className="all-group-header">
                            {q.groupHeader}
                        </div>
                        {q}
                    </div>
                })
            }

          <div className="question-action-btn-container">
              <Button className={`c-button-default circular action`} onClick={()=>{
                    this.handleBackSubmit()
                  }}>
                  SUBMIT
                  {this.state.goingBackQuestions && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
              </Button>
              <Button className={`c-button-default circular next-step-btn action`} style={{marginLeft: "30px!important"}}  onClick={()=>{
                    this.onQuestionSubmit()
                  }}
                >
                  Next Step
                  {this.state.submittingQuestions && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
              </Button>
            </div>
        </Row>
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