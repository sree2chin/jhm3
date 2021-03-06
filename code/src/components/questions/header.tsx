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
        <Navbar.Text pullRight>
          <div className="header-text" style={{marginLeft: "22px"}}>
            Need help? <a href={"tel:" + (window.contactNumber ? window.contactNumber :  "1-866-826-8471")}><img className="visible-xs" style={{float: "right", paddingLeft: "10px"}} src={"../images/small-phone.svg"} /></a>
          </div>
          <div className="hidden-xs">
            <TelLinkComponent
              phoneNumber={(window.contactNumber ? window.contactNumber :  "1-866-826-8471")}
            />
          </div>
        </Navbar.Text>
      </Navbar>
    );
  }
}
