import * as React from 'react';
import {Link} from 'react-router';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

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

const mapStateToProps = state => {
  return {};
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);