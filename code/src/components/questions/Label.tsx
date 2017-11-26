import * as React from 'react';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";

interface Props extends React.Props<SingleSelection> {
  data: any
}

export default class SingleSelection extends React.Component<Props, {}> {
  constructor(props : Props){
    super(props);
  },

  onChange(val) {
    this.props.onChange(val);
  },

  public render() {
    var wrapperClass : string = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
     wrapperClass += " " + 'has-error';
    },

    return (
     <div className="label-container" style={{marginTop: "30px", marginBottom: "30px"}}>
        <label> {this.props.caption} </label >
      </div>
    );
  }
}
