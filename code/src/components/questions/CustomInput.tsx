import * as React from 'react';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import {isEmpty} from "underscore";

interface Props extends React.Props<CustomInput> {
  question: any,
  onChange: any,
  error: any,
  alreadyOnceSubmitted: any,
  counter?: any
}

export default class CustomInput extends React.Component<Props, {}> {
  constructor(props : Props){
    super(props);
    this.validate.bind(this);
  }
  state = {};
  getClassName() {
    var className = "form-control ";
    /*if(this.props.className) {
      className = className + this.props.className;
    }*/
    return className;
  }
  componentWillMount() {
    if (!isEmpty(this.props.question) && !isEmpty(this.props.question.answer)) {
      var answer = this.props.question.type=="number" ? parseInt(this.props.question.answer) : this.props.question.answer;
      this.setState({
        value: answer
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.question) && !isEmpty(nextProps.question.answer)) {
      var answer = nextProps.question.type=="number" ? parseInt(nextProps.question.answer) : nextProps.question.answer
      this.setState({
        value: answer
      });
    }
  }
  validate() {
    if(!this.props.alreadyOnceSubmitted) {return true;}
    if (this.props.question.constraints) {
      var constraints = this.props.question.constraints;
      var isValid = true;

      if (constraints.required) {
        if (constraints.pattern) {
          if (this.props.question.answer) {
            return new RegExp(this.props.question.constraints.pattern).test(this.props.question.answer)
          } else {
            return false;
          }
        }
        return this.props.question.answer && String(this.props.question.answer).length > 0;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  onChange(val) {
    this.setState({
      value: val
    });
  }
  public render() {
    var wrapperClass : string = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
     wrapperClass += " " + 'has-error';
    }
    var question = this.props.question;

    return (
     <div className={wrapperClass}>
        <label htmlFor={question.name}>{question.caption}</label>
        <div className="field">
          <input type={question.type || "text"}
            name={question.name}
            className={this.getClassName()}
            placeholder={question.placeholder}
            ref={question.name}
            value={this.state.value}
            onChange={(e)=>{
              this.onChange(e.target.value);
              this.props.onChange(question, e.target.value);
            }} />
          {!this.validate() &&
            <div className="input" style={{marginTop: "5px", color: "#ff4949"}}>
              {question.constraints.patternViolationMessage || "Required"}
            </div>
          }
        </div>
      </div>
    );
  }
}
