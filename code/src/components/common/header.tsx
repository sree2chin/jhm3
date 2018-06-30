import * as React from 'react';
import {Link} from 'react-router';
import { Navbar } from "react-bootstrap";
import TelLinkComponent from "./TelLinkComponent";
import {each, isEmpty} from "underscore";

interface Props extends React.Props<Header> {
  logoImgSrc: string,
  location? : any
}

export default class Header extends React.Component<Props, {}> {
  shouldShowAgentLinks() {
    var queryParams = this.props.location.query;
    return !isEmpty(queryParams["agent_number"]);
  }
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
        {this.shouldShowAgentLinks() && <Navbar.Text pullLeft>
          <div className="navbar-links">
            {window.goAgentWeb && <a href={window.goAgentWeb} className="first-link">Go Agent Web</a>}
            {window.lifetimeAgentPanel && <a href={window.lifetimeAgentPanel}>Lifetime Agent Panel</a>}
          </div>
        </Navbar.Text>
        }
        <Navbar.Text pullRight>
          <div className="header-text" style={{marginLeft: "22px", fontSize: "16px"}}>
            <div style={{textAlign: "right"}}>
              Need help?
              <a href={"tel:" + (window.contactNumber ? window.contactNumber :  "1-866-826-8471")}>
                <img className="visible-xs"
                  style={{float: "right", paddingLeft: "10px", paddingTop: "4px"}}
                  src={"../images/small-phone.svg"} />
              </a>
            </div>
            <div className="hidden-xs" style={{fontSize: "18px"}}>
              <TelLinkComponent
                phoneNumber={(window.contactNumber ? window.contactNumber :  "1-866-826-8471")}
              />
            </div>
          </div>

        </Navbar.Text>
      </Navbar>
    );
  }
}
