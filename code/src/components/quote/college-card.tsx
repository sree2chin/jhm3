import * as React from 'react';
import { Button, Row, Col } from "react-bootstrap";

interface Props {
  colleges?: any, 
}

const prefix = "jhm-college-card";
const cs = cls => {
    if (typeof cls === "string") {
        return `${prefix}-${cls}`;
    } else {
        let className = "";
        let clsListLength = cls.length;
        for (let i=0; i<clsListLength; i++) {
            className += `${prefix}-${cls[i]} `;
        }
        return className.trim();
    }   
}

class CollegeCard extends React.Component<Props, {}> {
  constructor(){
    super();
    // this.submitQuoteForm.bind(this);
  }

  componentWillMount() {
    // this.props.getCollegesList();
  }

  public render() {
    const { collegeObj } = this.props;
    return (
      <div className = {prefix}>
        <img src={collegeObj.bannerImage} alt = {collegeObj.name} />
        <div className = {cs("card-bottom-cont")}>
            <p>{collegeObj.name} - {collegeObj.location}</p>
        </div>
      </div>
    );
  }
}

export default CollegeCard;
