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
}

class Main extends React.Component<Props, {}> {
  constructor(){
    super();
  },

  componentWillMount() {
    this.props.getQuestions();
  },

  reRecursiveRender(data) {
    if (!isEmpty(data)) {
        return map(data, (qe)=> {
          var q = JSON.parse(JSON.stringify(qe));
          q.key = q.id;
          if (q.type == "singleselection") {
            if(q.options.length ==2) {           
              return <SingleSelection 
                    {...q}
                  />
            } else {
              return <CustomSelect {...q} />
            }

          } else  if (q.type == "label") {
            return <Label 
                    {...q}
                  />
          } else if (q.type == "group" || q.type =="assessment-factor-group") {
            return this.reRecursiveRender(q.questions);
          } else if (q.type == "number" || q.type=="text") {
            return <CustomInput 
                    {...q}
                  />
          } else if (q.type == "date") {
            return <QuestionsCustomDatePicker 
                    {...q}
                  />
          }
        });
    } else {
      return null;
    }
  },

  recursiveRender() {
    if (!isEmpty(this.props.questions)) {
      if (this.props.questions.data.questionnaire.questions) {
        return map(this.props.questions.data.questionnaire.questions, (qe)=> {
          var q = JSON.parse(JSON.stringify(qe));
          q.key = q.id;
          if (q.type == "singleselection") {
            if(q.options.length ==2) {           
              return <SingleSelection 
                    {...q}
                  />
            } else {
              return <CustomSelect {...q} />
            }
          } else  if (q.type == "label") {
            return <Label 
                    {...q}
                  />
          } else if (q.type == "group" || q.type == "assessment-factor-group") {
            return this.reRecursiveRender(q.questions)
          } else if (q.type == "number" || q.type=="text") {
            return <CustomInput 
                    {...q}
                  />
          } else if (q.type == "date") {
            return <QuestionsCustomDatePicker 
                    {...q}
                  />
          }
        });
      };  
    } else {
      return null;
    }
  },

  public render() {

    return (
      <div>
        <ScrollToTopOnMount />
        <Subheader />
        <Row className="questions-container c-center">
          {this.recursiveRender()}
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
    getQuestions: (data) => {
      return dispatch(getQuestions(data))
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);