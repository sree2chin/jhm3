import * as React from 'react';
import * as Autocomplete from "react-autocomplete"
import * as moment from "moment";
import {Link} from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {Button, Row, Col, FormGroup, Radio} from "react-bootstrap";
import {each, isEmpty} from "underscore";
import {submitQuoteForm, submitPlansForm, submitEmailForm, submitProductsForm, setPersonsData} from '../../actions/Quote';
const objectAssign = require('object-assign');
import ProductHeader from "./ProductHeader";
import ProductContainer from "./ProductContainer";
import PersonInfo from "./PersonInfo";
import Subheader from "../common/subheader";
import { browserHistory } from 'react-router';

interface Props {
  persons: [any]
}

class ProductsPage extends React.Component<Props, {}> {
  constructor(){
    super();
  },
  componentWillMount() {
    if (isEmpty(this.props.products) && isEmpty(this.props.persons)) {
      const basePath = this.props.location.pathname.indexOf("agent") > 1 ? "/agent" : "/";
      browserHistory.push(basePath);
    }
  },

  selectProduct(product) {
    this.setState({
      productId: product.ProductID
    });
  },
  state={},
  submitProductsForm() {

    const persons = [];

    const personOne = JSON.parse(JSON.stringify(this.props.persons[0]));
    personOne.s_birthDate = moment(personOne.s_birthDate).format("YYYY-MM-DD");
    personOne.sProductID = this.state.productId;

    persons.push(personOne);

    if(this.props.noOfPersons == 2) {
      const personTwo = JSON.parse(JSON.stringify(this.props.persons[1]));
      personTwo.s_birthDate = moment(personTwo.s_birthDate).format("YYYY-MM-DD");
      personTwo.applicant = "2";
      persons.push(personTwo);
    }

    this.props.setPersonsData(persons);

    this.props.submitProductsForm(persons).then(() => {
      const basePath = this.props.location.pathname.length > 1 ? this.props.location.pathname + "/" : this.props.location.pathname;
      browserHistory.push(basePath + "plans");
    }).catch(()=>{
      this.submmitedProductForm = false;
    });
  },
  public render() {
    var {persons} = this.props;
    persons = persons || [];
    const personsContainerWidth = this.props.noOfPersons == 2 ? 4 : 8;
    return (
      <div className="product-pager-container">
        <Subheader />
        { this.props.noOfPersons==1 &&
          <PersonInfo 
            person={persons[0]}
          />
        }
        { this.props.noOfPersons==2 &&
          <PersonInfo 
            person={persons[1]}
          />
        }
        <ProductHeader />
        <Row style={{backgroundColor: "rgb(247, 247, 247)"}}>
          <Col sm={8} className="c-center">
            <ProductContainer 
              productInfo={this.props.products[0]}
              selectProduct={this.selectProduct.bind(this)}
            />
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

      </div>);
  }
}

const mapStateToProps = (state: any): Props => {
  return {
    persons: state.quotes.persons,
    products: state.quotes.products,
    noOfPersons: state.selectPersons.noOfPersons
  };
}

const mapDispatchToProps = (dispatch: Dispatch): Props => {
  return {
    setPersonsData: (data) => {
      return dispatch(setPersonsData(data))
    },
    submitProductsForm: (data) => {
      return dispatch(submitProductsForm(data))
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);