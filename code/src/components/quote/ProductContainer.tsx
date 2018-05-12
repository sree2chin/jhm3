import * as React from 'react';
import Input from './../common/textInput';
import {Button, Row, Col} from "react-bootstrap";
import Tooltip from 'rc-tooltip';
import {map, isEmpty, uniq, intersection, without} from "underscore";
import RawHtml from "react-raw-html";
import renderHTML from 'react-render-html';


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

  getProductsInOrders(products) {
    return products.sort((a, b)=>{
        return parseInt(a.ProductDisplayOrder) - parseInt(b.ProductDisplayOrder)
    });
  }

  public render() {
    const {productInfo} = this.props;
    var products = productInfo && productInfo.products_data && productInfo.products_data.products_list || [];
    products = this.getProductsInOrders(products);
    const personsContainerWidth = this.props.noOfPersons == 2 ? 6 : 12;
    const productContainerWidth = this.props.noOfPersons == 2 ? 12 : 6;
    RawHtml.addTag("mycooltag");

    if(!isEmpty(products)) {

      return (
          <Col sm={personsContainerWidth} className={this.props.personIndex==0 ? "first-product-container": "second-product-container"}>
            <Col className="select-product-header" style={{textAlign: "center", paddingBottom:"22px"}}>
              Products for {this.props.person.name}
            </Col>
            {this.state.productSelectionError && <Row>
              <Col sm={8} className="c-center product-selection-error-msg">
                {this.state.productSelectionErrorMsg}
              </Col>
            </Row>}
            <Row className="c-center mt50">
              {map(products, (product) =>{
                /*const product_name = product.ProductDisplayName.toString().toLowerCase();
                if(product_name == 'super ez complete' || product_name == 'super ez'){
                  const product_image = 'spwl_image';
                }else if(product_name == 'vantis velocity whole life' || product_name == "vantisvalue permanent life"){
                  const product_image = 'whole_life_image';
                }else if(product_name == 'vantis velocity whole life plus' || product_name == "vantisvalue plus permanent life"){
                  const product_image = 'whole_life_plus_image';
                }else if(product_name == 'vantis velocity term' || product_name == "children's term" || product_name == "level term"){
                  const product_image = 'term_image';
                }else if(product_name == 'vantis velocity term with rop' || product_name == "level term with rop"){
                  const product_image = 'term_rop_image';
                } else if(product_name == 'guarented golden' || product_name == "guaranteed golden"){
                  const product_image = 'guarented_golden_image';
                }else{
                  const product_image = 'default_image';
                }*/
                const product_image_name = product.product_image;
                const product_image = "http://ec2-107-23-131-50.compute-1.amazonaws.com/assets/img/" + product.product_image;

                return(
                  <Col key={product.ProductID} sm={productContainerWidth} className="single-product-container product-custom-container">
                    <Row className={`single-product-content ${this.state.productIds.indexOf(product.ProductID)>=0 ? "active" : ""}`}>
                      <Row className="product_img_div">
                      <img
                        className={`plan-product-image ${product_image_name}_transparent`}
                        src={`${product_image}`}
                      />
                      </Row>
                      <Row className="header">
                        <Col style={{textAlign: "left"}} sm={12}>
                          {product.ProductDisplayName}
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={12} className="product-main-content">
                          <Row className="text-center">
                            <ul className="c-product-desc-line">
                              {product.ProductDisplayDescription && product.ProductDisplayDescription.trim && product.ProductDisplayDescription.trim().length > 0 &&
                                 <RawHtml.mycooltag>
                                    {product.ProductDisplayDescription.trim()}
                                  </RawHtml.mycooltag>
                                 //<div>
                                  //{ product.ProductDisplayDescription.trim().indexOf('</') !== -1
                                  //    ? (
                                   //       <div dangerouslySetInnerHTML={{__html: product.ProductDisplayDescription.trim().replace(/\n/g, '<br />')}} >
                                   //       </div>
                                    //    )
                                    //  : product.ProductDisplayDescription.trim()
                                   // }
                               // </div>
                              }
                            </ul>
                          </Row>
                        </Col>
                      </Row>
                      <Row style={{marginLeft: "0px", marginRight: "0px"}}>
                        <Row style={{width: "90%", marginLeft: "auto", marginRight: "auto", height: "73px"}} className={`text-center ${this.state.productIds.indexOf(product.ProductID)>=0 ? "active" : ""}`} onClick={()=> this.selectProduct(product)}>
                          <Col className="quote-this-product-container">
                            {this.state.productIds.indexOf(product.ProductID)>=0 && <div className="c-coverage-amount quote-product active product-selection-btn">PRODUCT SELECTED</div>}
                            {this.state.productIds.indexOf(product.ProductID)<0 && <div className="c-coverage-amount quote-product  product-selection-btn">QUOTE THIS PRODUCT</div>}
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
