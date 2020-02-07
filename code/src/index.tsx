import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IndexRoute, browserHistory,  } from 'react-router';
import { BrowserRouter as Route, Router } from 'react-router-dom';
import App from './components/app';
import * as _AboutPage from "./components/about/aboutPage";
import * as _QuotePage from "./components/quote/main";
import * as _QuestionsPage from "./components/questions/main";
import * as _AllQuestionsPage from "./components/questions/all";
import * as Access from "./actions/Access";
import {isEmpty} from "underscore";
import { PAGES_LIST } from "./pages";

type LoadCallback = (error: any, component: React.ComponentClass<any>) => void;

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function loadAboutPage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/about/aboutPage") as typeof _AboutPage).default),
    "AboutPage");
};

function loadErrorRedirectPage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/error/error404Page") as typeof _Error404).default),
    "Error404");
};

function loadQuotePage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/quote/main") as typeof _QuotePage).default),
    "QuotePage");
}

function loadQuestionsPage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/questions/main") as typeof _QuestionsPage).default),
    "QuotePage");
}

function loadAuthorisePage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/questions/authorise") as typeof _QuestionsPage).default),
    "QuotePage");
}

function loadErrorPage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/questions/error") as typeof _QuestionsPage).default),
    "QuotePage");
}

function allQuestionsPage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/questions/all") as typeof _QuestionsPage).default),
    "QuotePage");
}

function getSignaturePage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/questions/signature") as typeof _QuestionsPage).default),
    "QuotePage");
}

function getOfferPage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/questions/offer") as typeof _QuestionsPage).default),
    "QuotePage");
}

function editQuestionsPage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/questions/editQuestion") as typeof _QuestionsPage).default),
    "QuotePage");
}

function editBeneficiaryQuestionsPage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/questions/editBeneficiaryQuestion") as typeof _QuestionsPage).default),
    "QuotePage");
}

function editSignaturePage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/questions/editQuestion") as typeof _QuestionsPage).default),
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

function loadEmailToQuote(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/quote/EmailToQuote") as typeof _QuotePage).default),
    "QuotePage");
}

function loadAgentEmailToQuote(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/quote/AgentEmailToQuote") as typeof _QuotePage).default),
    "QuotePage");
}


function loadEmailCaptureToQuote(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/quote/EmailToQuoteCapture") as typeof _QuotePage).default),
    "QuotePage");
}

function loadAgentEmailCaptureToQuote(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/quote/AgentEmailToQuoteCapture") as typeof _QuotePage).default),
    "QuotePage");
}

function loadContactAgentSuccess(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/quote/ContactAgentSuccess") as typeof _QuotePage).default),
    "QuotePage");
}

function loadEmailToQuoteSuccess(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/quote/EmailToQuoteSuccess") as typeof _QuotePage).default),
    "QuotePage");
}

function loadPaymentSuccessPage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/questions/PaymentSuccess") as typeof _QuestionsPage).default),
    "QuotePage");
}

function loadPaymentPage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/questions/payment") as typeof _QuestionsPage).default),
    "QuotePage");
}

function loadUnsubscribePage(location: any, callback: LoadCallback) {
  require.ensure(
    [],
    () => callback(null, (require("./components/questions/unsubscribe") as typeof _QuestionsPage).default),
    "QuotePage");
}

function checkAccessable(nextState, replace, callback) {      
  window.initialTagManager = window.initialTagManager || [];
  Access.getQuoteAccess(nextState.location.query, function(res){
    window.uniqueTransactionId = res.uniqueTransactionId;
    window.initialTagManager = res.tag_manager;
    if (res.firstTime) {
      window.dataLayer.push({
        'event':'VirtualPageView',
        'virtualPageURL': 'VirtualPageView',
        'virtualPageTitle' : PAGES_LIST.LANDING_PAGE.page_title,
                  'VirtualPageVisitAgentNumber': getUrlParameter("agent_number"),
                  'VirtualPageVisitTransactionId': res.uniqueTransactionId
      });
    }
    if(res != undefined && res != null && res.data && res.data.access){
      return callback();  
    }
    return false;
  })
}

var onRouteChange = ()=>{
  window._mfq = window._mfq || [];
  window._mfq.push(["newPageView"]);
};
// browserHistory.listen( location =>  {
//   window._mfq = window._mfq || [];
//   window._mfq.push(["newPageView"]);
//  });

ReactDOM.render(
  <Router history={browserHistory}>
    <Route  path="/" component= {App} >
      <Route
        path={"/"}
        render={props => (
          // pass the sub-routes down to keep nesting
          <div {...props}> {"dddsd"}</div>
        )}
      />      
    </Route>
  </Router>,
  document.getElementById('root'));
