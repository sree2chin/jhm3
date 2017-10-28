import * as React from 'react';
import Input from './../common/textInput';
import {Button, Row, Col} from "react-bootstrap";
import Tooltip from 'rc-tooltip';
import {map, isEmpty, uniq} from "underscore";

interface Props {
  product: any,
  submitProduct : (product:any) => any;
}

interface State {
}

export default class ProductContainer extends React.Component<Props, State> {
  constructor(props : Props, context){
    super(props);
    this.state = {
      productIds: []
    }
  },

  handleChange = value => {
    this.setState({
      value: value
    })
  };

  selectProduct = (product) => {
    var productIds = JSON.parse(JSON.stringify(this.state.productIds));
    productIds.push(product.ProductID);
    productIds = uniq(productIds);
    if(this.props.productValidations && this.props.productValidations.product_selection_count >= productIds.length) {
      this.setState({
        productIds: productIds,
        productSelectionErrorMsg: ""
        productSelectionError: false
      });
      this.props.selectProduct(this.props.personIndex, product);
    } else {
      this.setState({
        productSelectionErrorMsg: this.props.productValidations.product_selection_error_message,
        productSelectionError: true
      });
    }

  };

  public render() {
    const {productInfo} = this.props;
    const products = productInfo && productInfo.products_data && productInfo.products_data.products_list;
    const personsContainerWidth = this.props.noOfPersons == 2 ? 6 : 12;
    const productContainerWidth = this.props.noOfPersons == 2 ? 12 : 6;

    if(!isEmpty(products)) {

      return (
          <Col sm={personsContainerWidth} className={this.props.personIndex==0 ? "first-product-container": "second-product-container"}>
            {this.state.productSelectionError && <Row>
              <Col sm={8} className="c-center product-selection-error-msg">
                {this.state.productSelectionErrorMsg}
              </Col>
            </Row>}
            <Row className="c-center">
              {map(products, (product) =>
                
                  <Col key={product.ProductID} sm={productContainerWidth} className="single-product-container">
                    <Row className="single-product-content">
                      <Row className="header">
                        <Col style={{textAlign: "center"}} sm={12}>
                          {product.ProductDisplayName}
                        </Col>  
                      </Row>
                      <Row>
                        <Col sm={12} className="product-main-content">
                          <Row className="text-center">
                            <div className="c-product-text">{product.ProductDisplayDescription.split(".")[0]}</div>
                            <ul className="c-product-desc-line">
                              {map(product.ProductDisplayDescription.split("."), (descLine, index)=>{
                                if(index!=0 && descLine && descLine.trim().length >0) {
                                  return <li key={"desc-" + index}>{descLine.trim()}</li>
                                } else {
                                  return null
                                }
                              })}
                            </ul>
                          </Row>
                        </Col>
                      </Row>
                    </Row>
                    <Row className={`text-center quote-product ${this.state.productIds.indexOf(product.ProductID)>=0 ? "active" : ""}`} onClick={()=> this.selectProduct(product)}>
                      <div className="c-coverage-amount">QUOTE THIS PRODUCT</div>
                    </Row>
                  </Col>
                
              )}
            </Row>
          </Col>
     );
    } else {
      return null;
    }

  }
}
