import * as React from "react"
import { Navbar } from "react-bootstrap"

export interface HeaderNavProps {
    user: any,
    logoImgSrc: string
}

const HeaderNavComp = React.createClass<HeaderNavProps, {}>({
    getUserName() {
        const userName =  this.props.user ? 
            (this.props.user.name ? ", "  + this.props.user.name :
                this.props.user.firstName ? ", "  + this.props.user.firstName : ""
            ) : ""
        return userName
    },
    render() {
        return (
            <Navbar className="cf-nav-main-header">
                <Navbar.Header>
                    <Navbar.Brand>
                        <img src={this.props.logoImgSrc} />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {
                        this.props.user && <Navbar.Text pullRight>
                            <span className="cf-white-circle">
                                <Navbar.Link href="/auth/logout" >
                                    Log out {this.getUserName()}
                                </Navbar.Link>
                            </span>
                        </Navbar.Text>
                    }
                </Navbar.Collapse>
            </Navbar>
        )
    }
})

export default HeaderNavComp
