import * as React from 'react';
import * as Autocomplete from "react-autocomplete"
import * as moment from "moment";
import {Link} from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import {each, isEmpty, uniq, each, intersection, map} from "underscore";
import {submitQuoteForm, submitPlansForm, submitEmailForm, submitProductsForm, setPersonsData, openEditPersonModal, closeEditPersonModal, handleEditChange} from '../../actions/Quote';
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
  persons: [any]
}

class ProductsPage extends React.Component<Props, {}> {
  constructor(){
    super();
  },
  componentDidMount () {
    console.log("DDFDSD");
    setTimeout(() => {
      this._scrollView.scrollTo({y: 100})
    }, 1)
  },
  componentWillMount() {
    if (isEmpty(this.props.products) && isEmpty(this.props.persons)) {
      const basePath = this.props.location.pathname.indexOf("agent") > 1 ? "/agent" : "/";
      browserHistory.push(basePath);
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
  },

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
  },

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
  },

  state={
    productId0: []
    productId1: []
  },
  handleEditChange(person) {
    this.props.handleEditChange(person);
    setTimeout(()=> {
      this.submitProductsFormOnEditPerson();
    });
  },
  validateProductsFormSubmission () {
    if(this.props.noOfPersons == 2) {
      return (this.state.productId0.length > 0 && this.state.productId1.length > 0)
    } else {
      return this.state.productId0.length > 0;
    }
  },
  submitProductsFormOnEditPerson() {
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

      this.props.submitQuoteForm(persons).then(() => {
        this.setState({
          submittingProductsInfo: false
        });
      }).catch(()=>{
        this.submmitedProductForm = false;
        this.setState({
          submittingProductsInfo: false
        });
      });
    } else {
      this.setProductFormSubmissionErrorMsg();
    }
  },

  getContinueBtnActiveClass() {

    if(this.props.noOfPersons == 2) {
      if(this.state.productId0.length > 0 && this.state.productId1.length > 0) return "active"; 
    } else if(this.state.productId0.length > 0) {return "active";}

    return "";

  },
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
        const basePath = this.props.location.pathname.indexOf("agent") >=0 ? "/agent/" : "/";
        browserHistory.push(basePath + "plans");
        this.setState({
          submittingProductsInfo: true
        });
      }).catch(()=>{
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
  },
  openEditPersonModal = (person, personIndex) => {
    this.props.openEditPersonModal(person, personIndex);
  },
  shouldDisplayBackBtn() {
    var shouldRedirect = isEmpty(this.props.products) || isEmpty(this.props.products[0]);
    if(this.props.noOfPersons == 2) {
      shouldRedirect = isEmpty(this.props.products) || isEmpty(this.props.products[1]);
    }
    return shouldRedirect;
  },
  redirectToMainPage() {
    const basePath = this.props.location.pathname.indexOf("agent") >=0 ? "/agent/" : "/";
    browserHistory.push(basePath);
  },
  public render() {
    var {persons} = this.props;
    persons = persons || [];
    const personsContainerWidth = this.props.noOfPersons == 2 ? 4 : 8;
    return (
      <div className="product-pager-container" ref={(c) => { this._scrollView = c; }}>
        <ScrollToTopOnMount />
        <Subheader />
        <div className="visible-xs"><ProductHeader /> </div>
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
        <div className="hidden-xs"><ProductHeader /> </div>
        <Row style={{backgroundColor: "rgb(247, 247, 247)"}} className={this.props.noOfPersons==2 ? "two-product-outer-container": "one-product-outer-container"}>
          <Col className="c-center all-products-info-container">
            <Row>
              { this.props.products && this.props.products.length >=1 && this.props.products[0] ? 
                <ProductContainer 
                  productInfo={this.props.products[0]}
                  selectProduct={this.selectProductForIndex.bind(this)}
                  personIndex={0}
                  person={this.props.persons[0]}
                  noOfPersons={this.props.noOfPersons}
                  productValidations={this.props.productValidations}
                  productIds={this.state.productId0}
                /> : <NoProducts />
              }

              <Row style={{backgroundColor: "rgb(247, 247, 247)"}} className="visible-xs">
                <Col className="all-persons-info-container" className="visible-xs" style={{marginLeft: "auto",marginRight: "auto", float: "none"}}>
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
              { this.props.products && this.props.products.length==2 && this.props.products[1] ?
                  <ProductContainer 
                    productInfo={this.props.products[1]}
                    selectProduct={this.selectProductForIndex.bind(this)}
                    personIndex={1}
                    person={this.props.persons[1]}
                    noOfPersons={this.props.noOfPersons}
                    productValidations={this.props.productValidations}
                    productIds={this.state.productId1}
                  />  : this.props.products && this.props.products.length==2 ? <NoProducts /> : null 
              }
            </Row>
          </Col>
        </Row>


        <Row className="product-continue-btn-main-container">
          {!this.shouldDisplayBackBtn() && <Col sm={3} xs={12} className="product-continue-btn-container" style={{ marginLeft: "auto", marginRight: "auto", float: "none"}}>
            {this.state.productSelectionErrorMsg && <Col style={{textAlign: "center", color: "red", paddingLeft: "0px", marginBottom: "15px"}} sm={12} className={"c-subheader-text error"}>
                      {this.state.productSelectionErrorMsg}
                    </Col> }
            <Button className={`c-button-default circular hidden-xs ${this.getContinueBtnActiveClass()}`} onClick={(){
                this.submitProductsForm()
              }}
              style={{ marginTop: "0px", marginBottom: "60px"}}
            >
              CONTINUE
              {this.state.submittingProductsInfo && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
            </Button>
            <Button className={`c-button-default visible-xs ${this.getContinueBtnActiveClass()}`} style={{marginBottom: "15px"}} onClick={(){
                this.submitProductsForm()
              }}
            >
              CONTINUE
              {this.state.submittingProductsInfo && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> }
            </Button>
          </Col>
          }
          {this.shouldDisplayBackBtn() && <Col sm={3} xs={11} className="product-page-continue-btn" style={{ marginTop: "15px", marginLeft: "auto", marginRight: "auto", float: "none"}}>
            <Button className="c-button-default circular hidden-xs" onClick={(){
                this.redirectToMainPage()
              }}
              style={{ marginTop: "0px", marginBottom: "60px"}}
            >
              BACK
            </Button>
            <Button className="c-button-default visible-xs" style={{marginBottom: "15px"}} onClick={(){
                this.redirectToMainPage()
              }}
            >
              BACK
            </Button>
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
    productValidations: state.quotes.productValidations
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