import * as React from 'react';
import {Row, Col} from 'react-router';
import { Navbar } from "react-bootstrap"

interface Props extends React.Props<footer> {
}

export default class footer extends React.Component<Props, {}> {
  public render() {
    return (
      <Row className="c-footer">
        <Col>
        Site Map »  Privacy Policy » 
        </Col> 
        <Col>
          © Copyright 2017 Vantis Life Insurance Company, Windsor, Connecticut - All Rights Reserved.
        </Col> 
        <Col>
          Vantis, Vantis Life, and A better life experience are registered trademarks of Vantis Life Insurance Company.
        </Col> 
        <Col>
          Life insurance and annuities issued by Vantis Life Insurance Company, Windsor, CT (all states except NY) and by Vantis Life Insurance Company of New York, Brewster, NY (NY only). Products not available in all states and state variations may apply.
        </Col>
      </Row>
    );
  }
}
