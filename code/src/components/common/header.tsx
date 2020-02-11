import * as React from 'react';
import {Link} from 'react-router';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import TelLinkComponent from "./TelLinkComponent";
import {each, isEmpty} from "underscore";
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface Props extends React.Props<Header> {
  logoImgSrc: string,
  location? : any
}

const prefix = "jhm-navbar";
const cs = cls => {
    if (typeof cls === "string") {
        return `${prefix}-${cls}`;
    } else {
        let className = "";
        let clsListLength = cls.length;
        for (let i=0; i<clsListLength; i++) {
            className += `${prefix}-${cls[i]} `;
        }
        return className.trim();
    }   
}

class Header extends React.Component<Props, {}> {
  shouldShowAgentLinks() {
    var queryParams = this.props.location.query;
    return !isEmpty(queryParams["agent_number"]) ||
      this.props.is_agent == true;
  }
  public render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <a href = "/">
            <img src={"../images/others/logo.png"} alt="logo" />
            <span>JHM</span>
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" pullRight>
          <Nav>
            <NavItem eventKey="a" href="#">
              About
            </NavItem>
            <NavItem eventKey="b" href="#">
              Login
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state: any): Props => {
  var d = {
    products: state.quotes.products,
    plans: state.quotes.plans,
    persons: state.quotes.persons,
    noOfPersons: state.selectPersons.noOfPersons,
    is_agent: state.quotes.is_agent,
    premiums: state.quotes.premiums,
  };
  if (state && state.quotes && state.quotes.phoneNumberDetails) {
    d.phoneNumberDetails = state.quotes.phoneNumberDetails;
  }
  if (state && state.questions && state.questions && state.questions.questions && state.questions.questions.extra_params && state.questions.questions.extra_params.phone_number) {
    d.phoneNumberDetails = state.questions.questions.extra_params.phone_number;
  }
  if (state && state.questions && state.questions.confirmationData && state.questions.confirmationData.extra_params && state.questions.confirmationData.extra_params.phone_number) {
    d.phoneNumberDetails = state.questions.confirmationData.extra_params.phone_number;
  })
  return d;
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);