
import * as React from 'react';
import {Link} from 'react-router';

export default  class CustomDatepicker extends React.Component {

  render () {
    return (
      <div className="custom-date-picker-container">
        <span className="custom-date-picker" onClick={this.props.onClick}>
          <img src={"../images/calendar.svg"} />
        </span>
        <input type="text"
          placeholder={"MM/DD/YYYY"}
          value={this.props.value} />
      </div>
    )

    return (
      <div className="custom-date-picker-container">
        <span className="custom-date-picker" onClick={this.props.onClick}>>
          <img src={"../images/question-mark.svg"} />
        </span>
        <input type="text"
          placeholder={"MM/DD/YYYY"}
          value={this.props.value}
          />
      </div>
    )
  }
}