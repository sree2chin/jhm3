import * as React from 'react';
import { getCs } from "../../utility/util";

interface Props {
  colleges?: any
}

const prefix = "jhm-college-card";
const cs = getCs(prefix);

class CollegeCard extends React.Component<Props, {}> {
  constructor(){
    super();
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
