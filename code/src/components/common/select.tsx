import * as React from 'react';
import {Component} from 'react';
import {isEmpty} from 'underscore';

export interface SelectProps {  
  data: any,
  fieldName: string
  label: string
  placeHolder: string,
  onChange?: () => void,
  errors: any,
  containerClassName: string,
  options: any,
  height: number
}

export default class Select extends Component<SelectProps, {}> {
  constructor(props : SelectProps){
    super(props);
  }

  public render() {
    return (<div>
      {this.props.label ? <div className="mb2">{this.props.label}</div> : null}
      <select
        className={`${this.props.containerClassName} w-100`}
        value={this.props.data[this.props.fieldName] || ''}
        onChange={(e) => this.props.onChange({[this.props.fieldName]: e.target.value})}
        style={{border: "1px solid #cccccc", height: this.props.height || 40}}
      >
        <option value="">{this.props.placeHolder}</option>
        {this.props.options.map((opt, i) => {
          return (<option value={opt.value} key={i}>
            {opt.label}
          </option>);
        })}
      </select>
      <div className="green">{isEmpty(this.props.errors) ? '' : this.props.errors[this.props.fieldName]}</div>
    </div>);
  }
}
