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

interface Props {
  plans: Array<any>,
  onSubmit : (event:any) => any;
}

interface State {
}

export default class SelectPersons extends React.Component<Props, State> {
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
          <Col md={8} className="c-select-persons-container">
            <Row>
              <Col sm={12} className="confirmation-header">
                Fill out form later
              </Col>
              <Col sm={12} className="confirmation-msg">
                Please add your email address so we can mail you a link to complete the application on your time.
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
     );
  }
}
