webpackJsonp([0],{0:function(e,t,n){"use strict";var r=n(1),o=n(37),a=n(184),s=n(247);function i(e,t){n.e(2,function(){return t(null,n(547).default)})}function u(e,t){n.e(3,function(){return t(null,n(565).default)})}function c(e,t){n.e(3,function(){return t(null,n(803).default)})}function p(e,t){n.e(3,function(){return t(null,n(969).default)})}function l(e,t){n.e(3,function(){return t(null,n(981).default)})}function d(e,t){n.e(3,function(){return t(null,n(982).default)})}function f(e,t){n.e(3,function(){return t(null,n(983).default)})}function h(e,t){n.e(3,function(){return t(null,n(984).default)})}function m(e,t){n.e(3,function(){return t(null,n(985).default)})}o.render(r.createElement(a.Router,{history:a.browserHistory},r.createElement(a.Route,{path:"/",component:s.default},r.createElement(a.IndexRoute,{getComponent:u}),r.createElement(a.Route,{path:"/products",getComponent:c}),r.createElement(a.Route,{path:"/plans",getComponent:p}),r.createElement(a.Route,{path:"/next-steps",getComponent:function(e,t){n.e(3,function(){return t(null,n(973).default)})}}),r.createElement(a.Route,{path:"/questions",getComponent:function(e,t){n.e(3,function(){return t(null,n(774).default)})}}),r.createElement(a.Route,{path:"/authorize",getComponent:function(e,t){n.e(3,function(){return t(null,n(794).default)})}}),r.createElement(a.Route,{path:"/error",getComponent:function(e,t){n.e(3,function(){return t(null,n(797).default)})}}),r.createElement(a.Route,{path:"/all-questions",getComponent:function(e,t){n.e(3,function(){return t(null,n(798).default)})}}),r.createElement(a.Route,{path:"/edit-questions",getComponent:function(e,t){n.e(3,function(){return t(null,n(801).default)})}}),r.createElement(a.Route,{path:"/edit-questions/beneficiaries",getComponent:function(e,t){n.e(3,function(){return t(null,n(802).default)})}}),r.createElement(a.Route,{path:"/signature",getComponent:function(e,t){n.e(3,function(){return t(null,n(799).default)})}}),r.createElement(a.Route,{path:"/offer",getComponent:function(e,t){n.e(3,function(){return t(null,n(800).default)})}}),r.createElement(a.Route,{path:"/payment_success",getComponent:function(e,t){n.e(3,function(){return t(null,n(986).default)})}}),r.createElement(a.Route,{path:"/payment",getComponent:function(e,t){n.e(3,function(){return t(null,n(987).default)})}}),r.createElement(a.Route,{path:"/agent",getComponent:u}),r.createElement(a.Route,{path:"/agent/products",getComponent:c}),r.createElement(a.Route,{path:"/agent/plans",getComponent:p}),r.createElement(a.Route,{path:"/agent/next-steps",getComponent:function(e,t){n.e(3,function(){return t(null,n(979).default)})}}),r.createElement(a.Route,{path:"/connect-to-agent",getComponent:l}),r.createElement(a.Route,{path:"/connect-through-application",getComponent:f}),r.createElement(a.Route,{path:"/agent/connect-to-agent",getComponent:l}),r.createElement(a.Route,{path:"/connect-agent-success",getComponent:h}),r.createElement(a.Route,{path:"/agent/connect-agent-success",getComponent:h}),r.createElement(a.Route,{path:"/email-to-quote",getComponent:d}),r.createElement(a.Route,{path:"/agent/email-to-quote",getComponent:d}),r.createElement(a.Route,{path:"/agent/connect-through-application",getComponent:f}),r.createElement(a.Route,{path:"/agent/email-quote-success",getComponent:m}),r.createElement(a.Route,{path:"/email-quote-success",getComponent:m}),r.createElement(a.Route,{path:"/customer",getComponent:u}),r.createElement(a.Route,{path:"/quote",getComponent:u}),r.createElement(a.Route,{path:"/about",getComponent:function(e,t){n.e(1,function(){return t(null,n(546).default)})}}),r.createElement(a.Route,{path:"/member",getComponent:i}),r.createElement(a.Route,{path:"/memberEdit/:id",getComponent:i}))),document.getElementById("root"))},247:function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);function r(){this.constructor=e}e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},o=n(1),a=n(248),s=n(269),i=n(278),u=n(279),c=n(537),p=n(280),l=a.createStore(c.default,a.applyMiddleware(i.default)),d=function(e){function t(){e.apply(this,arguments)}return r(t,e),t.prototype.render=function(){var e="/payment"==this.props.location.pathname;return o.createElement(s.Provider,{store:l},o.createElement("div",{className:""},!e&&o.createElement(u.default,{logoImgSrc:"../images/logo.svg"}),o.createElement("div",{className:"c-body"},this.props.children),!e&&o.createElement(p.Row,{className:"c-footer hidden-xs",style:{marginBottom:"0px"}},o.createElement(p.Col,{xs:8,className:"c-footer-content c-center"},o.createElement(p.Row,null,o.createElement(p.Col,null,"Site Map »  Privacy Policy »"),o.createElement(p.Col,null,"© Copyright 2017 Vantis Life Insurance Company, Windsor, Connecticut - All Rights Reserved."),o.createElement(p.Col,null,"Vantis, Vantis Life, and A better life experience are registered trademarks of Vantis Life Insurance Company."),o.createElement(p.Col,null,"Life insurance and annuities issued by Vantis Life Insurance Company, Windsor, CT (all states except NY) and by Vantis Life Insurance Company of New York, Brewster, NY (NY only). Products not available in all states and state variations may apply."))))))},t}(o.Component);Object.defineProperty(t,"__esModule",{value:!0}),t.default=d},269:function(e,t,n){"use strict";t.__esModule=!0,t.connect=t.Provider=void 0;var r=a(n(270)),o=a(n(275));function a(e){return e&&e.__esModule?e:{default:e}}t.Provider=r.default,t.connect=o.default},270:function(e,t,n){(function(e){"use strict";t.__esModule=!0,t.default=void 0;var r=n(1),o=i(n(271)),a=i(n(273)),s=i(n(274));function i(e){return e&&e.__esModule?e:{default:e}}var u=!1;var c=function(e){function t(n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,n,r));return o.store=n.store,o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.getChildContext=function(){return{store:this.store}},t.prototype.render=function(){return r.Children.only(this.props.children)},t}(r.Component);t.default=c,"production"!==e.env.NODE_ENV&&(c.prototype.componentWillReceiveProps=function(e){this.store!==e.store&&(u||(u=!0,(0,s.default)("<Provider> does not support changing `store` on the fly. It is most likely that you see this error because you updated to Redux 2.x and React Redux 2.x which no longer hot reload reducers automatically. See https://github.com/reactjs/react-redux/releases/tag/v2.0.0 for the migration instructions.")))}),c.propTypes={store:a.default.isRequired,children:o.default.element.isRequired},c.childContextTypes={store:a.default.isRequired}}).call(t,n(3))},273:function(e,t,n){"use strict";t.__esModule=!0;var r,o=n(271),a=(r=o)&&r.__esModule?r:{default:r};t.default=a.default.shape({subscribe:a.default.func.isRequired,dispatch:a.default.func.isRequired,getState:a.default.func.isRequired})},274:function(e,t){"use strict";t.__esModule=!0,t.default=function(e){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(e);try{throw new Error(e)}catch(e){}}},275:function(e,t,n){(function(e){"use strict";t.__esModule=!0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=function(t,n,d){var P=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},v=Boolean(t),g=t||f,_=void 0;_="function"==typeof n?n:n?(0,i.default)(n):h;var b=d||m,S=P.pure,O=void 0===S||S,C=P.withRef,N=void 0!==C&&C,M=O&&b!==m,R=y++;return function(t){var n,i="Connect("+((n=t).displayName||n.name||"Component")+")";function d(e,t){(0,c.default)(e)||(0,u.default)(t+"() in "+i+" must return a plain object. Instead received "+e+".")}var f=function(n){function a(e,t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,n.call(this,e,t));r.version=R,r.store=e.store||t.store,(0,l.default)(r.store,'Could not find "store" in either the context or props of "'+i+'". Either wrap the root component in a <Provider>, or explicitly pass "store" as a prop to "'+i+'".');var o=r.store.getState();return r.state={storeState:o},r.clearCache(),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(a,n),a.prototype.shouldComponentUpdate=function(){return!O||this.haveOwnPropsChanged||this.hasStoreStateChanged},a.prototype.computeStateProps=function(t,n){if(!this.finalMapStateToProps)return this.configureFinalMapState(t,n);var r=t.getState(),o=this.doStatePropsDependOnOwnProps?this.finalMapStateToProps(r,n):this.finalMapStateToProps(r);return"production"!==e.env.NODE_ENV&&d(o,"mapStateToProps"),o},a.prototype.configureFinalMapState=function(t,n){var r=g(t.getState(),n),o="function"==typeof r;return this.finalMapStateToProps=o?r:g,this.doStatePropsDependOnOwnProps=1!==this.finalMapStateToProps.length,o?this.computeStateProps(t,n):("production"!==e.env.NODE_ENV&&d(r,"mapStateToProps"),r)},a.prototype.computeDispatchProps=function(t,n){if(!this.finalMapDispatchToProps)return this.configureFinalMapDispatch(t,n);var r=t.dispatch,o=this.doDispatchPropsDependOnOwnProps?this.finalMapDispatchToProps(r,n):this.finalMapDispatchToProps(r);return"production"!==e.env.NODE_ENV&&d(o,"mapDispatchToProps"),o},a.prototype.configureFinalMapDispatch=function(t,n){var r=_(t.dispatch,n),o="function"==typeof r;return this.finalMapDispatchToProps=o?r:_,this.doDispatchPropsDependOnOwnProps=1!==this.finalMapDispatchToProps.length,o?this.computeDispatchProps(t,n):("production"!==e.env.NODE_ENV&&d(r,"mapDispatchToProps"),r)},a.prototype.updateStatePropsIfNeeded=function(){var e=this.computeStateProps(this.store,this.props);return(!this.stateProps||!(0,s.default)(e,this.stateProps))&&(this.stateProps=e,!0)},a.prototype.updateDispatchPropsIfNeeded=function(){var e=this.computeDispatchProps(this.store,this.props);return(!this.dispatchProps||!(0,s.default)(e,this.dispatchProps))&&(this.dispatchProps=e,!0)},a.prototype.updateMergedPropsIfNeeded=function(){var t=function(t,n,r){var o=b(t,n,r);"production"!==e.env.NODE_ENV&&d(o,"mergeProps");return o}(this.stateProps,this.dispatchProps,this.props);return!(this.mergedProps&&M&&(0,s.default)(t,this.mergedProps))&&(this.mergedProps=t,!0)},a.prototype.isSubscribed=function(){return"function"==typeof this.unsubscribe},a.prototype.trySubscribe=function(){v&&!this.unsubscribe&&(this.unsubscribe=this.store.subscribe(this.handleChange.bind(this)),this.handleChange())},a.prototype.tryUnsubscribe=function(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null)},a.prototype.componentDidMount=function(){this.trySubscribe()},a.prototype.componentWillReceiveProps=function(e){O&&(0,s.default)(e,this.props)||(this.haveOwnPropsChanged=!0)},a.prototype.componentWillUnmount=function(){this.tryUnsubscribe(),this.clearCache()},a.prototype.clearCache=function(){this.dispatchProps=null,this.stateProps=null,this.mergedProps=null,this.haveOwnPropsChanged=!0,this.hasStoreStateChanged=!0,this.haveStatePropsBeenPrecalculated=!1,this.statePropsPrecalculationError=null,this.renderedElement=null,this.finalMapDispatchToProps=null,this.finalMapStateToProps=null},a.prototype.handleChange=function(){if(this.unsubscribe){var e=this.store.getState(),t=this.state.storeState;if(!O||t!==e){if(O&&!this.doStatePropsDependOnOwnProps){var n=function(e,t){try{return e.apply(t)}catch(e){return E.value=e,E}}(this.updateStatePropsIfNeeded,this);if(!n)return;n===E&&(this.statePropsPrecalculationError=E.value),this.haveStatePropsBeenPrecalculated=!0}this.hasStoreStateChanged=!0,this.setState({storeState:e})}}},a.prototype.getWrappedInstance=function(){return(0,l.default)(N,"To access the wrapped instance, you need to specify { withRef: true } as the fourth argument of the connect() call."),this.refs.wrappedInstance},a.prototype.render=function(){var e=this.haveOwnPropsChanged,n=this.hasStoreStateChanged,a=this.haveStatePropsBeenPrecalculated,s=this.statePropsPrecalculationError,i=this.renderedElement;if(this.haveOwnPropsChanged=!1,this.hasStoreStateChanged=!1,this.haveStatePropsBeenPrecalculated=!1,this.statePropsPrecalculationError=null,s)throw s;var u=!0,c=!0;O&&i&&(u=n||e&&this.doStatePropsDependOnOwnProps,c=e&&this.doDispatchPropsDependOnOwnProps);var p=!1,l=!1;a?p=!0:u&&(p=this.updateStatePropsIfNeeded()),c&&(l=this.updateDispatchPropsIfNeeded());return!(!!(p||l||e)&&this.updateMergedPropsIfNeeded())&&i?i:(this.renderedElement=N?(0,o.createElement)(t,r({},this.mergedProps,{ref:"wrappedInstance"})):(0,o.createElement)(t,this.mergedProps),this.renderedElement)},a}(o.Component);return f.displayName=i,f.WrappedComponent=t,f.contextTypes={store:a.default},f.propTypes={store:a.default},"production"!==e.env.NODE_ENV&&(f.prototype.componentWillUpdate=function(){this.version!==R&&(this.version=R,this.trySubscribe(),this.clearCache())}),(0,p.default)(f,t)}};var o=n(1),a=d(n(273)),s=d(n(276)),i=d(n(277)),u=d(n(274)),c=d(n(250)),p=d(n(227)),l=d(n(192));function d(e){return e&&e.__esModule?e:{default:e}}var f=function(e){return{}},h=function(e){return{dispatch:e}},m=function(e,t,n){return r({},n,e,t)};var E={value:null};var y=0}).call(t,n(3))},276:function(e,t){"use strict";t.__esModule=!0,t.default=function(e,t){if(e===t)return!0;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(var o=Object.prototype.hasOwnProperty,a=0;a<n.length;a++)if(!o.call(t,n[a])||e[n[a]]!==t[n[a]])return!1;return!0}},277:function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e){return function(t){return(0,r.bindActionCreators)(e,t)}};var r=n(248)},279:function(e,t,n){"use strict";var r=this&&this.__extends||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);function r(){this.constructor=e}e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},o=n(1),a=n(280),s=n(536),i=function(e){function t(){e.apply(this,arguments)}return r(t,e),t.prototype.render=function(){return o.createElement(a.Navbar,{className:"cf-nav-main-header"},o.createElement(a.Navbar.Header,null,o.createElement("div",null,o.createElement(a.Navbar.Brand,null,o.createElement("img",{src:this.props.logoImgSrc})))),o.createElement(a.Navbar.Text,{pullRight:!0},o.createElement("div",{className:"header-text",style:{marginLeft:"22px",fontSize:"16px"}},o.createElement("div",{style:{textAlign:"right"}},"Need help? ",o.createElement("a",{href:"tel:1-800-252-7254"},o.createElement("img",{className:"visible-xs",style:{float:"right",paddingLeft:"10px",paddingTop:"4px"},src:"../images/small-phone.svg"}))),o.createElement("div",{className:"hidden-xs",style:{fontSize:"18px"}},o.createElement(s.default,{phoneNumber:"1-800-252-7254"})))))},t}(o.Component);Object.defineProperty(t,"__esModule",{value:!0}),t.default=i},536:function(e,t,n){"use strict";var r=n(1),o=r.createClass({render:function(){return r.createElement("a",{href:"tel:"+this.props.phoneNumber},this.props.phoneNumber)}});Object.defineProperty(t,"__esModule",{value:!0}),t.default=o},537:function(e,t,n){"use strict";var r=n(248),o=n(538),a=n(541),s=n(542),i=n(543),u=n(544),c=n(545);Object.defineProperty(t,"__esModule",{value:!0}),t.default=r.combineReducers({member:o.default,members:a.default,states:s.default,quotes:i.default,questions:u.default,selectPersons:c.default})},538:function(e,t,n){"use strict";var r=n(539),o=n(4),a=n(540),s=(new r.default,function(){return function(){this.member=new r.default,this.memberId=-1,this.errors=new a.default,this.isValid=!1,this.saveCompleted=!1}}());Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){void 0===e&&(e=new s);switch(t.type){case"MEMBER_INITIALIZE_NEW":return o({},e,{member:new r.default,errors:new a.default,isValid:!1});case"MEMBER_LOAD":return o({},e,{dirty:!1,member:t.member,errors:new a.default,isValid:!0});case"MEMBER_UI_INPUT":var n=t.fieldName,i=t.value,u=o({},e.member,{});return u[n]=i,o({},e,{member:u,dirty:!0});case"MEMBER_SAVE":return t.errors.isEntityValid?o({},e,{saveCompleted:!0}):o({},e,{isValid:t.errors.isEntityValid,errors:t.errors});case"MEMBER_RESET_SAVE_COMPLETED":return o({},e,{saveCompleted:!1});default:return e}}},539:function(e,t){"use strict";var n=function(){return function(){this.id=-1,this.login="",this.avatar_url=""}}();Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},540:function(e,t){"use strict";var n=function(){return function(){this.id="",this.login="",this.avatar_url=""}}();Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},541:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){switch(void 0===e&&(e=[]),t.type){case"MEMBERS_ASSIGN":return t.members.slice();default:return e}}},542:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){switch(void 0===e&&(e=[]),t.type){case"MEMBERS_ASSIGN":return t.members.slice();default:return e}}},543:function(e,t,n){"use strict";var r=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){switch(void 0===e&&(e=[]),t.type){case"SUMBMITTED_PERSONAL_INFO":return r({},e,{products:t.products,productValidations:t.productValidations,isProductFetchCallDone:!0,is_agent:t.is_agent});case"SUMBMITTED_PRODUCTS_INFO":return r({},e,{plans:t.plans});case"SUMBMITTED_PLANS_INFO":var n;return!(n=e.premiums?JSON.parse(JSON.stringify(e.premiums)):t.premiums)[1]&&t.premiums[1]&&(n[1]=t.premiums[1]),n[0]&&t.premiums[0]&&(n[0].input_data=t.premiums[0].input_data,t.premiums[0].plans_data&&t.premiums[0].plans_data.ProductID&&(n[0][t.premiums[0].plans_data.ProductID]=t.premiums[0].plans_data)),n[1]&&t.premiums[1]&&(n[1].input_data=t.premiums[1].input_data,t.premiums[1].plans_data&&t.premiums[1].plans_data.ProductID&&(n[1][t.premiums[1].plans_data.ProductID]=t.premiums[1].plans_data)),r({},e,{premiums:n});case"SETTING_PERSONS_INFO":return r({},e,{persons:t.persons});case"SETTING_TYPE_OF_SUBMISSION":return r({},e,{typeOfSubmission:t.typeOfSubmission});case"OPEN_EDIT_PERSON_MODAL":return r({},e,{showModalEditPerson:!0,editablePerson:t.editablePerson,editablePersonIndex:t.editablePersonIndex});case"CLOSE_EDIT_PERSON_MODAL":return r({},e,{showModalEditPerson:!1,editablePerson:{}});case"EDITED_PERSON":var o=JSON.parse(JSON.stringify(t.person)),a=JSON.parse(JSON.stringify(e.persons));return a[parseInt(o.applicant)-1]=o,r({},e,{editablePerson:o,persons:a});case"SUMBMITTED_SAVE_QUOTE":return r({},e,{quoteResponse:t.quoteResponse});case"SUMBMITTED_EMAIL_INFO":return r({},e,{isSubmmitedEmailForm:t.isSubmmitedPlansForm});default:return e}}},544:function(e,t,n){"use strict";var r=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){switch(void 0===e&&(e=[]),t.type){case"FETCHING_QUESTIONS":case"POSTING_QUESTIONS":return r({},e,{questions:t.questions});case"CONFIRM_QUESTIONS":return r({},e,{confirmationData:t.confirmationData});case"MADE_PAYMENT":return r({},e,{paymentData:t.paymentData});case"AUTHENTICATE_USER":case"PASSWORD_RESET":return r({},e,{user:t.user});case"POST_PAYMENT_DONE":return r({},e,{paymentInfo:t.paymentInfo});default:return e}}},545:function(e,t,n){"use strict";var r=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){switch(void 0===e&&(e=[]),t.type){case"NUMBER_OF_PERSONS_SELECTED":return r({},e,{noOfPersons:t.noOfPersons});default:return e}}}});