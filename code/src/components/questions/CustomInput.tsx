import * as React from 'react';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap"; 

interface Props extends React.Props<CustomInput> {
  name : string;
  label : string;
  onChange : any;
  placeholder? : string;
  value: string;
  error : string;
}

export default class CustomInput extends React.Component<Props, {}> {
  constructor(props : Props){
    super(props);
  }

  getClassName() {
    var className = "form-control ";
    if(this.props.className) {
      className = className + this.props.className;
    }
    return className;
  }

  public render() {
    var wrapperClass : string = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
     wrapperClass += " " + 'has-error';
    }
    return (
     <div className={wrapperClass}>
        <label htmlFor={this.props.name}>{this.props.caption}</label>
        <div className="field">
          <input type={this.props.type || "text"}
            name={this.props.name}
            className={this.getClassName()}
            placeholder={this.props.placeholder}
            ref={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange} />
          <div className="input">{this.props.error}</div>
        </div>
      </div>
    );
  }
}
