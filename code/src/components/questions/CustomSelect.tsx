import * as React from 'react';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import Select from 'react-select';
interface Props extends React.Props<CustomSelect> {
  onChange: any,
  question: any,
  error: any,
  alreadyOnceSubmitted: any,
  multi?: any
}

export default class CustomSelect extends React.Component<Props, {}> {
  constructor(props : Props){
    super(props);
  }
  state = {}

  onChange(val) {
    this.setState({
      state: val
    });
    this.props.onChange(this.props.question, val);
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
    if (this.props.multi) {
      return this.props.question.answer && this.props.question.answer.length > 0;
    }
    if(!this.props.alreadyOnceSubmitted) {return true;}
    if (this.props.question.constraints) {
      var constraints = this.props.question.constraints;
      if (constraints.required) {
        return this.props.question.answer && this.props.question.answer.id;
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
    var statesObjects = this.getStateObjects();
    var question = this.props.question;

    return (
     <div>
        <Col sm={12} className={"c-subheader-text"} style={{marginTop: "5px", paddingLeft: "0px", marginBottom: "5px"}}>
          {question.caption}
        </Col>
          <Col sm={12} style={{paddingRight: "15px", marginBottom: "20px"}} className="person-gender-container c-custom-select">
            <Row>
              <Select
                name="form-field-name1"
                options={statesObjects}
                value={this.state.state}
                onChange={(stateObj)=>{
                  this.onChange(stateObj)
                }}
                className={""}
                multi={this.props.multi || false}
              />
            </Row>

            <Col sm={12} className={`c-subheader-text error`} style={{paddingLeft: "0px", marginTop: "0px", marginLeft: "-15px"}}>
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
