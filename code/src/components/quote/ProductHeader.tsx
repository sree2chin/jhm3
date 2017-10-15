import * as React from 'react';
import {Link} from 'react-router';
import { Navbar } from "react-bootstrap"
import {Button, Row, Col} from "react-bootstrap";

interface Props extends React.Props<ProductHeader> {
  location: any
}

export default class ProductHeader extends React.Component<Props, {}> {
  public render() {
    return (
      <Row style={{backgroundColor: "rgb(247, 247, 247)"}}>
        <Col sm={7} className="c-center">
          <Col sm={12} className="select-product-header">
            Select a product
          </Col>
          <Col sm={12}  className="select-product-header-content">
            OK! Thanks for that information. Based on the info you provided, the following products are available. Just click on the product name to get a quote. (You may select up to two products to quote.)
          </Col>
        </Col>
      </Row>
    );
  }
}
