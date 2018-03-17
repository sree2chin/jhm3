import * as React from 'react';
import {Link} from 'react-router';
import { Navbar } from "react-bootstrap"
import {Button, Row, Col} from "react-bootstrap";
import {map, isEmpty} from "underscore";
import { browserHistory } from 'react-router';

interface Props extends React.Props<cfooter> {
  breadCrumbs?: any,
  noFoGroupsCompleted?: any,
  products?: any,
  plans?: any,
  premiums?: any
}

export default class cfooter extends React.Component<Props, {}> {
  goToPage(page) {
    const basePath = this.props.location.pathname.indexOf("agent") > 1 || this.props.is_agent ? "/agent" : "/";
    var queryParams = this.props.location.query;
    var queryParamsString = "?";
    if (page == "/") {
      page = "";
    }
    for(var k in queryParams) {
      if (queryParams[k]) {
        queryParamsString += k + "=" + queryParams[k] + "&";
      } else {
        queryParamsString += k + "&";
      }
    }
    if (page.indexOf("products") > -1 && !isEmpty(this.props.products)) {
      browserHistory.push(basePath + page + queryParamsString);
    } else if (page.indexOf("next-steps") > -1 && !isEmpty(this.props.premiums)) {
      browserHistory.push(basePath + page + queryParamsString);
    } else if (page.indexOf("products") <=-1 && page.indexOf("next-steps") <=-1) {
      browserHistory.push(basePath + page + queryParamsString);
    }

  }
  public render() {
    var breadCrumbs = this.props.breadCrumbs;
    var noFoGroupsCompleted = this.props.noFoGroupsCompleted || [];
    if (breadCrumbs) {
      return (<Navbar className={`cf-nav-main-header subheader bread-crumb-container`}>
        <Row>
        {breadCrumbs && map(breadCrumbs, (breadCrumb, index) =>
          <Col key={breadCrumb}
            className={`confirmation-header gather-information-container dynamic-bread-crumb ${noFoGroupsCompleted.indexOf(index)>=0 ? "active" : ""}`}
            style={{paddingRight: "0px"}}
          >
            <Row>
              <Col
                className={`gather-information ${index==breadCrumbs.length-1 ? "last-child" : ""}`}
              >
                {breadCrumb}
              </Col>
            </Row>
          </Col>
        )}
      </Row>
      </Navbar>)
    } else {
      return (<Navbar className={`cf-nav-main-header subheader`}>
        <Row>
          <Col
            className={`confirmation-header gather-information-container ${window.location.pathname=="/" || window.location.pathname=="/agent" || window.location.pathname=="/agent/" ? "active" : ""}`}
            style={{paddingRight: "0px"}}
            >
            <Row>
              <Col className="gather-information" onClick={()=>{
                this.goToPage("")
              }}>
                Gather info
              </Col>
            </Row>
          </Col>
          <Col
            className={`confirmation-header product-selection-text-container ${window.location.pathname.indexOf("products") >-1 || window.location.pathname.indexOf("plans") >-1 ? "active" : ""}`}
            onClick={()=>{
              this.goToPage("products")
            }}>
            <div className="product-selection-container">
              <div className='product-selection'>
                Product selection
              </div>
            </div>
          </Col>
          <Col
            style={{}}
            className={`confirmation-header next-steps ${window.location.pathname.indexOf("next-steps")>-1 ? "active" : ""}`}
            onClick={()=>{
              this.goToPage("next-steps")
            }}>
            <span>
              Next steps
            </span>
          </Col>
        </Row>
      </Navbar>)
    }

  }
}
