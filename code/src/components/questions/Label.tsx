import * as React from 'react';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";

interface Props extends React.Props<SingleSelection> {
  data: any,
  onChange: any,
  error: any,
  caption: any
}

export default class SingleSelection extends React.Component<Props, {}> {
  constructor(props : Props){
    super(props);
  }

  onChange(val) {
    this.props.onChange(val);
  }

  public render() {
    var question = this.props.question || {};
    var wrapperClass : string = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
     wrapperClass += " " + 'has-error';
    }
    if (this.props.caption && this.props.caption.length> 0) {
      return (<div className="label-container" style={{marginTop: "30px", marginBottom: "30px"}}>
        {question.constraints && question.constraints.required && <span>*</span>}
          <label className="fs18"> {this.props.caption} </label >
        </div>
      );
    } else {
      return null;
    }
  }
}
