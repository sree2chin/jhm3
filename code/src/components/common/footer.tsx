import * as React from 'react';
import {Link} from 'react-router';
import { Navbar } from "react-bootstrap"
import TelLinkComponent from "./TelLinkComponent"

interface Props extends React.Props<Header> {
}

export default class Header extends React.Component<Props, {}> {
  public render() {
    return (
      <Navbar className="cf-nav-main-header">
        <Navbar.Header>
          <div>
            <Navbar.Brand>  
              <img src={this.props.logoImgSrc} />
            </Navbar.Brand>
          </div>
        </Navbar.Header>
      </Navbar>
    );
  }
}
