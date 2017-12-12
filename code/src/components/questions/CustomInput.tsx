import * as React from 'react';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap"; 

interface Props extends React.Props<CustomInput> {
  question: any,
  onChange: any,
  error: any
}

export default class CustomInput extends React.Component<Props, {}> {
  constructor(props : Props){
    super(props);
  }
  getClassName() {
    var className = "form-control ";
    /*if(this.props.className) {
      className = className + this.props.className;
    }*/
    return className;
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
            value={question.value}
            onChange={(e)=>{
              this.props.onChange(question, e.target.value)
            }} />
          <div className="input">{question.error}</div>
        </div>
      </div>
    );
  }
}
