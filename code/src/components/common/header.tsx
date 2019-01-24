import * as React from 'react';
import {Link} from 'react-router';
import { Navbar } from "react-bootstrap";
import TelLinkComponent from "./TelLinkComponent";
import {each, isEmpty} from "underscore";
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface Props extends React.Props<Header> {
  logoImgSrc: string,
  location? : any
}

class Header extends React.Component<Props, {}> {
  shouldShowAgentLinks() {
    var queryParams = this.props.location.query;
    return !isEmpty(queryParams["agent_number"]) ||
      this.props.is_agent == true;
  }
  public render() {
    return (
      <Navbar className="cf-nav-main-header">
        <Navbar.Header>
          <div>
            <span>
              <img className="navbar-brand" src={this.props.logoImgSrc} />
            </span>
            {this.shouldShowAgentLinks() && <span className="navbar-links">
                  {window.goAgentWeb && <a href={window.goAgentWeb} className="first-link">Go Agent Web</a>}
                  {window.lifetimeAgentPanel && <a href={window.lifetimeAgentPanel}>Lifetime Agent Panel</a>}
                </span>
              }
          </div>
        </Navbar.Header>
        <Navbar.Text pullRight>
          <div className="header-text" style={{marginLeft: "22px", fontSize: "16px"}}>
            <div style={{textAlign: "right"}}>
              Need help?
              <a href={this.props.phoneNumberDetails ? this.props.phoneNumberDetails.phone_number_href :  "tel:" + "1-866-826-8471"}>
                <img className="visible-xs"
                  style={{float: "right", paddingLeft: "10px", paddingTop: "4px"}}
                  src={"../images/small-phone.svg"} />
              </a>
            </div>
            <div className="hidden-xs" style={{fontSize: "18px"}}>
              <TelLinkComponent
                phoneNumber={this.props.phoneNumberDetails}
              />
            </div>
          </div>

        </Navbar.Text>
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