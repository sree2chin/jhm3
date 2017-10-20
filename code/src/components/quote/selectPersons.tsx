import * as React from 'react';
import Input from './../common/textInput';
import {Button, Row, Col} from "react-bootstrap";
import Input from "../common/textInput"
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
const Handle = Slider.Handle;
import Slider from 'react-rangeslider';
import {map} from "underscore";
import {selectNoOfPersons} from '../../actions/selectPersons';
import { connect } from 'react-redux';

interface Props {
  plans: Array<any>,
  onSubmit : (event:any) => any;
}

interface State {
}

class SelectPersons extends React.Component<Props, State> {
  constructor(props : Props, context){
    super(props);
    this.state = {};
  };

  selectNoOfPersons = (value) => {
    this.setState({
      noOfPersons: value
    });
    this.props.selectNoOfPersons(value);
  };

  public render() {
    return (
      <div style={{backgroundColor: "rgb(247, 247, 247)"}}>
        <Row>
          <Col sm={8} className="c-select-persons-container">
            <Row>
              <Col sm={5} className="confirmation-msg-container">
                <Row className="c-selected-person-header">
                  For How Many People are We Quoting?
                </Row>
                <Row style={{marginTop: "15px"}}>
                  <Col sm={12} className="confirmation-msg">
                    OK! Let's get started!
                  </Col>
                  <Col sm={12} className="confirmation-msg">
                    First, tell us how many people need a quote today?
                  </Col>
                </Row>
              </Col>

              <Col sm={3} className={`c-select-one-person ${this.state.noOfPersons==1 ? "active" : ""}`} onClick={()=> this.selectNoOfPersons(1)} >
                 {(!this.state.noOfPersons || this.state.noOfPersons==2) && <img src="./images/one-people.svg" /> }
                 {this.state.noOfPersons==1 && <img src="./images/one-people-active.png" /> }
                <p> One person</p>
              </Col>

              <Col sm={3} className={`c-select-two-person ${this.state.noOfPersons==2 ? "active" : ""}`}  onClick={()=> this.selectNoOfPersons(2)} >
                {(!this.state.noOfPersons || this.state.noOfPersons==1) && <img src="./images/two-people.svg" /> }
                {this.state.noOfPersons==2 && <img src="./images/two-people-active.png" /> }
                <p> Two persons</p>
              </Col>

            </Row>
          </Col>
        </Row>
      </div>
     );
  }
}

const mapStateToProps = (state: any): Props => {
  return {

  };
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
    selectNoOfPersons: (data) => {return dispatch(selectNoOfPersons(data))}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectPersons);
