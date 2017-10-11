import * as React from "react"

export interface CustomCheckboxProps {
    onClickCb?: () => void
    type?: string
    kind?: string
    counter: string
}

const CustomCheckbox = React.createClass<CustomCheckboxProps, {}>({
    onClick() {
        this.props.onClickCb && this.props.onClickCb()
    },
    render() {
        return (
        <div onClick={this.onClick} className={"cf-checkbox-inner-container " + (this.props.kind || "normal")}>
                <input type="checkbox" value="1" id={"checkbox-input-" + this.props.counter} name="" />
                <label className={this.props.type || "square"} htmlFor={"checkbox-input-" + this.props.counter}></label>
                <span>{this.props.label}</span>
            </div>
        )
    }
})

export default CustomCheckbox