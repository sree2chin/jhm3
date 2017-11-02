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
            Need help? <img src={"../images/small-phone.svg"} />
          </div>
          <div className="header-text link" className="hidden-xs">
            <TelLinkComponent 
              phoneNumber={"1-800-555-1234"}
            />
          </div>
        </Navbar.Text>
      </Navbar>
    );
  }
}
