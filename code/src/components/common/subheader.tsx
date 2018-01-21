import * as React from 'react';
import {Link} from 'react-router';
import { Navbar } from "react-bootstrap"
import {Button, Row, Col} from "react-bootstrap";
import {map} from "underscore";

interface Props extends React.Props<cfooter> {
  breadCrumbs?: any,
  noFoGroupsCompleted?: any
}

export default class cfooter extends React.Component<Props, {}> {
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
          <Col className={`confirmation-header gather-information-container ${window.location.pathname=="/" || window.location.pathname=="/agent" || window.location.pathname=="/agent/" ? "active" : ""}`} style={{paddingRight: "0px"}}>
            <Row>
              <Col className="gather-information">
                Gather info
              </Col>
            </Row>
          </Col>
          <Col className={`confirmation-header product-selection-text-container ${window.location.pathname.indexOf("products") >-1 ? "active" : ""}`}>
            <div className="product-selection-container">
              <div className='product-selection'>
                Product selection
              </div>
            </div>
          </Col>
          <Col style={{}} className={`confirmation-header next-steps ${window.location.pathname=="/next-steps" ? "active" : ""}`}>
            <span>
              Next steps
            </span>
          </Col>
        </Row>
      </Navbar>)
    }

  }
}
