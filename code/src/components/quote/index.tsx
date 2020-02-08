import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {getCollegesList} from '../../actions/College';
import { Button, Row, Col } from "react-bootstrap";
import CollegeCard from "./college-card"

interface Props {
  colleges?: any, 
}

const prefix = "jhm-home-page";
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

class Index extends React.Component<Props, {}> {
  constructor(){
    super();
    // this.submitQuoteForm.bind(this);
  }

  componentWillMount() {
    // this.props.getCollegesList();
  }

  public render() {
    const { collegesList } = this.props;
    return (
      <div>
        <h1 className = {cs("header")}>Join Hotel management</h1>
        <Row className = {cs("content-box")}>
            <Col sm={8} className = {cs("content-sub-box")}>
                <p>Looking to kickstart your career in hotel management?</p>
                <p>Sign up to choose best college</p>
                <Button variant="primary">
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
                <p>Want to join students for your institution?</p>
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
      </div>);
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    collegesList: state.college.collegesList
  };
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
    return {
      getCollegesList: data => {return dispatch(getCollegesList(data))},
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Index);
