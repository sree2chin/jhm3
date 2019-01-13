import * as React from 'react';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import { Async } from 'react-select';
import Autosuggest, { ItemAdapter } from 'react-bootstrap-autosuggest';
import * as fetch from "isomorphic-fetch";
import {getFactorsearch} from '../../actions/Questions';
import {isEmpty} from "underscore";

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
    this.onSearchCustomization = this.onSearchCustomization.bind(this);
  }
  state = {
    selectedItem: null,
    items: [],
    reposMessage: null
  };
  componentWillMount() {
    if (!isEmpty(this.props.question) && this.props.question.answer) {
      this.setState({
        selectedItem: this.props.question.answer
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.question) && this.props.question.answer && !isEmpty(String(nextProps.question.answer))) {
      this.setState({
        selectedItem: this.props.question.answer
      });
    }
  }

  isSelectedItemPresentInList(selectedVal) {
    if (isEmpty(selectedVal) || isEmpty(this.state.items)) return false;
    var isPresent = false;
    for(var i=0; i<this.state.items.length; i++) {
      if (this.state.items[i].id == selectedVal.id) {
        isPresent = true;
      }
    }
    return isPresent;
  }

  onItemChange(val) {
    if (true) {//this.isSelectedItemPresentInList(val)) {
      this.setState({
        selectedItem: val,
        onceChanged: true
      });
      this.props.onChange(this.props.question, val);
    } else {
      this.setState({
        showInvalidAnswerSelectedMsg: true
      });
    }
  }
  lastSearch = null
  onTextSearch(search, page, prev) {
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
        if (response.questions && response.questions.LOGIN_URL && response.questions.LOGIN_URL.length > 0) {
          window.location.href = response.questions.LOGIN_URL;
          return;
        }
        if (response.questions && response.questions.redirect_url && response.questions.redirect_url.length > 0) {
          window.location.href = response.questions.redirect_url;
          return;
        }
        if (response && response.questions && response.questions.data) {
          this.setState({
            items: response.questions.data
          });
          if (isEmpty(response.questions.data)) {
            this.setState({
              showInvalidAnswerSelectedMsg: true
            });
          } else {
            this.setState({
              showInvalidAnswerSelectedMsg: false
            });
          }
        } else {
          this.setState({
            reposMessage: this.props.question.label,
            reposMore: null
          });
          this.setState({
            showInvalidAnswerSelectedMsg: true
          });
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
  onSearchCustomization(e) {
    const searchDebounce = 250;
    if (e.target.parentElement.className === "autosuggest-input-choice") {
      clearTimeout(this._searchTimeoutId)
      this._searchTimeoutId = setTimeout(() => {
        this._searchTimeoutId = null
        if (e.target.value != this.state.searchValue) {
          this.setState({ searchValue: e.target.value })
          this.onTextSearch(e.target.value);
        }
      }, searchDebounce);
    }
  }
  componentDidMount() {
    var self = this;
    document.addEventListener("keyup", this.onSearchCustomization, false);
  }
  componentWillUnmount(){
    var self = this;
    document.removeEventListener("keyup", this.onSearchCustomization, false);
  }
  validate() {
    //if(!this.props.alreadyOnceSubmitted) {return true;}
    if (!this.state.onceChanged) {
      if (!this.props.alreadyOnceSubmitted) {
        return true;
      }
    }
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
     <div id={question.id.replace(/[^a-zA-Z0-9]/g, "")}>
        <Col sm={12} className={"c-subheader-text fs18"} style={{marginTop: "5px", paddingLeft: "0px", marginBottom: "18px"}}>
          {question.constraints && question.constraints.required && <span style={{color: "rgb(255, 73, 73)", marginRight: "9px"}}>*</span>}
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
                multiple
                datalistOnly={true} />
                {question.hint && <Col className="help-text" style={{marginTop: "12px"}}>
                  {question.hint}
                  </Col>
                }
            </Row>

            <Col className={`c-subheader-text error fs16`} style={{paddingLeft: "0px", marginTop: "0px"}}>
              {!this.validate() &&
                <div className="input" style={{marginTop: "5px", color: "#ff4949"}}>
                  {question.constraints.patternViolationMessage || "Required"}
                </div>
              }
              {question.answerState=="invalid" &&
                <div className="input" style={{marginTop: "5px", color: "#ff4949"}}>
                  {"Invalid"}
                </div>
              }
              {this.state.showInvalidAnswerSelectedMsg &&
                <div className="input" style={{marginTop: "5px", color: "#ff4949"}}>
                  {"Please search and select the answer from the list of items."}
                </div>
              }
            </Col>
          </Col>
      </div>
    );
  }
}
