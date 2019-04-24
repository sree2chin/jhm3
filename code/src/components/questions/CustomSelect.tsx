import * as React from 'react';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import Select from 'react-select';
import {isEmpty, map, contains} from "underscore";
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface Props extends React.Props<CustomSelect> {
  onChange: any,
  question: any,
  error: any,
  alreadyOnceSubmitted: any,
  multi?: any,
  counter?: any
}

class CustomSelect extends React.Component<Props, {}> {
  constructor(props : Props){
    super(props);
  }
  state = {}
  onDummyChange(val) {
    this.onChange(val);
  }
  onChange(val) {
    var ans, alreadyPresent = false;

    if (this.state.state) {
      ans = JSON.parse(JSON.stringify(this.state.state));
    } else {
      ans = [];
    }
    for(var i=0; i<ans.length; i++) {
      if (ans[i].id == val.id) {
        alreadyPresent = true;
        ans.splice(i, 1);
      }
    }
    if (!alreadyPresent) {
      ans.push(val);
    }

    this.setState({
      state: ans,
      onceChanged: true
    });
    this.props.onChange(this.props.question, ans);
  }
  containsInAnswer(val) {
    var ans, alreadyPresent = false;
    if (this.state.state) {
      for(var i=0; i<this.state.state.length; i++) {
        if (this.state.state[i].id == val.id) {
          alreadyPresent = true;
        }
      }
    }
    return alreadyPresent;
  }
  componentWillMount() {
    if(!isEmpty(this.props.question) && !isEmpty(this.props.question.answer)) {
      this.setState({
        state: this.props.question.answer
      });
    }
  }

  getStateObjects() {
    var options = JSON.parse(JSON.stringify(this.props.question.options));
    var finalOptions = [];
    for(var i=0; i<options.length; i++) {
      finalOptions.push(
        { id: options[i].id,
          value: options[i].id,
          label:  options[i].label
        }
      );
    }
    return finalOptions;
  }
  validate() {
    //if(!this.props.alreadyOnceSubmitted) {return true;}
    if (!this.state.onceChanged) {
      if (!this.props.alreadyOnceSubmitted) {
        return true;
      }
    }

    if (this.props.question.constraints) {
      var constraints = this.props.question.constraints;
      if (constraints.required) {
        if (this.props.multi) {
          return this.props.question.answer && this.props.question.answer.length > 0;
        }
        return this.props.question.answer && this.props.question.answer.id;
      }
      return true;
    } else {
      return true;
    }
  }
  getStateId(state) {
    for(var i=0; i<this.props.question.options.length; i++) {
      if ((state.toLowerCase().indexOf(this.props.question.options[i].id.toLowerCase()) > -1) || (this.props.question.options[i].id.toLowerCase().indexOf(state.toLowerCase()) > -1)) {
        return this.props.question.options[i];
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if(!isEmpty(nextProps.question) && !isEmpty(nextProps.question.answer)) {
      this.setState({
        state: nextProps.question.answer
      });
    }
    if (nextProps.googlePlacesQuestionsAnswersMap && 
      (!this.props.googlePlacesQuestionsAnswersMap || nextProps.googlePlacesQuestionsAnswersMap[this.props.question.id] != this.props.googlePlacesQuestionsAnswersMap[this.props.question.id])) {
      if (this.props.googlePlacesConfig && this.props.googlePlacesConfig.google_address_prefill) {
        for (var key in nextProps.googlePlacesQuestionsAnswersMap) {
          if (key == this.props.question.id) {
            var state = nextProps.googlePlacesQuestionsAnswersMap[key];
            let stateObj = this.getStateId(state);
            this.onChange1(stateObj);
          }
        }
      }
    }
  }
  onChange1(val) {
    this.setState({
      state: val,
      onceChanged: true
    });
    this.props.onChange(this.props.question, val);
  }
  getCustomSelectObj(statesObjects) {
    if (this.props.multi) {
      return map(statesObjects, (qL)=>{
        return (<div key={qL.id}>
            <label className="custom-checkbox-container" onClick={(e)=>{
                  this.onDummyChange(qL);
                  e.preventDefault();
                }}>
                {qL.label}
              <input type="checkbox" checked={this.containsInAnswer(qL)}/>
              <span className="custom-checkbox-checkmark"></span>
            </label>
          </div>)
        });
    }
    return (<Select
        name="form-field-name1"
        options={statesObjects}
        value={this.state.state}
        onChange={(stateObj)=>{
          this.onChange1(stateObj)
        }}
        className={""}
        multi={this.props.multi || false}
        placeholder={"Select..."}
        removeSelected={true}
        closeOnSelect={this.props.multi ? false:true}
      />)
  }
  public render() {
    var wrapperClass : string = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
     wrapperClass += " " + 'has-error';
    }
    var statesObjects = this.getStateObjects();
    var question = this.props.question;

    return (
     <div id={question.id.replace(/[^a-zA-Z0-9]/g, "")}>
        <Col className={"c-subheader-text fs18"} style={{marginTop: "5px", paddingLeft: "0px", marginBottom: "18px"}}>
        {question.constraints && question.constraints.required && <span style={{color: "rgb(255, 73, 73)", marginRight: "9px"}}>*</span>}
          {question.caption}
        </Col>
          <Col style={{paddingRight: "15px", marginBottom: "30px"}} className="person-gender-container c-custom-select">
            <Row style={{marginLeft: "0px"}}>
              {this.getCustomSelectObj(statesObjects)}
              {question.hint && <Col className="help-text" style={{marginTop: "12px"}}>
                {question.hint}
                </Col>
              }
            </Row>

            <Col sm={12} className={`c-subheader-text error`} style={{paddingLeft: "0px", marginTop: "0px"}}>
              {!this.validate() &&
                <div className="input" style={{marginTop: "5px", color: "#ff4949"}}>
                  {question.constraints.patternViolationMessage || "Required"}
                </div>
              }
              {question.answerState=="invalid" &&
                <div className="input" style={{marginTop: "5px", color: "#ff4949"}}>
                  {"Invalid"}
                </div>
              }
            </Col>
          </Col>
      </div>
    );
  }
}


const mapStateToProps = (state: any): Props => {
  return {
    googlePlacesQuestionsAnswersMap: state.questions.googlePlacesQuestionsAnswersMap
  }
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
    setGoogleQuestionsAnswersMap: (data: any) => {
      return dispatch(setGoogleQuestionsAnswersMap(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomSelect);
