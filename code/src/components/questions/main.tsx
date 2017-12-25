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


interface Props {
  submitQuoteForm: ()=>void,
  submitProductsForm: ()=>void,
  getQuestions: any,
  postQuestions: any,
  questions: any
}

class Main extends React.Component<Props, {}> {
  constructor(){
    super();
  }
  state = {};
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

  reRecursiveGetQuestions1(data, questionsList, preQ, actualQuestionLists) {
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
        if (q.answerState == "valid") {
          if (q.hasReflexive) {
            if (q.questions){
              var reflexsiveQuestionList = this.reRecursiveGetQuestions1(q.questions, questionsList, preQ, actualQuestionLists);
              if(reflexsiveQuestionList.length > 0){
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
            questionsList.push( <CustomSelect 
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
              multi={true}
              key={q.id}
            />)
          actualQuestionLists.push(q);
        } else if (q.type == "label") {
          /*preQ = q;
          questionsList.push( <Label 
                  {...q}
                />)*/
        } else if (q.type == "group" || q.type == "assessment-factor-group" || q.type == "list") {
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
            var questionsFromGroup = this.reRecursiveGetQuestions1(q.questions, questionsList, preQ, actualQuestionLists)
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
    if (!isEmpty(this.questions) && !isEmpty(this.questions.data)) {
      if (this.questions.data.questionnaire.questions) {
        var preQ = null;
        var questionsList = [];
        var actualQuestionLists = [];
        var boundaryReached = false;
        for(var i=0; i<(this.questions.data.questionnaire.questions.length); i++) {
          var qe = this.questions.data.questionnaire.questions[i];
          if (qe.type == "group") {
            questionsList.groupHeader = questionsList.groupHeader || [];
            questionsList.groupHeader.push(qe.caption);
          }
          var q = qe;
          q.key = q.id;
          if (q.answerState == "valid") {
            if (q.hasReflexive) {
              if (q.questions){
                var reflexsiveQuestionList = this.reRecursiveGetQuestions1(q.questions, questionsList, preQ, actualQuestionLists);
                if(reflexsiveQuestionList.length > 0){
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
          } else if (q.type == "group" || q.type == "assessment-factor-group" || q.type == "list") {
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
              var questionsFromGroup = this.reRecursiveGetQuestions1(q.questions, questionsList, preQ, actualQuestionLists)
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
    var allQuestionsValid = true;
    this.setState({
      alreadyOnceSubmitted: true
    })

    each(this.actualQuestionLists, (q)=> {
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
      this.props.postQuestions(this.questions).then(() => {
        this.setState({
          alreadyOnceSubmitted: false,
          submittingQuestions: false
        })
        //this.questions = JSON.parse(JSON.stringify(this.props.questions));
      }).catch(()=>{
        console.log(this.props.questions);
      });
    }
  }

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
          {map(questionsList.groupHeader, (p)=>{
            return p || "";        
          })}
          </Row>
          <div className="questions-content-container">
            {questionsList}
          </div>
          <Col style={{marginBottom: "21px!important", marginLeft: "21px!important"}} className="c-center">
            <Button style={{width: "91.5%", marginLeft: "4.5%"}} className={`c-button-default circular`}  onClick={()=>{
                  this.onQuestionSubmit()
                }}
              >
                CONTINUE
                {this.state.submittingQuestions && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
              </Button>
          </Col>
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