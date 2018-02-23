import * as React from 'react';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import {isEmpty} from "underscore";

interface Props extends React.Props<SingleSelection> {
  question: any,
  onChange: any,
  error: any,
  alreadyOnceSubmitted: any
}

export default class SingleSelection extends React.Component<Props, {}> {
  constructor(props : Props){
    super(props);
  }
  state={}
  onChange(val) {
    this.setState({
      selectedId: val.id,
      onceChanged: true
    });
    this.props.onChange(this.props.question, val);
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
        return this.props.question.answer && this.props.question.answer.id && this.props.question.answer.id.length > 0;
      }
      return true;
    } else {
      return true;
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.question) && !isEmpty(nextProps.question.answer)) {
      this.setState({
        selectedId: this.props.question.answer.id
      });
    }
  }
  componentWillMount() {
    if (!isEmpty(this.props.question) && !isEmpty(this.props.question.answer)) {
      this.setState({
        selectedId: this.props.question.answer.id
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
     <div className="row">
        <Col sm={12} className={"c-subheader-text fs18"}>
        {question.constraints && question.constraints.required && <span style={{color: "rgb(255, 73, 73)", marginRight: "9px"}}>*</span>}
          {question.caption}
        </Col>
          <Col sm={12} style={{paddingRight: "22px", marginBottom: "20px"}} className="person-gender-container">
            <Row>
              <Col className="single-select-btn-container">
                <Button className={`c-button-default circular single-select-btn ${this.state.selectedId == question.options[0].id ? "active" : ""}`} onClick={(){
                      this.onChange(question.options[0])
                    }}
                  >
                    {question.options[0].label}
                </Button>
              </Col>
              <Col style={{display: "inline"}}>
                <Button style={{marginBottom: "0px"}} className={`c-button-default circular single-select-btn ${this.state.selectedId == question.options[1].id ? "active" : ""}`} onClick={(){
                      this.onChange(question.options[1])
                    }}
                  >
                    {question.options[1].label}
                </Button>
              </Col>
              {question.hint && <div className="help-text" style={{marginTop: "12px"}}>
                {question.hint}
                </div>
              }
            </Row>

            <Col sm={12} className={`c-subheader-text error`} style={{paddingLeft: "0px", marginTop: "0px"}}>
              {!this.validate() &&
                <div className="input" style={{marginTop: "5px", color: "#ff4949"}}>
                  {question.constraints.patternViolationMessage || "Required"}
                </div>
              }
            </Col>
          </Col>
      </div>
    );
  }
}
