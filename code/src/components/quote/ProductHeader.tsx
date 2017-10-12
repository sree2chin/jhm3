import * as React from 'react';
import {Link} from 'react-router';
import { Navbar } from "react-bootstrap"
import {Button, Row, Col} from "react-bootstrap";
import { hashHistory } from 'react-router';

interface Props extends React.Props<ProductHeader> {
  location: any
}

export default class ProductHeader extends React.Component<Props, {}> {
  public render() {
    hashHistory;
    return (
      <Navbar className={`cf-nav-main-header subheader`}>
          <Row>
            <Col sm={12}>
              Select a product
            </Col>
            <Col sm={7}>
              OK! Thanks for that information. Based on the info you provided, the following products are available. Just click on the product name to get a quote. (You may select up to two products to quote.)
            </Col>

          </Row>
      </Navbar>
    );
  }
}
