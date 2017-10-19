import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import Header from './common/header';
import reducers  from '../reducers';
import { Row, Col } from "react-bootstrap"

interface Props extends React.Props<App> {
}

const store = createStore(
  reducers
  , applyMiddleware(reduxThunk)
);

export default class App extends React.Component<Props, {}> {
  public render() {
    return (
     <Provider store={store}>
        <div className="">
          <Header
            logoImgSrc={"../images/logo.svg"}
          />
          <div className="c-body">
            {this.props.children}
          </div>
      <Row className="c-footer" style={{marginBottom: "0px"}}>
        <Col sm={8} className="c-footer-content c-center">
        <Row>
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
        </Col>
      </Row>
        </div>
     </Provider>
    );
  }
}
