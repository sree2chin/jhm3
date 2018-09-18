import * as React from 'react';
import * as Autocomplete from "react-autocomplete"
import * as moment from "moment";
import {Link} from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import {each, isEmpty, uniq, intersection, map, without} from "underscore";
import {submitQuoteForm, submitPlansForm, submitProductsForm, setPersonsData, openEditPersonModal, closeEditPersonModal, handleEditChange} from '../../actions/Quote';
const objectAssign = require('object-assign');
import ProductHeader from "./ProductHeader";
import ProductContainer from "./ProductContainer";
import PersonInfo from "./PersonInfo";
import Subheader from "../common/subheader";
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";
import { browserHistory } from 'react-router';
import EditPerson from "./EditPerson";
import NoProducts from "./NoProducts"


interface Props {
  persons: [any],
  noOfPersons: number,
  products: any,
  setPersonsData: any,
  handleEditChange: any,
  submitQuoteForm: any,
  showModalEditPerson: any
}

class ProductsPage extends React.Component<Props, {}> {
  constructor(){
    super();
  }
  componentDidMount () {
    console.log("DDFDSD");
    setTimeout(() => {
      //this._scrollView.scrollTo({y: 100})
    }, 1)
  }
  componentWillMount() {
    var queryParams = this.props.location.query;
    var queryParamsString = "?";
    for(var k in queryParams) {
      if (queryParams[k]) {
        queryParamsString += k + "=" + queryParams[k] + "&";
      } else {
        queryParamsString += k + "&"
      }
    }
    queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);
    if (isEmpty(this.props.products) && isEmpty(this.props.persons)) {
      const basePath = this.props.location.pathname.indexOf("agent") > 1 || this.props.is_agent ? "/agent" : "/";
      //browserHistory.push(basePath + queryParamsString);
      window.location.href = basePath + queryParamsString;
      return;
    }
    if(this.props.persons && this.props.persons[0] && this.props.products && this.props.products[0] && this.props.products[0].products_data) {
      const productList = this.props.products[0].products_data.products_list;
      var productId0 = [];
      if(!isEmpty(this.props.persons[0].selected_products)) {
        var productListIds = map(productList, (product) {
          return product.ProductID
        });
        productId0 = intersection(this.props.persons[0].selected_products, productListIds);
      }
      this.setState({
        productId0: productId0
      });
    }
    if(this.props.persons && this.props.persons[1] && this.props.products && this.props.products[1] && this.props.products[1].products_data){
      const productList = this.props.products[1].products_data.products_list;
      var productId1 = [];
      if(!isEmpty(this.props.persons[1].selected_products)) {
        var productListIds = map(productList, (product) {
          return product.ProductID
        });
        productId1 = intersection(this.props.persons[1].selected_products, productListIds);
      }
      this.setState({
        productId1: productId1
      });
    }
  }

  selectProductForIndex(personIndex, product) {
    var productsList = JSON.parse(JSON.stringify(this.state["productId" + personIndex]));

    productsList.push(product.ProductID);
    productsList = uniq(productsList);
    this.setState({
      ["productId" + personIndex]: productsList
    });
    var self = this;
    setTimeout(function() {
      self.setProductFormSubmissionErrorMsg();
    }, 10);
  }

  deSelectProductForIndex(personIndex, product) {
    var productsList = JSON.parse(JSON.stringify(this.state["productId" + personIndex]));
    productsList =  without(productsList, product.ProductID );

    this.setState({
      ["productId" + personIndex]: productsList
    });
    var self = this;
    setTimeout(function() {
      self.setProductFormSubmissionErrorMsg();
    }, 10);

  }
  setProductFormSubmissionErrorMsg() {
    if(this.productSubmissionBtnClicked) {
      var errorMsg = null;
      if(this.props.noOfPersons == 2) {
        if(!(this.state.productId0.length > 0)) {
          if(!(this.state.productId1.length > 0)) {
            errorMsg = "Please select at least one product for each applicant";
          } else {
            errorMsg = "Please select a product for applicant 1";
          }
        } else {
          if(!(this.state.productId1.length > 0)) {
            errorMsg = "Please select a product for applicant 2";
          }
        }
      } else {
        if(!(this.state.productId0.length > 0)) {
          errorMsg = "Please select at least one product";
        }
      }
      this.setState({
        productSelectionErrorMsg: errorMsg
      });
    }
  }

  state={
    productId0: [],
    productId1: []
  }
  handleEditChange(person, isFromEditModal) {
    this.props.handleEditChange(person);
    setTimeout(()=> {
      this.submitProductsFormOnEditPerson(isFromEditModal);
    });
  }
  validateProductsFormSubmission (isFromEditModal) {
    if(this.props.noOfPersons == 2) {
      return (this.state.productId0.length > 0 && this.state.productId1.length > 0)
    } else {
      return this.state.productId0.length > 0;
    }
  }
  validateQuoteForm() {
    var result = true;
    var errors = [];
    each (this.props.persons, (person, index) => {
      if(index < this.props.noOfPersons) {
        const {s_birthDate, s_gender, state, smoke, health, name} = person;

        const s_birthDateError = !(s_birthDate && moment(s_birthDate).format("YYYY-MM-DD").length > 0);
        const s_genderError = !(s_gender ==1 || s_gender ==2);
        const stateError = !(state && state.length > 0);
        const smokeError = !(smoke=="Yes" || smoke=="No");
        const healthError = !(health);
        const nameError = !(name && name.length > 0);

        errors.push({
          s_birthDateError,
          s_genderError,
          stateError,
          smokeError,
          healthError,
          nameError
        });
        result = result && !(s_birthDateError || s_genderError || stateError || smokeError || healthError);
      }
    });
    this.setState({
      errors
    });

    return result;
  }
  submitQuoteForm() {
    if(this.validateQuoteForm()) {

      const persons = [];
      this.setState({
        submittingUserInfo: true
      });
      const personOne = JSON.parse(JSON.stringify(this.props.persons[0]));
      personOne.s_birthDate = moment(personOne.s_birthDate).format("YYYY-MM-DD");
      personOne.applicant = "1";
      persons.push(personOne);

      if(this.props.noOfPersons == 2) {
        const personTwo = JSON.parse(JSON.stringify(this.props.persons[1]));
        personTwo.s_birthDate = moment(personTwo.s_birthDate).format("YYYY-MM-DD");
        personTwo.applicant = "2";
        persons.push(personTwo);
      }

      this.props.setPersonsData(persons);

      this.props.submitQuoteForm(persons).then(() => {
        if (this.props.products && this.props.products.LOGIN_URL && this.props.products.LOGIN_URL.length > 0) {
          window.location.href = this.props.products.LOGIN_URL;
          return;
        }
        if (this.props.products && this.props.products.redirect_url && this.props.products.redirect_url.length > 0) {
          window.location.href = this.props.products.redirect_url;
          return;
        }
        this.setState({
          submittingUserInfo: false
        });
        return;
      }).catch(()=>{
        var queryParams = this.props.location.query;
        var queryParamsString = "?";
        for(var k in queryParams) {
          if (queryParams[k]) {
            queryParamsString += k + "=" + queryParams[k] + "&";
          } else {
            queryParamsString += k + "&";
          }
        }
        queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);
        browserHistory.push("/products" + queryParamsString);
        this.setState({
          submittingUserInfo: false
        });
      });
    }
  }
  submitProductsFormOnEditPerson(isFromEditModal) {
    this.productSubmissionBtnClicked = true;
    if(this.validateProductsFormSubmission(isFromEditModal)) {
      this.setState({
        submittingProductsInfo: true
      });

      const persons = [];

      const personOne = JSON.parse(JSON.stringify(this.props.persons[0]));
      personOne.sBirthDate = moment(personOne.s_birthDate).format("YYYY-MM-DD");
      personOne.s_birthDate = moment(personOne.s_birthDate);
      personOne.selected_products = this.state.productId0;
      personOne.applicant = "1";
      personOne.sGender = personOne.s_gender;

      persons.push(personOne);

      if(this.props.noOfPersons == 2) {
        const personTwo = JSON.parse(JSON.stringify(this.props.persons[1]));
        personTwo.sBirthDate = moment(personTwo.s_birthDate).format("YYYY-MM-DD");
        personOne.s_birthDate = moment(personOne.s_birthDate);
        personTwo.selected_products = this.state.productId1;
        personTwo.applicant = "2";
        personTwo.sGender = personTwo.s_gender;
        persons.push(personTwo);
      }

      this.props.setPersonsData(persons);

      this.props.submitQuoteForm(persons).then(() => {
        if (this.props.products && this.props.products.LOGIN_URL && this.props.products.LOGIN_URL.length > 0) {
          window.location.href = this.props.products.LOGIN_URL;
          return;
        }
        if (this.props.products && this.props.products.redirect_url && this.props.products.redirect_url.length > 0) {
          window.location.href = this.props.products.redirect_url;
          return;
        }
        this.setState({
          submittingProductsInfo: false
        });
      }).catch(()=>{
        if (this.props.products && this.props.products.LOGIN_URL && this.props.products.LOGIN_URL.length > 0) {
          window.location.href = this.props.products.LOGIN_URL;
          return;
        }
        if (this.props.products && this.props.products.redirect_url && this.props.products.redirect_url.length > 0) {
          window.location.href = this.props.products.redirect_url;
          return;
        }
        this.submmitedProductForm = false;
        this.setState({
          submittingProductsInfo: false
        });
      });
    } else if(isFromEditModal) {
      this.submitQuoteForm();
    } else {
      this.setProductFormSubmissionErrorMsg();
    }
  }

  getContinueBtnActiveClass() {

    if(this.props.noOfPersons == 2) {
      if(this.state.productId0.length > 0 && this.state.productId1.length > 0) return "active";
    } else if(this.state.productId0.length > 0) {return "active";}

    return "";

  }
  submitProductsForm() {
    this.productSubmissionBtnClicked = true;
    if(this.validateProductsFormSubmission()) {
      this.setState({
        submittingProductsInfo: true
      });

      const persons = [];

      const personOne = JSON.parse(JSON.stringify(this.props.persons[0]));
      personOne.sBirthDate = moment(personOne.s_birthDate).format("YYYY-MM-DD");
      personOne.selected_products = this.state.productId0;
      personOne.applicant = "1";
      personOne.sGender = personOne.s_gender;

      persons.push(personOne);

      if(this.props.noOfPersons == 2) {
        const personTwo = JSON.parse(JSON.stringify(this.props.persons[1]));
        personTwo.sBirthDate = moment(personTwo.s_birthDate).format("YYYY-MM-DD");
        personTwo.selected_products = this.state.productId1;
        personTwo.applicant = "2";
        personTwo.sGender = personTwo.s_gender;
        persons.push(personTwo);
      }

      this.props.setPersonsData(persons);

      this.props.submitProductsForm(persons).then(() => {
        if (this.props.plans && this.props.plans.LOGIN_URL && this.props.plans.LOGIN_URL.length > 0) {
          window.location.href = this.props.plans.LOGIN_URL;
          return;
        }
        if (this.props.plans && this.props.plans.redirect_url && this.props.plans.redirect_url.length > 0) {
          window.location.href = this.props.plans.redirect_url;
          return;
        }
        var queryParams = this.props.location.query;
        var queryParamsString = "?";
        for(var k in queryParams) {
          if (queryParams[k]) {
            queryParamsString += k + "=" + queryParams[k] + "&";
          } else {
            queryParamsString += k + "&";
          }
        }
        queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);
        const basePath = this.props.location.pathname.indexOf("agent") >=0 || this.props.is_agent ? "/agent/" : "/";
        browserHistory.push(basePath + "plans" + queryParamsString);
        this.setState({
          submittingProductsInfo: true
        });
      }).catch(()=>{
        if (this.props.plans && this.props.plans.LOGIN_URL && this.props.plans.LOGIN_URL.length > 0) {
          window.location.href = this.props.plans.LOGIN_URL;
          return;
        }
        if (this.props.plans && this.props.plans.redirect_url && this.props.plans.redirect_url.length > 0) {
          window.location.href = this.props.plans.redirect_url;
          return;
        }
        this.submmitedProductForm = false;
        this.setState({
          submittingProductsInfo: true
        });
      });
    } else {
      var errorMsg = "";
      if(this.props.noOfPersons == 2) {
        if(!(this.state.productId0.length > 0)) {
          if(!(this.state.productId1.length > 0)) {
            errorMsg = "Please select at least one product for each applicant";
          } else {
            errorMsg = "Please select a product for applicant 1";
          }
        } else {
          errorMsg = "Please select a product for applicant 2";
        }
      } else {
        if(!(this.state.productId0.length > 0)) {
          errorMsg = "Please select at least one product";
        }
      }
      this.setState({
        productSelectionErrorMsg: errorMsg
      })
    }
  }
  openEditPersonModal = (person, personIndex) => {
    this.props.openEditPersonModal(person, personIndex);
  }
  shouldDisplayBackBtn() {
    return true;
    var shouldRedirect = isEmpty(this.props.products) || isEmpty(this.props.products[0]);
    if(this.props.noOfPersons == 2) {
      shouldRedirect = isEmpty(this.props.products) || isEmpty(this.props.products[1]);
    }
    return shouldRedirect;
  }
  redirectToMainPage() {
    var queryParams = this.props.location.query;
    var queryParamsString = "?";
    for(var k in queryParams) {
      if (queryParams[k]) {
        queryParamsString += k + "=" + queryParams[k] + "&";
      } else {
        queryParamsString += k + "&";
      }
    }
    queryParamsString = queryParamsString.substring(0, queryParamsString.length-1);
    const basePath = this.props.location.pathname.indexOf("agent") >=0 || this.props.is_agent ? "/agent/" : "/";
    //browserHistory.push(basePath + queryParamsString);
    window.location.href = basePath + queryParamsString;
    return;
  }
  isEmptyProducts() {

  }
  public render() {
    var {persons} = this.props;
    persons = persons || [];
    const personsContainerWidth = this.props.noOfPersons == 2 ? 4 : 8;
    return (
      <div className="product-pager-container" ref={(c) => { this._scrollView = c; }}>
        <ScrollToTopOnMount />
        <Subheader
          location={this.props.location}
          products={this.props.products}
          plans={this.props.plans}
          premiums={this.props.premiums}
        />
        <div className="visible-xs">
        { this.props.products && this.props.products.length >=1 && this.props.products[0] &&
                this.props.products[0].products_data && this.props.products[0].products_data.products_list &&
                this.props.products[0].products_data.products_list.length > 0 &&
                <ProductHeader />
        }
        </div>
        <Row style={{backgroundColor: "rgb(247, 247, 247)"}}>
          <Col className="all-persons-info-container" style={{marginLeft: "auto",marginRight: "auto", float: "none"}}>
            { this.props.noOfPersons>=1 &&
              <PersonInfo
                person={persons[0]}
                noOfPersons={this.props.noOfPersons}
                personIndex={0}
                index={0}
                openEditPersonModal={this.openEditPersonModal.bind(this)}
              />
            }
            <div className="hidden-xs">
              { this.props.noOfPersons==2 &&
                <PersonInfo
                  person={persons[1]}
                  noOfPersons={this.props.noOfPersons}
                  personIndex={1}
                  index={1}
                  openEditPersonModal={this.openEditPersonModal.bind(this)}
                />
              }
            </div>
          </Col>
        </Row>
        <div className="hidden-xs">
          { this.props.products && this.props.products.length >=1 && this.props.products[0] &&
                  this.props.products[0].products_data && this.props.products[0].products_data.products_list &&
                  this.props.products[0].products_data.products_list.length > 0 &&
                  <ProductHeader />
          }
         </div>
        <Row style={{backgroundColor: "rgb(247, 247, 247)"}} className={this.props.noOfPersons==2 ? "two-product-outer-container": "one-product-outer-container"}>
          <Col className="c-center all-products-info-container container-max-width">
            <Row>
              { this.props.products && this.props.products.length >=1 && this.props.products[0] &&
                this.props.products[0].products_data && this.props.products[0].products_data.products_list &&
                this.props.products[0].products_data.products_list.length > 0 ?
                <ProductContainer
                  productInfo={this.props.products[0]}
                  selectProduct={this.selectProductForIndex.bind(this)}
                  deSelectProduct={this.deSelectProductForIndex.bind(this)}
                  personIndex={0}
                  person={this.props.persons[0]}
                  noOfPersons={this.props.noOfPersons}
                  productValidations={this.props.productValidations}
                  productIds={this.state.productId0}
                /> : <NoProducts noOfPersons={this.props.noOfPersons} />
              }

              <Row style={{backgroundColor: "rgb(247, 247, 247)"}} className="visible-xs">
                <Col className="all-persons-info-container" style={{marginLeft: "auto",marginRight: "auto", float: "none"}}>
                  <div className="hidden-xs">
                  { this.props.noOfPersons>=1 &&
                    <PersonInfo
                      person={persons[0]}
                      noOfPersons={this.props.noOfPersons}
                      personIndex={0}
                      index={0}
                      openEditPersonModal={this.openEditPersonModal.bind(this)}
                    />
                  }
                  </div>
                  { this.props.noOfPersons==2 &&
                    <PersonInfo
                      person={persons[1]}
                      noOfPersons={this.props.noOfPersons}
                      personIndex={1}
                      index={1}
                      openEditPersonModal={this.openEditPersonModal.bind(this)}
                    />
                  }
                </Col>
              </Row>
              { this.props.products && this.props.products.length >=1 && this.props.products[1] &&
                this.props.products[1].products_data && this.props.products[1].products_data.products_list &&
                this.props.products[0].products_data.products_list.length > 0 ?
                  <ProductContainer
                    productInfo={this.props.products[1]}
                    selectProduct={this.selectProductForIndex.bind(this)}
                    deSelectProduct={this.deSelectProductForIndex.bind(this)}
                    personIndex={1}
                    person={this.props.persons[1]}
                    noOfPersons={this.props.noOfPersons}
                    productValidations={this.props.productValidations}
                    productIds={this.state.productId1}
                  />  : this.props.products && this.props.products.length==2 ? <NoProducts noOfPersons={this.props.noOfPersons} /> : null
              }
            </Row>
          </Col>
        </Row>


        <Row className="product-continue-btn-main-container">
          {<Col xs={12} className="product-continue-btn-container container-max-width"
            style={{ marginLeft: "auto", marginRight: "auto", float: "none", paddingLeft: "0px", marginTop: "30px"}}>
            <div style={{width: "100%"}}>
              <span className="previous-btn-text hidden-xs" onClick={()=>{
                  this.redirectToMainPage()
                }}
              >
                PREVIOUS
              </span>
              <Button className="c-button-default visible-xs back-btn" style={{backgroundColor: "#fb4d3d!important", marginBottom: "15px"}} onClick={(){
                  this.redirectToMainPage()
                }}
              >
                PREVIOUS
              </Button>
              <Button style={{ marginTop: "10px", marginBottom: "15px", marginLeft: "17px"}} className={`c-button-default circular hidden-xs ${this.getContinueBtnActiveClass()}`} onClick={(){
                  this.submitProductsForm()
                }}
              >
                NEXT
                {this.state.submittingProductsInfo && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
              </Button>
              <Button className={`c-button-default visible-xs ${this.getContinueBtnActiveClass()}`} style={{marginBottom: "15px"}} onClick={()=>{
                  this.submitProductsForm()
                }}
              >
                NEXT
                {this.state.submittingProductsInfo && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
              </Button>
            </div>
            {this.state.productSelectionErrorMsg && <Col style={{textAlign: "center", color: "red", paddingLeft: "0px", marginBottom: "15px"}} sm={12} className={"c-subheader-text error"}>
                      {this.state.productSelectionErrorMsg}
                    </Col> }
          </Col>
          }
        </Row>

        <EditPerson
          showModalEditPerson={this.props.showModalEditPerson}
          onCloseModal={this.props.closeEditPersonModal.bind(this)}
          editablePerson={this.props.editablePerson}
          personIndex={this.props.editablePersonIndex}
          handleChange={this.handleEditChange.bind(this)}
        />
      </div>);
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    persons: state.quotes.persons,
    products: state.quotes.products,
    isProductFetchCallDone: state.quotes.isProductFetchCallDone,
    showModalEditPerson: state.quotes.showModalEditPerson,
    noOfPersons: state.selectPersons.noOfPersons,
    editablePerson: state.quotes.editablePerson,
    editablePersonIndex: state.quotes.editablePersonIndex,
    productValidations: state.quotes.productValidations,
    is_agent: state.quotes.is_agent,
    premiums: state.quotes.premiums
  };
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
    submitQuoteForm: (data) => {return dispatch(submitQuoteForm(data))},
    setPersonsData: (data) => {
      return dispatch(setPersonsData(data))
    },
    submitProductsForm: (data) => {
      return dispatch(submitProductsForm(data));
    },
    openEditPersonModal: (person, personIndex) => {
      return dispatch(openEditPersonModal(person, personIndex))
    },
    closeEditPersonModal: () => {
      return dispatch(closeEditPersonModal())
    },
    handleEditChange: (person) => {
      return dispatch(handleEditChange(person));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);