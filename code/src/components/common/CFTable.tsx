import * as React from "react"
import { Table } from "react-bootstrap"
import * as _ from "underscore"

export interface CfTableProps {
    data: any
}

const CfTable = React.createClass<CfTableProps, {}>({
    getItemId(order: any) {
        return order.orderId || order.id
    },
    getProperty(obj: any, property: string): string {
        let val = obj
        if (!_.isEmpty(obj)) {
            const keys = property.split(".")
            _.each(keys, (key: string) => {
                val[key] ? val = val[key] : val = ""
            })
        } else {
            val = property
        }
        return val
    },
    handleDisplay(item: any, cell: [any]): string {
        const cellLength = cell.length
        let displayString = ""
        if (cellLength === 1) {
            if (_.isFunction(cell[0])) {
                displayString = cell[0](item)
            } else {
                displayString = JSON.stringify(item[cell[0]]) // _.get(item, cell[0]). in lodash check later
            }
        } else if (cellLength === 2) {
            if (_.isFunction(cell[0])) {
                displayString = cell[0](item[cell[0]]) // _.get(item, cell[0])
            } else {
                displayString = JSON.stringify(cell[0][cell[1]]) // _.get(cell[0], cell[1])
            }
        }
        return displayString
    },
    render() {
        return  <Table>
                    <thead>
                        <tr key={"header"}>
                            {_.map(this.props.data.headers, (header: string, index: number) => {
                                return <th>{header}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {_.map(this.props.data.items, (item: any, index: number) => {
                            return <tr key={this.getItemId(item) + index}>
                                {_.map(this.props.data.cells, (cell: any, index: number) => {
                                    return <td>{this.handleDisplay(item, cell)}</td>
                                })}
                            </tr>
                        })}
                    </tbody>
                </Table>
    }
})

export default CfTable