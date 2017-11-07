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
  componentWillMount() {
    if(this.props.noOfPersons) {
      this.setState({
        noOfPersons: this.props.noOfPersons,
        selectNoOfPersonsError: false
      });
    }
  },

  selectNoOfPersons = (value) => {
    this.setState({
      noOfPersons: value,
      selectNoOfPersonsError: false
    });
    if(!(document.getElementById("select-no-of-persons-mobile-btn").offsetHeight > 0)) {
      this.props.selectNoOfPersons(value);
    }
  };

  selectNoOfPersonsForMobile = () => {
    if(this.state.noOfPersons) {
      this.props.selectNoOfPersons(this.state.noOfPersons);
      this.setState({
        noOfPersonsSelectedForMobileAndSubmitted: true
      });
    } else {
      this.setState({
        selectNoOfPersonsError: true
      });
    }
  };

  public render() {
    if(!this.state.noOfPersonsSelectedForMobileAndSubmitted) {
    return (
      <div style={{backgroundColor: "#fcfcfc"}}>
        <Row>
          <Col className="c-select-persons-container">
            <Row style={{marginLeft: "0px", marginRight: "0px"}}>
              <Col sm={5} className="confirmation-msg-container">
                <Row className="c-selected-person-header">
                  For How Many People are We Quoting?
                </Row>
                <Row style={{marginTop: "15px"}} className="quotation-msg-text-container">
                  <Col sm={12} className="confirmation-msg confirmation-msg-first-line">
                    OK! Let's get started!
                  </Col>
                  <Col sm={12} className="confirmation-msg confirmation-msg-second-line">
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

              { this.state.selectNoOfPersonsError && <Col style={{ paddingLeft: "0px", marginLeft: "30px", color: "red"}} sm={12} className={"c-subheader-text error"}  style={{paddingLeft: "0px"}}>
                Please select the number of person
              </Col> }

              <div className="visible-xs" id="select-no-of-persons-mobile-btn">
                <Col sm={4}>
                  <Button className="c-button-default" onClick={(){
                      this.selectNoOfPersonsForMobile()
                    }}
                  >
                    CONTINUE
                  </Button>
                </Col>
              </div>

            </Row>
          </Col>
        </Row>
      </div> 
     )   
    } else {
      return null;
    }

  }
}

const mapStateToProps = (state: any): Props => {
  return {
    noOfPersons: state.selectPersons.noOfPersons
  };
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
    selectNoOfPersons: (data) => {return dispatch(selectNoOfPersons(data))}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectPersons);
