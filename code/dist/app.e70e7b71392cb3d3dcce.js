webpackJsonp([0],{0:function(e,t,n){"use strict";var r=n(1),o=n(37),s=n(184),a=n(247),i=n(547);function u(e,t){n.e(3,function(){return t(null,n(554).default)})}function c(e,t){n.e(3,function(){return t(null,n(903).default)})}function p(e,t){n.e(3,function(){return t(null,n(909).default)})}function l(e,t){n.e(3,function(){return t(null,n(981).default)})}function f(e,t){n.e(3,function(){return t(null,n(986).default)})}function d(e,t){n.e(3,function(){return t(null,n(987).default)})}s.browserHistory.listen(function(e){window._mfq=window._mfq||[],window._mfq.push(["newPageView"])}),o.render(r.createElement(s.Router,{history:s.browserHistory},r.createElement(s.Route,{path:"/",component:a.default},r.createElement(s.IndexRoute,{onEnter:function(e,t,n){i.getQuoteAccess(e.location.query,function(e){return!(null==e||null==e||!e.access)&&n()})},getComponent:u}),r.createElement(s.Route,{path:"/products",getComponent:c}),r.createElement(s.Route,{path:"/plans",getComponent:p}),r.createElement(s.Route,{path:"/next-steps",getComponent:function(e,t){n.e(3,function(){return t(null,n(971).default)})}}),r.createElement(s.Route,{path:"/questions",getComponent:function(e,t){n.e(3,function(){return t(null,n(712).default)})}}),r.createElement(s.Route,{path:"/authorize",getComponent:function(e,t){n.e(3,function(){return t(null,n(734).default)})}}),r.createElement(s.Route,{path:"/error",getComponent:function(e,t){n.e(3,function(){return t(null,n(737).default)})}}),r.createElement(s.Route,{path:"/all-questions",getComponent:function(e,t){n.e(3,function(){return t(null,n(738).default)})}}),r.createElement(s.Route,{path:"/edit-questions",getComponent:function(e,t){n.e(3,function(){return t(null,n(901).default)})}}),r.createElement(s.Route,{path:"/edit-questions/beneficiaries",getComponent:function(e,t){n.e(3,function(){return t(null,n(902).default)})}}),r.createElement(s.Route,{path:"/signature",getComponent:function(e,t){n.e(3,function(){return t(null,n(739).default)})}}),r.createElement(s.Route,{path:"/offer",getComponent:function(e,t){n.e(3,function(){return t(null,n(740).default)})}}),r.createElement(s.Route,{path:"/payment_success",getComponent:function(e,t){n.e(3,function(){return t(null,n(988).default)})}}),r.createElement(s.Route,{path:"/payment",getComponent:function(e,t){n.e(3,function(){return t(null,n(989).default)})}}),r.createElement(s.Route,{path:"/unsubscribe",getComponent:function(e,t){n.e(3,function(){return t(null,n(990).default)})}}),r.createElement(s.Route,{path:"/agent",getComponent:u}),r.createElement(s.Route,{path:"/agent/products",getComponent:c}),r.createElement(s.Route,{path:"/agent/plans",getComponent:p}),r.createElement(s.Route,{path:"/agent/next-steps",getComponent:function(e,t){n.e(3,function(){return t(null,n(977).default)})}}),r.createElement(s.Route,{path:"/connect-to-agent",getComponent:l}),r.createElement(s.Route,{path:"/connect-through-application",getComponent:function(e,t){n.e(3,function(){return t(null,n(984).default)})}}),r.createElement(s.Route,{path:"/agent/connect-to-agent",getComponent:l}),r.createElement(s.Route,{path:"/connect-agent-success",getComponent:f}),r.createElement(s.Route,{path:"/agent/connect-agent-success",getComponent:f}),r.createElement(s.Route,{path:"/email-to-quote",getComponent:function(e,t){n.e(3,function(){return t(null,n(982).default)})}}),r.createElement(s.Route,{path:"/agent/email-to-quote",getComponent:function(e,t){n.e(3,function(){return t(null,n(983).default)})}}),r.createElement(s.Route,{path:"/agent/connect-through-application",getComponent:function(e,t){n.e(3,function(){return t(null,n(985).default)})}}),r.createElement(s.Route,{path:"/agent/email-quote-success",getComponent:d}),r.createElement(s.Route,{path:"/email-quote-success",getComponent:d}),r.createElement(s.Route,{path:"/customer",getComponent:u}),r.createElement(s.Route,{path:"/quote",getComponent:u}),r.createElement(s.Route,{path:"/about",getComponent:function(e,t){n.e(1,function(){return t(null,n(552).default)})}}),r.createElement(s.Route,{path:"*",getComponent:function(e,t){n.e(2,function(){return t(null,n(553).default)})}}))),document.getElementById("root"))},247:function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);function r(){this.constructor=e}e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},o=n(1),s=n(248),a=n(268),i=n(278),u=n(279),c=n(541),p=n(280),l=n(546);window.errorLogsApiIns=new l.default;var f=s.createStore(c.default,s.applyMiddleware(i.default));window.reduxDispatch=f.dispatch;var d=function(e){function t(){e.apply(this,arguments)}return r(t,e),t.prototype.render=function(){var e="/payment"==this.props.location.pathname;return o.createElement(a.Provider,{store:f},o.createElement("div",{className:""},!e&&o.createElement(u.default,{logoImgSrc:"../images/logo.svg",location:this.props.location}),o.createElement("div",{className:"c-body"},this.props.children),!e&&o.createElement(p.Row,{className:"c-footer hidden-xs",style:{marginBottom:"0px"}},o.createElement(p.Col,{xs:8,className:"c-footer-content c-center"},o.createElement(p.Row,null,o.createElement(p.Col,null,"Site Map »  Privacy Policy »"),o.createElement(p.Col,null,"© Copyright 2018 Vantis Life Insurance Company, Windsor, Connecticut, USA - All Rights Reserved."),o.createElement(p.Col,null,'Vantis, Vantis Life, and "A better life experience" are registered trademarks of Vantis Life Insurance Company.'),o.createElement(p.Col,null,"Life insurance and annuities issued by Vantis Life Insurance Company, Windsor, CT (all states except NY) and by Vantis Life Insurance Company of New York, Brewster, NY (NY only). Products not available in all states and state variations may apply."))))))},t}(o.Component);Object.defineProperty(t,"__esModule",{value:!0}),t.default=d},268:function(e,t,n){"use strict";t.__esModule=!0,t.connect=t.Provider=void 0;var r=s(n(269)),o=s(n(274));function s(e){return e&&e.__esModule?e:{default:e}}t.Provider=r.default,t.connect=o.default},269:function(e,u,c){(function(e){"use strict";u.__esModule=!0,u.default=void 0;var t=c(1),n=s(c(270)),r=s(c(272)),o=s(c(273));function s(e){return e&&e.__esModule?e:{default:e}}var a=!1;var i=function(r){function o(e,t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,r.call(this,e,t));return n.store=e.store,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(o,r),o.prototype.getChildContext=function(){return{store:this.store}},o.prototype.render=function(){return t.Children.only(this.props.children)},o}(t.Component);u.default=i,"production"!==e.env.NODE_ENV&&(i.prototype.componentWillReceiveProps=function(e){this.store!==e.store&&(a||(a=!0,(0,o.default)("<Provider> does not support changing `store` on the fly. It is most likely that you see this error because you updated to Redux 2.x and React Redux 2.x which no longer hot reload reducers automatically. See https://github.com/reactjs/react-redux/releases/tag/v2.0.0 for the migration instructions.")))}),i.propTypes={store:r.default.isRequired,children:n.default.element.isRequired},i.childContextTypes={store:r.default.isRequired}}).call(u,c(3))},272:function(e,t,n){"use strict";t.__esModule=!0;var r,o=n(270),s=(r=o)&&r.__esModule?r:{default:r};t.default=s.default.shape({subscribe:s.default.func.isRequired,dispatch:s.default.func.isRequired,getState:s.default.func.isRequired})},273:function(e,t){"use strict";t.__esModule=!0,t.default=function(e){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(e);try{throw new Error(e)}catch(e){}}},274:function(e,t,n){(function(g){"use strict";t.__esModule=!0;var y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:{},u=Boolean(e),p=e||i,l=void 0;l="function"==typeof t?t:t?(0,a.default)(t):c;var f=n||N,o=r.pure,d=void 0===o||o,s=r.withRef,h=void 0!==s&&s,m=d&&f!==N,P=C++;return function(c){var e,a="Connect("+((e=c).displayName||e.name||"Component")+")";function i(e,t){(0,v.default)(e)||(0,b.default)(t+"() in "+a+" must return a plain object. Instead received "+e+".")}var t=function(o){function s(e,t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,o.call(this,e,t));n.version=P,n.store=e.store||t.store,(0,S.default)(n.store,'Could not find "store" in either the context or props of "'+a+'". Either wrap the root component in a <Provider>, or explicitly pass "store" as a prop to "'+a+'".');var r=n.store.getState();return n.state={storeState:r},n.clearCache(),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(s,o),s.prototype.shouldComponentUpdate=function(){return!d||this.haveOwnPropsChanged||this.hasStoreStateChanged},s.prototype.computeStateProps=function(e,t){if(!this.finalMapStateToProps)return this.configureFinalMapState(e,t);var n=e.getState(),r=this.doStatePropsDependOnOwnProps?this.finalMapStateToProps(n,t):this.finalMapStateToProps(n);return"production"!==g.env.NODE_ENV&&i(r,"mapStateToProps"),r},s.prototype.configureFinalMapState=function(e,t){var n=p(e.getState(),t),r="function"==typeof n;return this.finalMapStateToProps=r?n:p,this.doStatePropsDependOnOwnProps=1!==this.finalMapStateToProps.length,r?this.computeStateProps(e,t):("production"!==g.env.NODE_ENV&&i(n,"mapStateToProps"),n)},s.prototype.computeDispatchProps=function(e,t){if(!this.finalMapDispatchToProps)return this.configureFinalMapDispatch(e,t);var n=e.dispatch,r=this.doDispatchPropsDependOnOwnProps?this.finalMapDispatchToProps(n,t):this.finalMapDispatchToProps(n);return"production"!==g.env.NODE_ENV&&i(r,"mapDispatchToProps"),r},s.prototype.configureFinalMapDispatch=function(e,t){var n=l(e.dispatch,t),r="function"==typeof n;return this.finalMapDispatchToProps=r?n:l,this.doDispatchPropsDependOnOwnProps=1!==this.finalMapDispatchToProps.length,r?this.computeDispatchProps(e,t):("production"!==g.env.NODE_ENV&&i(n,"mapDispatchToProps"),n)},s.prototype.updateStatePropsIfNeeded=function(){var e=this.computeStateProps(this.store,this.props);return(!this.stateProps||!(0,_.default)(e,this.stateProps))&&(this.stateProps=e,!0)},s.prototype.updateDispatchPropsIfNeeded=function(){var e=this.computeDispatchProps(this.store,this.props);return(!this.dispatchProps||!(0,_.default)(e,this.dispatchProps))&&(this.dispatchProps=e,!0)},s.prototype.updateMergedPropsIfNeeded=function(){var e=function(e,t,n){var r=f(e,t,n);"production"!==g.env.NODE_ENV&&i(r,"mergeProps");return r}(this.stateProps,this.dispatchProps,this.props);return!(this.mergedProps&&m&&(0,_.default)(e,this.mergedProps))&&(this.mergedProps=e,!0)},s.prototype.isSubscribed=function(){return"function"==typeof this.unsubscribe},s.prototype.trySubscribe=function(){u&&!this.unsubscribe&&(this.unsubscribe=this.store.subscribe(this.handleChange.bind(this)),this.handleChange())},s.prototype.tryUnsubscribe=function(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null)},s.prototype.componentDidMount=function(){this.trySubscribe()},s.prototype.componentWillReceiveProps=function(e){d&&(0,_.default)(e,this.props)||(this.haveOwnPropsChanged=!0)},s.prototype.componentWillUnmount=function(){this.tryUnsubscribe(),this.clearCache()},s.prototype.clearCache=function(){this.dispatchProps=null,this.stateProps=null,this.mergedProps=null,this.haveOwnPropsChanged=!0,this.hasStoreStateChanged=!0,this.haveStatePropsBeenPrecalculated=!1,this.statePropsPrecalculationError=null,this.renderedElement=null,this.finalMapDispatchToProps=null,this.finalMapStateToProps=null},s.prototype.handleChange=function(){if(this.unsubscribe){var e=this.store.getState(),t=this.state.storeState;if(!d||t!==e){if(d&&!this.doStatePropsDependOnOwnProps){var n=function(e,t){try{return e.apply(t)}catch(e){return T.value=e,T}}(this.updateStatePropsIfNeeded,this);if(!n)return;n===T&&(this.statePropsPrecalculationError=T.value),this.haveStatePropsBeenPrecalculated=!0}this.hasStoreStateChanged=!0,this.setState({storeState:e})}}},s.prototype.getWrappedInstance=function(){return(0,S.default)(h,"To access the wrapped instance, you need to specify { withRef: true } as the fourth argument of the connect() call."),this.refs.wrappedInstance},s.prototype.render=function(){var e=this.haveOwnPropsChanged,t=this.hasStoreStateChanged,n=this.haveStatePropsBeenPrecalculated,r=this.statePropsPrecalculationError,o=this.renderedElement;if(this.haveOwnPropsChanged=!1,this.hasStoreStateChanged=!1,this.haveStatePropsBeenPrecalculated=!1,this.statePropsPrecalculationError=null,r)throw r;var s=!0,a=!0;d&&o&&(s=t||e&&this.doStatePropsDependOnOwnProps,a=e&&this.doDispatchPropsDependOnOwnProps);var i=!1,u=!1;n?i=!0:s&&(i=this.updateStatePropsIfNeeded()),a&&(u=this.updateDispatchPropsIfNeeded());return!(!!(i||u||e)&&this.updateMergedPropsIfNeeded())&&o?o:(this.renderedElement=h?(0,E.createElement)(c,y({},this.mergedProps,{ref:"wrappedInstance"})):(0,E.createElement)(c,this.mergedProps),this.renderedElement)},s}(E.Component);return t.displayName=a,t.WrappedComponent=c,t.contextTypes={store:w.default},t.propTypes={store:w.default},"production"!==g.env.NODE_ENV&&(t.prototype.componentWillUpdate=function(){this.version!==P&&(this.version=P,this.trySubscribe(),this.clearCache())}),(0,O.default)(t,c)}};var E=n(1),w=e(n(272)),_=e(n(275)),a=e(n(276)),b=e(n(273)),v=e(n(250)),O=e(n(277)),S=e(n(192));function e(e){return e&&e.__esModule?e:{default:e}}var i=function(e){return{}},c=function(e){return{dispatch:e}},N=function(e,t,n){return y({},n,e,t)};var T={value:null};var C=0}).call(t,n(3))},275:function(e,t){"use strict";t.__esModule=!0,t.default=function(e,t){if(e===t)return!0;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(var o=Object.prototype.hasOwnProperty,s=0;s<n.length;s++)if(!o.call(t,n[s])||e[n[s]]!==t[n[s]])return!1;return!0}},276:function(e,t,n){"use strict";t.__esModule=!0,t.default=function(t){return function(e){return(0,r.bindActionCreators)(t,e)}};var r=n(248)},277:function(e,t,n){var r;r=function(){"use strict";var c={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},p={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},l=Object.defineProperty,f=Object.getOwnPropertyNames,d=Object.getOwnPropertySymbols,h=Object.getOwnPropertyDescriptor,m=Object.getPrototypeOf,P=m&&m(Object);return function e(t,n,r){if("string"!=typeof n){if(P){var o=m(n);o&&o!==P&&e(t,o,r)}var s=f(n);d&&(s=s.concat(d(n)));for(var a=0;a<s.length;++a){var i=s[a];if(!(c[i]||p[i]||r&&r[i])){var u=h(n,i);try{l(t,i,u)}catch(e){}}}return t}return t}},e.exports=r()},279:function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);function r(){this.constructor=e}e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},o=n(1),s=n(280),a=n(539),i=n(540),u=n(268),c=function(e){function t(){e.apply(this,arguments)}return r(t,e),t.prototype.shouldShowAgentLinks=function(){var e=this.props.location.query;return!i.isEmpty(e.agent_number)||1==this.props.is_agent},t.prototype.render=function(){return o.createElement(s.Navbar,{className:"cf-nav-main-header"},o.createElement(s.Navbar.Header,null,o.createElement("div",null,o.createElement("span",null,o.createElement("img",{className:"navbar-brand",src:this.props.logoImgSrc})),this.shouldShowAgentLinks()&&o.createElement("span",{className:"navbar-links"},window.goAgentWeb&&o.createElement("a",{href:window.goAgentWeb,className:"first-link"},"Go Agent Web"),window.lifetimeAgentPanel&&o.createElement("a",{href:window.lifetimeAgentPanel},"Lifetime Agent Panel")))),o.createElement(s.Navbar.Text,{pullRight:!0},o.createElement("div",{className:"header-text",style:{marginLeft:"22px",fontSize:"16px"}},o.createElement("div",{style:{textAlign:"right"}},"Need help?",o.createElement("a",{href:this.props.phoneNumberDetails?this.props.phoneNumberDetails.phone_number_href:"tel:1-866-826-8471"},o.createElement("img",{className:"visible-xs",style:{float:"right",paddingLeft:"10px",paddingTop:"4px"},src:"../images/small-phone.svg"}))),o.createElement("div",{className:"hidden-xs",style:{fontSize:"18px"}},o.createElement(a.default,{phoneNumber:this.props.phoneNumberDetails})))))},t}(o.Component);Object.defineProperty(t,"__esModule",{value:!0}),t.default=u.connect(function(e){var t={products:e.quotes.products,plans:e.quotes.plans,persons:e.quotes.persons,noOfPersons:e.selectPersons.noOfPersons,is_agent:e.quotes.is_agent,premiums:e.quotes.premiums};return e&&e.quotes&&e.quotes.phoneNumberDetails&&(t.phoneNumberDetails=e.quotes.phoneNumberDetails),e&&e.questions&&e.questions&&e.questions.questions&&e.questions.questions.extra_params&&e.questions.questions.extra_params.phone_number&&(t.phoneNumberDetails=e.questions.questions.extra_params.phone_number),e&&e.questions&&e.questions.confirmationData&&e.questions.confirmationData.extra_params&&e.questions.confirmationData.extra_params.phone_number&&(t.phoneNumberDetails=e.questions.confirmationData.extra_params.phone_number),t},function(e){return{}})(c)},539:function(e,t,n){"use strict";var r=n(1),o=r.createClass({render:function(){return this.props.phoneNumber?r.createElement("a",{href:this.props.phoneNumber.phone_number_href},this.props.phoneNumber.phone_number_text):r.createElement("div",null)}});Object.defineProperty(t,"__esModule",{value:!0}),t.default=o},541:function(e,t,n){"use strict";var r=n(248),o=n(542),s=n(543),a=n(544),i=n(545);Object.defineProperty(t,"__esModule",{value:!0}),t.default=r.combineReducers({states:o.default,quotes:s.default,questions:a.default,selectPersons:i.default})},542:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){switch(void 0===e&&(e=[]),t.type){case"MEMBERS_ASSIGN":return t.members.slice();default:return e}}},543:function(e,t,n){"use strict";var a=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){switch(void 0===e&&(e=[]),t.type){case"SUMBMITTED_PERSONAL_INFO":var n={products:t.products,productValidations:t.productValidations,isProductFetchCallDone:!0,is_agent:t.is_agent,saveQuoteOptions:t.saveQuoteOptions,uniqueTransactionId:t.uniqueTransactionId};return a({},e,n);case"SUMBMITTED_PRODUCTS_INFO":return a({},e,{plans:t.plans});case"SUMBMITTED_PLANS_INFO":var r;return t.premiums&&t.premiums.LOGIN_URL&&0<t.premiums.LOGIN_URL.length?a({},e,{premiums:t.premiums}):t.premiums&&t.premiums.redirect_url&&0<t.premiums.redirect_url.length?a({},e,{premiums:t.premiums}):(!(r=e.premiums?JSON.parse(JSON.stringify(e.premiums)):t.premiums)[1]&&t.premiums[1]&&(r[1]=t.premiums[1]),r[0]&&t.premiums[0]&&(r[0].input_data=t.premiums[0].input_data,t.premiums[0].plans_data&&t.premiums[0].plans_data.ProductID&&(r[0][t.premiums[0].plans_data.ProductID]=t.premiums[0].plans_data)),r[1]&&t.premiums[1]&&(r[1].input_data=t.premiums[1].input_data,t.premiums[1].plans_data&&t.premiums[1].plans_data.ProductID&&(r[1][t.premiums[1].plans_data.ProductID]=t.premiums[1].plans_data)),a({},e,{premiums:r}));case"SETTING_PERSONS_INFO":return a({},e,{persons:t.persons});case"SETTING_TYPE_OF_SUBMISSION":return a({},e,{typeOfSubmission:t.typeOfSubmission});case"OPEN_EDIT_PERSON_MODAL":return a({},e,{showModalEditPerson:!0,editablePerson:t.editablePerson,editablePersonIndex:t.editablePersonIndex});case"CLOSE_EDIT_PERSON_MODAL":return a({},e,{showModalEditPerson:!1,editablePerson:{}});case"EDITED_PERSON":var o=JSON.parse(JSON.stringify(t.person)),s=JSON.parse(JSON.stringify(e.persons));return s[parseInt(o.applicant)-1]=o,a({},e,{editablePerson:o,persons:s});case"SUMBMITTED_SAVE_QUOTE":return a({},e,{quoteResponse:t.quoteResponse});case"SUMBMITTED_EMAIL_INFO":return a({},e,{isSubmmitedEmailForm:t.isSubmmitedPlansForm});case"GOT_PHONE_NUMBER_DETAILS":return a({},e,{phoneNumberDetails:t.phoneNumberDetails});default:return e}}},544:function(e,t,n){"use strict";var r=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){switch(void 0===e&&(e=[]),t.type){case"FETCHING_QUESTIONS":return r({},e,{questions:t.questions});case"SET_GOOGLE_QUESTIONS_ANSWER_MAP":return r({},e,{googlePlacesQuestionsAnswersMap:t.googlePlacesQuestionsAnswersMap});case"POSTING_QUESTIONS":return r({},e,{questions:t.questions});case"CONFIRM_QUESTIONS":return r({},e,{confirmationData:t.confirmationData});case"MADE_PAYMENT":return r({},e,{paymentData:t.paymentData});case"AUTHENTICATE_USER":case"PASSWORD_RESET":return r({},e,{user:t.user});case"POST_PAYMENT_DONE":return r({},e,{paymentInfo:t.paymentInfo});case"RESEND_LINK_SENT":return r({},e,{resendData:t.resendData,resendLinkDone:!0});case"GET_UNSUBSCRIBITIONS_OPTIONS":return r({},e,{unsubscribeOptions:t.unsubscribeOptions});case"POST_UNSUBSCRIBITIONS_OPTIONS":return r({},e,{thanksMessage:t.thanksMessage});default:return e}}},545:function(e,t,n){"use strict";var r=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){switch(void 0===e&&(e=[]),t.type){case"NUMBER_OF_PERSONS_SELECTED":return r({},e,{noOfPersons:t.noOfPersons});default:return e}}},546:function(e,t){"use strict";window.totalErrorPosted=0,new Promise(function(t){var e=window,n=new(e.RTCPeerConnection||e.mozRTCPeerConnection||e.webkitRTCPeerConnection)({iceServers:[]}),r=function(){};n.createDataChannel(""),n.createOffer(function(e){return n.setLocalDescription(e,r,r)},r),n.onicecandidate=function(e){try{e.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(t)}catch(e){}}}).then(function(e){window.currentBrowserIpAddress=e}).catch(function(e){return console.error(e)}),window.currentBrowserTimezoneOffset=(new Date).getTimezoneOffset(),window.currentBrowserTimezoneOffsetFormatted=(new Date).toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1];window.onerror=function(e,t,n,r,o){var s={};s.apiName=t,s.errorMessage=e,s.inputParams={lineNumber:n,column:r},s.expection=o.stack,window.totalErrorPosted<10&&6e4<(new Date).getTime()-window.lastErrorPostedTime&&window.errorLogsApiIns.submit(s)};var n=function(){function e(){}return e.prototype.submit=function(e){window.totalErrorPosted++,window.lastErrorPostedTime=(new Date).getTime();var t=String(window.location.search)+"&ipAddress="+window.currentBrowserIpAddress+"&timezoneOffset="+window.currentBrowserTimezoneOffset+NaN+window.currentBrowserTimezoneOffsetFormatted+"&currentTime=";return t+=(new Date).getTime(),fetch("/v1/error/logs"+t,{method:"POST",body:JSON.stringify(e),headers:{Accept:"application/json","Content-Type":"application/json"},credentials:"include"}).then(function(e){return e.json().then(function(n){return new Promise(function(e,t){e(n)})})})},e}();new n;Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},547:function(e,t,n){"use strict";var r=n(548);t.getQuoteAccess=function(e,t){return r.default.getQuoteAccess(e).then(function(e){t(e.data),e&&e.data&&e.data.phone_number?reduxDispatch({type:"GOT_PHONE_NUMBER_DETAILS",phoneNumberDetails:e.data.phone_number}):reduxDispatch({type:"ERROR_IN_FETCHING_PHONE_NUMBER_DETAILS",phoneNumberDetails:null})})}},548:function(e,t,n){"use strict";var r=n(549),o=n(551);new o.Promise(function(t){var e=window,n=new(e.RTCPeerConnection||e.mozRTCPeerConnection||e.webkitRTCPeerConnection)({iceServers:[]}),r=function(){};n.createDataChannel(""),n.createOffer(function(e){return n.setLocalDescription(e,r,r)},r),n.onicecandidate=function(e){try{e.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(t)}catch(e){}}}).then(function(e){window.currentBrowserIpAddress=e}).catch(function(e){return console.error(e)}),window.currentBrowserTimezoneOffset=(new Date).getTimezoneOffset(),window.currentBrowserTimezoneOffsetFormatted=(new Date).toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1];var s=function(){function e(){}return e.prototype.getQuoteAccess=function(e){var t=String(window.location.search)+"&ipAddress="+window.currentBrowserIpAddress+"&timezoneOffset="+window.currentBrowserTimezoneOffset+"&timezoneFormatted="+window.currentBrowserTimezoneOffsetFormatted+"&currentTime=";return t+=(new Date).getTime(),r("/v1/quote/access"+t,{method:"POST",body:JSON.stringify(e),headers:{Accept:"application/json","Content-Type":"application/json"},credentials:"include"}).then(function(e){return e.json().then(function(n){return new o.Promise(function(e,t){e(n)})})})},e}();Object.defineProperty(t,"__esModule",{value:!0}),t.default=new s}});