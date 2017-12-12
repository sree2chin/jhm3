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
import QuestionsCustomDatePicker from "./QuestionsCustomDatePicker";
import Subheader from "../common/subheader";
import {each, isEmpty, map} from "underscore";
import {getQuestions} from '../../actions/Questions';
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
    if(!isEmpty(nextProps.questions) && isEmpty(this.state.questions)) {
      this.questions = JSON.parse(JSON.stringify(nextProps.questions));
      this.setState({
        questions: nextProps.questions
      });
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
            if(q.options.length ==2) {           
              return <SingleSelection 
                    question={q}
                    error={""}
                    onChange={this.onChangeInput.bind(this)}
                  />
            } else {
              return <CustomSelect 
                question={q}
                error={""}
                onChange={this.onChangeInput.bind(this)}
              />
            }

          } else  if (q.type == "label") {
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

  recursiveRender() {
    if (!isEmpty(this.props.questions)) {
      if (this.props.questions.data.questionnaire.questions) {
        return map(this.props.questions.data.questionnaire.questions, (qe)=> {
          var q = qe;
          q.key = q.id;
          if (q.type == "singleselection") {
            if(q.options.length ==2) {           
              return <SingleSelection 
                    question={q}
                    error={""}
                    onChange={this.onChangeInput.bind(this)}
                  />
            } else {
              return <CustomSelect
                question={q}
                error={""}
                onChange={this.onChangeInput.bind(this)}
              />
            }
          } else  if (q.type == "label") {
            return <Label 
                    {...q}
                  />
          } else if (q.type == "group" || q.type == "assessment-factor-group") {
            return this.reRecursiveRender(q.questions)
          } else if (q.type == "number" || q.type=="text") {
            return <CustomInput 
                    question={q}
                    error={""}
                    onChange={this.onChangeInput.bind(this)}
                  />
          } else if (q.type == "date") {
            return <QuestionsCustomDatePicker 
                    question={q}
                    error={""}
                    onChange={this.onChangeInput.bind(this)}
                  />
          }
        });
      };  
    } else {
      return null;
    }
  }

  reRecursiveGetQuestions(data) {
    if (!isEmpty(data)) {
        return map(data, (qe)=> {
          var q = qe;
          q.key = q.id;
          if (q.type == "singleselection") {
            if(q.options.length ==2) {           
              return <SingleSelection 
                    question={q}
                    error={""}
                    onChange={this.onChangeInput.bind(this)}
                  />
            } else {
              return <CustomSelect 
                question={q}
                error={""}
                onChange={this.onChangeInput.bind(this)}
              />
            }

          } else  if (q.type == "label") {
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


  recursiveGetQuestions() {
    if (!isEmpty(this.questions)) {
      if (this.questions.data.questionnaire.questions) {
        var preQ = {};
        return map(this.questions.data.questionnaire.questions, (qe)=> {
          var q = qe;
          q.key = q.id;
          if (q.hasReflexive && !preQ) {
            //this.setLastAnsweredQuestion(preQ);
            return null;
          }
          if (q.type == "singleselection") {
            if(q.options.length ==2) {           
              return <SingleSelection 
                    question={q}
                    error={""}
                    onChange={this.onChangeInput.bind(this)}
                  />
            } else {
              return <CustomSelect {...q} />
            }
          } else  if (q.type == "label") {
            return <Label 
                    {...q}
                  />
          } else if (q.type == "group" || q.type == "assessment-factor-group") {
            //this.setLastAnsweredQuestion(preQ);
            return null;
          } else if (q.type == "number" || q.type=="text") {
            return <CustomInput 
                    question={q}
                    error={""}
                    onChange={this.onChangeInput.bind(this)}
                  />
          } else if (q.type == "date") {
            return <QuestionsCustomDatePicker 
                    question={q}
                    error={""}
                    onChange={this.onChangeInput.bind(this)}
                  />
          }
          preQ = q;
        });
      };  
    } else {
      return null;
    }
  }

  reRecursiveGetQuestions1(data, questionsList, preQ) {
    if (!isEmpty(data)) {
      var boundaryReached = false;
      for(var i=0; i<(data.length); i++) {
        var qe = data[i];
        var q = qe;
        q.key = q.id;
        if (preQ && preQ.hasReflexive) {
          //this.setLastAnsweredQuestion(preQ);
          boundaryReached = true;
          break;
        }
        if (q.type == "singleselection") {
          preQ = q;
          if(q.options.length ==2) {           
            questionsList.push(<SingleSelection 
                  question={q}
                  error={""}
                  onChange={this.onChangeInput.bind(this)}
                />);
          } else {
            questionsList.push( <CustomSelect 
              question={q}
              error={""}
              onChange={this.onChangeInput.bind(this)}
              /> )
          }
        } else  if (q.type == "label") {
          preQ = q;
          questionsList.push( <Label 
                  {...q}
                />)
        } else if (q.type == "group" || q.type == "assessment-factor-group") {
          if (!preQ) {
            return this.reRecursiveGetQuestions1(q.questions, questionsList, preQ);
          } else {
            break;
          }
        } else if (q.type == "number" || q.type=="text") {
          preQ = q;
          questionsList.push(<CustomInput 
                  question={q}
                  error={""}
                  onChange={this.onChangeInput.bind(this)}
                />)
        } else if (q.type == "date") {
          preQ = q;
          questionsList.push(<QuestionsCustomDatePicker 
                  question={q}
                  error={""}
                  onChange={this.onChangeInput.bind(this)}
                />)
        }
      };
      return questionsList;
    } else {
      return null;
    }
  }

  recursiveGetQuestions1() {
    if (!isEmpty(this.questions)) {
      if (this.questions.data.questionnaire.questions) {
        var preQ = null;
        var questionsList = [];
        var boundaryReached = false;
        for(var i=0; i<(this.questions.data.questionnaire.questions.length); i++) {
          var qe = this.questions.data.questionnaire.questions[i];
          var q = qe;
          q.key = q.id;
          if (preQ && preQ.hasReflexive) {
            //this.setLastAnsweredQuestion(preQ);
            boundaryReached = true;
            break;
          }
          if (q.type == "singleselection") {
            if(q.options.length ==2) {           
              questionsList.push(<SingleSelection 
                    {...q}
                  />);
            } else {
              questionsList.push( <CustomSelect 
                  question={q}
                  error={""}
                  onChange={this.onChangeInput.bind(this)}
                /> )
            }
          } else  if (q.type == "label") {
            return questionsList.push( <Label 
                    {...q}
                  />)
          } else if (q.type == "group" || q.type == "assessment-factor-group") {
            //this.setLastAnsweredQuestion(preQ);
            if (!preQ) {
              return this.reRecursiveGetQuestions1(q.questions, questionsList, preQ)
            } else {
              break;
            }
          } else if (q.type == "number" || q.type=="text") {
            return questionsList.push(<CustomInput 
                    {...q}
                  />)
          } else if (q.type == "date") {
            return questionsList.push(<QuestionsCustomDatePicker 
                      question={q}
                      error={""}
                      onChange={this.onChangeInput.bind(this)}
                  />)
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
      console.log(this.recursiveGetQuestions1());
      return this.recursiveGetQuestions1();
    }
  }
  onQuestionSubmit() {

  }

  getCurrentSetOfQuestions() {
    if (this.questions) {
      return this.getQuestions(null);
    } else {
      return null;
    }
  }
  public render() {

    return (
      <div>
        <ScrollToTopOnMount />
        <Subheader />
        <Row className="questions-container c-center">
          {this.getCurrentSetOfQuestions()}
        </Row>
        <Row>
          <Col sm={4} className="c-center">
          <Button className={`c-button-default circular`}  onClick={(){
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
  };
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
    getQuestions: (data: any) => {
      return dispatch(getQuestions(data))
    },
    postQuestions: (data: any, moreInfo: any) => {
      return ;//dispatch(postQuestions(data, moreInfo))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);