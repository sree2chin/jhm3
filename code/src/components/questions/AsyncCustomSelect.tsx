import * as React from 'react';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import { Async } from 'react-select';
import Autosuggest, { ItemAdapter } from 'react-bootstrap-autosuggest';
import * as fetch from "isomorphic-fetch";
import {getFactorsearch} from '../../actions/Questions';

interface question {
  label: any
}

interface Props extends React.Props<AsyncCustomSelect> {
  onChange: any,
  question: any,
  error: any,
  alreadyOnceSubmitted: any,
  getFactorsearch: any
}

interface TagAdapter extends ItemAdapter {
  instance: any
}

class TagAdapter extends ItemAdapter {
  newFromValue(value) {
    return { value }
  }
  renderSelected(item) {
    console.log(item);
    return <div className="tag">
      {item.label}
    </div>
  }
  renderSuggested(item) {
    return <div className="tag-item">
       {item.label}
    </div>
  }
}
TagAdapter.instance = new TagAdapter()

export default class AsyncCustomSelect extends React.Component<Props, {selectedItem: any}> {
  constructor(props : Props){
    super(props);
  }
  state = {
    selectedItem: null,
    items: [],
    reposMessage: null
  };

  onItemChange(val) {
    this.setState({
      selectedItem: val
    });
    this.props.onChange(this.props.question, val);
  }
  lastSearch = null
  onTextSearch(search, page, prev) {
    this.props.onChange(this.props.question, [  {
      "id": "Diabetes",
      "label": "diabetes",
      "inferred": false,
      "addedBySearchVariable": true,
      "category": "Medical"
  }]);
    var data = {
      questionId: String,
      assessment_factor_url: String,
      q: String
    };

    if (search) {
      const sp = search.lastIndexOf('/')
      if (sp >= 0) {
        search = search.substring(sp + 1)
      }

      data.questionId = this.props.question.links[0].params.questionId;
      data.assessment_factor_url = this.props.question.links[0].href;
      data.q = search;

      if (search === this.lastSearch && !page) {
        return
      }
      this.lastSearch = search

      this.setState({
        reposMessage: this.props.question.label,
        reposMore: null
      })

      this.props.getFactorsearch(data).then(response => {
        if (response && response.questions && response.questions.data) {
          this.setState({
            items: response.questions.data
          });
        } else {
          this.setState({
            reposMessage: this.props.question.label,
            reposMore: null
          })
        }
      }, err => {
        this.setState({
          reposMessage: this.props.question.label,
          reposMore: null
        })
      })
    } else {
      this.setState({
        reposMessage: this.props.question.label,
        reposMore: null
      })
    }
  };

  validate() {
    if(!this.props.alreadyOnceSubmitted) {return true;}
    if (this.props.question.constraints) {
      var constraints = this.props.question.constraints;
      /*if (constraints.required) {
        return this.props.question.answer && this.props.question.answer.id;
      }*/
      return true;
    } else {
      return true;
    }
  }
  public render() {
    var wrapperClass : string = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
     wrapperClass += " " + 'has-error';
    }
    //var statesObjects = this.getStateObjects();
    var question = this.props.question;

    return (
     <div>
        <Col sm={12} className={"c-subheader-text"} style={{marginTop: "5px", paddingLeft: "0px", marginBottom: "5px"}}>
          {question.caption}
        </Col>
          <Col style={{paddingRight: "15px", marginBottom: "15px"}} className="async-auto-suggest-container">
            <Row>
              <Autosuggest
                datalist={this.state.items || []}
                datalistPartial
                datalistMessage={this.state.reposMessage}
                onDatalistMessageSelect={this.state.reposMore}
                placeholder={this.props.question.caption}
                value={this.state.selectedItem}
                itemValuePropName="label"
                searchDebounce={500}
                itemAdapter={TagAdapter.instance}
                onSearch={this.onTextSearch.bind(this)}
                onChange={this.onItemChange.bind(this)}
                multiple />
            </Row>

            <Col className={`c-subheader-text error`} style={{paddingLeft: "0px", marginTop: "0px", marginLeft: "-15px"}}>
              {!this.validate() &&
                <div className="input" style={{marginTop: "5px", color: "#ff4949"}}>
                  {question.constraints.patternViolationMessage || "Required"}
                </div>
              }
            </Col>
          </Col>
      </div>
    );
  }
}
