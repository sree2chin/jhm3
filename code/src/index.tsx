import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/app.tsx';
import * as _AboutPage from "./components/about/aboutPage";
import * as _MemberPage from "./components/member/memberPage";
import * as _MembersPage from "./components/members/membersPage";
import * as _QuotePage from "./components/quote/main";

type LoadCallback = (error: any, component: React.ComponentClass<any>) => void;

function loadAboutPage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/about/aboutPage") as typeof _AboutPage).default),
    "AboutPage");
};

function loadMemberPage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/member/memberPage") as typeof _MemberPage).default),
    "MemberPages");
}

function loadMembersPage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/members/membersPage") as typeof _MembersPage).default),
    "MemberPages");
}

function loadQuotePage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/quote/main") as typeof _QuotePage).default),
    "QuotePage");
}

function loadProductsPage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/quote/ProductsPage") as typeof _QuotePage).default),
    "QuotePage");
}

function loadPlansPage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/quote/PlansPage") as typeof _QuotePage).default),
    "QuotePage");
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route  path="/" component= {App} >
      <IndexRoute getComponent={ loadQuotePage } />
      <Route path="/agent" getComponent={ loadQuotePage } />
      <Route path="/products" getComponent={ loadProductsPage } />
      <Route path="/products/plans" getComponent={ loadPlansPage } />
      <Route path="/agent/products/plans" getComponent={ loadPlansPage } />
      <Route path="/agent/products" getComponent={ loadProductsPage } />
      <Route path="/customer" getComponent={ loadQuotePage } />
      <Route path="/quote" getComponent={ loadQuotePage } />
      <Route path="/about" getComponent={ loadAboutPage } />
      <Route path="/member" getComponent={ loadMemberPage } />
      <Route path="/memberEdit/:id" getComponent={ loadMemberPage } />
    </Route>
  </Router>,
  document.getElementById('root'));
