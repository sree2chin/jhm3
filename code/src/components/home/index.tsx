import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getCollegesList } from '../../actions/College';
import { Button, Row, Col } from "react-bootstrap";
import CollegeCard from "./college-card";
import { getCs } from "../../utility/util";

interface Props {
  colleges?: any, 
}

const prefix = "jhm-home-page";
const cs = getCs(prefix);

class Index extends React.Component<Props, {}> {
  constructor(){
    super();
    this.onSignUpClick = this._onSignUpClick.bind(this);
  }

  componentWillMount() {
    this.props.getCollegesList();
  }

  _onSignUpClick() {
    browserHistory.push("/college-registration");
  }

  public render() {
    const { collegesList } = this.props;
    return (
      <div>
        {/* <h1 className = {cs("header")}>Join Hotel management</h1> */}
        <div className = {cs("banner-img-cont")}>
            <img className = {cs("banner-image")} src = "https://joinhotelmanagement.s3.ap-south-1.amazonaws.com/bannerImage2.jpg"
                alt="banner" />
            <p className = {cs("banner-img-txt")}>Join Hotel Management</p>
        </div>
        <div className = {cs("main-container")}>
            <Row className = {cs("content-box")}>
                <Col sm={8} className = {cs("content-sub-box")}>
                    <p>Looking to kickstart your career in hotel management?</p>
                    <p>Sign up to choose best college</p>
                    <Button variant="primary" onClick={this.onSignUpClick}>
                        Sign up
                    </Button>
                </Col>
                <Col sm={4} className = {cs(["content-sub-box", "content-right-box"])}>
                    <img className={cs("icon-image")} 
                        src={"../images/student/student.svg"} />
                </Col>
            </Row>
            <Row className = {cs("content-box")}>
                <Col sm={4} className = {cs(["content-sub-box", "content-right-box"])}>
                    <img className={cs("icon-image")} 
                        src={"../images/college/university.svg"} />
                </Col>
                <Col sm={8} className = {cs("content-sub-box")}>
                    <p>Want to get students joined in your institution?</p>
                    <p>Sign up to find eligible students</p>
                    <Button variant="primary">
                        Sign up
                    </Button>
                </Col>            
            </Row>
            <div className = {cs("colleges-list")}>
                {
                    collegesList.map((elem, index) => {
                        return (
                            <CollegeCard collegeObj={elem} />
                        )
                    })
                }
            </div>
        </div>
      </div>);
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    collegesList: state.college.collegesList
  };
}

const mapDispatchToProps = {
  getCollegesList
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
