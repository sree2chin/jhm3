import * as React from 'react';
import {Button, Row, Col} from "react-bootstrap";
import Input from "../common/textInput"
import Tooltip from 'rc-tooltip';
import {map} from "underscore";

interface Props {
  plans: Array<any>,
  onSubmit : (event:any) => any;
}

interface State {
}

export default class Confirmation extends React.Component<Props, State> {
  constructor(props : Props, context){
    super(props);
    this.state = {
      email: ""
    }
  }

  handleChangeStart = () => {
    console.log('Change event started')
  };

  handleChange = e => {
    this.setState({
      email: e.target.value
    })
  };

  handleChangeComplete = () => {
    console.log('Change event completed')
  };

  public render() {
    return (
      <div>
        <Row>
          <Col md={5} className="l-main-content">
            <Row>
              <Col sm={12} className="confirmation-header">
                Fill out form later
              </Col>
              <Col sm={12} className="confirmation-msg">
                Please add your email address so we can mail you a link to complete the application on your time.
              </Col>
            </Row>
            <Row>
              <Col sm={12} className="confirmation-email">
                Email address
              </Col>
              <Col sm={12} className={"confirmation-email-input"}>
                <Input
                  name={"email"}
                  placeholder={"Enter your email"}
                  value={this.state.email}
                  onChange={this.handleChange.bind(this)}
                  />
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Button style={{marginBottom: "75px"}} className="c-button-default big active" onClick={this.props.onSubmit}>CONTINUE</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
     );
  }
}
