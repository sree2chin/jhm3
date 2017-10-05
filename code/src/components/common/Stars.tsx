import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Klass, css} from 'react-star-rating-input';
import insertCss from "insert-css"

export interface CStarsProps {
    on: boolean,
    onClick: () => void,
    onChange: () => void,
    value: number,
    className?: string
}

const CfToggleSwitch = React.createClass<CfToggleSwitchProps, {}>({
    handleClick(e: any) {
        e.preventDefault()
        if (this.props.enabled) {
            this.props.onClick()
        }
    },
    render() {
    	//insertCss(css);
        return (
            <Klass 
            	size={5}
            />
        )
    }
})

export default CfToggleSwitch

