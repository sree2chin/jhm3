import * as React from "react"

export interface TelLinkProps {
  phoneNumber: string
}

var createReactClass = require('create-react-class');

const TelLinkComponent = createReactClass<TelLinkProps, {}>({
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