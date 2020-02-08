import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import Header from './common/header';
import reducers  from '../reducers';
import { Row, Col } from "react-bootstrap";
import ErrorLogsApi from '../api/ErrorLogsApi';

window.errorLogsApiIns = new ErrorLogsApi();

interface Props extends React.Props<App> {
}

const store = createStore(
  reducers
  , applyMiddleware(reduxThunk)
);
window.reduxDispatch = store.dispatch;
export default class App extends React.Component<Props, {}> {
  public render() {
    var isPaymentPage = this.props.location.pathname == "/payment";
    return (
     <Provider store={store}>
        <div className="">
          {!isPaymentPage && <Header
            logoImgSrc={"../images/logo.svg"}
            location={this.props.location}
          />}
          <div className="c-body">
            {this.props.children}
          </div>
          {!isPaymentPage && <Row className="c-footer hidden-xs" style={{marginBottom: "0px"}}>
            <Col xs={8} className="c-footer-content c-center">
            <Row>
              <Col>
                Site Map »  Privacy Policy »
              </Col>
              <Col>
                © Copyright 2020 JHM technologies pvt limited, Hyderabad, Telangana, India - All Rights Reserved.
              </Col>
              <Col>
                A better career experience | Individual Career Counselling for College students and working professionals | Career Goals in Hospitality | Being financially independent
              </Col>
            </Row>
            </Col>
          </Row>}
        </div>
     </Provider>
    );
  }
}
