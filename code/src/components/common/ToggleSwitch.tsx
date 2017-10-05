import * as React from "react"

export interface CfToggleSwitchProps {
    on: boolean,
    onClick: () => {},
    enabled: boolean,
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
        const className = ["cf-switch", this.props.className || "", (this.props.on ? "on " : ""), (this.props.enabled ? "" : "disabled ")].join(" ")
        return (
            <div className={className} onClick={this.handleClick}>
                <div className="cf-switch-toggle" children={this.props.children}></div>
            </div>
        )
    }
})

export default CfToggleSwitch
