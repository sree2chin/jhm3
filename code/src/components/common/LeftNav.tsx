import * as React from "react"
import {  Nav, NavItem } from "react-bootstrap"
import { IndexLinkContainer } from "react-router-bootstrap"
import * as _ from "underscore"

export interface LeftNavProps {
    data: any
}

const LeftNav = React.createClass<LeftNavProps, {}>({
    render() {
        const links = this.props.data && this.props.data.links
        return <div className="navbar navbar-inverse navbar-fixed-side cf-left-navbar-fixed"
                    style={{ overflowX: "hidden" }}>
                    <div className="container-fluid">
                        {
                            !_.isEmpty(this.props.data.leftBrandImg) &&
                            <div className="navbar-brand cf-left-navbar-brand">
                                <img src="./images/logobig.png" style={{ width: "112px" }} />
                            </div>
                        }
                        {
                            !_.isEmpty(this.props.data.kitchen) && <div className="cf-leftnav-kitchens-list">
                                <div>{this.props.data.kitchen.name}</div>
                            </div>
                        }

                        {
                            <Nav className="nav navbar-nav cf-left-navbar-list" bsStyle="pills" stacked>
                                {
                                    links && _.map(links, (link: any, index: number) => {
                                        return <IndexLinkContainer to={link.to} key={link.text}>
                                            <NavItem>
                                                {link.img && <img src={link.img}/>}
                                                {link.text}
                                            </NavItem>
                                        </IndexLinkContainer>
                                    })
                                }
                            </Nav>
                        }
                    </div>
                    {
                        this.props.data.isLogOutReq && <Nav className="nav navbar-nav bottom cf-bottom-logout-link">
                            <NavItem href="/auth/logout">Logout</NavItem>
                        </Nav>
                    }
                </div>
    }
})

export default LeftNav
