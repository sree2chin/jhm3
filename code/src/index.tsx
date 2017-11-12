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

function loadNextStepsPage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/quote/NextSteps") as typeof _QuotePage).default),
    "QuotePage");
}

function loadAgentNextStepsPage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/quote/AgentNextSteps") as typeof _QuotePage).default),
    "QuotePage");
}

function loadContactAgent(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/quote/ContactAgent") as typeof _QuotePage).default),
    "QuotePage");
}
function loadContactAgentSuccess(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/quote/ContactAgentSuccess") as typeof _QuotePage).default),
    "QuotePage");
}



ReactDOM.render(
  <Router history={browserHistory}>
    <Route  path="/" component= {App} >
      
      <IndexRoute getComponent={ loadQuotePage } />
      <Route path="/products" getComponent={ loadProductsPage } />
      <Route path="/plans" getComponent={ loadPlansPage } />
      <Route path="/next-steps" getComponent={ loadNextStepsPage } />

      <Route path="/agent" getComponent={ loadQuotePage } />
      <Route path="/agent/products" getComponent={ loadProductsPage } />
      <Route path="/agent/plans" getComponent={ loadPlansPage } />
      <Route path="/agent/next-steps" getComponent={ loadAgentNextStepsPage } />

      <Route path="/connect-to-agent" getComponent={ loadContactAgent } />
      <Route path="/agent/connect-to-agent" getComponent={ loadContactAgent } />


      <Route path="/connect-agent-success" getComponent={ loadContactAgentSuccess } />
      <Route path="/agent/connect-agent-success" getComponent={ loadContactAgentSuccess } />

      
      <Route path="/email-to-quote" getComponent={ loadAgentNextStepsPage } />
      <Route path="/agent/email-to-quote" getComponent={ loadAgentNextStepsPage } />

      <Route path="/agent/email-quote-success" getComponent={ loadAgentNextStepsPage } />
      <Route path="/email-quote-success" getComponent={ loadAgentNextStepsPage } />


      <Route path="/customer" getComponent={ loadQuotePage } />
      <Route path="/quote" getComponent={ loadQuotePage } />
      <Route path="/about" getComponent={ loadAboutPage } />
      <Route path="/member" getComponent={ loadMemberPage } />
      <Route path="/memberEdit/:id" getComponent={ loadMemberPage } />
    </Route>
  </Router>,
  document.getElementById('root'));
