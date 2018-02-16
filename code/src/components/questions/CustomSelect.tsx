import * as React from 'react';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import Select from 'react-select';
import {isEmpty} from "underscore";
interface Props extends React.Props<CustomSelect> {
  onChange: any,
  question: any,
  error: any,
  alreadyOnceSubmitted: any,
  multi?: any,
  counter?: any
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
    if(!this.props.alreadyOnceSubmitted) {return true;}
    if (this.props.multi) {
      return this.props.question.answer && this.props.question.answer.length > 0;
    }
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
  componentWillReceiveProps(nextProps) {
    if(!isEmpty(nextProps.question) && !isEmpty(nextProps.question.answer)) {
      this.setState({
        state: nextProps.question.answer
      });
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
        <Col className={"c-subheader-text fs18"} style={{marginTop: "5px", paddingLeft: "0px", marginBottom: "18px"}}>
          {question.caption}
        </Col>
          <Col style={{paddingRight: "15px", marginBottom: "30px"}} className="person-gender-container c-custom-select">
            <Row style={{marginLeft: "0px"}}>
              <Select
                name="form-field-name1"
                options={statesObjects}
                value={this.state.state}
                onChange={(stateObj)=>{
                  this.onChange(stateObj)
                }}
                className={""}
                multi={this.props.multi || false}
                placeholder={"Select..."}
              />
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
            </Col>
          </Col>
      </div>
    );
  }
}
