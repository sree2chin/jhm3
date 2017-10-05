import * as React from "react"
import { Navbar } from "react-bootstrap"
import HeaderNav from "./MainHeaderNav"
import CustomCheckbox from "../components/CustomCheckbox"

export interface CustomCheckboxesProps {

}

const CustomCheckboxes = React.createClass<CustomCheckboxesProps, {}>({
    render() {
        return (
            <div>
                <HeaderNav />
                <div style={{margin: "30px"}}>

                    <div  style={{margin: "30px auto"}}>
                        SMALL SQUARE CUSTOM CHECKBOX
                        <CustomCheckbox
                            onClickCb={() => {}}
                            type="square"
                            kind="small"
                            counter="0"
                        />
                    </div>

                    <div style={{margin: "30px auto"}}>
                        NORMAL SQUARE CUSTOM CHECKBOX
                        <CustomCheckbox
                            onClickCb={() => {}}
                            type="square"
                            kind="normal"
                            counter="1"
                        />
                    </div>

                    <div style={{margin: "30px auto"}}>
                        BIG SQUARE CUSTOM CHECKBOX
                        <CustomCheckbox
                            onClickCb={() => {}}
                            type="square"
                            kind="big"
                            counter="2"
                        />
                    </div>

                    <div style={{margin: "30px auto"}}>
                        SMALL CIRCLE CUSTOM CHECKBOX
                        <CustomCheckbox
                            onClickCb={() => {}}
                            type="circle"
                            kind="small"
                            counter="3"
                        />
                    </div>

                    <div style={{margin: "30px auto"}}>
                        NORMAL CIRCLE CUSTOM CHECKBOX
                        <CustomCheckbox
                            onClickCb={() => {}}
                            type="circle"
                            kind="normal"
                            counter="4"
                        />
                    </div>

                    <div style={{margin: "30px auto"}}>
                        BIG CIRCLE CUSTOM CHECKBOX
                        <CustomCheckbox
                            onClickCb={() => {}}
                            type="circle"
                            kind="big"
                            counter="5"
                        />
                    </div>

                    <div style={{margin: "30px auto"}}>
                        NORMAL BIG CIRCLE CUSTOM CHECKBOX AUTO CHECKED
                        <CustomCheckbox
                            onClickCb={() => {}}
                            type="circle"
                            kind="big default-checked"
                            counter="6"
                        />
                    </div>

                    <div style={{margin: "30px auto"}}>
                        DEFAULT CUSTOM CHECKBOX
                        <CustomCheckbox
                            counter="7"
                        />
                    </div>

                    <div style={{margin: "30px auto"}}>
                        BIG CIRCLE CUSTOM CHECKBOX CROSS CHECKED
                        <CustomCheckbox
                            onClickCb={() => {}}
                            type="circle"
                            kind="big cross-checked"
                            counter="8"
                        />
                    </div>

                    <div style={{margin: "30px auto"}}>
                        NORMAL BIG CIRCLE CUSTOM CHECKBOX CROSS CHECKED
                        <CustomCheckbox
                            onClickCb={() => {}}
                            type="circle"
                            kind="normal cross-checked"
                            counter="9"
                        />
                    </div>


                    <div style={{margin: "30px auto"}}>
                        SMALL BIG CIRCLE CUSTOM CHECKBOX CROSS CHECKED
                        <CustomCheckbox
                            onClickCb={() => {}}
                            type="circle"
                            kind="small cross-checked"
                            counter="10"
                        />
                    </div>

                    <div style={{margin: "30px auto"}}>
                        BIG SQUARE CUSTOM CHECKBOX CROSS CHECKED
                        <CustomCheckbox
                            kind="big cross-checked"
                            counter="11"
                        />
                    </div>

                    <div style={{margin: "30px auto"}}>
                        NORMAL SQUARE CIRCLE CUSTOM CHECKBOX CROSS CHECKED
                        <CustomCheckbox
                            kind="normal cross-checked"
                            counter="12"
                        />
                    </div>


                    <div style={{margin: "30px auto"}}>
                        SMALL SQUARE CUSTOM CHECKBOX CROSS CHECKED
                        <CustomCheckbox
                            kind="small cross-checked"
                            counter="13"
                        />
                    </div>

                </div>
            </div>
        )
    }
})

export default CustomCheckboxes