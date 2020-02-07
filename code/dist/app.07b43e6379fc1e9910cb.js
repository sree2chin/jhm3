webpackJsonp([0],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __assign = (this && this.__assign) || Object.assign || function(t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];
	        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	            t[p] = s[p];
	    }
	    return t;
	};
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(8);
	var react_router_1 = __webpack_require__(19);
	var react_router_dom_1 = __webpack_require__(50);
	var app_1 = __webpack_require__(53);
	var Access = __webpack_require__(368);
	var pages_1 = __webpack_require__(373);
	function getUrlParameter(name) {
	    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	    var results = regex.exec(location.search);
	    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}
	;
	function loadAboutPage(location, callback) {
	    __webpack_require__.e/* nsure */(1, function () { return callback(null, __webpack_require__(374).default); });
	}
	;
	function loadErrorRedirectPage(location, callback) {
	    __webpack_require__.e/* nsure */(2, function () { return callback(null, __webpack_require__(375).default); });
	}
	;
	function loadQuotePage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(376).default); });
	}
	function loadQuestionsPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(509).default); });
	}
	function loadAuthorisePage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(550).default); });
	}
	function loadErrorPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(554).default); });
	}
	function allQuestionsPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(555).default); });
	}
	function getSignaturePage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(556).default); });
	}
	function getOfferPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(557).default); });
	}
	function editQuestionsPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(718).default); });
	}
	function editBeneficiaryQuestionsPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(719).default); });
	}
	function editSignaturePage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(718).default); });
	}
	function loadProductsPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(720).default); });
	}
	function loadPlansPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(729).default); });
	}
	function loadNextStepsPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(791).default); });
	}
	function loadAgentNextStepsPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(797).default); });
	}
	function loadContactAgent(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(801).default); });
	}
	function loadEmailToQuote(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(802).default); });
	}
	function loadAgentEmailToQuote(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(803).default); });
	}
	function loadEmailCaptureToQuote(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(804).default); });
	}
	function loadAgentEmailCaptureToQuote(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(805).default); });
	}
	function loadContactAgentSuccess(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(806).default); });
	}
	function loadEmailToQuoteSuccess(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(807).default); });
	}
	function loadPaymentSuccessPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(808).default); });
	}
	function loadPaymentPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(809).default); });
	}
	function loadUnsubscribePage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(810).default); });
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
	ReactDOM.render(React.createElement(react_router_dom_1.Router, {history: react_router_1.browserHistory}, React.createElement(react_router_dom_1.BrowserRouter, {path: "/", component: app_1.default}, React.createElement(react_router_dom_1.BrowserRouter, {path: "/", render: function (props) { return (React.createElement("div", __assign({}, props), " ", "dddsd")); }}))), document.getElementById('root'));


/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	
	if (process.env.NODE_ENV === "production") {
	  module.exports = __webpack_require__(51);
	} else {
	  module.exports = __webpack_require__(52);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var reactRouter=__webpack_require__(19),React=_interopDefault(__webpack_require__(1)),history=__webpack_require__(29);__webpack_require__(21),__webpack_require__(37);var invariant=_interopDefault(__webpack_require__(38));function _extends(){return(_extends=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e}).apply(this,arguments)}function _inheritsLoose(e,r){e.prototype=Object.create(r.prototype),(e.prototype.constructor=e).__proto__=r}function _objectWithoutPropertiesLoose(e,r){if(null==e)return{};var t,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],0<=r.indexOf(t)||(n[t]=e[t]);return n}var BrowserRouter=function(n){function e(){for(var e,r=arguments.length,t=new Array(r),o=0;o<r;o++)t[o]=arguments[o];return(e=n.call.apply(n,[this].concat(t))||this).history=history.createBrowserHistory(e.props),e}return _inheritsLoose(e,n),e.prototype.render=function(){return React.createElement(reactRouter.Router,{history:this.history,children:this.props.children})},e}(React.Component),HashRouter=function(n){function e(){for(var e,r=arguments.length,t=new Array(r),o=0;o<r;o++)t[o]=arguments[o];return(e=n.call.apply(n,[this].concat(t))||this).history=history.createHashHistory(e.props),e}return _inheritsLoose(e,n),e.prototype.render=function(){return React.createElement(reactRouter.Router,{history:this.history,children:this.props.children})},e}(React.Component),resolveToLocation=function(e,r){return"function"==typeof e?e(r):e},normalizeToLocation=function(e,r){return"string"==typeof e?history.createLocation(e,null,null,r):e},forwardRefShim=function(e){return e},forwardRef=React.forwardRef;function isModifiedEvent(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}void 0===forwardRef&&(forwardRef=forwardRefShim);var LinkAnchor=forwardRef(function(e,r){var t=e.innerRef,o=e.navigate,n=e.onClick,a=_objectWithoutPropertiesLoose(e,["innerRef","navigate","onClick"]),i=a.target,c=_extends({},a,{onClick:function(r){try{n&&n(r)}catch(e){throw r.preventDefault(),e}r.defaultPrevented||0!==r.button||i&&"_self"!==i||isModifiedEvent(r)||(r.preventDefault(),o())}});return c.ref=forwardRefShim!==forwardRef&&r||t,React.createElement("a",c)}),Link=forwardRef(function(e,a){var r=e.component,i=void 0===r?LinkAnchor:r,c=e.replace,f=e.to,u=e.innerRef,s=_objectWithoutPropertiesLoose(e,["component","replace","to","innerRef"]);return React.createElement(reactRouter.__RouterContext.Consumer,null,function(r){r||invariant(!1);var t=r.history,e=normalizeToLocation(resolveToLocation(f,r.location),r.location),o=e?t.createHref(e):"",n=_extends({},s,{href:o,navigate:function(){var e=resolveToLocation(f,r.location);(c?t.replace:t.push)(e)}});return forwardRefShim!==forwardRef?n.ref=a||u:n.innerRef=u,React.createElement(i,n)})}),forwardRefShim$1=function(e){return e},forwardRef$1=React.forwardRef;function joinClassnames(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];return r.filter(function(e){return e}).join(" ")}void 0===forwardRef$1&&(forwardRef$1=forwardRefShim$1);var NavLink=forwardRef$1(function(e,s){var r=e["aria-current"],l=void 0===r?"page":r,t=e.activeClassName,p=void 0===t?"active":t,h=e.activeStyle,R=e.className,d=e.exact,v=e.isActive,y=e.location,m=e.strict,w=e.style,_=e.to,L=e.innerRef,x=_objectWithoutPropertiesLoose(e,["aria-current","activeClassName","activeStyle","className","exact","isActive","location","strict","style","to","innerRef"]);return React.createElement(reactRouter.__RouterContext.Consumer,null,function(e){e||invariant(!1);var r=y||e.location,t=normalizeToLocation(resolveToLocation(_,r),r),o=t.pathname,n=o&&o.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1"),a=n?reactRouter.matchPath(r.pathname,{path:n,exact:d,strict:m}):null,i=!!(v?v(a,r):a),c=i?joinClassnames(R,p):R,f=i?_extends({},w,{},h):w,u=_extends({"aria-current":i&&l||null,className:c,style:f,to:t},x);return forwardRefShim$1!==forwardRef$1?u.ref=s||L:u.innerRef=L,React.createElement(Link,u)})});Object.keys(reactRouter).forEach(function(e){"default"!==e&&Object.defineProperty(exports,e,{enumerable:!0,get:function(){return reactRouter[e]}})}),exports.BrowserRouter=BrowserRouter,exports.HashRouter=HashRouter,exports.Link=Link,exports.NavLink=NavLink;
	//# sourceMappingURL=react-router-dom.min.js.map


/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }
	
	var reactRouter = __webpack_require__(19);
	var React = _interopDefault(__webpack_require__(1));
	var history = __webpack_require__(29);
	var PropTypes = _interopDefault(__webpack_require__(21));
	var warning = _interopDefault(__webpack_require__(37));
	var invariant = _interopDefault(__webpack_require__(38));
	
	function _extends() {
	  _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];
	
	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }
	
	    return target;
	  };
	
	  return _extends.apply(this, arguments);
	}
	
	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = Object.create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  subClass.__proto__ = superClass;
	}
	
	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;
	
	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }
	
	  return target;
	}
	
	/**
	 * The public API for a <Router> that uses HTML5 history.
	 */
	
	var BrowserRouter =
	/*#__PURE__*/
	function (_React$Component) {
	  _inheritsLoose(BrowserRouter, _React$Component);
	
	  function BrowserRouter() {
	    var _this;
	
	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
	    _this.history = history.createBrowserHistory(_this.props);
	    return _this;
	  }
	
	  var _proto = BrowserRouter.prototype;
	
	  _proto.render = function render() {
	    return React.createElement(reactRouter.Router, {
	      history: this.history,
	      children: this.props.children
	    });
	  };
	
	  return BrowserRouter;
	}(React.Component);
	
	{
	  BrowserRouter.propTypes = {
	    basename: PropTypes.string,
	    children: PropTypes.node,
	    forceRefresh: PropTypes.bool,
	    getUserConfirmation: PropTypes.func,
	    keyLength: PropTypes.number
	  };
	
	  BrowserRouter.prototype.componentDidMount = function () {
	     warning(!this.props.history, "<BrowserRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { BrowserRouter as Router }`.") ;
	  };
	}
	
	/**
	 * The public API for a <Router> that uses window.location.hash.
	 */
	
	var HashRouter =
	/*#__PURE__*/
	function (_React$Component) {
	  _inheritsLoose(HashRouter, _React$Component);
	
	  function HashRouter() {
	    var _this;
	
	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
	    _this.history = history.createHashHistory(_this.props);
	    return _this;
	  }
	
	  var _proto = HashRouter.prototype;
	
	  _proto.render = function render() {
	    return React.createElement(reactRouter.Router, {
	      history: this.history,
	      children: this.props.children
	    });
	  };
	
	  return HashRouter;
	}(React.Component);
	
	{
	  HashRouter.propTypes = {
	    basename: PropTypes.string,
	    children: PropTypes.node,
	    getUserConfirmation: PropTypes.func,
	    hashType: PropTypes.oneOf(["hashbang", "noslash", "slash"])
	  };
	
	  HashRouter.prototype.componentDidMount = function () {
	     warning(!this.props.history, "<HashRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { HashRouter as Router }`.") ;
	  };
	}
	
	var resolveToLocation = function resolveToLocation(to, currentLocation) {
	  return typeof to === "function" ? to(currentLocation) : to;
	};
	var normalizeToLocation = function normalizeToLocation(to, currentLocation) {
	  return typeof to === "string" ? history.createLocation(to, null, null, currentLocation) : to;
	};
	
	var forwardRefShim = function forwardRefShim(C) {
	  return C;
	};
	
	var forwardRef = React.forwardRef;
	
	if (typeof forwardRef === "undefined") {
	  forwardRef = forwardRefShim;
	}
	
	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}
	
	var LinkAnchor = forwardRef(function (_ref, forwardedRef) {
	  var innerRef = _ref.innerRef,
	      navigate = _ref.navigate,
	      _onClick = _ref.onClick,
	      rest = _objectWithoutPropertiesLoose(_ref, ["innerRef", "navigate", "onClick"]);
	
	  var target = rest.target;
	
	  var props = _extends({}, rest, {
	    onClick: function onClick(event) {
	      try {
	        if (_onClick) _onClick(event);
	      } catch (ex) {
	        event.preventDefault();
	        throw ex;
	      }
	
	      if (!event.defaultPrevented && // onClick prevented default
	      event.button === 0 && ( // ignore everything but left clicks
	      !target || target === "_self") && // let browser handle "target=_blank" etc.
	      !isModifiedEvent(event) // ignore clicks with modifier keys
	      ) {
	          event.preventDefault();
	          navigate();
	        }
	    }
	  }); // React 15 compat
	
	
	  if (forwardRefShim !== forwardRef) {
	    props.ref = forwardedRef || innerRef;
	  } else {
	    props.ref = innerRef;
	  }
	
	  return React.createElement("a", props);
	});
	
	{
	  LinkAnchor.displayName = "LinkAnchor";
	}
	/**
	 * The public API for rendering a history-aware <a>.
	 */
	
	
	var Link = forwardRef(function (_ref2, forwardedRef) {
	  var _ref2$component = _ref2.component,
	      component = _ref2$component === void 0 ? LinkAnchor : _ref2$component,
	      replace = _ref2.replace,
	      to = _ref2.to,
	      innerRef = _ref2.innerRef,
	      rest = _objectWithoutPropertiesLoose(_ref2, ["component", "replace", "to", "innerRef"]);
	
	  return React.createElement(reactRouter.__RouterContext.Consumer, null, function (context) {
	    !context ?  invariant(false, "You should not use <Link> outside a <Router>")  : void 0;
	    var history = context.history;
	    var location = normalizeToLocation(resolveToLocation(to, context.location), context.location);
	    var href = location ? history.createHref(location) : "";
	
	    var props = _extends({}, rest, {
	      href: href,
	      navigate: function navigate() {
	        var location = resolveToLocation(to, context.location);
	        var method = replace ? history.replace : history.push;
	        method(location);
	      }
	    }); // React 15 compat
	
	
	    if (forwardRefShim !== forwardRef) {
	      props.ref = forwardedRef || innerRef;
	    } else {
	      props.innerRef = innerRef;
	    }
	
	    return React.createElement(component, props);
	  });
	});
	
	{
	  var toType = PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]);
	  var refType = PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.shape({
	    current: PropTypes.any
	  })]);
	  Link.displayName = "Link";
	  Link.propTypes = {
	    innerRef: refType,
	    onClick: PropTypes.func,
	    replace: PropTypes.bool,
	    target: PropTypes.string,
	    to: toType.isRequired
	  };
	}
	
	var forwardRefShim$1 = function forwardRefShim(C) {
	  return C;
	};
	
	var forwardRef$1 = React.forwardRef;
	
	if (typeof forwardRef$1 === "undefined") {
	  forwardRef$1 = forwardRefShim$1;
	}
	
	function joinClassnames() {
	  for (var _len = arguments.length, classnames = new Array(_len), _key = 0; _key < _len; _key++) {
	    classnames[_key] = arguments[_key];
	  }
	
	  return classnames.filter(function (i) {
	    return i;
	  }).join(" ");
	}
	/**
	 * A <Link> wrapper that knows if it's "active" or not.
	 */
	
	
	var NavLink = forwardRef$1(function (_ref, forwardedRef) {
	  var _ref$ariaCurrent = _ref["aria-current"],
	      ariaCurrent = _ref$ariaCurrent === void 0 ? "page" : _ref$ariaCurrent,
	      _ref$activeClassName = _ref.activeClassName,
	      activeClassName = _ref$activeClassName === void 0 ? "active" : _ref$activeClassName,
	      activeStyle = _ref.activeStyle,
	      classNameProp = _ref.className,
	      exact = _ref.exact,
	      isActiveProp = _ref.isActive,
	      locationProp = _ref.location,
	      strict = _ref.strict,
	      styleProp = _ref.style,
	      to = _ref.to,
	      innerRef = _ref.innerRef,
	      rest = _objectWithoutPropertiesLoose(_ref, ["aria-current", "activeClassName", "activeStyle", "className", "exact", "isActive", "location", "strict", "style", "to", "innerRef"]);
	
	  return React.createElement(reactRouter.__RouterContext.Consumer, null, function (context) {
	    !context ?  invariant(false, "You should not use <NavLink> outside a <Router>")  : void 0;
	    var currentLocation = locationProp || context.location;
	    var toLocation = normalizeToLocation(resolveToLocation(to, currentLocation), currentLocation);
	    var path = toLocation.pathname; // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
	
	    var escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
	    var match = escapedPath ? reactRouter.matchPath(currentLocation.pathname, {
	      path: escapedPath,
	      exact: exact,
	      strict: strict
	    }) : null;
	    var isActive = !!(isActiveProp ? isActiveProp(match, currentLocation) : match);
	    var className = isActive ? joinClassnames(classNameProp, activeClassName) : classNameProp;
	    var style = isActive ? _extends({}, styleProp, {}, activeStyle) : styleProp;
	
	    var props = _extends({
	      "aria-current": isActive && ariaCurrent || null,
	      className: className,
	      style: style,
	      to: toLocation
	    }, rest); // React 15 compat
	
	
	    if (forwardRefShim$1 !== forwardRef$1) {
	      props.ref = forwardedRef || innerRef;
	    } else {
	      props.innerRef = innerRef;
	    }
	
	    return React.createElement(Link, props);
	  });
	});
	
	{
	  NavLink.displayName = "NavLink";
	  var ariaCurrentType = PropTypes.oneOf(["page", "step", "location", "date", "time", "true"]);
	  NavLink.propTypes = _extends({}, Link.propTypes, {
	    "aria-current": ariaCurrentType,
	    activeClassName: PropTypes.string,
	    activeStyle: PropTypes.object,
	    className: PropTypes.string,
	    exact: PropTypes.bool,
	    isActive: PropTypes.func,
	    location: PropTypes.object,
	    strict: PropTypes.bool,
	    style: PropTypes.object
	  });
	}
	
	Object.keys(reactRouter).forEach(function (k) {
	  if (k !== 'default') Object.defineProperty(exports, k, {
	    enumerable: true,
	    get: function () {
	      return reactRouter[k];
	    }
	  });
	});
	exports.BrowserRouter = BrowserRouter;
	exports.HashRouter = HashRouter;
	exports.Link = Link;
	exports.NavLink = NavLink;
	//# sourceMappingURL=react-router-dom.js.map


/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var redux_1 = __webpack_require__(54);
	var react_redux_1 = __webpack_require__(58);
	var redux_thunk_1 = __webpack_require__(91);
	var header_1 = __webpack_require__(92);
	var reducers_1 = __webpack_require__(362);
	var react_bootstrap_1 = __webpack_require__(93);
	var ErrorLogsApi_1 = __webpack_require__(367);
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

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(59);
	
	exports.__esModule = true;
	
	var _Provider = _interopRequireDefault(__webpack_require__(60));
	
	exports.Provider = _Provider["default"];
	
	var _connectAdvanced = _interopRequireDefault(__webpack_require__(66));
	
	exports.connectAdvanced = _connectAdvanced["default"];
	
	var _Context = __webpack_require__(63);
	
	exports.ReactReduxContext = _Context.ReactReduxContext;
	
	var _connect = _interopRequireDefault(__webpack_require__(75));
	
	exports.connect = _connect["default"];
	
	var _useDispatch = __webpack_require__(86);
	
	exports.useDispatch = _useDispatch.useDispatch;
	exports.createDispatchHook = _useDispatch.createDispatchHook;
	
	var _useSelector = __webpack_require__(89);
	
	exports.useSelector = _useSelector.useSelector;
	exports.createSelectorHook = _useSelector.createSelectorHook;
	
	var _useStore = __webpack_require__(87);
	
	exports.useStore = _useStore.useStore;
	exports.createStoreHook = _useStore.createStoreHook;
	
	var _batch = __webpack_require__(65);
	
	var _reactBatchedUpdates = __webpack_require__(90);
	
	exports.batch = _reactBatchedUpdates.unstable_batchedUpdates;
	
	var _shallowEqual = _interopRequireDefault(__webpack_require__(76));
	
	exports.shallowEqual = _shallowEqual["default"];
	(0, _batch.setBatch)(_reactBatchedUpdates.unstable_batchedUpdates);

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(59);
	
	var _interopRequireWildcard = __webpack_require__(61);
	
	exports.__esModule = true;
	exports["default"] = void 0;
	
	var _react = _interopRequireWildcard(__webpack_require__(1));
	
	var _propTypes = _interopRequireDefault(__webpack_require__(21));
	
	var _Context = __webpack_require__(63);
	
	var _Subscription = _interopRequireDefault(__webpack_require__(64));
	
	function Provider(_ref) {
	  var store = _ref.store,
	      context = _ref.context,
	      children = _ref.children;
	  var contextValue = (0, _react.useMemo)(function () {
	    var subscription = new _Subscription["default"](store);
	    subscription.onStateChange = subscription.notifyNestedSubs;
	    return {
	      store: store,
	      subscription: subscription
	    };
	  }, [store]);
	  var previousState = (0, _react.useMemo)(function () {
	    return store.getState();
	  }, [store]);
	  (0, _react.useEffect)(function () {
	    var subscription = contextValue.subscription;
	    subscription.trySubscribe();
	
	    if (previousState !== store.getState()) {
	      subscription.notifyNestedSubs();
	    }
	
	    return function () {
	      subscription.tryUnsubscribe();
	      subscription.onStateChange = null;
	    };
	  }, [contextValue, previousState]);
	  var Context = context || _Context.ReactReduxContext;
	  return _react["default"].createElement(Context.Provider, {
	    value: contextValue
	  }, children);
	}
	
	Provider.propTypes = {
	  store: _propTypes["default"].shape({
	    subscribe: _propTypes["default"].func.isRequired,
	    dispatch: _propTypes["default"].func.isRequired,
	    getState: _propTypes["default"].func.isRequired
	  }),
	  context: _propTypes["default"].object,
	  children: _propTypes["default"].any
	};
	var _default = Provider;
	exports["default"] = _default;

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

	var _typeof = __webpack_require__(62);
	
	function _getRequireWildcardCache() {
	  if (typeof WeakMap !== "function") return null;
	  var cache = new WeakMap();
	
	  _getRequireWildcardCache = function _getRequireWildcardCache() {
	    return cache;
	  };
	
	  return cache;
	}
	
	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  }
	
	  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
	    return {
	      "default": obj
	    };
	  }
	
	  var cache = _getRequireWildcardCache();
	
	  if (cache && cache.has(obj)) {
	    return cache.get(obj);
	  }
	
	  var newObj = {};
	  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
	
	  for (var key in obj) {
	    if (Object.prototype.hasOwnProperty.call(obj, key)) {
	      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
	
	      if (desc && (desc.get || desc.set)) {
	        Object.defineProperty(newObj, key, desc);
	      } else {
	        newObj[key] = obj[key];
	      }
	    }
	  }
	
	  newObj["default"] = obj;
	
	  if (cache) {
	    cache.set(obj, newObj);
	  }
	
	  return newObj;
	}
	
	module.exports = _interopRequireWildcard;

/***/ }),

/***/ 62:
/***/ (function(module, exports) {

	function _typeof(obj) {
	  "@babel/helpers - typeof";
	
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return typeof obj;
	    };
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }
	
	  return _typeof(obj);
	}
	
	module.exports = _typeof;

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(59);
	
	exports.__esModule = true;
	exports["default"] = exports.ReactReduxContext = void 0;
	
	var _react = _interopRequireDefault(__webpack_require__(1));
	
	var ReactReduxContext = _react["default"].createContext(null);
	
	exports.ReactReduxContext = ReactReduxContext;
	var _default = ReactReduxContext;
	exports["default"] = _default;

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = void 0;
	
	var _batch = __webpack_require__(65);
	
	// encapsulates the subscription logic for connecting a component to the redux store, as
	// well as nesting subscriptions of descendant components, so that we can ensure the
	// ancestor components re-render before descendants
	var CLEARED = null;
	var nullListeners = {
	  notify: function notify() {}
	};
	
	function createListenerCollection() {
	  var batch = (0, _batch.getBatch)(); // the current/next pattern is copied from redux's createStore code.
	  // TODO: refactor+expose that code to be reusable here?
	
	  var current = [];
	  var next = [];
	  return {
	    clear: function clear() {
	      next = CLEARED;
	      current = CLEARED;
	    },
	    notify: function notify() {
	      var listeners = current = next;
	      batch(function () {
	        for (var i = 0; i < listeners.length; i++) {
	          listeners[i]();
	        }
	      });
	    },
	    get: function get() {
	      return next;
	    },
	    subscribe: function subscribe(listener) {
	      var isSubscribed = true;
	      if (next === current) next = current.slice();
	      next.push(listener);
	      return function unsubscribe() {
	        if (!isSubscribed || current === CLEARED) return;
	        isSubscribed = false;
	        if (next === current) next = current.slice();
	        next.splice(next.indexOf(listener), 1);
	      };
	    }
	  };
	}
	
	var Subscription =
	/*#__PURE__*/
	function () {
	  function Subscription(store, parentSub) {
	    this.store = store;
	    this.parentSub = parentSub;
	    this.unsubscribe = null;
	    this.listeners = nullListeners;
	    this.handleChangeWrapper = this.handleChangeWrapper.bind(this);
	  }
	
	  var _proto = Subscription.prototype;
	
	  _proto.addNestedSub = function addNestedSub(listener) {
	    this.trySubscribe();
	    return this.listeners.subscribe(listener);
	  };
	
	  _proto.notifyNestedSubs = function notifyNestedSubs() {
	    this.listeners.notify();
	  };
	
	  _proto.handleChangeWrapper = function handleChangeWrapper() {
	    if (this.onStateChange) {
	      this.onStateChange();
	    }
	  };
	
	  _proto.isSubscribed = function isSubscribed() {
	    return Boolean(this.unsubscribe);
	  };
	
	  _proto.trySubscribe = function trySubscribe() {
	    if (!this.unsubscribe) {
	      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.handleChangeWrapper) : this.store.subscribe(this.handleChangeWrapper);
	      this.listeners = createListenerCollection();
	    }
	  };
	
	  _proto.tryUnsubscribe = function tryUnsubscribe() {
	    if (this.unsubscribe) {
	      this.unsubscribe();
	      this.unsubscribe = null;
	      this.listeners.clear();
	      this.listeners = nullListeners;
	    }
	  };
	
	  return Subscription;
	}();
	
	exports["default"] = Subscription;

/***/ }),

/***/ 65:
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports.getBatch = exports.setBatch = void 0;
	
	// Default to a dummy "batch" implementation that just runs the callback
	function defaultNoopBatch(callback) {
	  callback();
	}
	
	var batch = defaultNoopBatch; // Allow injecting another batching function later
	
	var setBatch = function setBatch(newBatch) {
	  return batch = newBatch;
	}; // Supply a getter just to skip dealing with ESM bindings
	
	
	exports.setBatch = setBatch;
	
	var getBatch = function getBatch() {
	  return batch;
	};
	
	exports.getBatch = getBatch;

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	
	var _interopRequireWildcard = __webpack_require__(61);
	
	var _interopRequireDefault = __webpack_require__(59);
	
	exports.__esModule = true;
	exports["default"] = connectAdvanced;
	
	var _extends2 = _interopRequireDefault(__webpack_require__(67));
	
	var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(68));
	
	var _hoistNonReactStatics = _interopRequireDefault(__webpack_require__(69));
	
	var _invariant = _interopRequireDefault(__webpack_require__(73));
	
	var _react = _interopRequireWildcard(__webpack_require__(1));
	
	var _reactIs = __webpack_require__(70);
	
	var _Subscription = _interopRequireDefault(__webpack_require__(64));
	
	var _useIsomorphicLayoutEffect = __webpack_require__(74);
	
	var _Context = __webpack_require__(63);
	
	// Define some constant arrays just to avoid re-creating these
	var EMPTY_ARRAY = [];
	var NO_SUBSCRIPTION_ARRAY = [null, null];
	
	var stringifyComponent = function stringifyComponent(Comp) {
	  try {
	    return JSON.stringify(Comp);
	  } catch (err) {
	    return String(Comp);
	  }
	};
	
	function storeStateUpdatesReducer(state, action) {
	  var updateCount = state[1];
	  return [action.payload, updateCount + 1];
	}
	
	var initStateUpdates = function initStateUpdates() {
	  return [null, 0];
	};
	
	function connectAdvanced(
	/*
	  selectorFactory is a func that is responsible for returning the selector function used to
	  compute new props from state, props, and dispatch. For example:
	      export default connectAdvanced((dispatch, options) => (state, props) => ({
	      thing: state.things[props.thingId],
	      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
	    }))(YourComponent)
	    Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
	  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
	  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
	    Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
	  props. Do not use connectAdvanced directly without memoizing results between calls to your
	  selector, otherwise the Connect component will re-render on every state or props change.
	*/
	selectorFactory, // options object:
	_ref) {
	  if (_ref === void 0) {
	    _ref = {};
	  }
	
	  var _ref2 = _ref,
	      _ref2$getDisplayName = _ref2.getDisplayName,
	      getDisplayName = _ref2$getDisplayName === void 0 ? function (name) {
	    return "ConnectAdvanced(" + name + ")";
	  } : _ref2$getDisplayName,
	      _ref2$methodName = _ref2.methodName,
	      methodName = _ref2$methodName === void 0 ? 'connectAdvanced' : _ref2$methodName,
	      _ref2$renderCountProp = _ref2.renderCountProp,
	      renderCountProp = _ref2$renderCountProp === void 0 ? undefined : _ref2$renderCountProp,
	      _ref2$shouldHandleSta = _ref2.shouldHandleStateChanges,
	      shouldHandleStateChanges = _ref2$shouldHandleSta === void 0 ? true : _ref2$shouldHandleSta,
	      _ref2$storeKey = _ref2.storeKey,
	      storeKey = _ref2$storeKey === void 0 ? 'store' : _ref2$storeKey,
	      _ref2$withRef = _ref2.withRef,
	      withRef = _ref2$withRef === void 0 ? false : _ref2$withRef,
	      _ref2$forwardRef = _ref2.forwardRef,
	      forwardRef = _ref2$forwardRef === void 0 ? false : _ref2$forwardRef,
	      _ref2$context = _ref2.context,
	      context = _ref2$context === void 0 ? _Context.ReactReduxContext : _ref2$context,
	      connectOptions = (0, _objectWithoutPropertiesLoose2["default"])(_ref2, ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef", "forwardRef", "context"]);
	  (0, _invariant["default"])(renderCountProp === undefined, "renderCountProp is removed. render counting is built into the latest React Dev Tools profiling extension");
	  (0, _invariant["default"])(!withRef, 'withRef is removed. To access the wrapped instance, use a ref on the connected component');
	  var customStoreWarningMessage = 'To use a custom Redux store for specific components, create a custom React context with ' + "React.createContext(), and pass the context object to React Redux's Provider and specific components" + ' like: <Provider context={MyContext}><ConnectedComponent context={MyContext} /></Provider>. ' + 'You may also pass a {context : MyContext} option to connect';
	  (0, _invariant["default"])(storeKey === 'store', 'storeKey has been removed and does not do anything. ' + customStoreWarningMessage);
	  var Context = context;
	  return function wrapWithConnect(WrappedComponent) {
	    if (process.env.NODE_ENV !== 'production') {
	      (0, _invariant["default"])((0, _reactIs.isValidElementType)(WrappedComponent), "You must pass a component to the function returned by " + (methodName + ". Instead received " + stringifyComponent(WrappedComponent)));
	    }
	
	    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
	    var displayName = getDisplayName(wrappedComponentName);
	    var selectorFactoryOptions = (0, _extends2["default"])({}, connectOptions, {
	      getDisplayName: getDisplayName,
	      methodName: methodName,
	      renderCountProp: renderCountProp,
	      shouldHandleStateChanges: shouldHandleStateChanges,
	      storeKey: storeKey,
	      displayName: displayName,
	      wrappedComponentName: wrappedComponentName,
	      WrappedComponent: WrappedComponent
	    });
	    var pure = connectOptions.pure;
	
	    function createChildSelector(store) {
	      return selectorFactory(store.dispatch, selectorFactoryOptions);
	    } // If we aren't running in "pure" mode, we don't want to memoize values.
	    // To avoid conditionally calling hooks, we fall back to a tiny wrapper
	    // that just executes the given callback immediately.
	
	
	    var usePureOnlyMemo = pure ? _react.useMemo : function (callback) {
	      return callback();
	    };
	
	    function ConnectFunction(props) {
	      var _useMemo = (0, _react.useMemo)(function () {
	        // Distinguish between actual "data" props that were passed to the wrapper component,
	        // and values needed to control behavior (forwarded refs, alternate context instances).
	        // To maintain the wrapperProps object reference, memoize this destructuring.
	        var forwardedRef = props.forwardedRef,
	            wrapperProps = (0, _objectWithoutPropertiesLoose2["default"])(props, ["forwardedRef"]);
	        return [props.context, forwardedRef, wrapperProps];
	      }, [props]),
	          propsContext = _useMemo[0],
	          forwardedRef = _useMemo[1],
	          wrapperProps = _useMemo[2];
	
	      var ContextToUse = (0, _react.useMemo)(function () {
	        // Users may optionally pass in a custom context instance to use instead of our ReactReduxContext.
	        // Memoize the check that determines which context instance we should use.
	        return propsContext && propsContext.Consumer && (0, _reactIs.isContextConsumer)(_react["default"].createElement(propsContext.Consumer, null)) ? propsContext : Context;
	      }, [propsContext, Context]); // Retrieve the store and ancestor subscription via context, if available
	
	      var contextValue = (0, _react.useContext)(ContextToUse); // The store _must_ exist as either a prop or in context.
	      // We'll check to see if it _looks_ like a Redux store first.
	      // This allows us to pass through a `store` prop that is just a plain value.
	
	      var didStoreComeFromProps = Boolean(props.store) && Boolean(props.store.getState) && Boolean(props.store.dispatch);
	      var didStoreComeFromContext = Boolean(contextValue) && Boolean(contextValue.store);
	      (0, _invariant["default"])(didStoreComeFromProps || didStoreComeFromContext, "Could not find \"store\" in the context of " + ("\"" + displayName + "\". Either wrap the root component in a <Provider>, ") + "or pass a custom React context provider to <Provider> and the corresponding " + ("React context consumer to " + displayName + " in connect options.")); // Based on the previous check, one of these must be true
	
	      var store = didStoreComeFromProps ? props.store : contextValue.store;
	      var childPropsSelector = (0, _react.useMemo)(function () {
	        // The child props selector needs the store reference as an input.
	        // Re-create this selector whenever the store changes.
	        return createChildSelector(store);
	      }, [store]);
	
	      var _useMemo2 = (0, _react.useMemo)(function () {
	        if (!shouldHandleStateChanges) return NO_SUBSCRIPTION_ARRAY; // This Subscription's source should match where store came from: props vs. context. A component
	        // connected to the store via props shouldn't use subscription from context, or vice versa.
	
	        var subscription = new _Subscription["default"](store, didStoreComeFromProps ? null : contextValue.subscription); // `notifyNestedSubs` is duplicated to handle the case where the component is unmounted in
	        // the middle of the notification loop, where `subscription` will then be null. This can
	        // probably be avoided if Subscription's listeners logic is changed to not call listeners
	        // that have been unsubscribed in the  middle of the notification loop.
	
	        var notifyNestedSubs = subscription.notifyNestedSubs.bind(subscription);
	        return [subscription, notifyNestedSubs];
	      }, [store, didStoreComeFromProps, contextValue]),
	          subscription = _useMemo2[0],
	          notifyNestedSubs = _useMemo2[1]; // Determine what {store, subscription} value should be put into nested context, if necessary,
	      // and memoize that value to avoid unnecessary context updates.
	
	
	      var overriddenContextValue = (0, _react.useMemo)(function () {
	        if (didStoreComeFromProps) {
	          // This component is directly subscribed to a store from props.
	          // We don't want descendants reading from this store - pass down whatever
	          // the existing context value is from the nearest connected ancestor.
	          return contextValue;
	        } // Otherwise, put this component's subscription instance into context, so that
	        // connected descendants won't update until after this component is done
	
	
	        return (0, _extends2["default"])({}, contextValue, {
	          subscription: subscription
	        });
	      }, [didStoreComeFromProps, contextValue, subscription]); // We need to force this wrapper component to re-render whenever a Redux store update
	      // causes a change to the calculated child component props (or we caught an error in mapState)
	
	      var _useReducer = (0, _react.useReducer)(storeStateUpdatesReducer, EMPTY_ARRAY, initStateUpdates),
	          _useReducer$ = _useReducer[0],
	          previousStateUpdateResult = _useReducer$[0],
	          forceComponentUpdateDispatch = _useReducer[1]; // Propagate any mapState/mapDispatch errors upwards
	
	
	      if (previousStateUpdateResult && previousStateUpdateResult.error) {
	        throw previousStateUpdateResult.error;
	      } // Set up refs to coordinate values between the subscription effect and the render logic
	
	
	      var lastChildProps = (0, _react.useRef)();
	      var lastWrapperProps = (0, _react.useRef)(wrapperProps);
	      var childPropsFromStoreUpdate = (0, _react.useRef)();
	      var renderIsScheduled = (0, _react.useRef)(false);
	      var actualChildProps = usePureOnlyMemo(function () {
	        // Tricky logic here:
	        // - This render may have been triggered by a Redux store update that produced new child props
	        // - However, we may have gotten new wrapper props after that
	        // If we have new child props, and the same wrapper props, we know we should use the new child props as-is.
	        // But, if we have new wrapper props, those might change the child props, so we have to recalculate things.
	        // So, we'll use the child props from store update only if the wrapper props are the same as last time.
	        if (childPropsFromStoreUpdate.current && wrapperProps === lastWrapperProps.current) {
	          return childPropsFromStoreUpdate.current;
	        } // TODO We're reading the store directly in render() here. Bad idea?
	        // This will likely cause Bad Things (TM) to happen in Concurrent Mode.
	        // Note that we do this because on renders _not_ caused by store updates, we need the latest store state
	        // to determine what the child props should be.
	
	
	        return childPropsSelector(store.getState(), wrapperProps);
	      }, [store, previousStateUpdateResult, wrapperProps]); // We need this to execute synchronously every time we re-render. However, React warns
	      // about useLayoutEffect in SSR, so we try to detect environment and fall back to
	      // just useEffect instead to avoid the warning, since neither will run anyway.
	
	      (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
	        // We want to capture the wrapper props and child props we used for later comparisons
	        lastWrapperProps.current = wrapperProps;
	        lastChildProps.current = actualChildProps;
	        renderIsScheduled.current = false; // If the render was from a store update, clear out that reference and cascade the subscriber update
	
	        if (childPropsFromStoreUpdate.current) {
	          childPropsFromStoreUpdate.current = null;
	          notifyNestedSubs();
	        }
	      }); // Our re-subscribe logic only runs when the store/subscription setup changes
	
	      (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
	        // If we're not subscribed to the store, nothing to do here
	        if (!shouldHandleStateChanges) return; // Capture values for checking if and when this component unmounts
	
	        var didUnsubscribe = false;
	        var lastThrownError = null; // We'll run this callback every time a store subscription update propagates to this component
	
	        var checkForUpdates = function checkForUpdates() {
	          if (didUnsubscribe) {
	            // Don't run stale listeners.
	            // Redux doesn't guarantee unsubscriptions happen until next dispatch.
	            return;
	          }
	
	          var latestStoreState = store.getState();
	          var newChildProps, error;
	
	          try {
	            // Actually run the selector with the most recent store state and wrapper props
	            // to determine what the child props should be
	            newChildProps = childPropsSelector(latestStoreState, lastWrapperProps.current);
	          } catch (e) {
	            error = e;
	            lastThrownError = e;
	          }
	
	          if (!error) {
	            lastThrownError = null;
	          } // If the child props haven't changed, nothing to do here - cascade the subscription update
	
	
	          if (newChildProps === lastChildProps.current) {
	            if (!renderIsScheduled.current) {
	              notifyNestedSubs();
	            }
	          } else {
	            // Save references to the new child props.  Note that we track the "child props from store update"
	            // as a ref instead of a useState/useReducer because we need a way to determine if that value has
	            // been processed.  If this went into useState/useReducer, we couldn't clear out the value without
	            // forcing another re-render, which we don't want.
	            lastChildProps.current = newChildProps;
	            childPropsFromStoreUpdate.current = newChildProps;
	            renderIsScheduled.current = true; // If the child props _did_ change (or we caught an error), this wrapper component needs to re-render
	
	            forceComponentUpdateDispatch({
	              type: 'STORE_UPDATED',
	              payload: {
	                error: error
	              }
	            });
	          }
	        }; // Actually subscribe to the nearest connected ancestor (or store)
	
	
	        subscription.onStateChange = checkForUpdates;
	        subscription.trySubscribe(); // Pull data from the store after first render in case the store has
	        // changed since we began.
	
	        checkForUpdates();
	
	        var unsubscribeWrapper = function unsubscribeWrapper() {
	          didUnsubscribe = true;
	          subscription.tryUnsubscribe();
	          subscription.onStateChange = null;
	
	          if (lastThrownError) {
	            // It's possible that we caught an error due to a bad mapState function, but the
	            // parent re-rendered without this component and we're about to unmount.
	            // This shouldn't happen as long as we do top-down subscriptions correctly, but
	            // if we ever do those wrong, this throw will surface the error in our tests.
	            // In that case, throw the error from here so it doesn't get lost.
	            throw lastThrownError;
	          }
	        };
	
	        return unsubscribeWrapper;
	      }, [store, subscription, childPropsSelector]); // Now that all that's done, we can finally try to actually render the child component.
	      // We memoize the elements for the rendered child component as an optimization.
	
	      var renderedWrappedComponent = (0, _react.useMemo)(function () {
	        return _react["default"].createElement(WrappedComponent, (0, _extends2["default"])({}, actualChildProps, {
	          ref: forwardedRef
	        }));
	      }, [forwardedRef, WrappedComponent, actualChildProps]); // If React sees the exact same element reference as last time, it bails out of re-rendering
	      // that child, same as if it was wrapped in React.memo() or returned false from shouldComponentUpdate.
	
	      var renderedChild = (0, _react.useMemo)(function () {
	        if (shouldHandleStateChanges) {
	          // If this component is subscribed to store updates, we need to pass its own
	          // subscription instance down to our descendants. That means rendering the same
	          // Context instance, and putting a different value into the context.
	          return _react["default"].createElement(ContextToUse.Provider, {
	            value: overriddenContextValue
	          }, renderedWrappedComponent);
	        }
	
	        return renderedWrappedComponent;
	      }, [ContextToUse, renderedWrappedComponent, overriddenContextValue]);
	      return renderedChild;
	    } // If we're in "pure" mode, ensure our wrapper component only re-renders when incoming props have changed.
	
	
	    var Connect = pure ? _react["default"].memo(ConnectFunction) : ConnectFunction;
	    Connect.WrappedComponent = WrappedComponent;
	    Connect.displayName = displayName;
	
	    if (forwardRef) {
	      var forwarded = _react["default"].forwardRef(function forwardConnectRef(props, ref) {
	        return _react["default"].createElement(Connect, (0, _extends2["default"])({}, props, {
	          forwardedRef: ref
	        }));
	      });
	
	      forwarded.displayName = displayName;
	      forwarded.WrappedComponent = WrappedComponent;
	      return (0, _hoistNonReactStatics["default"])(forwarded, WrappedComponent);
	    }
	
	    return (0, _hoistNonReactStatics["default"])(Connect, WrappedComponent);
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 68:
/***/ (function(module, exports) {

	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;
	
	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }
	
	  return target;
	}
	
	module.exports = _objectWithoutPropertiesLoose;

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var reactIs = __webpack_require__(70);
	
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

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	if (process.env.NODE_ENV === 'production') {
	  module.exports = __webpack_require__(71);
	} else {
	  module.exports = __webpack_require__(72);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 71:
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

/***/ 72:
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.useIsomorphicLayoutEffect = void 0;
	
	var _react = __webpack_require__(1);
	
	// React currently throws a warning when using useLayoutEffect on the server.
	// To get around it, we can conditionally useEffect on the server (no-op) and
	// useLayoutEffect in the browser. We need useLayoutEffect to ensure the store
	// subscription callback always has the selector from the latest render commit
	// available, otherwise a store update may happen between render and the effect,
	// which may cause missed updates; we also must ensure the store subscription
	// is created synchronously, otherwise a store update may occur before the
	// subscription is created and an inconsistent state may be observed
	var isHopefullyDomEnvironment = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined';
	var useIsomorphicLayoutEffect = isHopefullyDomEnvironment ? _react.useLayoutEffect : _react.useEffect;
	exports.useIsomorphicLayoutEffect = useIsomorphicLayoutEffect;

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(59);
	
	exports.__esModule = true;
	exports.createConnect = createConnect;
	exports["default"] = void 0;
	
	var _extends2 = _interopRequireDefault(__webpack_require__(67));
	
	var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(68));
	
	var _connectAdvanced = _interopRequireDefault(__webpack_require__(66));
	
	var _shallowEqual = _interopRequireDefault(__webpack_require__(76));
	
	var _mapDispatchToProps = _interopRequireDefault(__webpack_require__(77));
	
	var _mapStateToProps = _interopRequireDefault(__webpack_require__(82));
	
	var _mergeProps = _interopRequireDefault(__webpack_require__(83));
	
	var _selectorFactory = _interopRequireDefault(__webpack_require__(84));
	
	/*
	  connect is a facade over connectAdvanced. It turns its args into a compatible
	  selectorFactory, which has the signature:
	
	    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
	  
	  connect passes its args to connectAdvanced as options, which will in turn pass them to
	  selectorFactory each time a Connect component instance is instantiated or hot reloaded.
	
	  selectorFactory returns a final props selector from its mapStateToProps,
	  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
	  mergePropsFactories, and pure args.
	
	  The resulting final props selector is called by the Connect component instance whenever
	  it receives new props or store state.
	 */
	function match(arg, factories, name) {
	  for (var i = factories.length - 1; i >= 0; i--) {
	    var result = factories[i](arg);
	    if (result) return result;
	  }
	
	  return function (dispatch, options) {
	    throw new Error("Invalid value of type " + typeof arg + " for " + name + " argument when connecting component " + options.wrappedComponentName + ".");
	  };
	}
	
	function strictEqual(a, b) {
	  return a === b;
	} // createConnect with default args builds the 'official' connect behavior. Calling it with
	// different options opens up some testing and extensibility scenarios
	
	
	function createConnect(_temp) {
	  var _ref = _temp === void 0 ? {} : _temp,
	      _ref$connectHOC = _ref.connectHOC,
	      connectHOC = _ref$connectHOC === void 0 ? _connectAdvanced["default"] : _ref$connectHOC,
	      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
	      mapStateToPropsFactories = _ref$mapStateToPropsF === void 0 ? _mapStateToProps["default"] : _ref$mapStateToPropsF,
	      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
	      mapDispatchToPropsFactories = _ref$mapDispatchToPro === void 0 ? _mapDispatchToProps["default"] : _ref$mapDispatchToPro,
	      _ref$mergePropsFactor = _ref.mergePropsFactories,
	      mergePropsFactories = _ref$mergePropsFactor === void 0 ? _mergeProps["default"] : _ref$mergePropsFactor,
	      _ref$selectorFactory = _ref.selectorFactory,
	      selectorFactory = _ref$selectorFactory === void 0 ? _selectorFactory["default"] : _ref$selectorFactory;
	
	  return function connect(mapStateToProps, mapDispatchToProps, mergeProps, _ref2) {
	    if (_ref2 === void 0) {
	      _ref2 = {};
	    }
	
	    var _ref3 = _ref2,
	        _ref3$pure = _ref3.pure,
	        pure = _ref3$pure === void 0 ? true : _ref3$pure,
	        _ref3$areStatesEqual = _ref3.areStatesEqual,
	        areStatesEqual = _ref3$areStatesEqual === void 0 ? strictEqual : _ref3$areStatesEqual,
	        _ref3$areOwnPropsEqua = _ref3.areOwnPropsEqual,
	        areOwnPropsEqual = _ref3$areOwnPropsEqua === void 0 ? _shallowEqual["default"] : _ref3$areOwnPropsEqua,
	        _ref3$areStatePropsEq = _ref3.areStatePropsEqual,
	        areStatePropsEqual = _ref3$areStatePropsEq === void 0 ? _shallowEqual["default"] : _ref3$areStatePropsEq,
	        _ref3$areMergedPropsE = _ref3.areMergedPropsEqual,
	        areMergedPropsEqual = _ref3$areMergedPropsE === void 0 ? _shallowEqual["default"] : _ref3$areMergedPropsE,
	        extraOptions = (0, _objectWithoutPropertiesLoose2["default"])(_ref3, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]);
	    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
	    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
	    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');
	    return connectHOC(selectorFactory, (0, _extends2["default"])({
	      // used in error messages
	      methodName: 'connect',
	      // used to compute Connect's displayName from the wrapped component's displayName.
	      getDisplayName: function getDisplayName(name) {
	        return "Connect(" + name + ")";
	      },
	      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
	      shouldHandleStateChanges: Boolean(mapStateToProps),
	      // passed through to selectorFactory
	      initMapStateToProps: initMapStateToProps,
	      initMapDispatchToProps: initMapDispatchToProps,
	      initMergeProps: initMergeProps,
	      pure: pure,
	      areStatesEqual: areStatesEqual,
	      areOwnPropsEqual: areOwnPropsEqual,
	      areStatePropsEqual: areStatePropsEqual,
	      areMergedPropsEqual: areMergedPropsEqual
	    }, extraOptions));
	  };
	}
	
	var _default = createConnect();
	
	exports["default"] = _default;

/***/ }),

/***/ 76:
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = shallowEqual;
	var hasOwn = Object.prototype.hasOwnProperty;
	
	function is(x, y) {
	  if (x === y) {
	    return x !== 0 || y !== 0 || 1 / x === 1 / y;
	  } else {
	    return x !== x && y !== y;
	  }
	}
	
	function shallowEqual(objA, objB) {
	  if (is(objA, objB)) return true;
	
	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }
	
	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);
	  if (keysA.length !== keysB.length) return false;
	
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
	      return false;
	    }
	  }
	
	  return true;
	}

/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.whenMapDispatchToPropsIsFunction = whenMapDispatchToPropsIsFunction;
	exports.whenMapDispatchToPropsIsMissing = whenMapDispatchToPropsIsMissing;
	exports.whenMapDispatchToPropsIsObject = whenMapDispatchToPropsIsObject;
	exports["default"] = void 0;
	
	var _redux = __webpack_require__(54);
	
	var _wrapMapToProps = __webpack_require__(78);
	
	function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
	  return typeof mapDispatchToProps === 'function' ? (0, _wrapMapToProps.wrapMapToPropsFunc)(mapDispatchToProps, 'mapDispatchToProps') : undefined;
	}
	
	function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
	  return !mapDispatchToProps ? (0, _wrapMapToProps.wrapMapToPropsConstant)(function (dispatch) {
	    return {
	      dispatch: dispatch
	    };
	  }) : undefined;
	}
	
	function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
	  return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? (0, _wrapMapToProps.wrapMapToPropsConstant)(function (dispatch) {
	    return (0, _redux.bindActionCreators)(mapDispatchToProps, dispatch);
	  }) : undefined;
	}
	
	var _default = [whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject];
	exports["default"] = _default;

/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	
	var _interopRequireDefault = __webpack_require__(59);
	
	exports.__esModule = true;
	exports.wrapMapToPropsConstant = wrapMapToPropsConstant;
	exports.getDependsOnOwnProps = getDependsOnOwnProps;
	exports.wrapMapToPropsFunc = wrapMapToPropsFunc;
	
	var _verifyPlainObject = _interopRequireDefault(__webpack_require__(79));
	
	function wrapMapToPropsConstant(getConstant) {
	  return function initConstantSelector(dispatch, options) {
	    var constant = getConstant(dispatch, options);
	
	    function constantSelector() {
	      return constant;
	    }
	
	    constantSelector.dependsOnOwnProps = false;
	    return constantSelector;
	  };
	} // dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
	// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
	// whether mapToProps needs to be invoked when props have changed.
	//
	// A length of one signals that mapToProps does not depend on props from the parent component.
	// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
	// therefore not reporting its length accurately..
	
	
	function getDependsOnOwnProps(mapToProps) {
	  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
	} // Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
	// this function wraps mapToProps in a proxy function which does several things:
	//
	//  * Detects whether the mapToProps function being called depends on props, which
	//    is used by selectorFactory to decide if it should reinvoke on props changes.
	//
	//  * On first call, handles mapToProps if returns another function, and treats that
	//    new function as the true mapToProps for subsequent calls.
	//
	//  * On first call, verifies the first result is a plain object, in order to warn
	//    the developer that their mapToProps function is not returning a valid result.
	//
	
	
	function wrapMapToPropsFunc(mapToProps, methodName) {
	  return function initProxySelector(dispatch, _ref) {
	    var displayName = _ref.displayName;
	
	    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
	      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
	    }; // allow detectFactoryAndVerify to get ownProps
	
	
	    proxy.dependsOnOwnProps = true;
	
	    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
	      proxy.mapToProps = mapToProps;
	      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
	      var props = proxy(stateOrDispatch, ownProps);
	
	      if (typeof props === 'function') {
	        proxy.mapToProps = props;
	        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
	        props = proxy(stateOrDispatch, ownProps);
	      }
	
	      if (process.env.NODE_ENV !== 'production') (0, _verifyPlainObject["default"])(props, displayName, methodName);
	      return props;
	    };
	
	    return proxy;
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(59);
	
	exports.__esModule = true;
	exports["default"] = verifyPlainObject;
	
	var _isPlainObject = _interopRequireDefault(__webpack_require__(80));
	
	var _warning = _interopRequireDefault(__webpack_require__(81));
	
	function verifyPlainObject(value, displayName, methodName) {
	  if (!(0, _isPlainObject["default"])(value)) {
	    (0, _warning["default"])(methodName + "() in " + displayName + " must return a plain object. Instead received " + value + ".");
	  }
	}

/***/ }),

/***/ 80:
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = isPlainObject;
	
	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */
	function isPlainObject(obj) {
	  if (typeof obj !== 'object' || obj === null) return false;
	  var proto = Object.getPrototypeOf(obj);
	  if (proto === null) return true;
	  var baseProto = proto;
	
	  while (Object.getPrototypeOf(baseProto) !== null) {
	    baseProto = Object.getPrototypeOf(baseProto);
	  }
	
	  return proto === baseProto;
	}

/***/ }),

/***/ 81:
/***/ (function(module, exports) {

	"use strict";
	
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

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.whenMapStateToPropsIsFunction = whenMapStateToPropsIsFunction;
	exports.whenMapStateToPropsIsMissing = whenMapStateToPropsIsMissing;
	exports["default"] = void 0;
	
	var _wrapMapToProps = __webpack_require__(78);
	
	function whenMapStateToPropsIsFunction(mapStateToProps) {
	  return typeof mapStateToProps === 'function' ? (0, _wrapMapToProps.wrapMapToPropsFunc)(mapStateToProps, 'mapStateToProps') : undefined;
	}
	
	function whenMapStateToPropsIsMissing(mapStateToProps) {
	  return !mapStateToProps ? (0, _wrapMapToProps.wrapMapToPropsConstant)(function () {
	    return {};
	  }) : undefined;
	}
	
	var _default = [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];
	exports["default"] = _default;

/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	
	var _interopRequireDefault = __webpack_require__(59);
	
	exports.__esModule = true;
	exports.defaultMergeProps = defaultMergeProps;
	exports.wrapMergePropsFunc = wrapMergePropsFunc;
	exports.whenMergePropsIsFunction = whenMergePropsIsFunction;
	exports.whenMergePropsIsOmitted = whenMergePropsIsOmitted;
	exports["default"] = void 0;
	
	var _extends2 = _interopRequireDefault(__webpack_require__(67));
	
	var _verifyPlainObject = _interopRequireDefault(__webpack_require__(79));
	
	function defaultMergeProps(stateProps, dispatchProps, ownProps) {
	  return (0, _extends2["default"])({}, ownProps, {}, stateProps, {}, dispatchProps);
	}
	
	function wrapMergePropsFunc(mergeProps) {
	  return function initMergePropsProxy(dispatch, _ref) {
	    var displayName = _ref.displayName,
	        pure = _ref.pure,
	        areMergedPropsEqual = _ref.areMergedPropsEqual;
	    var hasRunOnce = false;
	    var mergedProps;
	    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
	      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);
	
	      if (hasRunOnce) {
	        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
	      } else {
	        hasRunOnce = true;
	        mergedProps = nextMergedProps;
	        if (process.env.NODE_ENV !== 'production') (0, _verifyPlainObject["default"])(mergedProps, displayName, 'mergeProps');
	      }
	
	      return mergedProps;
	    };
	  };
	}
	
	function whenMergePropsIsFunction(mergeProps) {
	  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
	}
	
	function whenMergePropsIsOmitted(mergeProps) {
	  return !mergeProps ? function () {
	    return defaultMergeProps;
	  } : undefined;
	}
	
	var _default = [whenMergePropsIsFunction, whenMergePropsIsOmitted];
	exports["default"] = _default;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	
	var _interopRequireDefault = __webpack_require__(59);
	
	exports.__esModule = true;
	exports.impureFinalPropsSelectorFactory = impureFinalPropsSelectorFactory;
	exports.pureFinalPropsSelectorFactory = pureFinalPropsSelectorFactory;
	exports["default"] = finalPropsSelectorFactory;
	
	var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(68));
	
	var _verifySubselectors = _interopRequireDefault(__webpack_require__(85));
	
	function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
	  return function impureFinalPropsSelector(state, ownProps) {
	    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
	  };
	}
	
	function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
	  var areStatesEqual = _ref.areStatesEqual,
	      areOwnPropsEqual = _ref.areOwnPropsEqual,
	      areStatePropsEqual = _ref.areStatePropsEqual;
	  var hasRunAtLeastOnce = false;
	  var state;
	  var ownProps;
	  var stateProps;
	  var dispatchProps;
	  var mergedProps;
	
	  function handleFirstCall(firstState, firstOwnProps) {
	    state = firstState;
	    ownProps = firstOwnProps;
	    stateProps = mapStateToProps(state, ownProps);
	    dispatchProps = mapDispatchToProps(dispatch, ownProps);
	    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
	    hasRunAtLeastOnce = true;
	    return mergedProps;
	  }
	
	  function handleNewPropsAndNewState() {
	    stateProps = mapStateToProps(state, ownProps);
	    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
	    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
	    return mergedProps;
	  }
	
	  function handleNewProps() {
	    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);
	    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
	    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
	    return mergedProps;
	  }
	
	  function handleNewState() {
	    var nextStateProps = mapStateToProps(state, ownProps);
	    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
	    stateProps = nextStateProps;
	    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
	    return mergedProps;
	  }
	
	  function handleSubsequentCalls(nextState, nextOwnProps) {
	    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
	    var stateChanged = !areStatesEqual(nextState, state);
	    state = nextState;
	    ownProps = nextOwnProps;
	    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
	    if (propsChanged) return handleNewProps();
	    if (stateChanged) return handleNewState();
	    return mergedProps;
	  }
	
	  return function pureFinalPropsSelector(nextState, nextOwnProps) {
	    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
	  };
	} // TODO: Add more comments
	// If pure is true, the selector returned by selectorFactory will memoize its results,
	// allowing connectAdvanced's shouldComponentUpdate to return false if final
	// props have not changed. If false, the selector will always return a new
	// object and shouldComponentUpdate will always return true.
	
	
	function finalPropsSelectorFactory(dispatch, _ref2) {
	  var initMapStateToProps = _ref2.initMapStateToProps,
	      initMapDispatchToProps = _ref2.initMapDispatchToProps,
	      initMergeProps = _ref2.initMergeProps,
	      options = (0, _objectWithoutPropertiesLoose2["default"])(_ref2, ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"]);
	  var mapStateToProps = initMapStateToProps(dispatch, options);
	  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
	  var mergeProps = initMergeProps(dispatch, options);
	
	  if (process.env.NODE_ENV !== 'production') {
	    (0, _verifySubselectors["default"])(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
	  }
	
	  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;
	  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(59);
	
	exports.__esModule = true;
	exports["default"] = verifySubselectors;
	
	var _warning = _interopRequireDefault(__webpack_require__(81));
	
	function verify(selector, methodName, displayName) {
	  if (!selector) {
	    throw new Error("Unexpected value for " + methodName + " in " + displayName + ".");
	  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
	    if (!Object.prototype.hasOwnProperty.call(selector, 'dependsOnOwnProps')) {
	      (0, _warning["default"])("The selector for " + methodName + " of " + displayName + " did not specify a value for dependsOnOwnProps.");
	    }
	  }
	}
	
	function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
	  verify(mapStateToProps, 'mapStateToProps', displayName);
	  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
	  verify(mergeProps, 'mergeProps', displayName);
	}

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.createDispatchHook = createDispatchHook;
	exports.useDispatch = void 0;
	
	var _Context = __webpack_require__(63);
	
	var _useStore = __webpack_require__(87);
	
	/**
	 * Hook factory, which creates a `useDispatch` hook bound to a given context.
	 *
	 * @param {Function} [context=ReactReduxContext] Context passed to your `<Provider>`.
	 * @returns {Function} A `useDispatch` hook bound to the specified context.
	 */
	function createDispatchHook(context) {
	  if (context === void 0) {
	    context = _Context.ReactReduxContext;
	  }
	
	  var useStore = context === _Context.ReactReduxContext ? _useStore.useStore : (0, _useStore.createStoreHook)(context);
	  return function useDispatch() {
	    var store = useStore();
	    return store.dispatch;
	  };
	}
	/**
	 * A hook to access the redux `dispatch` function.
	 *
	 * @returns {any|function} redux store's `dispatch` function
	 *
	 * @example
	 *
	 * import React, { useCallback } from 'react'
	 * import { useDispatch } from 'react-redux'
	 *
	 * export const CounterComponent = ({ value }) => {
	 *   const dispatch = useDispatch()
	 *   const increaseCounter = useCallback(() => dispatch({ type: 'increase-counter' }), [])
	 *   return (
	 *     <div>
	 *       <span>{value}</span>
	 *       <button onClick={increaseCounter}>Increase counter</button>
	 *     </div>
	 *   )
	 * }
	 */
	
	
	var useDispatch = createDispatchHook();
	exports.useDispatch = useDispatch;

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.createStoreHook = createStoreHook;
	exports.useStore = void 0;
	
	var _react = __webpack_require__(1);
	
	var _Context = __webpack_require__(63);
	
	var _useReduxContext2 = __webpack_require__(88);
	
	/**
	 * Hook factory, which creates a `useStore` hook bound to a given context.
	 *
	 * @param {Function} [context=ReactReduxContext] Context passed to your `<Provider>`.
	 * @returns {Function} A `useStore` hook bound to the specified context.
	 */
	function createStoreHook(context) {
	  if (context === void 0) {
	    context = _Context.ReactReduxContext;
	  }
	
	  var useReduxContext = context === _Context.ReactReduxContext ? _useReduxContext2.useReduxContext : function () {
	    return (0, _react.useContext)(context);
	  };
	  return function useStore() {
	    var _useReduxContext = useReduxContext(),
	        store = _useReduxContext.store;
	
	    return store;
	  };
	}
	/**
	 * A hook to access the redux store.
	 *
	 * @returns {any} the redux store
	 *
	 * @example
	 *
	 * import React from 'react'
	 * import { useStore } from 'react-redux'
	 *
	 * export const ExampleComponent = () => {
	 *   const store = useStore()
	 *   return <div>{store.getState()}</div>
	 * }
	 */
	
	
	var useStore = createStoreHook();
	exports.useStore = useStore;

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(59);
	
	exports.__esModule = true;
	exports.useReduxContext = useReduxContext;
	
	var _react = __webpack_require__(1);
	
	var _invariant = _interopRequireDefault(__webpack_require__(73));
	
	var _Context = __webpack_require__(63);
	
	/**
	 * A hook to access the value of the `ReactReduxContext`. This is a low-level
	 * hook that you should usually not need to call directly.
	 *
	 * @returns {any} the value of the `ReactReduxContext`
	 *
	 * @example
	 *
	 * import React from 'react'
	 * import { useReduxContext } from 'react-redux'
	 *
	 * export const CounterComponent = ({ value }) => {
	 *   const { store } = useReduxContext()
	 *   return <div>{store.getState()}</div>
	 * }
	 */
	function useReduxContext() {
	  var contextValue = (0, _react.useContext)(_Context.ReactReduxContext);
	  (0, _invariant["default"])(contextValue, 'could not find react-redux context value; please ensure the component is wrapped in a <Provider>');
	  return contextValue;
	}

/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireDefault = __webpack_require__(59);
	
	exports.__esModule = true;
	exports.createSelectorHook = createSelectorHook;
	exports.useSelector = void 0;
	
	var _react = __webpack_require__(1);
	
	var _invariant = _interopRequireDefault(__webpack_require__(73));
	
	var _useReduxContext2 = __webpack_require__(88);
	
	var _Subscription = _interopRequireDefault(__webpack_require__(64));
	
	var _useIsomorphicLayoutEffect = __webpack_require__(74);
	
	var _Context = __webpack_require__(63);
	
	var refEquality = function refEquality(a, b) {
	  return a === b;
	};
	
	function useSelectorWithStoreAndSubscription(selector, equalityFn, store, contextSub) {
	  var _useReducer = (0, _react.useReducer)(function (s) {
	    return s + 1;
	  }, 0),
	      forceRender = _useReducer[1];
	
	  var subscription = (0, _react.useMemo)(function () {
	    return new _Subscription["default"](store, contextSub);
	  }, [store, contextSub]);
	  var latestSubscriptionCallbackError = (0, _react.useRef)();
	  var latestSelector = (0, _react.useRef)();
	  var latestSelectedState = (0, _react.useRef)();
	  var selectedState;
	
	  try {
	    if (selector !== latestSelector.current || latestSubscriptionCallbackError.current) {
	      selectedState = selector(store.getState());
	    } else {
	      selectedState = latestSelectedState.current;
	    }
	  } catch (err) {
	    var errorMessage = "An error occurred while selecting the store state: " + err.message + ".";
	
	    if (latestSubscriptionCallbackError.current) {
	      errorMessage += "\nThe error may be correlated with this previous error:\n" + latestSubscriptionCallbackError.current.stack + "\n\nOriginal stack trace:";
	    }
	
	    throw new Error(errorMessage);
	  }
	
	  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
	    latestSelector.current = selector;
	    latestSelectedState.current = selectedState;
	    latestSubscriptionCallbackError.current = undefined;
	  });
	  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
	    function checkForUpdates() {
	      try {
	        var newSelectedState = latestSelector.current(store.getState());
	
	        if (equalityFn(newSelectedState, latestSelectedState.current)) {
	          return;
	        }
	
	        latestSelectedState.current = newSelectedState;
	      } catch (err) {
	        // we ignore all errors here, since when the component
	        // is re-rendered, the selectors are called again, and
	        // will throw again, if neither props nor store state
	        // changed
	        latestSubscriptionCallbackError.current = err;
	      }
	
	      forceRender({});
	    }
	
	    subscription.onStateChange = checkForUpdates;
	    subscription.trySubscribe();
	    checkForUpdates();
	    return function () {
	      return subscription.tryUnsubscribe();
	    };
	  }, [store, subscription]);
	  return selectedState;
	}
	/**
	 * Hook factory, which creates a `useSelector` hook bound to a given context.
	 *
	 * @param {Function} [context=ReactReduxContext] Context passed to your `<Provider>`.
	 * @returns {Function} A `useSelector` hook bound to the specified context.
	 */
	
	
	function createSelectorHook(context) {
	  if (context === void 0) {
	    context = _Context.ReactReduxContext;
	  }
	
	  var useReduxContext = context === _Context.ReactReduxContext ? _useReduxContext2.useReduxContext : function () {
	    return (0, _react.useContext)(context);
	  };
	  return function useSelector(selector, equalityFn) {
	    if (equalityFn === void 0) {
	      equalityFn = refEquality;
	    }
	
	    (0, _invariant["default"])(selector, "You must pass a selector to useSelectors");
	
	    var _useReduxContext = useReduxContext(),
	        store = _useReduxContext.store,
	        contextSub = _useReduxContext.subscription;
	
	    return useSelectorWithStoreAndSubscription(selector, equalityFn, store, contextSub);
	  };
	}
	/**
	 * A hook to access the redux store's state. This hook takes a selector function
	 * as an argument. The selector is called with the store state.
	 *
	 * This hook takes an optional equality comparison function as the second parameter
	 * that allows you to customize the way the selected state is compared to determine
	 * whether the component needs to be re-rendered.
	 *
	 * @param {Function} selector the selector function
	 * @param {Function=} equalityFn the function that will be used to determine equality
	 *
	 * @returns {any} the selected state
	 *
	 * @example
	 *
	 * import React from 'react'
	 * import { useSelector } from 'react-redux'
	 *
	 * export const CounterComponent = () => {
	 *   const counter = useSelector(state => state.counter)
	 *   return <div>{counter}</div>
	 * }
	 */
	
	
	var useSelector = createSelectorHook();
	exports.useSelector = useSelector;

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.unstable_batchedUpdates = void 0;
	
	var _reactDom = __webpack_require__(8);
	
	exports.unstable_batchedUpdates = _reactDom.unstable_batchedUpdates;

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var react_bootstrap_1 = __webpack_require__(93);
	var TelLinkComponent_1 = __webpack_require__(354);
	var underscore_1 = __webpack_require__(361);
	var react_redux_1 = __webpack_require__(58);
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

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(1);
	var createReactClass = __webpack_require__(355);
	var TelLinkComponent = createReactClass({
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

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	
	'use strict';
	
	var React = __webpack_require__(1);
	var factory = __webpack_require__(356);
	
	if (typeof React === 'undefined') {
	  throw Error(
	    'create-react-class could not find the React object. If you are using script tags, ' +
	      'make sure that React is being loaded before create-react-class.'
	  );
	}
	
	// Hack to grab NoopUpdateQueue from isomorphic React
	var ReactNoopUpdateQueue = new React.Component().updater;
	
	module.exports = factory(
	  React.Component,
	  React.isValidElement,
	  ReactNoopUpdateQueue
	);


/***/ }),

/***/ 356:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(4);
	
	var emptyObject = __webpack_require__(357);
	var _invariant = __webpack_require__(358);
	
	if (process.env.NODE_ENV !== 'production') {
	  var warning = __webpack_require__(359);
	}
	
	var MIXINS_KEY = 'mixins';
	
	// Helper function to allow the creation of anonymous functions which do not
	// have .name set to the name of the variable being assigned to.
	function identity(fn) {
	  return fn;
	}
	
	var ReactPropTypeLocationNames;
	if (process.env.NODE_ENV !== 'production') {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	} else {
	  ReactPropTypeLocationNames = {};
	}
	
	function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
	  /**
	   * Policies that describe methods in `ReactClassInterface`.
	   */
	
	  var injectedMixins = [];
	
	  /**
	   * Composite components are higher-level components that compose other composite
	   * or host components.
	   *
	   * To create a new type of `ReactClass`, pass a specification of
	   * your new class to `React.createClass`. The only requirement of your class
	   * specification is that you implement a `render` method.
	   *
	   *   var MyComponent = React.createClass({
	   *     render: function() {
	   *       return <div>Hello World</div>;
	   *     }
	   *   });
	   *
	   * The class specification supports a specific protocol of methods that have
	   * special meaning (e.g. `render`). See `ReactClassInterface` for
	   * more the comprehensive protocol. Any other properties and methods in the
	   * class specification will be available on the prototype.
	   *
	   * @interface ReactClassInterface
	   * @internal
	   */
	  var ReactClassInterface = {
	    /**
	     * An array of Mixin objects to include when defining your component.
	     *
	     * @type {array}
	     * @optional
	     */
	    mixins: 'DEFINE_MANY',
	
	    /**
	     * An object containing properties and methods that should be defined on
	     * the component's constructor instead of its prototype (static methods).
	     *
	     * @type {object}
	     * @optional
	     */
	    statics: 'DEFINE_MANY',
	
	    /**
	     * Definition of prop types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    propTypes: 'DEFINE_MANY',
	
	    /**
	     * Definition of context types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    contextTypes: 'DEFINE_MANY',
	
	    /**
	     * Definition of context types this component sets for its children.
	     *
	     * @type {object}
	     * @optional
	     */
	    childContextTypes: 'DEFINE_MANY',
	
	    // ==== Definition methods ====
	
	    /**
	     * Invoked when the component is mounted. Values in the mapping will be set on
	     * `this.props` if that prop is not specified (i.e. using an `in` check).
	     *
	     * This method is invoked before `getInitialState` and therefore cannot rely
	     * on `this.state` or use `this.setState`.
	     *
	     * @return {object}
	     * @optional
	     */
	    getDefaultProps: 'DEFINE_MANY_MERGED',
	
	    /**
	     * Invoked once before the component is mounted. The return value will be used
	     * as the initial value of `this.state`.
	     *
	     *   getInitialState: function() {
	     *     return {
	     *       isOn: false,
	     *       fooBaz: new BazFoo()
	     *     }
	     *   }
	     *
	     * @return {object}
	     * @optional
	     */
	    getInitialState: 'DEFINE_MANY_MERGED',
	
	    /**
	     * @return {object}
	     * @optional
	     */
	    getChildContext: 'DEFINE_MANY_MERGED',
	
	    /**
	     * Uses props from `this.props` and state from `this.state` to render the
	     * structure of the component.
	     *
	     * No guarantees are made about when or how often this method is invoked, so
	     * it must not have side effects.
	     *
	     *   render: function() {
	     *     var name = this.props.name;
	     *     return <div>Hello, {name}!</div>;
	     *   }
	     *
	     * @return {ReactComponent}
	     * @required
	     */
	    render: 'DEFINE_ONCE',
	
	    // ==== Delegate methods ====
	
	    /**
	     * Invoked when the component is initially created and about to be mounted.
	     * This may have side effects, but any external subscriptions or data created
	     * by this method must be cleaned up in `componentWillUnmount`.
	     *
	     * @optional
	     */
	    componentWillMount: 'DEFINE_MANY',
	
	    /**
	     * Invoked when the component has been mounted and has a DOM representation.
	     * However, there is no guarantee that the DOM node is in the document.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been mounted (initialized and rendered) for the first time.
	     *
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidMount: 'DEFINE_MANY',
	
	    /**
	     * Invoked before the component receives new props.
	     *
	     * Use this as an opportunity to react to a prop transition by updating the
	     * state using `this.setState`. Current props are accessed via `this.props`.
	     *
	     *   componentWillReceiveProps: function(nextProps, nextContext) {
	     *     this.setState({
	     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	     *     });
	     *   }
	     *
	     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	     * transition may cause a state change, but the opposite is not true. If you
	     * need it, you are probably looking for `componentWillUpdate`.
	     *
	     * @param {object} nextProps
	     * @optional
	     */
	    componentWillReceiveProps: 'DEFINE_MANY',
	
	    /**
	     * Invoked while deciding if the component should be updated as a result of
	     * receiving new props, state and/or context.
	     *
	     * Use this as an opportunity to `return false` when you're certain that the
	     * transition to the new props/state/context will not require a component
	     * update.
	     *
	     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	     *     return !equal(nextProps, this.props) ||
	     *       !equal(nextState, this.state) ||
	     *       !equal(nextContext, this.context);
	     *   }
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @return {boolean} True if the component should update.
	     * @optional
	     */
	    shouldComponentUpdate: 'DEFINE_ONCE',
	
	    /**
	     * Invoked when the component is about to update due to a transition from
	     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	     * and `nextContext`.
	     *
	     * Use this as an opportunity to perform preparation before an update occurs.
	     *
	     * NOTE: You **cannot** use `this.setState()` in this method.
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @param {ReactReconcileTransaction} transaction
	     * @optional
	     */
	    componentWillUpdate: 'DEFINE_MANY',
	
	    /**
	     * Invoked when the component's DOM representation has been updated.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been updated.
	     *
	     * @param {object} prevProps
	     * @param {?object} prevState
	     * @param {?object} prevContext
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidUpdate: 'DEFINE_MANY',
	
	    /**
	     * Invoked when the component is about to be removed from its parent and have
	     * its DOM representation destroyed.
	     *
	     * Use this as an opportunity to deallocate any external resources.
	     *
	     * NOTE: There is no `componentDidUnmount` since your component will have been
	     * destroyed by that point.
	     *
	     * @optional
	     */
	    componentWillUnmount: 'DEFINE_MANY',
	
	    /**
	     * Replacement for (deprecated) `componentWillMount`.
	     *
	     * @optional
	     */
	    UNSAFE_componentWillMount: 'DEFINE_MANY',
	
	    /**
	     * Replacement for (deprecated) `componentWillReceiveProps`.
	     *
	     * @optional
	     */
	    UNSAFE_componentWillReceiveProps: 'DEFINE_MANY',
	
	    /**
	     * Replacement for (deprecated) `componentWillUpdate`.
	     *
	     * @optional
	     */
	    UNSAFE_componentWillUpdate: 'DEFINE_MANY',
	
	    // ==== Advanced methods ====
	
	    /**
	     * Updates the component's currently mounted DOM representation.
	     *
	     * By default, this implements React's rendering and reconciliation algorithm.
	     * Sophisticated clients may wish to override this.
	     *
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     * @overridable
	     */
	    updateComponent: 'OVERRIDE_BASE'
	  };
	
	  /**
	   * Similar to ReactClassInterface but for static methods.
	   */
	  var ReactClassStaticInterface = {
	    /**
	     * This method is invoked after a component is instantiated and when it
	     * receives new props. Return an object to update state in response to
	     * prop changes. Return null to indicate no change to state.
	     *
	     * If an object is returned, its keys will be merged into the existing state.
	     *
	     * @return {object || null}
	     * @optional
	     */
	    getDerivedStateFromProps: 'DEFINE_MANY_MERGED'
	  };
	
	  /**
	   * Mapping from class specification keys to special processing functions.
	   *
	   * Although these are declared like instance properties in the specification
	   * when defining classes using `React.createClass`, they are actually static
	   * and are accessible on the constructor instead of the prototype. Despite
	   * being static, they must be defined outside of the "statics" key under
	   * which all other static methods are defined.
	   */
	  var RESERVED_SPEC_KEYS = {
	    displayName: function(Constructor, displayName) {
	      Constructor.displayName = displayName;
	    },
	    mixins: function(Constructor, mixins) {
	      if (mixins) {
	        for (var i = 0; i < mixins.length; i++) {
	          mixSpecIntoComponent(Constructor, mixins[i]);
	        }
	      }
	    },
	    childContextTypes: function(Constructor, childContextTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, childContextTypes, 'childContext');
	      }
	      Constructor.childContextTypes = _assign(
	        {},
	        Constructor.childContextTypes,
	        childContextTypes
	      );
	    },
	    contextTypes: function(Constructor, contextTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, contextTypes, 'context');
	      }
	      Constructor.contextTypes = _assign(
	        {},
	        Constructor.contextTypes,
	        contextTypes
	      );
	    },
	    /**
	     * Special case getDefaultProps which should move into statics but requires
	     * automatic merging.
	     */
	    getDefaultProps: function(Constructor, getDefaultProps) {
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps = createMergedResultFunction(
	          Constructor.getDefaultProps,
	          getDefaultProps
	        );
	      } else {
	        Constructor.getDefaultProps = getDefaultProps;
	      }
	    },
	    propTypes: function(Constructor, propTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, propTypes, 'prop');
	      }
	      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	    },
	    statics: function(Constructor, statics) {
	      mixStaticSpecIntoComponent(Constructor, statics);
	    },
	    autobind: function() {}
	  };
	
	  function validateTypeDef(Constructor, typeDef, location) {
	    for (var propName in typeDef) {
	      if (typeDef.hasOwnProperty(propName)) {
	        // use a warning instead of an _invariant so components
	        // don't show up in prod but only in __DEV__
	        if (process.env.NODE_ENV !== 'production') {
	          warning(
	            typeof typeDef[propName] === 'function',
	            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
	              'React.PropTypes.',
	            Constructor.displayName || 'ReactClass',
	            ReactPropTypeLocationNames[location],
	            propName
	          );
	        }
	      }
	    }
	  }
	
	  function validateMethodOverride(isAlreadyDefined, name) {
	    var specPolicy = ReactClassInterface.hasOwnProperty(name)
	      ? ReactClassInterface[name]
	      : null;
	
	    // Disallow overriding of base class methods unless explicitly allowed.
	    if (ReactClassMixin.hasOwnProperty(name)) {
	      _invariant(
	        specPolicy === 'OVERRIDE_BASE',
	        'ReactClassInterface: You are attempting to override ' +
	          '`%s` from your class specification. Ensure that your method names ' +
	          'do not overlap with React methods.',
	        name
	      );
	    }
	
	    // Disallow defining methods more than once unless explicitly allowed.
	    if (isAlreadyDefined) {
	      _invariant(
	        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
	        'ReactClassInterface: You are attempting to define ' +
	          '`%s` on your component more than once. This conflict may be due ' +
	          'to a mixin.',
	        name
	      );
	    }
	  }
	
	  /**
	   * Mixin helper which handles policy validation and reserved
	   * specification keys when building React classes.
	   */
	  function mixSpecIntoComponent(Constructor, spec) {
	    if (!spec) {
	      if (process.env.NODE_ENV !== 'production') {
	        var typeofSpec = typeof spec;
	        var isMixinValid = typeofSpec === 'object' && spec !== null;
	
	        if (process.env.NODE_ENV !== 'production') {
	          warning(
	            isMixinValid,
	            "%s: You're attempting to include a mixin that is either null " +
	              'or not an object. Check the mixins included by the component, ' +
	              'as well as any mixins they include themselves. ' +
	              'Expected object but got %s.',
	            Constructor.displayName || 'ReactClass',
	            spec === null ? null : typeofSpec
	          );
	        }
	      }
	
	      return;
	    }
	
	    _invariant(
	      typeof spec !== 'function',
	      "ReactClass: You're attempting to " +
	        'use a component class or function as a mixin. Instead, just use a ' +
	        'regular object.'
	    );
	    _invariant(
	      !isValidElement(spec),
	      "ReactClass: You're attempting to " +
	        'use a component as a mixin. Instead, just use a regular object.'
	    );
	
	    var proto = Constructor.prototype;
	    var autoBindPairs = proto.__reactAutoBindPairs;
	
	    // By handling mixins before any other properties, we ensure the same
	    // chaining order is applied to methods with DEFINE_MANY policy, whether
	    // mixins are listed before or after these methods in the spec.
	    if (spec.hasOwnProperty(MIXINS_KEY)) {
	      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	    }
	
	    for (var name in spec) {
	      if (!spec.hasOwnProperty(name)) {
	        continue;
	      }
	
	      if (name === MIXINS_KEY) {
	        // We have already handled mixins in a special case above.
	        continue;
	      }
	
	      var property = spec[name];
	      var isAlreadyDefined = proto.hasOwnProperty(name);
	      validateMethodOverride(isAlreadyDefined, name);
	
	      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	        RESERVED_SPEC_KEYS[name](Constructor, property);
	      } else {
	        // Setup methods on prototype:
	        // The following member methods should not be automatically bound:
	        // 1. Expected ReactClass methods (in the "interface").
	        // 2. Overridden methods (that were mixed in).
	        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	        var isFunction = typeof property === 'function';
	        var shouldAutoBind =
	          isFunction &&
	          !isReactClassMethod &&
	          !isAlreadyDefined &&
	          spec.autobind !== false;
	
	        if (shouldAutoBind) {
	          autoBindPairs.push(name, property);
	          proto[name] = property;
	        } else {
	          if (isAlreadyDefined) {
	            var specPolicy = ReactClassInterface[name];
	
	            // These cases should already be caught by validateMethodOverride.
	            _invariant(
	              isReactClassMethod &&
	                (specPolicy === 'DEFINE_MANY_MERGED' ||
	                  specPolicy === 'DEFINE_MANY'),
	              'ReactClass: Unexpected spec policy %s for key %s ' +
	                'when mixing in component specs.',
	              specPolicy,
	              name
	            );
	
	            // For methods which are defined more than once, call the existing
	            // methods before calling the new property, merging if appropriate.
	            if (specPolicy === 'DEFINE_MANY_MERGED') {
	              proto[name] = createMergedResultFunction(proto[name], property);
	            } else if (specPolicy === 'DEFINE_MANY') {
	              proto[name] = createChainedFunction(proto[name], property);
	            }
	          } else {
	            proto[name] = property;
	            if (process.env.NODE_ENV !== 'production') {
	              // Add verbose displayName to the function, which helps when looking
	              // at profiling tools.
	              if (typeof property === 'function' && spec.displayName) {
	                proto[name].displayName = spec.displayName + '_' + name;
	              }
	            }
	          }
	        }
	      }
	    }
	  }
	
	  function mixStaticSpecIntoComponent(Constructor, statics) {
	    if (!statics) {
	      return;
	    }
	
	    for (var name in statics) {
	      var property = statics[name];
	      if (!statics.hasOwnProperty(name)) {
	        continue;
	      }
	
	      var isReserved = name in RESERVED_SPEC_KEYS;
	      _invariant(
	        !isReserved,
	        'ReactClass: You are attempting to define a reserved ' +
	          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
	          'as an instance property instead; it will still be accessible on the ' +
	          'constructor.',
	        name
	      );
	
	      var isAlreadyDefined = name in Constructor;
	      if (isAlreadyDefined) {
	        var specPolicy = ReactClassStaticInterface.hasOwnProperty(name)
	          ? ReactClassStaticInterface[name]
	          : null;
	
	        _invariant(
	          specPolicy === 'DEFINE_MANY_MERGED',
	          'ReactClass: You are attempting to define ' +
	            '`%s` on your component more than once. This conflict may be ' +
	            'due to a mixin.',
	          name
	        );
	
	        Constructor[name] = createMergedResultFunction(Constructor[name], property);
	
	        return;
	      }
	
	      Constructor[name] = property;
	    }
	  }
	
	  /**
	   * Merge two objects, but throw if both contain the same key.
	   *
	   * @param {object} one The first object, which is mutated.
	   * @param {object} two The second object
	   * @return {object} one after it has been mutated to contain everything in two.
	   */
	  function mergeIntoWithNoDuplicateKeys(one, two) {
	    _invariant(
	      one && two && typeof one === 'object' && typeof two === 'object',
	      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
	    );
	
	    for (var key in two) {
	      if (two.hasOwnProperty(key)) {
	        _invariant(
	          one[key] === undefined,
	          'mergeIntoWithNoDuplicateKeys(): ' +
	            'Tried to merge two objects with the same key: `%s`. This conflict ' +
	            'may be due to a mixin; in particular, this may be caused by two ' +
	            'getInitialState() or getDefaultProps() methods returning objects ' +
	            'with clashing keys.',
	          key
	        );
	        one[key] = two[key];
	      }
	    }
	    return one;
	  }
	
	  /**
	   * Creates a function that invokes two functions and merges their return values.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createMergedResultFunction(one, two) {
	    return function mergedResult() {
	      var a = one.apply(this, arguments);
	      var b = two.apply(this, arguments);
	      if (a == null) {
	        return b;
	      } else if (b == null) {
	        return a;
	      }
	      var c = {};
	      mergeIntoWithNoDuplicateKeys(c, a);
	      mergeIntoWithNoDuplicateKeys(c, b);
	      return c;
	    };
	  }
	
	  /**
	   * Creates a function that invokes two functions and ignores their return vales.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createChainedFunction(one, two) {
	    return function chainedFunction() {
	      one.apply(this, arguments);
	      two.apply(this, arguments);
	    };
	  }
	
	  /**
	   * Binds a method to the component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   * @param {function} method Method to be bound.
	   * @return {function} The bound method.
	   */
	  function bindAutoBindMethod(component, method) {
	    var boundMethod = method.bind(component);
	    if (process.env.NODE_ENV !== 'production') {
	      boundMethod.__reactBoundContext = component;
	      boundMethod.__reactBoundMethod = method;
	      boundMethod.__reactBoundArguments = null;
	      var componentName = component.constructor.displayName;
	      var _bind = boundMethod.bind;
	      boundMethod.bind = function(newThis) {
	        for (
	          var _len = arguments.length,
	            args = Array(_len > 1 ? _len - 1 : 0),
	            _key = 1;
	          _key < _len;
	          _key++
	        ) {
	          args[_key - 1] = arguments[_key];
	        }
	
	        // User is trying to bind() an autobound method; we effectively will
	        // ignore the value of "this" that the user is trying to use, so
	        // let's warn.
	        if (newThis !== component && newThis !== null) {
	          if (process.env.NODE_ENV !== 'production') {
	            warning(
	              false,
	              'bind(): React component methods may only be bound to the ' +
	                'component instance. See %s',
	              componentName
	            );
	          }
	        } else if (!args.length) {
	          if (process.env.NODE_ENV !== 'production') {
	            warning(
	              false,
	              'bind(): You are binding a component method to the component. ' +
	                'React does this for you automatically in a high-performance ' +
	                'way, so you can safely remove this call. See %s',
	              componentName
	            );
	          }
	          return boundMethod;
	        }
	        var reboundMethod = _bind.apply(boundMethod, arguments);
	        reboundMethod.__reactBoundContext = component;
	        reboundMethod.__reactBoundMethod = method;
	        reboundMethod.__reactBoundArguments = args;
	        return reboundMethod;
	      };
	    }
	    return boundMethod;
	  }
	
	  /**
	   * Binds all auto-bound methods in a component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   */
	  function bindAutoBindMethods(component) {
	    var pairs = component.__reactAutoBindPairs;
	    for (var i = 0; i < pairs.length; i += 2) {
	      var autoBindKey = pairs[i];
	      var method = pairs[i + 1];
	      component[autoBindKey] = bindAutoBindMethod(component, method);
	    }
	  }
	
	  var IsMountedPreMixin = {
	    componentDidMount: function() {
	      this.__isMounted = true;
	    }
	  };
	
	  var IsMountedPostMixin = {
	    componentWillUnmount: function() {
	      this.__isMounted = false;
	    }
	  };
	
	  /**
	   * Add more to the ReactClass base class. These are all legacy features and
	   * therefore not already part of the modern ReactComponent.
	   */
	  var ReactClassMixin = {
	    /**
	     * TODO: This will be deprecated because state should always keep a consistent
	     * type signature and the only use case for this, is to avoid that.
	     */
	    replaceState: function(newState, callback) {
	      this.updater.enqueueReplaceState(this, newState, callback);
	    },
	
	    /**
	     * Checks whether or not this composite component is mounted.
	     * @return {boolean} True if mounted, false otherwise.
	     * @protected
	     * @final
	     */
	    isMounted: function() {
	      if (process.env.NODE_ENV !== 'production') {
	        warning(
	          this.__didWarnIsMounted,
	          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
	            'subscriptions and pending requests in componentWillUnmount to ' +
	            'prevent memory leaks.',
	          (this.constructor && this.constructor.displayName) ||
	            this.name ||
	            'Component'
	        );
	        this.__didWarnIsMounted = true;
	      }
	      return !!this.__isMounted;
	    }
	  };
	
	  var ReactClassComponent = function() {};
	  _assign(
	    ReactClassComponent.prototype,
	    ReactComponent.prototype,
	    ReactClassMixin
	  );
	
	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  function createClass(spec) {
	    // To keep our warnings more understandable, we'll use a little hack here to
	    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
	    // unnecessarily identify a class without displayName as 'Constructor'.
	    var Constructor = identity(function(props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.
	
	      if (process.env.NODE_ENV !== 'production') {
	        warning(
	          this instanceof Constructor,
	          'Something is calling a React component directly. Use a factory or ' +
	            'JSX instead. See: https://fb.me/react-legacyfactory'
	        );
	      }
	
	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }
	
	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;
	
	      this.state = null;
	
	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.
	
	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (process.env.NODE_ENV !== 'production') {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (
	          initialState === undefined &&
	          this.getInitialState._isMockFunction
	        ) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      _invariant(
	        typeof initialState === 'object' && !Array.isArray(initialState),
	        '%s.getInitialState(): must return an object or null',
	        Constructor.displayName || 'ReactCompositeComponent'
	      );
	
	      this.state = initialState;
	    });
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];
	
	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));
	
	    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
	    mixSpecIntoComponent(Constructor, spec);
	    mixSpecIntoComponent(Constructor, IsMountedPostMixin);
	
	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }
	
	    _invariant(
	      Constructor.prototype.render,
	      'createClass(...): Class specification must implement a `render` method.'
	    );
	
	    if (process.env.NODE_ENV !== 'production') {
	      warning(
	        !Constructor.prototype.componentShouldUpdate,
	        '%s has a method called ' +
	          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
	          'The name is phrased as a question because the function is ' +
	          'expected to return a value.',
	        spec.displayName || 'A component'
	      );
	      warning(
	        !Constructor.prototype.componentWillRecieveProps,
	        '%s has a method called ' +
	          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
	        spec.displayName || 'A component'
	      );
	      warning(
	        !Constructor.prototype.UNSAFE_componentWillRecieveProps,
	        '%s has a method called UNSAFE_componentWillRecieveProps(). ' +
	          'Did you mean UNSAFE_componentWillReceiveProps()?',
	        spec.displayName || 'A component'
	      );
	    }
	
	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }
	
	    return Constructor;
	  }
	
	  return createClass;
	}
	
	module.exports = factory;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 357:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	
	'use strict';
	
	var emptyObject = {};
	
	if (process.env.NODE_ENV !== 'production') {
	  Object.freeze(emptyObject);
	}
	
	module.exports = emptyObject;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var validateFormat = function validateFormat(format) {};
	
	if (process.env.NODE_ENV !== 'production') {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}
	
	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}
	
	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 359:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	
	'use strict';
	
	var emptyFunction = __webpack_require__(360);
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = emptyFunction;
	
	if (process.env.NODE_ENV !== 'production') {
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }
	
	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
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
	
	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }
	
	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }
	
	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }
	
	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}
	
	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 360:
/***/ (function(module, exports) {

	"use strict";
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */
	
	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}
	
	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};
	
	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};
	
	module.exports = emptyFunction;

/***/ }),

/***/ 362:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var redux_1 = __webpack_require__(54);
	var StatesReducer_1 = __webpack_require__(363);
	var quotesReducer_1 = __webpack_require__(364);
	var questionsReducer_1 = __webpack_require__(365);
	var selectPersons_1 = __webpack_require__(366);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = redux_1.combineReducers({
	    states: StatesReducer_1.default,
	    quotes: quotesReducer_1.default,
	    questions: questionsReducer_1.default,
	    selectPersons: selectPersons_1.default
	});


/***/ }),

/***/ 363:
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

/***/ 364:
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

/***/ 365:
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

/***/ 366:
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

/***/ 367:
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

/***/ 368:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var AccessApi_1 = __webpack_require__(369);
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

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var fetch = __webpack_require__(370);
	var es6_promise_1 = __webpack_require__(372);
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

/***/ 373:
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
//# sourceMappingURL=app.07b43e6379fc1e9910cb.js.map