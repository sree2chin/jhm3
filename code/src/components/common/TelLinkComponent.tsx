import * as React from "react"

export interface TelLinkProps {
  phoneNumber: string
}

const TelLinkComponent = React.createClass<TelLinkProps, {}>({
  render() {
  	if (this.props.phoneNumber) {
	    return (
	      <a href={this.props.phoneNumber.phone_number_href}>{this.props.phoneNumber.phone_number_text}</a>
	    )
    } else {
    	return (<div></div>);
    }
  }
})

export default TelLinkComponent