webpackJsonp([0],{0:function(e,t,n){"use strict";var r=n(1),o=n(37),a=n(184),s=n(247);function i(e,t){n.e(2,function(){return t(null,n(550).default)})}function u(e,t){n.e(3,function(){return t(null,n(568).default)})}function c(e,t){n.e(3,function(){return t(null,n(811).default)})}function p(e,t){n.e(3,function(){return t(null,n(977).default)})}function l(e,t){n.e(3,function(){return t(null,n(989).default)})}function d(e,t){n.e(3,function(){return t(null,n(990).default)})}function f(e,t){n.e(3,function(){return t(null,n(991).default)})}function h(e,t){n.e(3,function(){return t(null,n(992).default)})}function m(e,t){n.e(3,function(){return t(null,n(993).default)})}o.render(r.createElement(a.Router,{history:a.browserHistory},r.createElement(a.Route,{path:"/",component:s.default},r.createElement(a.IndexRoute,{getComponent:u}),r.createElement(a.Route,{path:"/products",getComponent:c}),r.createElement(a.Route,{path:"/plans",getComponent:p}),r.createElement(a.Route,{path:"/next-steps",getComponent:function(e,t){n.e(3,function(){return t(null,n(981).default)})}}),r.createElement(a.Route,{path:"/questions",getComponent:function(e,t){n.e(3,function(){return t(null,n(782).default)})}}),r.createElement(a.Route,{path:"/authorize",getComponent:function(e,t){n.e(3,function(){return t(null,n(802).default)})}}),r.createElement(a.Route,{path:"/error",getComponent:function(e,t){n.e(3,function(){return t(null,n(805).default)})}}),r.createElement(a.Route,{path:"/all-questions",getComponent:function(e,t){n.e(3,function(){return t(null,n(806).default)})}}),r.createElement(a.Route,{path:"/edit-questions",getComponent:function(e,t){n.e(3,function(){return t(null,n(809).default)})}}),r.createElement(a.Route,{path:"/edit-questions/beneficiaries",getComponent:function(e,t){n.e(3,function(){return t(null,n(810).default)})}}),r.createElement(a.Route,{path:"/signature",getComponent:function(e,t){n.e(3,function(){return t(null,n(807).default)})}}),r.createElement(a.Route,{path:"/offer",getComponent:function(e,t){n.e(3,function(){return t(null,n(808).default)})}}),r.createElement(a.Route,{path:"/payment_success",getComponent:function(e,t){n.e(3,function(){return t(null,n(994).default)})}}),r.createElement(a.Route,{path:"/payment",getComponent:function(e,t){n.e(3,function(){return t(null,n(995).default)})}}),r.createElement(a.Route,{path:"/agent",getComponent:u}),r.createElement(a.Route,{path:"/agent/products",getComponent:c}),r.createElement(a.Route,{path:"/agent/plans",getComponent:p}),r.createElement(a.Route,{path:"/agent/next-steps",getComponent:function(e,t){n.e(3,function(){return t(null,n(987).default)})}}),r.createElement(a.Route,{path:"/connect-to-agent",getComponent:l}),r.createElement(a.Route,{path:"/connect-through-application",getComponent:f}),r.createElement(a.Route,{path:"/agent/connect-to-agent",getComponent:l}),r.createElement(a.Route,{path:"/connect-agent-success",getComponent:h}),r.createElement(a.Route,{path:"/agent/connect-agent-success",getComponent:h}),r.createElement(a.Route,{path:"/email-to-quote",getComponent:d}),r.createElement(a.Route,{path:"/agent/email-to-quote",getComponent:d}),r.createElement(a.Route,{path:"/agent/connect-through-application",getComponent:f}),r.createElement(a.Route,{path:"/agent/email-quote-success",getComponent:m}),r.createElement(a.Route,{path:"/email-quote-success",getComponent:m}),r.createElement(a.Route,{path:"/customer",getComponent:u}),r.createElement(a.Route,{path:"/quote",getComponent:u}),r.createElement(a.Route,{path:"/about",getComponent:function(e,t){n.e(1,function(){return t(null,n(549).default)})}}),r.createElement(a.Route,{path:"/member",getComponent:i}),r.createElement(a.Route,{path:"/memberEdit/:id",getComponent:i}))),document.getElementById("root"))},247:function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);function r(){this.constructor=e}e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},o=n(1),a=n(248),s=n(268),i=n(278),u=n(279),c=n(540),p=n(280),l=a.createStore(c.default,a.applyMiddleware(i.default)),d=function(e){function t(){e.apply(this,arguments)}return r(t,e),t.prototype.render=function(){var e="/payment"==this.props.location.pathname;return o.createElement(s.Provider,{store:l},o.createElement("div",{className:""},!e&&o.createElement(u.default,{logoImgSrc:"../images/logo.svg"}),o.createElement("div",{className:"c-body"},this.props.children),!e&&o.createElement(p.Row,{className:"c-footer hidden-xs",style:{marginBottom:"0px"}},o.createElement(p.Col,{xs:8,className:"c-footer-content c-center"},o.createElement(p.Row,null,o.createElement(p.Col,null,"Site Map »  Privacy Policy »"),o.createElement(p.Col,null,"© Copyright 2018 Vantis Life Insurance Company, Windsor, Connecticut, USA - All Rights Reserved."),o.createElement(p.Col,null,'Vantis, Vantis Life, and "A better life experience" are registered trademarks of Vantis Life Insurance Company.'),o.createElement(p.Col,null,"Life insurance and annuities issued by Vantis Life Insurance Company, Windsor, CT (all states except NY) and by Vantis Life Insurance Company of New York, Brewster, NY (NY only). Products not available in all states and state variations may apply."))))))},t}(o.Component);Object.defineProperty(t,"__esModule",{value:!0}),t.default=d},268:function(e,t,n){"use strict";t.__esModule=!0,t.connect=t.Provider=void 0;var r=a(n(269)),o=a(n(274));function a(e){return e&&e.__esModule?e:{default:e}}t.Provider=r.default,t.connect=o.default},269:function(e,u,c){(function(e){"use strict";u.__esModule=!0,u.default=void 0;var t=c(1),n=a(c(270)),r=a(c(272)),o=a(c(273));function a(e){return e&&e.__esModule?e:{default:e}}var s=!1;var i=function(r){function o(e,t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,r.call(this,e,t));return n.store=e.store,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(o,r),o.prototype.getChildContext=function(){return{store:this.store}},o.prototype.render=function(){return t.Children.only(this.props.children)},o}(t.Component);u.default=i,"production"!==e.env.NODE_ENV&&(i.prototype.componentWillReceiveProps=function(e){this.store!==e.store&&(s||(s=!0,(0,o.default)("<Provider> does not support changing `store` on the fly. It is most likely that you see this error because you updated to Redux 2.x and React Redux 2.x which no longer hot reload reducers automatically. See https://github.com/reactjs/react-redux/releases/tag/v2.0.0 for the migration instructions.")))}),i.propTypes={store:r.default.isRequired,children:n.default.element.isRequired},i.childContextTypes={store:r.default.isRequired}}).call(u,c(3))},272:function(e,t,n){"use strict";t.__esModule=!0;var r,o=n(270),a=(r=o)&&r.__esModule?r:{default:r};t.default=a.default.shape({subscribe:a.default.func.isRequired,dispatch:a.default.func.isRequired,getState:a.default.func.isRequired})},273:function(e,t){"use strict";t.__esModule=!0,t.default=function(e){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(e);try{throw new Error(e)}catch(e){}}},274:function(e,t,n){(function(E){"use strict";t.__esModule=!0;var P=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:{},u=Boolean(e),p=e||i,l=void 0;l="function"==typeof t?t:t?(0,s.default)(t):c;var d=n||N,o=r.pure,f=void 0===o||o,a=r.withRef,h=void 0!==a&&a,m=f&&d!==N,y=R++;return function(c){var e,s="Connect("+((e=c).displayName||e.name||"Component")+")";function i(e,t){(0,S.default)(e)||(0,b.default)(t+"() in "+s+" must return a plain object. Instead received "+e+".")}var t=function(o){function a(e,t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,o.call(this,e,t));n.version=y,n.store=e.store||t.store,(0,C.default)(n.store,'Could not find "store" in either the context or props of "'+s+'". Either wrap the root component in a <Provider>, or explicitly pass "store" as a prop to "'+s+'".');var r=n.store.getState();return n.state={storeState:r},n.clearCache(),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,o),a.prototype.shouldComponentUpdate=function(){return!f||this.haveOwnPropsChanged||this.hasStoreStateChanged},a.prototype.computeStateProps=function(e,t){if(!this.finalMapStateToProps)return this.configureFinalMapState(e,t);var n=e.getState(),r=this.doStatePropsDependOnOwnProps?this.finalMapStateToProps(n,t):this.finalMapStateToProps(n);return"production"!==E.env.NODE_ENV&&i(r,"mapStateToProps"),r},a.prototype.configureFinalMapState=function(e,t){var n=p(e.getState(),t),r="function"==typeof n;return this.finalMapStateToProps=r?n:p,this.doStatePropsDependOnOwnProps=1!==this.finalMapStateToProps.length,r?this.computeStateProps(e,t):("production"!==E.env.NODE_ENV&&i(n,"mapStateToProps"),n)},a.prototype.computeDispatchProps=function(e,t){if(!this.finalMapDispatchToProps)return this.configureFinalMapDispatch(e,t);var n=e.dispatch,r=this.doDispatchPropsDependOnOwnProps?this.finalMapDispatchToProps(n,t):this.finalMapDispatchToProps(n);return"production"!==E.env.NODE_ENV&&i(r,"mapDispatchToProps"),r},a.prototype.configureFinalMapDispatch=function(e,t){var n=l(e.dispatch,t),r="function"==typeof n;return this.finalMapDispatchToProps=r?n:l,this.doDispatchPropsDependOnOwnProps=1!==this.finalMapDispatchToProps.length,r?this.computeDispatchProps(e,t):("production"!==E.env.NODE_ENV&&i(n,"mapDispatchToProps"),n)},a.prototype.updateStatePropsIfNeeded=function(){var e=this.computeStateProps(this.store,this.props);return(!this.stateProps||!(0,_.default)(e,this.stateProps))&&(this.stateProps=e,!0)},a.prototype.updateDispatchPropsIfNeeded=function(){var e=this.computeDispatchProps(this.store,this.props);return(!this.dispatchProps||!(0,_.default)(e,this.dispatchProps))&&(this.dispatchProps=e,!0)},a.prototype.updateMergedPropsIfNeeded=function(){var e=function(e,t,n){var r=d(e,t,n);"production"!==E.env.NODE_ENV&&i(r,"mergeProps");return r}(this.stateProps,this.dispatchProps,this.props);return!(this.mergedProps&&m&&(0,_.default)(e,this.mergedProps))&&(this.mergedProps=e,!0)},a.prototype.isSubscribed=function(){return"function"==typeof this.unsubscribe},a.prototype.trySubscribe=function(){u&&!this.unsubscribe&&(this.unsubscribe=this.store.subscribe(this.handleChange.bind(this)),this.handleChange())},a.prototype.tryUnsubscribe=function(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null)},a.prototype.componentDidMount=function(){this.trySubscribe()},a.prototype.componentWillReceiveProps=function(e){f&&(0,_.default)(e,this.props)||(this.haveOwnPropsChanged=!0)},a.prototype.componentWillUnmount=function(){this.tryUnsubscribe(),this.clearCache()},a.prototype.clearCache=function(){this.dispatchProps=null,this.stateProps=null,this.mergedProps=null,this.haveOwnPropsChanged=!0,this.hasStoreStateChanged=!0,this.haveStatePropsBeenPrecalculated=!1,this.statePropsPrecalculationError=null,this.renderedElement=null,this.finalMapDispatchToProps=null,this.finalMapStateToProps=null},a.prototype.handleChange=function(){if(this.unsubscribe){var e=this.store.getState(),t=this.state.storeState;if(!f||t!==e){if(f&&!this.doStatePropsDependOnOwnProps){var n=function(e,t){try{return e.apply(t)}catch(e){return M.value=e,M}}(this.updateStatePropsIfNeeded,this);if(!n)return;n===M&&(this.statePropsPrecalculationError=M.value),this.haveStatePropsBeenPrecalculated=!0}this.hasStoreStateChanged=!0,this.setState({storeState:e})}}},a.prototype.getWrappedInstance=function(){return(0,C.default)(h,"To access the wrapped instance, you need to specify { withRef: true } as the fourth argument of the connect() call."),this.refs.wrappedInstance},a.prototype.render=function(){var e=this.haveOwnPropsChanged,t=this.hasStoreStateChanged,n=this.haveStatePropsBeenPrecalculated,r=this.statePropsPrecalculationError,o=this.renderedElement;if(this.haveOwnPropsChanged=!1,this.hasStoreStateChanged=!1,this.haveStatePropsBeenPrecalculated=!1,this.statePropsPrecalculationError=null,r)throw r;var a=!0,s=!0;f&&o&&(a=t||e&&this.doStatePropsDependOnOwnProps,s=e&&this.doDispatchPropsDependOnOwnProps);var i=!1,u=!1;n?i=!0:a&&(i=this.updateStatePropsIfNeeded()),s&&(u=this.updateDispatchPropsIfNeeded());return!(!!(i||u||e)&&this.updateMergedPropsIfNeeded())&&o?o:(this.renderedElement=h?(0,v.createElement)(c,P({},this.mergedProps,{ref:"wrappedInstance"})):(0,v.createElement)(c,this.mergedProps),this.renderedElement)},a}(v.Component);return t.displayName=s,t.WrappedComponent=c,t.contextTypes={store:g.default},t.propTypes={store:g.default},"production"!==E.env.NODE_ENV&&(t.prototype.componentWillUpdate=function(){this.version!==y&&(this.version=y,this.trySubscribe(),this.clearCache())}),(0,O.default)(t,c)}};var v=n(1),g=e(n(272)),_=e(n(275)),s=e(n(276)),b=e(n(273)),S=e(n(250)),O=e(n(277)),C=e(n(192));function e(e){return e&&e.__esModule?e:{default:e}}var i=function(e){return{}},c=function(e){return{dispatch:e}},N=function(e,t,n){return P({},n,e,t)};var M={value:null};var R=0}).call(t,n(3))},275:function(e,t){"use strict";t.__esModule=!0,t.default=function(e,t){if(e===t)return!0;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(var o=Object.prototype.hasOwnProperty,a=0;a<n.length;a++)if(!o.call(t,n[a])||e[n[a]]!==t[n[a]])return!1;return!0}},276:function(e,t,n){"use strict";t.__esModule=!0,t.default=function(t){return function(e){return(0,r.bindActionCreators)(t,e)}};var r=n(248)},277:function(e,t,n){var r;r=function(){"use strict";var c={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},p={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},l=Object.defineProperty,d=Object.getOwnPropertyNames,f=Object.getOwnPropertySymbols,h=Object.getOwnPropertyDescriptor,m=Object.getPrototypeOf,y=m&&m(Object);return function e(t,n,r){if("string"!=typeof n){if(y){var o=m(n);o&&o!==y&&e(t,o,r)}var a=d(n);f&&(a=a.concat(f(n)));for(var s=0;s<a.length;++s){var i=a[s];if(!(c[i]||p[i]||r&&r[i])){var u=h(n,i);try{l(t,i,u)}catch(e){}}}return t}return t}},e.exports=r()},279:function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);function r(){this.constructor=e}e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},o=n(1),a=n(280),s=n(539),i=function(e){function t(){e.apply(this,arguments)}return r(t,e),t.prototype.render=function(){return o.createElement(a.Navbar,{className:"cf-nav-main-header"},o.createElement(a.Navbar.Header,null,o.createElement("div",null,o.createElement(a.Navbar.Brand,null,o.createElement("img",{src:this.props.logoImgSrc})))),o.createElement(a.Navbar.Text,{pullRight:!0},o.createElement("div",{className:"header-text",style:{marginLeft:"22px",fontSize:"16px"}},o.createElement("div",{style:{textAlign:"right"}},"Need help? ",o.createElement("a",{href:"tel:1-866-826-8471"},o.createElement("img",{className:"visible-xs",style:{float:"right",paddingLeft:"10px",paddingTop:"4px"},src:"../images/small-phone.svg"}))),o.createElement("div",{className:"hidden-xs",style:{fontSize:"18px"}},o.createElement(s.default,{phoneNumber:"1-866-826-8471"})))))},t}(o.Component);Object.defineProperty(t,"__esModule",{value:!0}),t.default=i},539:function(e,t,n){"use strict";var r=n(1),o=r.createClass({render:function(){return r.createElement("a",{href:"tel:"+this.props.phoneNumber},this.props.phoneNumber)}});Object.defineProperty(t,"__esModule",{value:!0}),t.default=o},540:function(e,t,n){"use strict";var r=n(248),o=n(541),a=n(544),s=n(545),i=n(546),u=n(547),c=n(548);Object.defineProperty(t,"__esModule",{value:!0}),t.default=r.combineReducers({member:o.default,members:a.default,states:s.default,quotes:i.default,questions:u.default,selectPersons:c.default})},541:function(e,t,n){"use strict";var a=n(542),s=n(4),i=n(543),u=(new a.default,function(){this.member=new a.default,this.memberId=-1,this.errors=new i.default,this.isValid=!1,this.saveCompleted=!1});Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){void 0===e&&(e=new u);switch(t.type){case"MEMBER_INITIALIZE_NEW":return s({},e,{member:new a.default,errors:new i.default,isValid:!1});case"MEMBER_LOAD":return s({},e,{dirty:!1,member:t.member,errors:new i.default,isValid:!0});case"MEMBER_UI_INPUT":var n=t.fieldName,r=t.value,o=s({},e.member,{});return o[n]=r,s({},e,{member:o,dirty:!0});case"MEMBER_SAVE":return t.errors.isEntityValid?s({},e,{saveCompleted:!0}):s({},e,{isValid:t.errors.isEntityValid,errors:t.errors});case"MEMBER_RESET_SAVE_COMPLETED":return s({},e,{saveCompleted:!1});default:return e}}},542:function(e,t){"use strict";var n=function(){this.id=-1,this.login="",this.avatar_url=""};Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},543:function(e,t){"use strict";var n=function(){this.id="",this.login="",this.avatar_url=""};Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},544:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){switch(void 0===e&&(e=[]),t.type){case"MEMBERS_ASSIGN":return t.members.slice();default:return e}}},545:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){switch(void 0===e&&(e=[]),t.type){case"MEMBERS_ASSIGN":return t.members.slice();default:return e}}},546:function(e,t,n){"use strict";var a=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){switch(void 0===e&&(e=[]),t.type){case"SUMBMITTED_PERSONAL_INFO":return a({},e,{products:t.products,productValidations:t.productValidations,isProductFetchCallDone:!0,is_agent:t.is_agent});case"SUMBMITTED_PRODUCTS_INFO":return a({},e,{plans:t.plans});case"SUMBMITTED_PLANS_INFO":var n;return!(n=e.premiums?JSON.parse(JSON.stringify(e.premiums)):t.premiums)[1]&&t.premiums[1]&&(n[1]=t.premiums[1]),n[0]&&t.premiums[0]&&(n[0].input_data=t.premiums[0].input_data,t.premiums[0].plans_data&&t.premiums[0].plans_data.ProductID&&(n[0][t.premiums[0].plans_data.ProductID]=t.premiums[0].plans_data)),n[1]&&t.premiums[1]&&(n[1].input_data=t.premiums[1].input_data,t.premiums[1].plans_data&&t.premiums[1].plans_data.ProductID&&(n[1][t.premiums[1].plans_data.ProductID]=t.premiums[1].plans_data)),a({},e,{premiums:n});case"SETTING_PERSONS_INFO":return a({},e,{persons:t.persons});case"SETTING_TYPE_OF_SUBMISSION":return a({},e,{typeOfSubmission:t.typeOfSubmission});case"OPEN_EDIT_PERSON_MODAL":return a({},e,{showModalEditPerson:!0,editablePerson:t.editablePerson,editablePersonIndex:t.editablePersonIndex});case"CLOSE_EDIT_PERSON_MODAL":return a({},e,{showModalEditPerson:!1,editablePerson:{}});case"EDITED_PERSON":var r=JSON.parse(JSON.stringify(t.person)),o=JSON.parse(JSON.stringify(e.persons));return o[parseInt(r.applicant)-1]=r,a({},e,{editablePerson:r,persons:o});case"SUMBMITTED_SAVE_QUOTE":return a({},e,{quoteResponse:t.quoteResponse});case"SUMBMITTED_EMAIL_INFO":return a({},e,{isSubmmitedEmailForm:t.isSubmmitedPlansForm});default:return e}}},547:function(e,t,n){"use strict";var r=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){switch(void 0===e&&(e=[]),t.type){case"FETCHING_QUESTIONS":case"POSTING_QUESTIONS":return r({},e,{questions:t.questions});case"CONFIRM_QUESTIONS":return r({},e,{confirmationData:t.confirmationData});case"MADE_PAYMENT":return r({},e,{paymentData:t.paymentData});case"AUTHENTICATE_USER":case"PASSWORD_RESET":return r({},e,{user:t.user});case"POST_PAYMENT_DONE":return r({},e,{paymentInfo:t.paymentInfo});default:return e}}},548:function(e,t,n){"use strict";var r=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){switch(void 0===e&&(e=[]),t.type){case"NUMBER_OF_PERSONS_SELECTED":return r({},e,{noOfPersons:t.noOfPersons});default:return e}}}});