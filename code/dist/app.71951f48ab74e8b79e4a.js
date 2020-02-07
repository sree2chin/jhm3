webpackJsonp([0],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(37);
	var react_router_1 = __webpack_require__(184);
	var app_1 = __webpack_require__(247);
	var Access = __webpack_require__(558);
	var pages_1 = __webpack_require__(563);
	function getUrlParameter(name) {
	    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	    var results = regex.exec(location.search);
	    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}
	;
	function loadAboutPage(location, callback) {
	    __webpack_require__.e/* nsure */(1, function () { return callback(null, __webpack_require__(564).default); });
	}
	;
	function loadErrorRedirectPage(location, callback) {
	    __webpack_require__.e/* nsure */(2, function () { return callback(null, __webpack_require__(565).default); });
	}
	;
	function loadQuotePage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(566).default); });
	}
	function loadQuestionsPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(724).default); });
	}
	function loadAuthorisePage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(746).default); });
	}
	function loadErrorPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(749).default); });
	}
	function allQuestionsPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(750).default); });
	}
	function getSignaturePage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(751).default); });
	}
	function getOfferPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(752).default); });
	}
	function editQuestionsPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(913).default); });
	}
	function editBeneficiaryQuestionsPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(914).default); });
	}
	function editSignaturePage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(913).default); });
	}
	function loadProductsPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(915).default); });
	}
	function loadPlansPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(921).default); });
	}
	function loadNextStepsPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(983).default); });
	}
	function loadAgentNextStepsPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(989).default); });
	}
	function loadContactAgent(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(993).default); });
	}
	function loadEmailToQuote(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(994).default); });
	}
	function loadAgentEmailToQuote(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(995).default); });
	}
	function loadEmailCaptureToQuote(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(996).default); });
	}
	function loadAgentEmailCaptureToQuote(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(997).default); });
	}
	function loadContactAgentSuccess(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(998).default); });
	}
	function loadEmailToQuoteSuccess(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(999).default); });
	}
	function loadPaymentSuccessPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(1000).default); });
	}
	function loadPaymentPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(1001).default); });
	}
	function loadUnsubscribePage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(1002).default); });
	}
	function checkAccessable(nextState, replace, callback) {
	    window.initialTagManager = window.initialTagManager || [];
	    Access.getQuoteAccess(nextState.location.query, function (res) {
	        window.uniqueTransactionId = res.uniqueTransactionId;
	        window.initialTagManager = res.tag_manager;
	        if (res.firstTime) {
	            window.dataLayer.push({
	                'event': 'VirtualPageView',
	                'virtualPageURL': 'VirtualPageView',
	                'virtualPageTitle': pages_1.PAGES_LIST.LANDING_PAGE.page_title,
	                'VirtualPageVisitAgentNumber': getUrlParameter("agent_number"),
	                'VirtualPageVisitTransactionId': res.uniqueTransactionId
	            });
	        }
	        if (res != undefined && res != null && res.data && res.data.access) {
	            return callback();
	        }
	        return false;
	    });
	}
	var onRouteChange = function () {
	    window._mfq = window._mfq || [];
	    window._mfq.push(["newPageView"]);
	};
	react_router_1.browserHistory.listen(function (location) {
	    window._mfq = window._mfq || [];
	    window._mfq.push(["newPageView"]);
	});
	ReactDOM.render(React.createElement(react_router_1.Router, {history: react_router_1.browserHistory}, React.createElement(react_router_1.Route, {path: "/", component: app_1.default}, React.createElement(react_router_1.IndexRoute, {getComponent: loadQuotePage}), React.createElement(react_router_1.Route, {path: "/products", getComponent: loadProductsPage}), React.createElement(react_router_1.Route, {path: "/plans", getComponent: loadPlansPage}), React.createElement(react_router_1.Route, {path: "/next-steps", getComponent: loadNextStepsPage}), React.createElement(react_router_1.Route, {path: "/questions", getComponent: loadQuestionsPage}), React.createElement(react_router_1.Route, {path: "/authorize", getComponent: loadAuthorisePage}), React.createElement(react_router_1.Route, {path: "/error", getComponent: loadErrorPage}), React.createElement(react_router_1.Route, {path: "/all-questions", getComponent: allQuestionsPage}), React.createElement(react_router_1.Route, {path: "/edit-questions", getComponent: editQuestionsPage}), React.createElement(react_router_1.Route, {path: "/edit-questions/beneficiaries", getComponent: editBeneficiaryQuestionsPage}), React.createElement(react_router_1.Route, {path: "/signature", getComponent: getSignaturePage}), React.createElement(react_router_1.Route, {path: "/offer", getComponent: getOfferPage}), React.createElement(react_router_1.Route, {path: "/payment_success", getComponent: loadPaymentSuccessPage}), React.createElement(react_router_1.Route, {path: "/payment", getComponent: loadPaymentPage}), React.createElement(react_router_1.Route, {path: "/unsubscribe", getComponent: loadUnsubscribePage}), React.createElement(react_router_1.Route, {path: "/agent", getComponent: loadQuotePage}), React.createElement(react_router_1.Route, {path: "/agent/products", getComponent: loadProductsPage}), React.createElement(react_router_1.Route, {path: "/agent/plans", getComponent: loadPlansPage}), React.createElement(react_router_1.Route, {path: "/agent/next-steps", getComponent: loadAgentNextStepsPage}), React.createElement(react_router_1.Route, {path: "/connect-to-agent", getComponent: loadContactAgent}), React.createElement(react_router_1.Route, {path: "/connect-through-application", getComponent: loadEmailCaptureToQuote}), React.createElement(react_router_1.Route, {path: "/agent/connect-to-agent", getComponent: loadContactAgent}), React.createElement(react_router_1.Route, {path: "/connect-agent-success", getComponent: loadContactAgentSuccess}), React.createElement(react_router_1.Route, {path: "/agent/connect-agent-success", getComponent: loadContactAgentSuccess}), React.createElement(react_router_1.Route, {path: "/email-to-quote", getComponent: loadEmailToQuote}), React.createElement(react_router_1.Route, {path: "/agent/email-to-quote", getComponent: loadAgentEmailToQuote}), React.createElement(react_router_1.Route, {path: "/agent/connect-through-application", getComponent: loadAgentEmailCaptureToQuote}), React.createElement(react_router_1.Route, {path: "/agent/email-quote-success", getComponent: loadEmailToQuoteSuccess}), React.createElement(react_router_1.Route, {path: "/email-quote-success", getComponent: loadEmailToQuoteSuccess}), React.createElement(react_router_1.Route, {path: "/customer", getComponent: loadQuotePage}), React.createElement(react_router_1.Route, {path: "/quote", getComponent: loadQuotePage}), React.createElement(react_router_1.Route, {path: "/about", getComponent: loadAboutPage}), React.createElement(react_router_1.Route, {path: "*", getComponent: loadErrorRedirectPage}))), document.getElementById('root'));


/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var redux_1 = __webpack_require__(248);
	var react_redux_1 = __webpack_require__(268);
	var redux_thunk_1 = __webpack_require__(284);
	var header_1 = __webpack_require__(285);
	var reducers_1 = __webpack_require__(552);
	var react_bootstrap_1 = __webpack_require__(286);
	var ErrorLogsApi_1 = __webpack_require__(557);
	window.errorLogsApiIns = new ErrorLogsApi_1.default();
	var store = redux_1.createStore(reducers_1.default, redux_1.applyMiddleware(redux_thunk_1.default));
	window.reduxDispatch = store.dispatch;
	var App = (function (_super) {
	    __extends(App, _super);
	    function App() {
	        _super.apply(this, arguments);
	    }
	    App.prototype.render = function () {
	        var isPaymentPage = this.props.location.pathname == "/payment";
	        return (React.createElement(react_redux_1.Provider, {store: store}, React.createElement("div", {className: ""}, !isPaymentPage && React.createElement(header_1.default, {logoImgSrc: "../images/logo.svg", location: this.props.location}), React.createElement("div", {className: "c-body"}, this.props.children), !isPaymentPage && React.createElement(react_bootstrap_1.Row, {className: "c-footer hidden-xs", style: { marginBottom: "0px" }}, React.createElement(react_bootstrap_1.Col, {xs: 8, className: "c-footer-content c-center"}, React.createElement(react_bootstrap_1.Row, null, React.createElement(react_bootstrap_1.Col, null, "Site Map »  Privacy Policy »"), React.createElement(react_bootstrap_1.Col, null, "© Copyright 2018 Vantis Life Insurance Company, Windsor, Connecticut, USA - All Rights Reserved."), React.createElement(react_bootstrap_1.Col, null, "Vantis, Vantis Life, and \"A better life experience\" are registered trademarks of Vantis Life Insurance Company."), React.createElement(react_bootstrap_1.Col, null, "Life insurance and annuities issued by Vantis Life Insurance Company, Windsor, CT (all states except NY) and by Vantis Life Insurance Company of New York, Brewster, NY (NY only). Products not available in all states and state variations may apply.")))))));
	    };
	    return App;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = App;


/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.connect = exports.Provider = undefined;
	
	var _Provider = __webpack_require__(269);
	
	var _Provider2 = _interopRequireDefault(_Provider);
	
	var _connect = __webpack_require__(280);
	
	var _connect2 = _interopRequireDefault(_connect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports.Provider = _Provider2["default"];
	exports.connect = _connect2["default"];

/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports["default"] = undefined;
	
	var _react = __webpack_require__(1);
	
	var _propTypes = __webpack_require__(270);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _storeShape = __webpack_require__(278);
	
	var _storeShape2 = _interopRequireDefault(_storeShape);
	
	var _warning = __webpack_require__(279);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var didWarnAboutReceivingStore = false;
	function warnAboutReceivingStore() {
	  if (didWarnAboutReceivingStore) {
	    return;
	  }
	  didWarnAboutReceivingStore = true;
	
	  (0, _warning2["default"])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
	}
	
	var Provider = function (_Component) {
	  _inherits(Provider, _Component);
	
	  Provider.prototype.getChildContext = function getChildContext() {
	    return { store: this.store };
	  };
	
	  function Provider(props, context) {
	    _classCallCheck(this, Provider);
	
	    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));
	
	    _this.store = props.store;
	    return _this;
	  }
	
	  Provider.prototype.render = function render() {
	    return _react.Children.only(this.props.children);
	  };
	
	  return Provider;
	}(_react.Component);
	
	exports["default"] = Provider;
	
	
	if (process.env.NODE_ENV !== 'production') {
	  Provider.prototype.componentWillReceiveProps = function (nextProps) {
	    var store = this.store;
	    var nextStore = nextProps.store;
	
	
	    if (store !== nextStore) {
	      warnAboutReceivingStore();
	    }
	  };
	}
	
	Provider.propTypes = {
	  store: _storeShape2["default"].isRequired,
	  children: _propTypes2["default"].element.isRequired
	};
	Provider.childContextTypes = {
	  store: _storeShape2["default"].isRequired
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	if (process.env.NODE_ENV !== 'production') {
	  var ReactIs = __webpack_require__(271);
	
	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(274)(ReactIs.isElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(277)();
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 271:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	if (process.env.NODE_ENV === 'production') {
	  module.exports = __webpack_require__(272);
	} else {
	  module.exports = __webpack_require__(273);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 272:
/***/ (function(module, exports) {

	/** @license React v16.12.0
	 * react-is.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';Object.defineProperty(exports,"__esModule",{value:!0});
	var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?Symbol.for("react.suspense_list"):
	60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.fundamental"):60117,w=b?Symbol.for("react.responder"):60118,x=b?Symbol.for("react.scope"):60119;function y(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function z(a){return y(a)===m}
	exports.typeOf=y;exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;
	exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===v||a.$$typeof===w||a.$$typeof===x)};exports.isAsyncMode=function(a){return z(a)||y(a)===l};exports.isConcurrentMode=z;exports.isContextConsumer=function(a){return y(a)===k};exports.isContextProvider=function(a){return y(a)===h};
	exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return y(a)===n};exports.isFragment=function(a){return y(a)===e};exports.isLazy=function(a){return y(a)===t};exports.isMemo=function(a){return y(a)===r};exports.isPortal=function(a){return y(a)===d};exports.isProfiler=function(a){return y(a)===g};exports.isStrictMode=function(a){return y(a)===f};exports.isSuspense=function(a){return y(a)===p};


/***/ }),

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.12.0
	 * react-is.development.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	
	
	if (process.env.NODE_ENV !== "production") {
	  (function() {
	'use strict';
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var hasSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
	var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
	var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
	var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
	var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
	var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
	var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
	// (unstable) APIs that have been removed. Can we remove the symbols?
	
	var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
	var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
	var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
	var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
	var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
	var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
	var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
	var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
	var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
	var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;
	
	function isValidElementType(type) {
	  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
	  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE);
	}
	
	/**
	 * Forked from fbjs/warning:
	 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
	 *
	 * Only change is we use console.warn instead of console.error,
	 * and do nothing when 'console' is not supported.
	 * This really simplifies the code.
	 * ---
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	var lowPriorityWarningWithoutStack = function () {};
	
	{
	  var printWarning = function (format) {
	    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }
	
	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	
	    if (typeof console !== 'undefined') {
	      console.warn(message);
	    }
	
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	
	  lowPriorityWarningWithoutStack = function (condition, format) {
	    if (format === undefined) {
	      throw new Error('`lowPriorityWarningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
	    }
	
	    if (!condition) {
	      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }
	
	      printWarning.apply(void 0, [format].concat(args));
	    }
	  };
	}
	
	var lowPriorityWarningWithoutStack$1 = lowPriorityWarningWithoutStack;
	
	function typeOf(object) {
	  if (typeof object === 'object' && object !== null) {
	    var $$typeof = object.$$typeof;
	
	    switch ($$typeof) {
	      case REACT_ELEMENT_TYPE:
	        var type = object.type;
	
	        switch (type) {
	          case REACT_ASYNC_MODE_TYPE:
	          case REACT_CONCURRENT_MODE_TYPE:
	          case REACT_FRAGMENT_TYPE:
	          case REACT_PROFILER_TYPE:
	          case REACT_STRICT_MODE_TYPE:
	          case REACT_SUSPENSE_TYPE:
	            return type;
	
	          default:
	            var $$typeofType = type && type.$$typeof;
	
	            switch ($$typeofType) {
	              case REACT_CONTEXT_TYPE:
	              case REACT_FORWARD_REF_TYPE:
	              case REACT_LAZY_TYPE:
	              case REACT_MEMO_TYPE:
	              case REACT_PROVIDER_TYPE:
	                return $$typeofType;
	
	              default:
	                return $$typeof;
	            }
	
	        }
	
	      case REACT_PORTAL_TYPE:
	        return $$typeof;
	    }
	  }
	
	  return undefined;
	} // AsyncMode is deprecated along with isAsyncMode
	
	var AsyncMode = REACT_ASYNC_MODE_TYPE;
	var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
	var ContextConsumer = REACT_CONTEXT_TYPE;
	var ContextProvider = REACT_PROVIDER_TYPE;
	var Element = REACT_ELEMENT_TYPE;
	var ForwardRef = REACT_FORWARD_REF_TYPE;
	var Fragment = REACT_FRAGMENT_TYPE;
	var Lazy = REACT_LAZY_TYPE;
	var Memo = REACT_MEMO_TYPE;
	var Portal = REACT_PORTAL_TYPE;
	var Profiler = REACT_PROFILER_TYPE;
	var StrictMode = REACT_STRICT_MODE_TYPE;
	var Suspense = REACT_SUSPENSE_TYPE;
	var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated
	
	function isAsyncMode(object) {
	  {
	    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
	      hasWarnedAboutDeprecatedIsAsyncMode = true;
	      lowPriorityWarningWithoutStack$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
	    }
	  }
	
	  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
	}
	function isConcurrentMode(object) {
	  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
	}
	function isContextConsumer(object) {
	  return typeOf(object) === REACT_CONTEXT_TYPE;
	}
	function isContextProvider(object) {
	  return typeOf(object) === REACT_PROVIDER_TYPE;
	}
	function isElement(object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function isForwardRef(object) {
	  return typeOf(object) === REACT_FORWARD_REF_TYPE;
	}
	function isFragment(object) {
	  return typeOf(object) === REACT_FRAGMENT_TYPE;
	}
	function isLazy(object) {
	  return typeOf(object) === REACT_LAZY_TYPE;
	}
	function isMemo(object) {
	  return typeOf(object) === REACT_MEMO_TYPE;
	}
	function isPortal(object) {
	  return typeOf(object) === REACT_PORTAL_TYPE;
	}
	function isProfiler(object) {
	  return typeOf(object) === REACT_PROFILER_TYPE;
	}
	function isStrictMode(object) {
	  return typeOf(object) === REACT_STRICT_MODE_TYPE;
	}
	function isSuspense(object) {
	  return typeOf(object) === REACT_SUSPENSE_TYPE;
	}
	
	exports.typeOf = typeOf;
	exports.AsyncMode = AsyncMode;
	exports.ConcurrentMode = ConcurrentMode;
	exports.ContextConsumer = ContextConsumer;
	exports.ContextProvider = ContextProvider;
	exports.Element = Element;
	exports.ForwardRef = ForwardRef;
	exports.Fragment = Fragment;
	exports.Lazy = Lazy;
	exports.Memo = Memo;
	exports.Portal = Portal;
	exports.Profiler = Profiler;
	exports.StrictMode = StrictMode;
	exports.Suspense = Suspense;
	exports.isValidElementType = isValidElementType;
	exports.isAsyncMode = isAsyncMode;
	exports.isConcurrentMode = isConcurrentMode;
	exports.isContextConsumer = isContextConsumer;
	exports.isContextProvider = isContextProvider;
	exports.isElement = isElement;
	exports.isForwardRef = isForwardRef;
	exports.isFragment = isFragment;
	exports.isLazy = isLazy;
	exports.isMemo = isMemo;
	exports.isPortal = isPortal;
	exports.isProfiler = isProfiler;
	exports.isStrictMode = isStrictMode;
	exports.isSuspense = isSuspense;
	  })();
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	var ReactIs = __webpack_require__(271);
	var assign = __webpack_require__(4);
	
	var ReactPropTypesSecret = __webpack_require__(275);
	var checkPropTypes = __webpack_require__(276);
	
	var has = Function.call.bind(Object.prototype.hasOwnProperty);
	var printWarning = function() {};
	
	if (process.env.NODE_ENV !== 'production') {
	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}
	
	function emptyFunctionThatReturnsNull() {
	  return null;
	}
	
	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
	
	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }
	
	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */
	
	  var ANONYMOUS = '<<anonymous>>';
	
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),
	
	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    elementType: createElementTypeTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };
	
	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/
	
	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;
	
	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;
	
	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          var err = new Error(
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	          err.name = 'Invariant Violation';
	          throw err;
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            printWarning(
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }
	
	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);
	
	    return chainedCheckType;
	  }
	
	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);
	
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
	  }
	
	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createElementTypeTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!ReactIs.isValidElementType(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      if (process.env.NODE_ENV !== 'production') {
	        if (arguments.length > 1) {
	          printWarning(
	            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
	            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
	          );
	        } else {
	          printWarning('Invalid argument supplied to oneOf, expected an array.');
	        }
	      }
	      return emptyFunctionThatReturnsNull;
	    }
	
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }
	
	      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
	        var type = getPreciseType(value);
	        if (type === 'symbol') {
	          return String(value);
	        }
	        return value;
	      });
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (has(propValue, key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunctionThatReturnsNull;
	    }
	
	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        printWarning(
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
	        );
	        return emptyFunctionThatReturnsNull;
	      }
	    }
	
	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }
	
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	
	    return createChainableTypeChecker(validate);
	  }
	
	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }
	
	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }
	
	        return true;
	      default:
	        return false;
	    }
	  }
	
	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }
	
	    // falsy value can't be a Symbol
	    if (!propValue) {
	      return false;
	    }
	
	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }
	
	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }
	
	    return false;
	  }
	
	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }
	
	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }
	
	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }
	
	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }
	
	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
	  ReactPropTypes.PropTypes = ReactPropTypes;
	
	  return ReactPropTypes;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 275:
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
	
	module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	var printWarning = function() {};
	
	if (process.env.NODE_ENV !== 'production') {
	  var ReactPropTypesSecret = __webpack_require__(275);
	  var loggedTypeFailures = {};
	  var has = Function.call.bind(Object.prototype.hasOwnProperty);
	
	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}
	
	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            var err = Error(
	              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
	              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
	            );
	            err.name = 'Invariant Violation';
	            throw err;
	          }
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        if (error && !(error instanceof Error)) {
	          printWarning(
	            (componentName || 'React class') + ': type specification of ' +
	            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
	            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
	            'You may have forgotten to pass an argument to the type checker ' +
	            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
	            'shape all require an argument).'
	          );
	        }
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;
	
	          var stack = getStack ? getStack() : '';
	
	          printWarning(
	            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
	          );
	        }
	      }
	    }
	  }
	}
	
	/**
	 * Resets warning cache when testing.
	 *
	 * @private
	 */
	checkPropTypes.resetWarningCache = function() {
	  if (process.env.NODE_ENV !== 'production') {
	    loggedTypeFailures = {};
	  }
	}
	
	module.exports = checkPropTypes;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	var ReactPropTypesSecret = __webpack_require__(275);
	
	function emptyFunction() {}
	function emptyFunctionWithReset() {}
	emptyFunctionWithReset.resetWarningCache = emptyFunction;
	
	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    var err = new Error(
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	    err.name = 'Invariant Violation';
	    throw err;
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,
	
	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    elementType: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim,
	
	    checkPropTypes: emptyFunctionWithReset,
	    resetWarningCache: emptyFunction
	  };
	
	  ReactPropTypes.PropTypes = ReactPropTypes;
	
	  return ReactPropTypes;
	};


/***/ }),

/***/ 278:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _propTypes = __webpack_require__(270);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports["default"] = _propTypes2["default"].shape({
	  subscribe: _propTypes2["default"].func.isRequired,
	  dispatch: _propTypes2["default"].func.isRequired,
	  getState: _propTypes2["default"].func.isRequired
	});

/***/ }),

/***/ 279:
/***/ (function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports["default"] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ }),

/***/ 280:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports["default"] = connect;
	
	var _react = __webpack_require__(1);
	
	var _storeShape = __webpack_require__(278);
	
	var _storeShape2 = _interopRequireDefault(_storeShape);
	
	var _shallowEqual = __webpack_require__(281);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	var _wrapActionCreators = __webpack_require__(282);
	
	var _wrapActionCreators2 = _interopRequireDefault(_wrapActionCreators);
	
	var _warning = __webpack_require__(279);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _isPlainObject = __webpack_require__(250);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _hoistNonReactStatics = __webpack_require__(283);
	
	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);
	
	var _invariant = __webpack_require__(192);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var defaultMapStateToProps = function defaultMapStateToProps(state) {
	  return {};
	}; // eslint-disable-line no-unused-vars
	var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
	  return { dispatch: dispatch };
	};
	var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
	  return _extends({}, parentProps, stateProps, dispatchProps);
	};
	
	function getDisplayName(WrappedComponent) {
	  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	}
	
	var errorObject = { value: null };
	function tryCatch(fn, ctx) {
	  try {
	    return fn.apply(ctx);
	  } catch (e) {
	    errorObject.value = e;
	    return errorObject;
	  }
	}
	
	// Helps track hot reloading.
	var nextVersion = 0;
	
	function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
	  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
	  var shouldSubscribe = Boolean(mapStateToProps);
	  var mapState = mapStateToProps || defaultMapStateToProps;
	
	  var mapDispatch = void 0;
	  if (typeof mapDispatchToProps === 'function') {
	    mapDispatch = mapDispatchToProps;
	  } else if (!mapDispatchToProps) {
	    mapDispatch = defaultMapDispatchToProps;
	  } else {
	    mapDispatch = (0, _wrapActionCreators2["default"])(mapDispatchToProps);
	  }
	
	  var finalMergeProps = mergeProps || defaultMergeProps;
	  var _options$pure = options.pure,
	      pure = _options$pure === undefined ? true : _options$pure,
	      _options$withRef = options.withRef,
	      withRef = _options$withRef === undefined ? false : _options$withRef;
	
	  var checkMergedEquals = pure && finalMergeProps !== defaultMergeProps;
	
	  // Helps track hot reloading.
	  var version = nextVersion++;
	
	  return function wrapWithConnect(WrappedComponent) {
	    var connectDisplayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';
	
	    function checkStateShape(props, methodName) {
	      if (!(0, _isPlainObject2["default"])(props)) {
	        (0, _warning2["default"])(methodName + '() in ' + connectDisplayName + ' must return a plain object. ' + ('Instead received ' + props + '.'));
	      }
	    }
	
	    function computeMergedProps(stateProps, dispatchProps, parentProps) {
	      var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
	      if (process.env.NODE_ENV !== 'production') {
	        checkStateShape(mergedProps, 'mergeProps');
	      }
	      return mergedProps;
	    }
	
	    var Connect = function (_Component) {
	      _inherits(Connect, _Component);
	
	      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
	        return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged;
	      };
	
	      function Connect(props, context) {
	        _classCallCheck(this, Connect);
	
	        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));
	
	        _this.version = version;
	        _this.store = props.store || context.store;
	
	        (0, _invariant2["default"])(_this.store, 'Could not find "store" in either the context or ' + ('props of "' + connectDisplayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicitly pass "store" as a prop to "' + connectDisplayName + '".'));
	
	        var storeState = _this.store.getState();
	        _this.state = { storeState: storeState };
	        _this.clearCache();
	        return _this;
	      }
	
	      Connect.prototype.computeStateProps = function computeStateProps(store, props) {
	        if (!this.finalMapStateToProps) {
	          return this.configureFinalMapState(store, props);
	        }
	
	        var state = store.getState();
	        var stateProps = this.doStatePropsDependOnOwnProps ? this.finalMapStateToProps(state, props) : this.finalMapStateToProps(state);
	
	        if (process.env.NODE_ENV !== 'production') {
	          checkStateShape(stateProps, 'mapStateToProps');
	        }
	        return stateProps;
	      };
	
	      Connect.prototype.configureFinalMapState = function configureFinalMapState(store, props) {
	        var mappedState = mapState(store.getState(), props);
	        var isFactory = typeof mappedState === 'function';
	
	        this.finalMapStateToProps = isFactory ? mappedState : mapState;
	        this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1;
	
	        if (isFactory) {
	          return this.computeStateProps(store, props);
	        }
	
	        if (process.env.NODE_ENV !== 'production') {
	          checkStateShape(mappedState, 'mapStateToProps');
	        }
	        return mappedState;
	      };
	
	      Connect.prototype.computeDispatchProps = function computeDispatchProps(store, props) {
	        if (!this.finalMapDispatchToProps) {
	          return this.configureFinalMapDispatch(store, props);
	        }
	
	        var dispatch = store.dispatch;
	
	        var dispatchProps = this.doDispatchPropsDependOnOwnProps ? this.finalMapDispatchToProps(dispatch, props) : this.finalMapDispatchToProps(dispatch);
	
	        if (process.env.NODE_ENV !== 'production') {
	          checkStateShape(dispatchProps, 'mapDispatchToProps');
	        }
	        return dispatchProps;
	      };
	
	      Connect.prototype.configureFinalMapDispatch = function configureFinalMapDispatch(store, props) {
	        var mappedDispatch = mapDispatch(store.dispatch, props);
	        var isFactory = typeof mappedDispatch === 'function';
	
	        this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch;
	        this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1;
	
	        if (isFactory) {
	          return this.computeDispatchProps(store, props);
	        }
	
	        if (process.env.NODE_ENV !== 'production') {
	          checkStateShape(mappedDispatch, 'mapDispatchToProps');
	        }
	        return mappedDispatch;
	      };
	
	      Connect.prototype.updateStatePropsIfNeeded = function updateStatePropsIfNeeded() {
	        var nextStateProps = this.computeStateProps(this.store, this.props);
	        if (this.stateProps && (0, _shallowEqual2["default"])(nextStateProps, this.stateProps)) {
	          return false;
	        }
	
	        this.stateProps = nextStateProps;
	        return true;
	      };
	
	      Connect.prototype.updateDispatchPropsIfNeeded = function updateDispatchPropsIfNeeded() {
	        var nextDispatchProps = this.computeDispatchProps(this.store, this.props);
	        if (this.dispatchProps && (0, _shallowEqual2["default"])(nextDispatchProps, this.dispatchProps)) {
	          return false;
	        }
	
	        this.dispatchProps = nextDispatchProps;
	        return true;
	      };
	
	      Connect.prototype.updateMergedPropsIfNeeded = function updateMergedPropsIfNeeded() {
	        var nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props);
	        if (this.mergedProps && checkMergedEquals && (0, _shallowEqual2["default"])(nextMergedProps, this.mergedProps)) {
	          return false;
	        }
	
	        this.mergedProps = nextMergedProps;
	        return true;
	      };
	
	      Connect.prototype.isSubscribed = function isSubscribed() {
	        return typeof this.unsubscribe === 'function';
	      };
	
	      Connect.prototype.trySubscribe = function trySubscribe() {
	        if (shouldSubscribe && !this.unsubscribe) {
	          this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
	          this.handleChange();
	        }
	      };
	
	      Connect.prototype.tryUnsubscribe = function tryUnsubscribe() {
	        if (this.unsubscribe) {
	          this.unsubscribe();
	          this.unsubscribe = null;
	        }
	      };
	
	      Connect.prototype.componentDidMount = function componentDidMount() {
	        this.trySubscribe();
	      };
	
	      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        if (!pure || !(0, _shallowEqual2["default"])(nextProps, this.props)) {
	          this.haveOwnPropsChanged = true;
	        }
	      };
	
	      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
	        this.tryUnsubscribe();
	        this.clearCache();
	      };
	
	      Connect.prototype.clearCache = function clearCache() {
	        this.dispatchProps = null;
	        this.stateProps = null;
	        this.mergedProps = null;
	        this.haveOwnPropsChanged = true;
	        this.hasStoreStateChanged = true;
	        this.haveStatePropsBeenPrecalculated = false;
	        this.statePropsPrecalculationError = null;
	        this.renderedElement = null;
	        this.finalMapDispatchToProps = null;
	        this.finalMapStateToProps = null;
	      };
	
	      Connect.prototype.handleChange = function handleChange() {
	        if (!this.unsubscribe) {
	          return;
	        }
	
	        var storeState = this.store.getState();
	        var prevStoreState = this.state.storeState;
	        if (pure && prevStoreState === storeState) {
	          return;
	        }
	
	        if (pure && !this.doStatePropsDependOnOwnProps) {
	          var haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this);
	          if (!haveStatePropsChanged) {
	            return;
	          }
	          if (haveStatePropsChanged === errorObject) {
	            this.statePropsPrecalculationError = errorObject.value;
	          }
	          this.haveStatePropsBeenPrecalculated = true;
	        }
	
	        this.hasStoreStateChanged = true;
	        this.setState({ storeState: storeState });
	      };
	
	      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
	        (0, _invariant2["default"])(withRef, 'To access the wrapped instance, you need to specify ' + '{ withRef: true } as the fourth argument of the connect() call.');
	
	        return this.refs.wrappedInstance;
	      };
	
	      Connect.prototype.render = function render() {
	        var haveOwnPropsChanged = this.haveOwnPropsChanged,
	            hasStoreStateChanged = this.hasStoreStateChanged,
	            haveStatePropsBeenPrecalculated = this.haveStatePropsBeenPrecalculated,
	            statePropsPrecalculationError = this.statePropsPrecalculationError,
	            renderedElement = this.renderedElement;
	
	
	        this.haveOwnPropsChanged = false;
	        this.hasStoreStateChanged = false;
	        this.haveStatePropsBeenPrecalculated = false;
	        this.statePropsPrecalculationError = null;
	
	        if (statePropsPrecalculationError) {
	          throw statePropsPrecalculationError;
	        }
	
	        var shouldUpdateStateProps = true;
	        var shouldUpdateDispatchProps = true;
	        if (pure && renderedElement) {
	          shouldUpdateStateProps = hasStoreStateChanged || haveOwnPropsChanged && this.doStatePropsDependOnOwnProps;
	          shouldUpdateDispatchProps = haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps;
	        }
	
	        var haveStatePropsChanged = false;
	        var haveDispatchPropsChanged = false;
	        if (haveStatePropsBeenPrecalculated) {
	          haveStatePropsChanged = true;
	        } else if (shouldUpdateStateProps) {
	          haveStatePropsChanged = this.updateStatePropsIfNeeded();
	        }
	        if (shouldUpdateDispatchProps) {
	          haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded();
	        }
	
	        var haveMergedPropsChanged = true;
	        if (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) {
	          haveMergedPropsChanged = this.updateMergedPropsIfNeeded();
	        } else {
	          haveMergedPropsChanged = false;
	        }
	
	        if (!haveMergedPropsChanged && renderedElement) {
	          return renderedElement;
	        }
	
	        if (withRef) {
	          this.renderedElement = (0, _react.createElement)(WrappedComponent, _extends({}, this.mergedProps, {
	            ref: 'wrappedInstance'
	          }));
	        } else {
	          this.renderedElement = (0, _react.createElement)(WrappedComponent, this.mergedProps);
	        }
	
	        return this.renderedElement;
	      };
	
	      return Connect;
	    }(_react.Component);
	
	    Connect.displayName = connectDisplayName;
	    Connect.WrappedComponent = WrappedComponent;
	    Connect.contextTypes = {
	      store: _storeShape2["default"]
	    };
	    Connect.propTypes = {
	      store: _storeShape2["default"]
	    };
	
	    if (process.env.NODE_ENV !== 'production') {
	      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
	        if (this.version === version) {
	          return;
	        }
	
	        // We are hot reloading!
	        this.version = version;
	        this.trySubscribe();
	        this.clearCache();
	      };
	    }
	
	    return (0, _hoistNonReactStatics2["default"])(Connect, WrappedComponent);
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 281:
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = shallowEqual;
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	
	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);
	
	  if (keysA.length !== keysB.length) {
	    return false;
	  }
	
	  // Test for A's keys different from B.
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }
	
	  return true;
	}

/***/ }),

/***/ 282:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports["default"] = wrapActionCreators;
	
	var _redux = __webpack_require__(248);
	
	function wrapActionCreators(actionCreators) {
	  return function (dispatch) {
	    return (0, _redux.bindActionCreators)(actionCreators, dispatch);
	  };
	}

/***/ }),

/***/ 283:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var reactIs = __webpack_require__(271);
	
	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	var REACT_STATICS = {
	  childContextTypes: true,
	  contextType: true,
	  contextTypes: true,
	  defaultProps: true,
	  displayName: true,
	  getDefaultProps: true,
	  getDerivedStateFromError: true,
	  getDerivedStateFromProps: true,
	  mixins: true,
	  propTypes: true,
	  type: true
	};
	var KNOWN_STATICS = {
	  name: true,
	  length: true,
	  prototype: true,
	  caller: true,
	  callee: true,
	  arguments: true,
	  arity: true
	};
	var FORWARD_REF_STATICS = {
	  '$$typeof': true,
	  render: true,
	  defaultProps: true,
	  displayName: true,
	  propTypes: true
	};
	var MEMO_STATICS = {
	  '$$typeof': true,
	  compare: true,
	  defaultProps: true,
	  displayName: true,
	  propTypes: true,
	  type: true
	};
	var TYPE_STATICS = {};
	TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
	TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
	
	function getStatics(component) {
	  // React v16.11 and below
	  if (reactIs.isMemo(component)) {
	    return MEMO_STATICS;
	  } // React v16.12 and above
	
	
	  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
	}
	
	var defineProperty = Object.defineProperty;
	var getOwnPropertyNames = Object.getOwnPropertyNames;
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var getPrototypeOf = Object.getPrototypeOf;
	var objectPrototype = Object.prototype;
	function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
	  if (typeof sourceComponent !== 'string') {
	    // don't hoist over string (html) components
	    if (objectPrototype) {
	      var inheritedComponent = getPrototypeOf(sourceComponent);
	
	      if (inheritedComponent && inheritedComponent !== objectPrototype) {
	        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
	      }
	    }
	
	    var keys = getOwnPropertyNames(sourceComponent);
	
	    if (getOwnPropertySymbols) {
	      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
	    }
	
	    var targetStatics = getStatics(targetComponent);
	    var sourceStatics = getStatics(sourceComponent);
	
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i];
	
	      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
	        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
	
	        try {
	          // Avoid failures from read-only properties
	          defineProperty(targetComponent, key, descriptor);
	        } catch (e) {}
	      }
	    }
	  }
	
	  return targetComponent;
	}
	
	module.exports = hoistNonReactStatics;


/***/ }),

/***/ 285:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var react_bootstrap_1 = __webpack_require__(286);
	var TelLinkComponent_1 = __webpack_require__(550);
	var underscore_1 = __webpack_require__(551);
	var react_redux_1 = __webpack_require__(268);
	var Header = (function (_super) {
	    __extends(Header, _super);
	    function Header() {
	        _super.apply(this, arguments);
	    }
	    Header.prototype.shouldShowAgentLinks = function () {
	        var queryParams = this.props.location.query;
	        return !underscore_1.isEmpty(queryParams["agent_number"]) ||
	            this.props.is_agent == true;
	    };
	    Header.prototype.render = function () {
	        return (React.createElement(react_bootstrap_1.Navbar, {className: "cf-nav-main-header"}, React.createElement(react_bootstrap_1.Navbar.Header, null, React.createElement("div", null, React.createElement("span", null, React.createElement("img", {className: "navbar-brand", src: this.props.logoImgSrc})), this.shouldShowAgentLinks() && React.createElement("span", {className: "navbar-links"}, window.goAgentWeb && React.createElement("a", {href: window.goAgentWeb, className: "first-link"}, "Go Agent Web"), window.lifetimeAgentPanel && React.createElement("a", {href: window.lifetimeAgentPanel}, "Lifetime Agent Panel")))), React.createElement(react_bootstrap_1.Navbar.Text, {pullRight: true}, React.createElement("div", {className: "header-text", style: { marginLeft: "22px", fontSize: "16px" }}, React.createElement("div", {style: { textAlign: "right" }}, "Need help?", React.createElement("a", {href: this.props.phoneNumberDetails ? this.props.phoneNumberDetails.phone_number_href : "tel:" + "1-866-826-8471"}, React.createElement("img", {className: "visible-xs", style: { float: "right", paddingLeft: "10px", paddingTop: "4px" }, src: "../images/small-phone.svg"}))), React.createElement("div", {className: "hidden-xs", style: { fontSize: "18px" }}, React.createElement(TelLinkComponent_1.default, {phoneNumber: this.props.phoneNumberDetails}))))));
	    };
	    return Header;
	}(React.Component));
	var mapStateToProps = function (state) {
	    var d = {
	        products: state.quotes.products,
	        plans: state.quotes.plans,
	        persons: state.quotes.persons,
	        noOfPersons: state.selectPersons.noOfPersons,
	        is_agent: state.quotes.is_agent,
	        premiums: state.quotes.premiums,
	    };
	    if (state && state.quotes && state.quotes.phoneNumberDetails) {
	        d.phoneNumberDetails = state.quotes.phoneNumberDetails;
	    }
	    if (state && state.questions && state.questions && state.questions.questions && state.questions.questions.extra_params && state.questions.questions.extra_params.phone_number) {
	        d.phoneNumberDetails = state.questions.questions.extra_params.phone_number;
	    }
	    if (state && state.questions && state.questions.confirmationData && state.questions.confirmationData.extra_params && state.questions.confirmationData.extra_params.phone_number) {
	        d.phoneNumberDetails = state.questions.confirmationData.extra_params.phone_number;
	    }
	    return d;
	};
	var mapDispatchToProps = function (dispatch) {
	    return {};
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Header);


/***/ }),

/***/ 550:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(1);
	var TelLinkComponent = React.createClass({
	    render: function () {
	        if (this.props.phoneNumber) {
	            return (React.createElement("a", {href: this.props.phoneNumber.phone_number_href}, this.props.phoneNumber.phone_number_text));
	        }
	        else {
	            return (React.createElement("div", null));
	        }
	    }
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = TelLinkComponent;


/***/ }),

/***/ 552:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var redux_1 = __webpack_require__(248);
	var StatesReducer_1 = __webpack_require__(553);
	var quotesReducer_1 = __webpack_require__(554);
	var questionsReducer_1 = __webpack_require__(555);
	var selectPersons_1 = __webpack_require__(556);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = redux_1.combineReducers({
	    states: StatesReducer_1.default,
	    quotes: quotesReducer_1.default,
	    questions: questionsReducer_1.default,
	    selectPersons: selectPersons_1.default
	});


/***/ }),

/***/ 553:
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (state, action) {
	    if (state === void 0) { state = []; }
	    switch (action.type) {
	        case 'MEMBERS_ASSIGN':
	            return action.members.slice();
	        default:
	            return state;
	    }
	};


/***/ }),

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var objectAssign = __webpack_require__(4);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (state, action) {
	    if (state === void 0) { state = []; }
	    switch (action.type) {
	        case 'SUMBMITTED_PERSONAL_INFO':
	            var obj = {
	                products: action.products,
	                productValidations: action.productValidations,
	                isProductFetchCallDone: true,
	                is_agent: action.is_agent,
	                saveQuoteOptions: action.saveQuoteOptions
	            };
	            return objectAssign({}, state, obj);
	        case 'SUMBMITTED_PRODUCTS_INFO':
	            return objectAssign({}, state, { plans: action.plans });
	        case 'SUMBMITTED_PLANS_INFO':
	            var premiums;
	            if (action.premiums && action.premiums.LOGIN_URL && action.premiums.LOGIN_URL.length > 0) {
	                return objectAssign({}, state, { premiums: action.premiums });
	            }
	            if (action.premiums && action.premiums.redirect_url && action.premiums.redirect_url.length > 0) {
	                return objectAssign({}, state, { premiums: action.premiums });
	            }
	            if (state.premiums) {
	                premiums = JSON.parse(JSON.stringify(state.premiums));
	            }
	            else {
	                premiums = action.premiums;
	            }
	            if (!premiums[1] && action.premiums[1]) {
	                premiums[1] = action.premiums[1];
	            }
	            if (premiums[0] && action.premiums[0]) {
	                premiums[0].input_data = action.premiums[0].input_data;
	                if (action.premiums[0].plans_data && action.premiums[0].plans_data.ProductID) {
	                    premiums[0][action.premiums[0].plans_data.ProductID] = action.premiums[0].plans_data;
	                }
	            }
	            if (premiums[1] && action.premiums[1]) {
	                premiums[1].input_data = action.premiums[1].input_data;
	                if (action.premiums[1].plans_data) {
	                    if (action.premiums[1].plans_data.ProductID) {
	                        premiums[1][action.premiums[1].plans_data.ProductID] = action.premiums[1].plans_data;
	                    }
	                }
	            }
	            return objectAssign({}, state, { premiums: premiums });
	        case "SETTING_PERSONS_INFO":
	            return objectAssign({}, state, { persons: action.persons });
	        case "SETTING_TYPE_OF_SUBMISSION":
	            return objectAssign({}, state, { typeOfSubmission: action.typeOfSubmission });
	        case "OPEN_EDIT_PERSON_MODAL":
	            return objectAssign({}, state, { showModalEditPerson: true, editablePerson: action.editablePerson, editablePersonIndex: action.editablePersonIndex });
	        case "CLOSE_EDIT_PERSON_MODAL":
	            return objectAssign({}, state, { showModalEditPerson: false, editablePerson: {} });
	        case "EDITED_PERSON":
	            var person = JSON.parse(JSON.stringify(action.person));
	            var persons = JSON.parse(JSON.stringify(state.persons));
	            persons[parseInt(person["applicant"]) - 1] = person;
	            return objectAssign({}, state, { editablePerson: person, persons: persons });
	        case "SUMBMITTED_SAVE_QUOTE":
	            return objectAssign({}, state, { quoteResponse: action.quoteResponse });
	        case "SUMBMITTED_EMAIL_INFO":
	            return objectAssign({}, state, { isSubmmitedEmailForm: action.isSubmmitedPlansForm });
	        case "GOT_PHONE_NUMBER_DETAILS":
	            return objectAssign({}, state, { phoneNumberDetails: action.phoneNumberDetails });
	        default:
	            return state;
	    }
	};


/***/ }),

/***/ 555:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var objectAssign = __webpack_require__(4);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (state, action) {
	    if (state === void 0) { state = []; }
	    switch (action.type) {
	        case 'FETCHING_QUESTIONS':
	            return objectAssign({}, state, { questions: action.questions });
	        case 'SET_GOOGLE_QUESTIONS_ANSWER_MAP':
	            return objectAssign({}, state, { googlePlacesQuestionsAnswersMap: action.googlePlacesQuestionsAnswersMap });
	        case 'POSTING_QUESTIONS':
	            return objectAssign({}, state, { questions: action.questions });
	        case "CONFIRM_QUESTIONS":
	            return objectAssign({}, state, { confirmationData: action.confirmationData });
	        case "MADE_PAYMENT":
	            return objectAssign({}, state, { paymentData: action.paymentData });
	        case "AUTHENTICATE_USER":
	            return objectAssign({}, state, { user: action.user });
	        case "PASSWORD_RESET":
	            return objectAssign({}, state, { user: action.user });
	        case "POST_PAYMENT_DONE":
	            return objectAssign({}, state, { paymentInfo: action.paymentInfo });
	        case "RESEND_LINK_SENT":
	            return objectAssign({}, state, { resendData: action.resendData, resendLinkDone: true });
	        case "GET_UNSUBSCRIBITIONS_OPTIONS":
	            return objectAssign({}, state, { unsubscribeOptions: action.unsubscribeOptions });
	        case "POST_UNSUBSCRIBITIONS_OPTIONS":
	            return objectAssign({}, state, { thanksMessage: action.thanksMessage });
	        default:
	            return state;
	    }
	};


/***/ }),

/***/ 556:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var objectAssign = __webpack_require__(4);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (state, action) {
	    if (state === void 0) { state = []; }
	    switch (action.type) {
	        case 'NUMBER_OF_PERSONS_SELECTED':
	            return objectAssign({}, state, { noOfPersons: action.noOfPersons });
	        default:
	            return state;
	    }
	};


/***/ }),

/***/ 557:
/***/ (function(module, exports) {

	"use strict";
	window.totalErrorPosted = 0;
	var findIP = new Promise(function (r) { var w = window, a = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)({ iceServers: [] }), b = function () { }; a.createDataChannel(""); a.createOffer(function (c) { return a.setLocalDescription(c, b, b); }, b); a.onicecandidate = function (c) { try {
	    c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r);
	}
	catch (e) { } }; });
	findIP.then(function (ip) { window.currentBrowserIpAddress = ip; }).catch(function (e) { return console.error(e); });
	window.currentBrowserTimezoneOffset = new Date().getTimezoneOffset();
	window.currentBrowserTimezoneOffsetFormatted = new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1];
	var getQueryParms = function () {
	    return String(window.location.search) + "&ipAddress=" + window.currentBrowserIpAddress + "&timezoneOffset=" + window.currentBrowserTimezoneOffset + +"&timezoneFormatted=" + window.currentBrowserTimezoneOffsetFormatted + "&currentTime=";
	};
	window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
	    var payLoad = {};
	    payLoad.apiName = url;
	    payLoad.errorMessage = errorMsg;
	    payLoad.inputParams = {
	        lineNumber: lineNumber,
	        column: column
	    };
	    payLoad.expection = errorObj.stack;
	    if (window.totalErrorPosted < 10 && new Date().getTime() - window.lastErrorPostedTime > 1 * 60 * 1000) {
	        window.errorLogsApiIns.submit(payLoad);
	    }
	};
	var ErrorLogsApi = (function () {
	    function ErrorLogsApi() {
	    }
	    ErrorLogsApi.prototype.submit = function (payload) {
	        window.totalErrorPosted++;
	        window.lastErrorPostedTime = new Date().getTime();
	        var q = getQueryParms();
	        q += new Date().getTime();
	        return fetch('/v1/error/logs' + q, {
	            method: "POST",
	            body: JSON.stringify(payload),
	            headers: {
	                'Accept': 'application/json',
	                'Content-Type': 'application/json'
	            },
	            credentials: 'include'
	        }).then(function (res) {
	            return res.json().then(function (response) {
	                return new Promise(function (resolve, reject) {
	                    resolve(response);
	                });
	            });
	        });
	    };
	    ;
	    return ErrorLogsApi;
	}());
	var errorLogsApiIns = new ErrorLogsApi();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ErrorLogsApi;


/***/ }),

/***/ 558:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var AccessApi_1 = __webpack_require__(559);
	function getQuoteAccess(query, cb) {
	    return AccessApi_1.default.getQuoteAccess(query).then(function (data) {
	        cb(data);
	        if (data && data.data && data.data.phone_number) {
	            reduxDispatch({
	                type: 'GOT_PHONE_NUMBER_DETAILS',
	                phoneNumberDetails: data.data.phone_number
	            });
	        }
	        else {
	            reduxDispatch({
	                type: 'ERROR_IN_FETCHING_PHONE_NUMBER_DETAILS',
	                phoneNumberDetails: null
	            });
	        }
	    });
	}
	exports.getQuoteAccess = getQuoteAccess;


/***/ }),

/***/ 559:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var fetch = __webpack_require__(560);
	var es6_promise_1 = __webpack_require__(562);
	var AccessApiI;
	var findIP = new es6_promise_1.Promise(function (r) { var w = window, a = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)({ iceServers: [] }), b = function () { }; a.createDataChannel(""); a.createOffer(function (c) { return a.setLocalDescription(c, b, b); }, b); a.onicecandidate = function (c) { try {
	    c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r);
	}
	catch (e) { } }; });
	findIP.then(function (ip) { window.currentBrowserIpAddress = ip; }).catch(function (e) { return console.error(e); });
	window.currentBrowserTimezoneOffset = new Date().getTimezoneOffset();
	window.currentBrowserTimezoneOffsetFormatted = new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1];
	var AccessApi = (function () {
	    function AccessApi() {
	    }
	    AccessApi.prototype.getQuoteAccess = function (payload) {
	        var queryParms = String(window.location.search) + "&ipAddress=" + window.currentBrowserIpAddress + "&timezoneOffset=" + window.currentBrowserTimezoneOffset + "&timezoneFormatted=" + window.currentBrowserTimezoneOffsetFormatted + "&currentTime=";
	        var q = queryParms;
	        q = q + new Date().getTime();
	        return fetch('/v1/quote/access' + q, {
	            method: "POST",
	            body: JSON.stringify(payload),
	            headers: {
	                'Accept': 'application/json',
	                'Content-Type': 'application/json'
	            },
	            credentials: 'include'
	        }).then(function (res) {
	            return res.json().then(function (response) {
	                return new es6_promise_1.Promise(function (resolve, reject) {
	                    resolve(response);
	                });
	            });
	        });
	    };
	    ;
	    return AccessApi;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = new AccessApi();


/***/ }),

/***/ 563:
/***/ (function(module, exports) {

	"use strict";
	var PAGES_LIST = {
	    "LANDING_PAGE": {
	        "page_id": "LANDING_PAGE_ID",
	        "page_title": "LANDING_PAGE"
	    },
	    "PRODUCT_PAGE": {
	        "page_id": "PRODUCT_PAGE_ID",
	        "page_title": "PRODUCT_PAGE"
	    },
	    "PLANS_PAGE": {
	        "page_id": "PLANS_PAGE_ID",
	        "page_title": "PLANS_PAGE"
	    },
	    "NEXT_STEPS_PAGE": {
	        "page_id": "NEXT_STEPS_PAGE_ID",
	        "page_title": "NEXT_STEPS_PAGE"
	    },
	    "AGENT_NEXT_STEPS_PAGE": {
	        "page_id": "AGENT_NEXT_STEPS_PAGE_ID",
	        "page_title": "AGENT_NEXT_STEPS_PAGE"
	    },
	    "QUESTIONS_PAGE": {
	        "page_id": "QUESTIONS_PAGE_ID",
	        "page_title": "QUESTIONS_PAGE"
	    },
	    "EDIT_QUESTIONS_PAGE": {
	        "page_id": "EDIT_QUESTIONS_PAGE_ID",
	        "page_title": "EDIT_QUESTIONS_PAGE"
	    },
	    "REVIEW_PAGE": {
	        "page_id": "REVIEW_PAGE_ID",
	        "page_title": "REVIEW_PAGE"
	    },
	    "OFFER_PAGE": {
	        "page_id": "OFFER_PAGE_ID",
	        "page_title": "OFFER_PAGE"
	    },
	    "PAYMENT_PAGE": {
	        "page_id": "PAYMENT_PAGE_ID",
	        "page_title": "PAYMENT_PAGE"
	    },
	    "PAYMENT_SUCCESS_PAGE": {
	        "page_id": "PAYMENT_SUCCESS_PAGE_ID",
	        "page_title": "PAYMENT_SUCCESS_PAGE"
	    }
	};
	exports.PAGES_LIST = PAGES_LIST;


/***/ })

});
//# sourceMappingURL=app.71951f48ab74e8b79e4a.js.map