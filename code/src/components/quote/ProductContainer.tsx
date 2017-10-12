import * as React from 'react';
import Input from './../common/textInput';
import {Button, Row, Col} from "react-bootstrap";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
const Handle = Slider.Handle;
import Slider from 'react-rangeslider';
import {map} from "underscore";

interface Props {
  product: any,
  submitProduct : (product:any) => any;
}

interface State {
}

export default class Products extends React.Component<Props, State> {
  constructor(props : Props, context){
    super(props);
    this.state = {
    }
  },

  handleChange = value => {
    this.setState({
      value: value
    })
  };

  selectProduct = () => {
    this.props.selectProduct(this.props.product);
  };

  public render() {
    const {product} = this.props;
    if(product) {

      return (
      <div>
        <div className="header">
          <div style={{textAlign: "center"}}>
            {product.ProductDisplayName}
          </div>  
        </div>
        <Row>
          <Col sm={12} className="l-main-content c-coverage">
            <Row className="text-center">
              <div className="c-coverage-amount">{product.ProductDisplayDescription}</div>
            </Row>
            <Row className="text-center" onClick={()=> this.selectProduct()}>
              <div className="c-coverage-amount">QUOTE THIS PRODUCT</div>
            </Row>
          </Col>
        </Row>
      </div>
     );
    } else {
      return null;
    }

  }
}
