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
    var className = "form-control question-with-bottom-border fs16";
    /*if(this.props.className) {
      className = className + this.props.className;
    }*/
    return className;
  }
  componentWillMount() {
    if (!isEmpty(this.props.question) && !isEmpty(String(this.props.question.answer)) && String(this.props.question.answer).length > 0) {
      var answer = this.props.question.type=="number" ? String(this.props.question.answer).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : this.props.question.answer;
      this.setState({
        value: answer
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.question) && !isEmpty(String(nextProps.question.answer)) && String(nextProps.question.answer).length > 0) {
      var answer = nextProps.question.type=="number" ? String(nextProps.question.answer).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : nextProps.question.answer
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
        if (this.props.question.answer && String(this.props.question.answer).length > 0) {
          if (constraints.pattern) {
            if (this.props.question.answer) {
              return new RegExp(this.props.question.constraints.pattern).test(this.props.question.answer)
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
  onChange(val) {
    if (this.props.question.type == "number") {
      val = val.replace(/[^0-9]/g,'');
      //val = val.replace(/[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\/]/gi, '');
      //val = val.replace(/[^\w\s]/gi, '');
      this.props.onChange(this.props.question, val);
      this.setState({
        value: val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      });
    } else {
      this.props.onChange(this.props.question, val);
      this.setState({
        value: val
      });
    }

  }
  public render() {
    var wrapperClass : string = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
     wrapperClass += " " + 'has-error';
    }
    var question = this.props.question;

    return (
     <div className={wrapperClass}>
        <label className="fs18" htmlFor={question.name}>{question.caption}</label>
        <div className="field">
          <input type={"text"}
            name={question.name}
            className={this.getClassName()}
            placeholder={""}
            ref={question.name}
            value={this.state.value}
            onChange={(e)=>{
              this.onChange(e.target.value);
            }} />
            {question.defaultUnit && question.defaultUnit.label &&
              <span className="custom-input-unit-label"> {question.defaultUnit.label} </span>
            }
            {question.hint && <div className="help-text" style={{marginTop: "12px"}}>
              {question.hint}
              </div>
            }
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
