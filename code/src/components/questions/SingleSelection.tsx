import * as React from 'react';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";

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
      selectedId: val.id
    });
    this.props.onChange(this.props.question, {id: val.id});
  }

  validate() {
    if(!this.props.alreadyOnceSubmitted) {return true;}
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

  public render() {
    var wrapperClass : string = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
     wrapperClass += " " + 'has-error';
    }
    var question = this.props.question;

    return (
     <div className="row">
        <Col sm={12} className={"c-subheader-text"}>
          {question.caption}
        </Col>
          <Col sm={12} style={{paddingRight: "22px", marginBottom: "20px"}} className="person-gender-container">
            <Row>
              <Col xs={6}>
                <Button className={`c-button-default circular ${this.state.selectedId == question.options[0].id ? "active" : ""}`} onClick={(){
                      this.onChange(question.options[0])
                    }}
                  >
                    {question.options[0].label}
                </Button>
              </Col>
              <Col xs={6}>
                <Button style={{marginBottom: "0px"}} className={`c-button-default circular ${this.state.selectedId == question.options[1].id ? "active" : ""}`} onClick={(){
                      this.onChange(question.options[1])
                    }}
                  >
                    {question.options[1].label}
                </Button>
              </Col>
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
