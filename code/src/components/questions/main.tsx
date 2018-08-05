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
import InstantIdCheckPopup from "./InstantIdCheckPopup";
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

  componentWillMount() {
    this.setState({
      gettingQuestions: true
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
    this.props.getQuestions().then(()=> {
      if (this.questions && this.questions.LOGIN_URL && this.questions.LOGIN_URL.length > 0) {
        window.location.href = this.questions.LOGIN_URL;
        return;
      }
      if (this.questions && this.questions.redirect_url && this.questions.redirect_url.length > 0) {
        window.location.href = this.questions.redirect_url;
        return;
      }
      if (this.questions && this.questions.instant_id_check && this.questions.instant_id_check.status==false) {
        this.setState({
          showInstantIdCheckPopup: true,
          instantIdCheckData: this.questions.instant_id_check
        });
      };

      if (this.questions && this.questions.status == false) {
        browserHistory.push("/error" + queryParamsString);
        return;
      }
      var self = this;
      new Promise((resolve, reject) => {
        if (self.questions && self.questions.valid_user == 0) {
          //browserHistory.push("/authorize" + queryParamsString);
          return;
        }
        resolve();
      }).then(()=>{
        if (this.questions && this.questions && this.questions.application_complete_status==true) {
          if (this.questions.application_confirm_status == 1) {
            browserHistory.push("/signature" + queryParamsString);
          } else {
            browserHistory.push("/all-questions" +queryParamsString);
          }
          return;
        }
        this.setState({
          gettingQuestions: false
        });
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if(!isEmpty(nextProps.questions)) {
      this.questions = JSON.parse(JSON.stringify(nextProps.questions));
      setTimeout(() => {
        if (this.questionComponents && this.questionComponents.isQuestionsBeneficiaries) {
          //window.scrollTo(0, 100);
          this.scrollIntoInvalidQuestionView();
          return;
        }
      }, 200);
    }
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

    if (this.questions && this.questions.status == false) {
      browserHistory.push("/error" + queryParamsString);
      return;
    }

    if (this.questions && this.questions && this.questions.application_complete_status==true) {
      if (this.questions.application_confirm_status == 1) {
        browserHistory.push("/signature" + queryParamsString);
      } else {
        browserHistory.push("/all-questions" +queryParamsString);
      }
      return;
    }
    if (nextProps.questions) {
      if (nextProps.questions.valid_user == 0) {
        browserHistory.push("/authorize" + queryParamsString);
        return;
      }
    } else if (this.questions.valid_user == 0) {
      browserHistory.push("/authorize" + queryParamsString);
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

  componentDidMount() {

    if (this.questionComponents && this.questionComponents.isQuestionsBeneficiaries) {
      //window.scrollTo(0, 100);
      this.scrollIntoInvalidQuestionView();
      return;
    }
    this.scrollIntoBeneficiaryView();
    document.addEventListener("keydown", this.keyDownTextField.bind(this), false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyDownTextField.bind(this), false);
  }
  keyDownTextField(e){
    var keyCode = e.keyCode;
    if(keyCode==13) {
      this.onQuestionSubmit();
    } else {
    }
  }
  componentDidUpdate() {
    //ReactDOM.findDOMNode(this).scrollTop = 0;
    //window.scrollTo(0, 0);
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
                    submittingQuestions={this.state.submittingQuestions}
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
  };
  checkIfRemaingQuestionsAreLabels(qs: any, startIndex: number) {
    var onlyLabelsPresent = startIndex < qs.length;
    var i=0;
    for (i=startIndex; (i<qs.length && onlyLabelsPresent); i++) {
      onlyLabelsPresent = onlyLabelsPresent && qs[i].type == "label";
    }

    return onlyLabelsPresent;
  };
  insertRemainingQuestionLabels(qs: any, startIndex: number, actualQuestionLists: any, questionsList: any) {
    var i=0;
    for (i=startIndex; i<qs.length; i++) {
      var q = qs[i];
      actualQuestionLists.push(q);
      questionsList.push( <Label
              {...q}
            />);
    }
  }
  reRecursiveGetQuestions1(data, questionsList, preQ, actualQuestionLists, isPrefixGroup, isPrefixGroupCounter, wasPrefixInsideGroup) {
    questionsList.isQuestionsList = false;
    var currentIsPrefixGroup = false;
    if (!isEmpty(data)) {
      var boundaryReached = false;
      for(let i=0; i<(data.length); i++) {
        var qe = data[i];
        var q = qe;

        q.key = q.id;
        if ((q.answerState == "valid" || this.questionsAlreadySubmitted(q)) && q.answerState!="invalid" &&  q.answerState!="missing") {
          if (q.hasReflexive) {
            if (q.questions) {
              var reflexsiveQuestionList = this.reRecursiveGetQuestions1(q.questions, questionsList, preQ, actualQuestionLists, currentIsPrefixGroup, isPrefixGroupCounter + 1);
              if(reflexsiveQuestionList.length > 0){
                questionsList.groupHeader = questionsList.groupHeader || [];
                questionsList.groupHeader.push(q.caption);
                if (isPrefixGroup && isPrefixGroupCounter == 0) {
                  questionsList.prefixOfGroupForLabelGroup = "";
                }
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
            if (this.checkIfRemaingQuestionsAreLabels(data, i+1)) {
              this.insertRemainingQuestionLabels(data, i+1, questionsList, actualQuestionLists);
            }
            return questionsList;
          }
        }

        var isPrefixInsideGroup = false;

        if (q.type == "group") {
          if (actualQuestionLists.length > 0) {
            var allQuestionsAreLabels = true;
            for(let j=0; j<questionsList.length; j++) {
              if (questionsList[j].props.type != "label"){
                allQuestionsAreLabels = false;
              }
            }
            if(!allQuestionsAreLabels) {
              this.actualQuestionLists = actualQuestionLists;
              return questionsList;
            }
          }
          questionsList.groupHeader = questionsList.groupHeader || [];
          questionsList.groupHeader.push(q.caption);
        } else {
          if (isPrefixGroup && isPrefixGroupCounter == 0) {
          } else {
            if (wasPrefixInsideGroup || q.type == "assessment-factor-group" || q.type == "struct") {

            } else {
              questionsList.prefixOfGroupForLabelGroup = "";
            }
          }
        }

        if (q.type == "singleselection") {
          preQ = q;
          if (isPrefixGroup && isPrefixGroupCounter == 0) {
            //this.gotQuestionsFromPrefixFirstLevel = true;
          }
          if(q.options.length ==2) {
            questionsList.push(<SingleSelection
              question={q}
              error={""}
              onChange={this.onChangeInput.bind(this)}
              alreadyOnceSubmitted={this.state.alreadyOnceSubmitted}
              key={q.id}
              submittingQuestions={this.state.submittingQuestions}
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
          actualQuestionLists.push(q);
          questionsList.push(<Label
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

          for(var ii=0; ii<qL.length; ii++) {
            questionsList.push(this.getQuestionComponent(qL[ii]));
            actualQuestionLists.push(qL[ii]);
          }
          this.actualQuestionLists = actualQuestionLists;
          questionsList.isQuestionsList = true;
          return questionsList;

        } else if (q.type == "group" || q.type == "assessment-factor-group") {
          if (questionsList.length > 0) {
            var allQuestionsAreLabels = true;
            for(var ij=0; ij<questionsList.length; ij++) {
              if (questionsList[ij].props.type != "label"){
                allQuestionsAreLabels = false;
              }
            }
            if(!allQuestionsAreLabels) {
              this.actualQuestionLists = actualQuestionLists;
              return questionsList;
            }
          }
          if (q.tags && q.tags.SubgroupRendering) {
            currentIsPrefixGroup = true;
            isPrefixGroupCounter = -1;
            questionsList.prefixOfGroupForLabelGroup = q.caption;
          }
          var qL = q.questions;
          var questionsFromGroup = this.reRecursiveGetQuestions1(qL, questionsList, preQ, actualQuestionLists, currentIsPrefixGroup, isPrefixGroupCounter + 1, isPrefixInsideGroup)
          if(questionsFromGroup.length > 0) {
            var allQuestionsAreLabels = true;
            for(var ik=0; ik<questionsFromGroup.length; ik++) {
              if (questionsFromGroup[ik].props.type != "label"){
                allQuestionsAreLabels = false;
              }
            }
            if(!allQuestionsAreLabels) {
              return questionsFromGroup;
            } else {
              //questionsList = questionsFromGroup;
            }
            if (isPrefixGroup && isPrefixGroupCounter == 0) {
            } else {
              if (wasPrefixInsideGroup) {

              } else {
                questionsList.prefixOfGroupForLabelGroup = "";
              }
            }
          } else {
            if (q.tags && q.tags.SubgroupRendering && isPrefixGroupCounter == -1) {
              questionsList.prefixOfGroupForLabelGroup = "";
            }
          }
        } else if (q.type == "struct") {
          if (questionsList.length > 0) {
            var allQuestionsAreLabels = true;
            for(var il=0; il<questionsList.length; il++) {
              if (questionsList[il].props.type != "label"){
                allQuestionsAreLabels = false;
              }
            }
            if(!allQuestionsAreLabels) {
              this.actualQuestionLists = actualQuestionLists;
              return questionsList;
            }
          }
          var questionsFromGroup = this.reRecursiveGetQuestions1(q.elements, questionsList, preQ, actualQuestionLists, currentIsPrefixGroup, isPrefixGroupCounter + 1)
          if(questionsFromGroup.length > 0) {
            var allQuestionsAreLabels = true;
            for(var im=0; im<questionsFromGroup.length; im++) {
              if (questionsFromGroup[im].props.type != "label"){
                allQuestionsAreLabels = false;
              }
            }
            if(!allQuestionsAreLabels) {
              questionsFromGroup.questionStructCaption = q.caption;
              return questionsFromGroup;
            } else {
              //questionsList = questionsFromGroup;
            }
            if (isPrefixGroup && isPrefixGroupCounter == 0) {
            } else {
              if (wasPrefixInsideGroup) {

              } else {
                questionsList.prefixOfGroupForLabelGroup = "";
              }
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
  getReflexiveQuestionForAnsweredQuestions() {
    var previousIds = this.props.questions.extra_params.answered_questions[this.state.previousQuestionHanldingIndex];
    var reflexiveQuestion = null;
    for(var i=0; i<previousIds.length; i++) {
      var q = this.findQuestionById(this.questions.data.questionnaire.questions, previousIds[i]);
      if (q.hasReflexive) {
        reflexiveQuestion = q;
      }
    }
    return reflexiveQuestion;
  }
  recursiveGetQuestionsForSource(questionsSource: any) {
    if (!isEmpty(questionsSource) && !isEmpty(questionsSource.questions)) {
      if (questionsSource.questions) {
        var preQ = null;
        var questionsList = [];
        questionsList.isQuestionsList = false;
        var actualQuestionLists = [];
        var boundaryReached = false;

        for(var i=0; i<(questionsSource.questions.length); i++) {
          var qe = questionsSource.questions[i];
          if (qe.type == "group") {
            questionsList.groupHeader = [];
            questionsList.groupHeader.push(qe.caption);
          }
          var q = qe;
          q.key = q.id;
          if ((q.answerState == "valid" || this.questionsAlreadySubmitted(q)) && q.answerState!="invalid" &&  q.answerState!="missing") {
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

            for(var ia=0; ia<qL.length; ia++) {
              questionsList.push(this.getQuestionComponent(qL[ia]));
              actualQuestionLists.push(qL[ia]);
            }
            this.actualQuestionLists = actualQuestionLists;
            questionsList.isQuestionsList = true
            return questionsList;
          } else if (q.type == "group" || q.type == "assessment-factor-group") {
              if (questionsList.length > 0) {
                var allQuestionsAreLabels = true;
                for(var ib=0; ib<questionsList.length; ib++) {
                  if (questionsList[ib].props.type != "label"){
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
                for(var ic=0; ic<questionsFromGroup.length; ic++) {
                  if (questionsFromGroup[ic].props.type != "label"){
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
              for(var id=0; id<questionsList.length; id++) {
                if (questionsList[id].props.type != "label"){
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
              for(var ie=0; ie<questionsFromGroup.length; ie++) {
                if (questionsFromGroup[ie].props.type != "label"){
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

  recursiveGetQuestions1() {
    if (!isEmpty(this.questions) && !isEmpty(this.questions.data)) {
      if (this.questions.data.questionnaire && this.questions.data.questionnaire.questions) {
        var preQ = null;
        var questionsList = [];
        questionsList.isQuestionsList = false;
        var actualQuestionLists = [];
        var boundaryReached = false;
        this.noFoGroupsCompleted = 0;
        for(let i=0; i<(this.questions.data.questionnaire.questions.length); i++) {
          var qe = this.questions.data.questionnaire.questions[i];
          var isPrefixGroup = false;
          if (qe.type == "group") {
            questionsList.groupHeader = [];
            questionsList.groupHeader.push(qe.caption);
            if (qe.tags && qe.tags.SubgroupRendering) {
              questionsList.prefixOfGroupForLabelGroup = qe.caption;
              isPrefixGroup = true;
              /*if (actualQuestionLists.length > 0 && actualQuestionLists[actualQuestionLists.length-1].hasReflexive) {
                questionsList.prefixOfGroupForLabelGroup = "";
                isPrefixGroup = false;
              }*/
            } else {
              questionsList.prefixOfGroupForLabelGroup = "";
            }
          }
          this.noFoGroupsCompleted = i;
          var q = qe;
          q.key = q.id;
          if ((q.answerState == "valid" || this.questionsAlreadySubmitted(q)) && q.answerState!="invalid" &&  q.answerState!="missing") {
            if (q.hasReflexive) {
              if (q.questions){
                var reflexsiveQuestionList = this.reRecursiveGetQuestions1(q.questions, questionsList, preQ, actualQuestionLists, isPrefixGroup, 0);
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
                    submittingQuestions={this.state.submittingQuestions}
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
            actualQuestionLists.push(q);
            questionsList.push( <Label
                    {...q}
                  />)
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
              for(var iq=0; iq<questionsList.length; iq++) {
                if (questionsList[iq].props.type != "label"){
                  allQuestionsAreLabels = false;
                }
              }
              if(!allQuestionsAreLabels) {
                this.actualQuestionLists = actualQuestionLists;
                return questionsList;
              }
            }
            var qL = q.questions;
            if (q.caption.toLowerCase() == "beneficiaries" && !this.allBeneficiaryQuestionsAreValid(qL)) {
              questionsList.isQuestionsBeneficiaries = true;
              actualQuestionLists.primaryBeneficiariesMainQuestion = qL[0];
              actualQuestionLists.contingencyBeneficiariesMainQuestion = qL[1];
              this.actualQuestionLists = actualQuestionLists;
              return questionsList;
            }
            if (q.caption.toLowerCase() != "beneficiaries") {
              var questionsFromGroup = this.reRecursiveGetQuestions1(qL, questionsList, preQ, actualQuestionLists, isPrefixGroup, 0)
              if(questionsFromGroup.length > 0) {
                var allQuestionsAreLabels = true;
                for(var labelCounter=0; labelCounter<questionsFromGroup.length; labelCounter++) {
                  if (questionsFromGroup[labelCounter].props.type != "label"){
                    allQuestionsAreLabels = false;
                  }
                }
                if(!allQuestionsAreLabels) {
                  return questionsFromGroup;
                } else {
                  questionsList = questionsFromGroup;
                }
              }
            }
          } else if (q.type == "struct") {
            if (questionsList.length > 0) {
              var allQuestionsAreLabels = true;
              for(var iw=0; iw<questionsList.length; iw++) {
                if (questionsList[iw].props.type != "label"){
                  allQuestionsAreLabels = false;
                }
              }
              if(!allQuestionsAreLabels) {
                this.actualQuestionLists = actualQuestionLists;
                return questionsList;
              }
            }
            var questionsFromGroup = this.reRecursiveGetQuestions1(q.elements, questionsList, preQ, actualQuestionLists, isPrefixGroup, 0)
            if(questionsFromGroup.length > 0) {
              var allQuestionsAreLabels = true;
              for(var ie=0; ie<questionsFromGroup.length; ie++) {
                if (questionsFromGroup[ie].props.type != "label"){
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

  allBeneficiaryQuestionsAreValid (beneficiaryQuestions) {
    var allQuestionsValid = beneficiaryQuestions[0] && beneficiaryQuestions[0].questions && beneficiaryQuestions[0].questions.length > 0;
    if (!allQuestionsValid) { return false;}
    if (beneficiaryQuestions) {
      if (beneficiaryQuestions[1] &&
        beneficiaryQuestions[1].questions &&
        beneficiaryQuestions[1].questions.length > 0){
        var questions = beneficiaryQuestions[1].questions;
        for (var i=0; i<questions.length; i++) {
          var qs = questions[i].questions;
          for (var j=0; j<qs.length; j++) {
            if ((qs[j].answerState == "valid" || this.questionsAlreadySubmitted(qs[j])) && qs[j].answerState!="invalid" &&  qs[j].answerState!="missing") {

            } else {
              allQuestionsValid = false;
            }

          }

        }
      }
      if (beneficiaryQuestions[0] &&
        beneficiaryQuestions[0].questions &&
        beneficiaryQuestions[0].questions.length > 0) {
        var questions = beneficiaryQuestions[0].questions;
        for (var i=0; i<questions.length; i++) {
            var qs = questions[i].questions;
            for (var j=0; j<qs.length; j++) {
              if ((qs[j].answerState == "valid" || this.questionsAlreadySubmitted(qs[j])) && qs[j].answerState!="invalid" &&  qs[j].answerState!="missing") {

              } else {
                allQuestionsValid = false;
              }
            }
        }
      }
    }
    return allQuestionsValid;
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
            delete q.answer;
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

  validateMultiSelection(q) {
    if (q.constraints) {
      var constraints = q.constraints;
      if (constraints.required) {
        return q.answer && q.answer.length > 0;
      }
      return true;
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
      } else if (q.type == "number") {
        allQuestionsValid = allQuestionsValid && !!this.validateTextField(q);
      } else if (q.type == "singleselection") {
        allQuestionsValid = allQuestionsValid && !!this.validateSingleSelection(q);
      } else if (q.type == "multiselection") {
        allQuestionsValid = allQuestionsValid && !!this.validateMultiSelection(q);
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
          } else if (q.type == "number") {
            allQuestionsValid = allQuestionsValid && !!this.validateTextField(q);
          } else if (q.type == "singleselection") {
            allQuestionsValid = allQuestionsValid && !!this.validateSingleSelection(q);
          } else if (q.type == "multiselection") {
            allQuestionsValid = allQuestionsValid && !!this.validateMultiSelection(q);
          } else if (q.type == "date") {
            allQuestionsValid = allQuestionsValid && !!this.validateCustomDatePicker(q);
          }
        });
       }
    }

    if (this.questionComponents && this.questionComponents.isQuestionsBeneficiaries && !notAddingOrDeletingBeneficiary) {
      if (this.actualQuestionLists.primaryBeneficiariesMainQuestion.questions) {
        for(var i=0; i<this.actualQuestionLists.primaryBeneficiariesMainQuestion.questions.length; i++) {
          var answers = this.actualQuestionLists.primaryBeneficiariesMainQuestion.questions[i].questions;
          each(answers, (q)=> {
            answered_questions.push(q.id)
            if (q.type == "text") {
              allQuestionsValid = allQuestionsValid && !!this.validateTextField(q);
            } else if (q.type == "number") {
              allQuestionsValid = allQuestionsValid && !!this.validateTextField(q);
            } else if (q.type == "singleselection") {
              allQuestionsValid = allQuestionsValid && !!this.validateSingleSelection(q);
            } else if (q.type == "multiselection") {
              allQuestionsValid = allQuestionsValid && !!this.validateMultiSelection(q);
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
            } else if (q.type == "number") {
              allQuestionsValid = allQuestionsValid && !!this.validateTextField(q);
            } else if (q.type == "singleselection") {
              allQuestionsValid = allQuestionsValid && !!this.validateSingleSelection(q);
            } else if (q.type == "multiselection") {
              allQuestionsValid = allQuestionsValid && !!this.validateMultiSelection(q);
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
      if (this.previousQuestionsSource && this.previousQuestionsSource.questions && this.previousQuestionsSource.questions.length > 0) {
        data.current_index = this.previousQuestionHanldingIndexInstance;
      }
      this.setState({
        alreadyOnceSubmitted: false
      });

      this.props.postQuestions(data).then(() => {
        if (this.addingPrimaryBeneficiary == true || this.addingContingencyBeneficiary == true) {
          this.donotScrollBeneficaryError = true;
        }

        if (this.addingPrimaryBeneficiary == true) {
          this.addingPrimaryBeneficiaryFlag = true;
        }
        if (this.addingContingencyBeneficiary == true) {
          this.addingContingencyBeneficiaryFlag = true;
        }
        this.addingPrimaryBeneficiary = false;
        this.addingContingencyBeneficiary = false;
        this.setState({
          alreadyOnceSubmitted: false,
          submittingQuestions: false,
          addingPrimaryBeneficiary: false,
          addingContingencyBeneficiary: false,
          singleselectionQuestionsSubmitting: false,
          deletingContingencyBeneficiary: false,
          deletingPrimaryBeneficiary: false
        }, ()=> {

          this.scrollIntoBeneficiaryView();
          if (this.questions && this.questions.LOGIN_URL && this.questions.LOGIN_URL.length > 0) {
            window.location.href = this.questions.LOGIN_URL;
            return;
          }
          if (this.questions && this.questions.redirect_url && this.questions.redirect_url.length > 0) {
            window.location.href = this.questions.redirect_url;
            return;
          }
          if (this.questions && this.questions.instant_id_check && this.questions.instant_id_check.status==false) {
            this.setState({
              showInstantIdCheckPopup: true,
              instantIdCheckData: this.questions.instant_id_check
            });
          };

          this.setState({
            singleselectionQuestionsSubmitting: false,
          })
          if (noOfBeneficiaryDeleted || noOfBeneficiaryDeleted==0) {
            this.setState({
              ["deletingContingencyBeneficiary_" +  noOfBeneficiaryDeleted]: false,
              ["deletingPrimaryBeneficiary_" +  noOfBeneficiaryDeleted]: false
            });
          }
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

          if (this.questions && this.questions.status == false) {
            browserHistory.push("/error" + queryParamsString);
            return;
          }

          if (this.questions.valid_user == 0) {
            browserHistory.push("/authorize" + queryParamsString);
            return;
          }

          if (this.questions.application_complete_status == true || this.questions.application_complete_status == "true") {
            if (this.questions.application_confirm_status == 1) {
              browserHistory.push("/signature" + queryParamsString);
            } else {
              browserHistory.push("/all-questions" +queryParamsString);
            }

            return;
          }
          if (this.state.previousQuestionHanldingIndex || this.state.previousQuestionHanldingIndex == 0) {
            if (this.props.questions && this.props.questions.extra_params &&
              this.props.questions.extra_params.answered_questions &&
              this.props.questions.extra_params.answered_questions.length > 0) {
                if (this.props.questions.extra_params.answered_questions.length-1 == this.state.previousQuestionHanldingIndex) {
                  var reflexiveQuestion = this.getReflexiveQuestionForAnsweredQuestions()
                  var questionsForReflexiveQuestions = this.recursiveGetQuestionsForSource(reflexiveQuestion);
                  //if (questionsForReflexiveQuestions && questionsForReflexiveQuestions.length > 0) {
                  //  this.previousQuestionsSource = reflexiveQuestion;
                  //} else {
                    this.setState({
                      previousQuestionHanldingIndex: null,
                      previousQuestionIds: null
                    });
                  //}
                } else {
                  var incrementCounter = 1;
                  if (this.previousQuestionsSource && this.previousQuestionsSource.questions && this.previousQuestionsSource.questions.length > 0) {
                    this.previousQuestionsSource = null;
                    incrementCounter  = 1;
                  }
                  var reflexiveQuestion = this.getReflexiveQuestionForAnsweredQuestions()
                  var questionsForReflexiveQuestions = this.recursiveGetQuestionsForSource(reflexiveQuestion);
                  this.previousQuestionHanldingIndexInstance = this.state.previousQuestionHanldingIndex + incrementCounter;
                  if (questionsForReflexiveQuestions && questionsForReflexiveQuestions.length > 0) {
                    this.previousQuestionsSource = reflexiveQuestion;
                    this.setState({
                      previousQuestionHanldingIndex: this.state.previousQuestionHanldingIndex + incrementCounter,
                    }, ()=> {
                      this.setState({
                        previousQuestionIds: this.props.questions.extra_params.answered_questions[this.state.previousQuestionHanldingIndex]
                      });
                    });
                  } else {
                    this.setState({
                      previousQuestionHanldingIndex: this.state.previousQuestionHanldingIndex + incrementCounter,
                    }, ()=> {
                      this.setState({
                        previousQuestionIds: this.props.questions.extra_params.answered_questions[this.state.previousQuestionHanldingIndex]
                      });
                    });
                  }
                }
              }
          }
        });
      }).catch(()=>{
        console.log(this.props.questions);
      });
    }
  }

  findQuestionById(actualQuestions, questionId, isPrefixGroup, isPrefixGroupCounter) : any {
    if (!isEmpty(actualQuestions)) {
      var targetQuestion = {};
      var currentIsPrefixGroup = false;

      for(var i=0; i<(actualQuestions.length); i++) {
        currentIsPrefixGroup = false;
        var qe = actualQuestions[i];
        var q = qe;
        q.key = q.id;
        if (isPrefixGroup && isPrefixGroupCounter == 0) {

        } else {
          if (!this.gotQuestionsFromPrefixGroupWhileBack || this.previousQuestionIdForPrefixGroup!= questionId) {
            //this.previousQuestionsPrefixOfGroupForLabelGroup = "";
          }
        }
        if (q.id == questionId) {
          if (isPrefixGroup && isPrefixGroupCounter == 0) {
            this.gotQuestionsFromPrefixGroupWhileBack = true;
            this.previousQuestionIdForPrefixGroup = questionId;
          }
          if (qe.type != "group" && isPrefixGroupCounter == 1) {
            this.previousQuestionsPrefixOfGroupForLabelGroup = "";
          } else if (isPrefixGroupCounter > 1 && isPrefixGroupCounter < 10) {
            this.previousQuestionsPrefixOfGroupForLabelGroup = "";
          }
          return q;
        }

        if (qe.type == "group" || qe.type == "assessment-factor-group" || qe.hasReflexive) {
          if (q.tags && q.tags.SubgroupRendering) {
            currentIsPrefixGroup = true;
            isPrefixGroupCounter = -1;
            this.previousQuestionsPrefixOfGroupForLabelGroup = qe.caption;
          } else {
            //this.previousQuestionsPrefixOfGroupForLabelGroup = "";
          }
          targetQuestion = this.findQuestionById(q.questions, questionId, currentIsPrefixGroup, isPrefixGroupCounter+1)
          if (!isEmpty(targetQuestion)) {

          } else {
            if (q.tags && q.tags.SubgroupRendering && isPrefixGroupCounter == -1) {
              this.previousQuestionsPrefixOfGroupForLabelGroup = "";
            }
          }
        }

        if (qe.type == "list" && q.answer && q.answer[0].elements) {
          targetQuestion = this.findQuestionById(q.answer[0].elements, questionId, false, 10);
        }

        if (qe.type == "struct") {
          targetQuestion = this.findQuestionById(q.elements, questionId, false, 10);
          if (!isEmpty(targetQuestion)) {
            this.previousQuestionStructCaption = qe.caption;
          }
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
              submittingQuestions={this.state.submittingQuestions}
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
      qComponent = <Label
              {...q}
            />;
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
  previousQuestionsIdsContainsBeneficiaries(previousQuestionIds) {
    var primarybeneficiaryRegex = /primarybeneficiary/i;
    var contingentbeneficiaryRegex = /contingentbeneficiary/i;
    for(var i=0; i<previousQuestionIds.length; i++) {
      if (primarybeneficiaryRegex.test(previousQuestionIds[i]) || contingentbeneficiaryRegex.test(previousQuestionIds[i])) {
        return true;
      }
    }
  }
  getPreviousQuestionComponents() {
    var previousQuestionIds = this.state.previousQuestionIds;
    var qComps = [];
    var aQuestions = [];
    this.previousQuestionsPrefixOfGroupForLabelGroup = "";
    this.previousQuestionStructCaption = "";
    if (this.previousQuestionsIdsContainsBeneficiaries(previousQuestionIds)) {
      var preQ = null;
      var questionsList = [];
      questionsList.isQuestionsList = false;
      var actualQuestionLists = [];
      this.noFoGroupsCompleted = 0;
      for(var i=0; i<(this.questions.data.questionnaire.questions.length); i++) {
        var qe = this.questions.data.questionnaire.questions[i];
        var isPrefixGroup = false;
        if (qe.type == "group") {
          questionsList.groupHeader = [];
          questionsList.groupHeader.push(qe.caption);
        }
        this.noFoGroupsCompleted = i;
        var q = qe;
        q.key = q.id;

        if (q.type == "group" || q.type == "assessment-factor-group") {
          var qL = q.questions;
          if (q.caption.toLowerCase() == "beneficiaries") {
            questionsList.isQuestionsBeneficiaries = true;
            actualQuestionLists.primaryBeneficiariesMainQuestion = qL[0];
            actualQuestionLists.contingencyBeneficiariesMainQuestion = qL[1];
            this.actualQuestionLists = actualQuestionLists;
            return questionsList;
          }
        }
      };
    }
    if (!isEmpty(this.questions) && !isEmpty(this.questions.data)) {
      if (this.questions.data.questionnaire && this.questions.data.questionnaire.questions) {
        for(var i=0; i<previousQuestionIds.length; i++) {
          var question = this.findQuestionById(this.questions.data.questionnaire.questions, previousQuestionIds[i], false, 10);
          aQuestions.push(question);
          qComps.push(this.getQuestionComponent(question));
         }
      }
    }
    qComps.questionStructCaption = this.previousQuestionStructCaption;
    qComps.prefixOfGroupForLabelGroup = this.previousQuestionsPrefixOfGroupForLabelGroup;
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

  setBeneficiaryQuestionsProperly() {
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

  getCurrentSetOfQuestions() {
    if (this.state.previousQuestionIds && this.state.previousQuestionIds.length > 0) {
      if (this.previousQuestionsSource && this.previousQuestionsSource && this.previousQuestionsSource.questions.length > 0) {
        this.questionComponents = this.recursiveGetQuestionsForSource(this.previousQuestionsSource);
      } else {
        this.questionComponents = this.getPreviousQuestionComponents();
      }
      if (this.questionComponents && this.questionComponents.isQuestionsBeneficiaries) {
        this.setBeneficiaryQuestionsProperly();
      }
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
        this.setBeneficiaryQuestionsProperly();
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
  emptyCurrentQuestions () {
    each(this.actualQuestionLists, (q)=>{
      delete q.answer;
    });
  }

  handleBackSubmit(): any {
    console.log("sdfds");
    this.questionsListUsing;
    this.previousQuestionsSource = null;
    if (this.state.previousQuestionsHandling) return;
    if (this.state.previousQuestionHanldingIndex == undefined) {
      this.emptyCurrentQuestions();
    }

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
        /* this.setState({
          ["deletingPrimaryBeneficiary_" + i] : true
        }); */
        this.setState({
          ["deletingPrimaryBeneficiary_" + i] : this.state["deletingPrimaryBeneficiary_" + i]
        });
        this.questionComponents.primaryBeneficiaryQuestionsComps.pop();
        this.actualQuestionLists.primaryBeneficiariesMainQuestion &&
        this.actualQuestionLists.primaryBeneficiariesMainQuestion.answer &&
        this.actualQuestionLists.primaryBeneficiariesMainQuestion.answer.splice(i, 1);
        this.actualQuestionLists.primaryBeneficiariesMainQuestion.questions.splice(i, 1);
        //this.onQuestionSubmit(true, i);
      }
  }
  deleteContingencyBeneficiary(i) {
    if (this.questionComponents.contingencyBeneficiaryQuestionsComps.length >0) {
      /* this.setState({
        ["deletingContingencyBeneficiary_" + i]: true
      }); */
      this.setState({
        ["deletingContingencyBeneficiary_" + i] : this.state["deletingContingencyBeneficiary_" + i]
      });
      this.questionComponents.contingencyBeneficiaryQuestionsComps.splice(i, 1);
      this.actualQuestionLists.contingencyBeneficiariesMainQuestion &&
      this.actualQuestionLists.contingencyBeneficiariesMainQuestion.answer &&
      this.actualQuestionLists.contingencyBeneficiariesMainQuestion.answer.splice(i, 1);
      this.actualQuestionLists.contingencyBeneficiariesMainQuestion.questions.splice(i, 1);
      //this.onQuestionSubmit(true, i);
    }
  }

  isDeletingBeneficiaryGoingOn() {
    var r = false;

    if(this.questionComponents && this.questionComponents.primaryBeneficiaryQuestionsComps && this.questionComponents.primaryBeneficiaryQuestionsComps.length > 0) {
      var l = this.questionComponents.primaryBeneficiaryQuestionsComps.length;
      for(var i=0; i<l; i++){
        r = r || this.state["deletingPrimaryBeneficiary_" + i];
      }
    }

    if(this.questionComponents && this.questionComponents.contingencyBeneficiaryQuestionsComps && this.questionComponents.contingencyBeneficiaryQuestionsComps.length > 0) {
      var l = this.questionComponents.contingencyBeneficiaryQuestionsComps.length;
      for(var i=0; i<l; i++){
        r = r || this.state["deletingContingencyBeneficiary_" + i];
      }
    }

    return r;
  }

  isSubmitBtnDisabled() {
    return this.state.addingPrimaryBeneficiary || this.state.addingContingencyBeneficiary ||
            this.state.submittingQuestions || this.isDeletingBeneficiaryGoingOn();
  }

  addPrimaryBeneficiary(): any {
    var qs = this.actualQuestionLists.primaryBeneficiariesMainQuestion;
    var data = {};
    data.questionId = qs.links[0].params.questionId;
    data.assessment_factor_url = qs.links[0].href;
    data.q = "*";
    var self = this;
    this.addingPrimaryBeneficiary = true;
    this.setState({
      addingPrimaryBeneficiary: true,
      addingContingencyBeneficiary: false
    });
    self.props.getFactorsearch(data).then(response => {
      if (response && response.questions.LOGIN_URL && response.questions.LOGIN_URL.length > 0) {
        window.location.href = response.questions.LOGIN_URL;
        return;
      }
      if (response && response.questions.redirect_url && response.questions.redirect_url.length > 0) {
        window.location.href = response.questions.redirect_url;
        return;
      }
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

  closeInstantIdCheckPopup(): any {
    this.setState({
      showInstantIdCheckPopup: false
    });
  };

  addContingencyBeneficiary(): any {
    var qs = this.actualQuestionLists.contingencyBeneficiariesMainQuestion;
    var data = {};
    data.questionId = qs.links[0].params.questionId;
    data.assessment_factor_url = qs.links[0].href;
    data.q = "*";
    var self = this;
    this.addingContingencyBeneficiary = true;
    this.setState({
      addingPrimaryBeneficiary: false,
      addingContingencyBeneficiary: true
    });
    self.props.getFactorsearch(data).then(response => {
      if (response && response.questions.LOGIN_URL && response.questions.LOGIN_URL.length > 0) {
        window.location.href = response.questions.LOGIN_URL;
        return;
      }
      if (response && response.questions.redirect_url && response.questions.redirect_url.length > 0) {
        window.location.href = response.questions.redirect_url;
        return;
      }
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

  shouldShowPreviousBtn() {
    return !(this.actualQuestionLists && this.actualQuestionLists[0] &&
    this.props.questions && this.props.questions.extra_params && this.props.questions.extra_params.answered_questions &&
      this.props.questions.extra_params.answered_questions[0] && this.props.questions.extra_params.answered_questions[0][0] == this.actualQuestionLists[0].id);
  }

  scrollIntoBeneficiaryView() {
    var idName;
    if(this.addingPrimaryBeneficiaryFlag && this.actualQuestionLists && this.actualQuestionLists.primaryBeneficiariesMainQuestion && this.actualQuestionLists.primaryBeneficiariesMainQuestion.answer && this.actualQuestionLists.primaryBeneficiariesMainQuestion.answer.length) {
      this.addingPrimaryBeneficiaryFlag = false;
      idName = "primary-beneficiary-container-" + (this.actualQuestionLists.primaryBeneficiariesMainQuestion.answer.length-1);
    }
    if (this.addingContingencyBeneficiaryFlag && this.actualQuestionLists && this.actualQuestionLists.contingencyBeneficiariesMainQuestion && this.actualQuestionLists.contingencyBeneficiariesMainQuestion.answer && this.actualQuestionLists.contingencyBeneficiariesMainQuestion.answer.length) {
      this.addingContingencyBeneficiaryFlag = false;
      idName = "contingency-beneficiary-container-" + (this.actualQuestionLists.contingencyBeneficiariesMainQuestion.answer.length-1);
    }
    if (idName) {
      var elem = document.getElementById(idName);
      if (elem && elem.scrollIntoView) {
        elem.scrollIntoView();
      }
      return;
    }

    window.scrollTo(0, 0);
  }

  scrollIntoInvalidQuestionView() {
    if (this.actualQuestionLists && !this.donotScrollBeneficaryError) {
      this.donotScrollBeneficaryError = false;
      if (this.actualQuestionLists.contingencyBeneficiariesMainQuestion &&
        this.actualQuestionLists.contingencyBeneficiariesMainQuestion.questions &&
        this.actualQuestionLists.contingencyBeneficiariesMainQuestion.questions.length > 0){
        var questions = this.actualQuestionLists.contingencyBeneficiariesMainQuestion.questions;
        for (var i=0; i<questions.length; i++) {
          var qs = questions[i].questions;
          for (var j=0; j<qs.length; j++) {
            if (qs[j].answerState == "invalid") {
              var question = qs[j];
              var elem = document.getElementById(question.id.replace(/[^a-zA-Z0-9]/g, ""));
              elem.scrollIntoView();
              break;
            }
          }

        }
      }
      if (this.actualQuestionLists.primaryBeneficiariesMainQuestion &&
        this.actualQuestionLists.primaryBeneficiariesMainQuestion.questions &&
        this.actualQuestionLists.primaryBeneficiariesMainQuestion.questions.length > 0) {
        var questions = this.actualQuestionLists.primaryBeneficiariesMainQuestion.questions;
        for (var i=0; i<questions.length; i++) {
            var qs = questions[i].questions;
            for (var j=0; j<qs.length; j++) {
              if (qs[j].answerState == "invalid") {
                var question = qs[j];
                var elem = document.getElementById(question.id.replace(/[^a-zA-Z0-9]/g, ""));
                elem.scrollIntoView();
                break;
              }
            }
        }
      }

    } else if (this.donotScrollBeneficaryError) {
      this.donotScrollBeneficaryError = false;
    }
  }

  public render() {
    var breadCrumbs = this.getBreadCrumbs();
    var questionsList = this.getCurrentSetOfQuestions() || [];
    this.questionsListUsing = questionsList;
    var noFoGroupsCompleted = this.noFoGroupsCompleted;
    return (
      <div>
        <InstantIdCheckPopup
          showInstantIdCheckPopup={this.state.showInstantIdCheckPopup}
          onCloseModal={this.closeInstantIdCheckPopup.bind(this)}
          instantIdCheckData={this.state.instantIdCheckData}
        />
        <ScrollToTopOnMount />
        <Subheader
          breadCrumbs={breadCrumbs}
          noFoGroupsCompleted={[noFoGroupsCompleted]}
          location={this.props.location}
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
                return <div id={"primary-beneficiary-container-" + i} key={i}>
                  <div className="siblings-container generic-beneficiary-container">
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
              <Row>
                Add a Primary Beneficiary
              </Row>
              <Row>
                <Col sm="7" className="Add-a-Primary-Benefi-description-text">
                  You must add at least one primary beneficiary to your policy.
                </Col>
                <Col sm="5">
                <Button className={`c-button-default circular action`} disabled={this.isSubmitBtnDisabled()} style={{marginLeft: "20px"}} onClick={()=>{
                      this.addPrimaryBeneficiary()
                    }}>
                    ADD PRIMARY BENEFICIARY
                    {this.state.addingPrimaryBeneficiary && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                </Button>
              </Col>
              </Row>
            </div>
          }
          {questionsList.isQuestionsBeneficiaries && <div className="primary-beneficiary-main-header">Contingent beneficiaries</div>}
          {questionsList.isQuestionsBeneficiaries &&
            map(questionsList.contingencyBeneficiaryQuestionsComps, (s, i)=>{
                return <div id={"contingency-beneficiary-container-" + i} key={i}>
                  <div  className="siblings-container generic-beneficiary-container">
                  {questionsList.isQuestionsBeneficiaries && <div className="question-action-btn-container">
                    <div className="single-add-primary-beneficiary-text">
                      Add Contingency Beneficiary
                      {!this.state["deletingContingencyBeneficiary_" + i] && <img disabled={this.isSubmitBtnDisabled()} style={{float: "right", marginBottom: "25px", width: "24px", height: "24px"}} src={"../images/delete_beneficiary.svg"} onClick={()=>{
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
              <Row>
                Add a Contingent Beneficiary
              </Row>
              <Row>
                <Col sm="7" className="Add-a-Primary-Benefi-description-text">
                  Adding a contingent beneficiary is optional.
                </Col>
                <Col sm="5">
                <Button className={`c-button-default circular action`} disabled={this.isSubmitBtnDisabled()} style={{marginLeft: "20px"}} onClick={()=>{
                    this.addContingencyBeneficiary()
                  }}>
                  ADD CONTINGENT BENEFICIARY
                  {this.state.addingContingencyBeneficiary && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                </Button>
              </Col>
              </Row>
            </div>
          }
          {!questionsList.isQuestionsList && !questionsList.isQuestionsBeneficiaries && <div className="questions-content-container">
            {this.state.gettingQuestions && <i style={{marginTop: "25px"}} className="fa fa-spinner fa-spin fa-3x fa-fw main-loader"></i>}
            {questionsList.questionStructCaption && questionsList.questionStructCaption.length > 0 &&
              <Row className="questions-sub-group-header fs18">
                {questionsList.questionStructCaption}
              </Row>
            }
            {questionsList.prefixOfGroupForLabelGroup && <Row>
              <Col sm={12} className={"c-subheader-text fs18 questions-sub-group-header"} style={{marginBottom: "10px", marginLeft: "0px"}}>
                {questionsList.prefixOfGroupForLabelGroup}
              </Col>
            </Row>}

            {questionsList}
          </div>}
          {!questionsList.isQuestionsList && <div className="question-action-btn-container">
              {this.shouldShowPreviousBtn() && <div className={`previous-btn-text hidden-xs`} disabled={this.isSubmitBtnDisabled()} onClick={()=>{
                    this.handleBackSubmit()
                  }}>
                  <span>
                    Previous
                  </span>
                  {this.state.goingBackQuestions && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                </div>
              }
              {this.shouldShowPreviousBtn() && <Button disabled={this.isSubmitBtnDisabled()} className={`c-button-default circular  action visible-xs`} style={{marginLeft: "30px!important", marginBottom: "20px"}}  onClick={()=>{
                    this.handleBackSubmit()
                  }}
                >
                  Previous
                  {this.state.goingBackQuestions && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
              </Button>
              }
              {<Button disabled={this.isSubmitBtnDisabled()} className={`c-button-default circular  action`} style={{marginLeft: "30px!important"}}  onClick={()=>{
                    this.onQuestionSubmit()
                  }}
                >
                  Next
                  {this.state.submittingQuestions && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
              </Button>}
            </div>}
          {questionsList.isQuestionsList &&
            map(questionsList.siblingComponents, (s, i)=>{
                return <div className="" key={i}>
                  <div  className="siblings-container">
                    {s}
                    {questionsList.isQuestionsList && i==questionsList.siblingComponents.length-1 && <div className="question-action-btn-container">
                      <Button className={`c-button-default circular action`} disabled={this.isSubmitBtnDisabled()} onClick={()=>{
                            this.addSibling()
                          }}>
                          ADD SIBLING
                          {this.state.goingBackQuestions && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                      </Button>
                      <Button disabled={this.isSubmitBtnDisabled()} className={`c-button-default circular next-step-btn action`} style={{marginLeft: "30px!important"}}  onClick={()=>{
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
            {this.shouldShowPreviousBtn() && <div className={`previous-btn-text hidden-xs`} disabled={this.isSubmitBtnDisabled()} onClick={()=>{
                    this.handleBackSubmit()
                  }}>
                  <span>
                    Previous
                  </span>
                  {this.state.goingBackQuestions && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
              </div>
            }
            {this.shouldShowPreviousBtn() && <Button disabled={this.isSubmitBtnDisabled()} className={`c-button-default circular next-step-btn action visible-xs`} style={{marginLeft: "30px!important", marginBottom: "20px"}}  onClick={()=>{
                  this.handleBackSubmit()
                }}
              >
                Previous
                {this.state.goingBackQuestions && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
            </Button>}
            }
            {<Button disabled={this.isSubmitBtnDisabled()} className={`c-button-default circular next-step-btn action`} style={{marginLeft: "30px!important"}}  onClick={()=>{
                  this.onQuestionSubmit()
                }}
              >
                Next
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