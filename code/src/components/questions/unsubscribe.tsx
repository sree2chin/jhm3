import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getUnSubscribeOptions, postUnSubscribeOptions } from '../../actions/Questions';
import { browserHistory } from 'react-router';
import { isEmpty } from "underscore";
import {Button, Row, Col} from "react-bootstrap";
import CustomSelect from "./CustomSelect";

interface Props extends React.Props<paymentSuccess> {
    location: any
}

class paymentSuccess extends React.Component<Props, {}> {
  constructor(){
    super();
  }
  state = {
    selectedOptions: []
  };

  componentWillMount() {
    this.setState({
      loading: true
    });
    this.props.getUnSubscribeOptions().then(()=>{
      this.setState({
        loading: false
      });
    });

  }
  onChangeInput(q, answer) {
      this.setState({
        selectedOptions: answer
      });
  }
  isSubmitBtnDisabled() {
    return this.state.selectedOptions.length === 0 || this.state.submittingUnsubscribeOptions;
  }

  onQuestionSubmit() {
    this.setState({
      submittingUnsubscribeOptions: true
    });
    var arr = [];
    for(var i=0; i<this.state.selectedOptions.length; i++) {
      arr.push(this.state.selectedOptions[i].id);
    }
    this.props.postUnSubscribeOptions(arr).then(()=>{
      this.setState({
        submittingUnsubscribeOptions: false,
        allDone: true
      });
    });
  }

  public render() {
       return (
         <div className="payment_styles_div">
          <Row className="questions-container c-center">
            {this.state.loading && <div className="questions-content-container final-loading-messages">
                <div>Loading .... </div>
                <i className="fa fa-spinner fa-spin fa-3x fa-fw main-loader"></i>
            </div>}
            {!this.state.loading && <Row className="questions-content-container final-loading-messages">
                {!this.state.allDone &&
                  <Col lg={12} md={12} sm={12} xs={12} className="text-center payment_styles pt10 pb20" style={{textAlign: "left"}}>
                    <CustomSelect
                      question={this.props.unsubscribeOptions}
                      onChange={this.onChangeInput.bind(this)}
                      multi={true}
                    />
                    <Button disabled={this.isSubmitBtnDisabled()} className={`c-button-default circular action`} style={{marginLeft: "30px!important"}}  onClick={()=>{
                        this.onQuestionSubmit()
                      }}
                      >
                      Submit
                      {this.state.submittingUnsubscribeOptions && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
                    </Button>
                  </Col>
                }
                {this.state.allDone && <Col lg={12} md={12} sm={12} xs={12} className="text-center payment_styles pt10 pb20" >
                    {this.props.thanksMessage}
                  </Col>
                }
            </Row>}
          </Row>
        </div>
       );
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    unsubscribeOptions:  state.questions.unsubscribeOptions,
    thanksMessage: state.questions.thanksMessage,
  };
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
    getUnSubscribeOptions: (data) => {
      return dispatch(getUnSubscribeOptions(data))
    },
    postUnSubscribeOptions: (data) => {
      return dispatch(postUnSubscribeOptions(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(paymentSuccess);