import * as React from 'react';
import Input from './../common/textInput';
import {Button, Row, Col} from "react-bootstrap";
import Tooltip from 'rc-tooltip';
import {map, isEmpty, uniq, intersection, without} from "underscore";

interface Props {
  product: any,
  submitProduct : (product:any) => any;
}

interface State {
}

export default class ProductContainer extends React.Component<Props, State> {
  constructor(props : Props, context){
    super(props);
    var productIds = [];
    if(this.props.person && !isEmpty(this.props.person.selected_products)) {
      productIds = this.props.person.selected_products;
      if(!isEmpty(this.props.productIds)) {
        productIds = intersection(this.props.productIds, this.props.person.selected_products);
      }
    }
    this.state = {
      productIds: productIds
    }
  },

  handleChange = value => {
    this.setState({
      value: value
    })
  };

  selectProduct = (product) => {
    var productIds = JSON.parse(JSON.stringify(this.state.productIds));
    if(productIds.indexOf(product.ProductID)>=0 ) {
      productIds = without(productIds, product.ProductID );
      this.props.deSelectProduct(this.props.personIndex, product);
      this.setState({
        productIds: productIds,
        productSelectionErrorMsg: ""
        productSelectionError: false
      });
    } else {
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
            <Row className="c-center mt50">
              {map(products, (product) =>{
                const product_name = product.ProductDisplayName.toString().toLowerCase();
                if(product_name == 'super ez complete' || product_name == 'super ez'){
                    const product_image = 'spwl_image';
                }else if(product_name == 'vantis velocity whole life'){
                    const product_image = 'whole_life_image';
                }else if(product_name == 'vantis velocity whole life plus'){
                    const product_image = 'whole_life_plus_image';
                }else if(product_name == 'vantis velocity term' || product_name == "children's term"){
                    const product_image = 'term_image';
                }else if(product_name == 'vantis velocity term with rop'){
                    const product_image = 'term_rop_image';
                }else if(product_name == 'guarented golden'){
                    const product_image = 'guarented_golden_image';
                }else{
                    const product_image = 'default_image';
                }
                return(
                  <Col key={product.ProductID} sm={productContainerWidth} className="single-product-container product-custom-container">
                    <Row className={`single-product-content ${this.state.productIds.indexOf(product.ProductID)>=0 ? "active" : ""}`}>
                      <Row className="product_img_div">
                        <center><div className={`${product_image}`}></div></center>
                      </Row>
                      <Row className="header">
                        <Col style={{textAlign: "left"}} sm={12}>
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
                      <Row style={{marginLeft: "0px", marginRight: "0px"}}>
                        <Row style={{width: "90%", marginLeft: "auto", marginRight: "auto"}} className={`text-center ${this.state.productIds.indexOf(product.ProductID)>=0 ? "active" : ""}`} onClick={()=> this.selectProduct(product)}>
                          <Col className="quote-this-product-container">
                            {this.state.productIds.indexOf(product.ProductID)>=0 && <div className="c-coverage-amount quote-product">PRODUCT SELECTED</div>}
                            {this.state.productIds.indexOf(product.ProductID)<0 && <div className="c-coverage-amount quote-product">QUOTE THIS PRODUCT</div>}
                          </Col>
                        </Row>
                      </Row>
                    </Row>
                  </Col>
                )
              })}
            </Row>
          </Col>
     );
    } else {
      return null;
    }

  }
}
