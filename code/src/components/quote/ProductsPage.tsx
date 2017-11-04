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

  submitProductsFormOnEditPerson() {

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
      this.state;
    }).catch(()=>{
      this.submmitedProductForm = false;
    });
  },
  submitProductsForm() {

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
    }).catch(()=>{
      this.submmitedProductForm = false;
    });
  },
  openEditPersonModal = (person, personIndex) => {
    this.props.openEditPersonModal(person, personIndex);
  },
  public render() {
    var {persons} = this.props;
    persons = persons || [];
    const personsContainerWidth = this.props.noOfPersons == 2 ? 4 : 8;
    return (
      <div className="product-pager-container">
        <Subheader />
        <Row style={{backgroundColor: "rgb(247, 247, 247)"}}>
          <Col sm={8} style={{marginLeft: "auto",marginRight: "auto", float: "none"}}>
            { this.props.noOfPersons>=1 &&
              <PersonInfo 
                person={persons[0]}
                noOfPersons={this.props.noOfPersons}
                personIndex={0}
                index={0}
                openEditPersonModal={this.openEditPersonModal.bind(this)}
              />
            }
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
        <ProductHeader />
        <Row style={{backgroundColor: "rgb(247, 247, 247)"}} className={this.props.noOfPersons==2 ? "two-product-outer-container": "one-product-outer-container"}>
          <Col sm={8} className="c-center">
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


        <Row>
          <Col sm={4} style={{ marginLeft: "auto", marginRight: "auto", float: "none"}}>
            <Button className="c-button-default circular" onClick={(){
                this.submitProductsForm()
              }}
            >
              CONTINUE
            </Button>
          </Col>
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