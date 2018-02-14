webpackJsonp([0],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(37);
	var react_router_1 = __webpack_require__(184);
	var app_1 = __webpack_require__(247);
	function loadAboutPage(location, callback) {
	    __webpack_require__.e/* nsure */(1, function () { return callback(null, __webpack_require__(546).default); });
	}
	;
	function loadMemberPage(location, callback) {
	    __webpack_require__.e/* nsure */(2, function () { return callback(null, __webpack_require__(547).default); });
	}
	function loadMembersPage(location, callback) {
	    __webpack_require__.e/* nsure */(2, function () { return callback(null, __webpack_require__(561).default); });
	}
	function loadQuotePage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(565).default); });
	}
	function loadQuestionsPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(773).default); });
	}
	function loadAuthorisePage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(949).default); });
	}
	function allQuestionsPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(952).default); });
	}
	function getSignaturePage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(953).default); });
	}
	function getOfferPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(954).default); });
	}
	function editQuestionsPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(955).default); });
	}
	function editSignaturePage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(955).default); });
	}
	function loadProductsPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(956).default); });
	}
	function loadPlansPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(962).default); });
	}
	function loadNextStepsPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(966).default); });
	}
	function loadAgentNextStepsPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(972).default); });
	}
	function loadContactAgent(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(974).default); });
	}
	function loadEmailToQuote(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(975).default); });
	}
	function loadEmailCaptureToQuote(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(976).default); });
	}
	function loadContactAgentSuccess(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(977).default); });
	}
	function loadEmailToQuoteSuccess(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(978).default); });
	}
	function loadPaymentSuccessPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(979).default); });
	}
	function loadPaymentPage(location, callback) {
	    __webpack_require__.e/* nsure */(3, function () { return callback(null, __webpack_require__(980).default); });
	}
	ReactDOM.render(React.createElement(react_router_1.Router, {history: react_router_1.browserHistory}, React.createElement(react_router_1.Route, {path: "/", component: app_1.default}, React.createElement(react_router_1.IndexRoute, {getComponent: loadQuotePage}), React.createElement(react_router_1.Route, {path: "/products", getComponent: loadProductsPage}), React.createElement(react_router_1.Route, {path: "/plans", getComponent: loadPlansPage}), React.createElement(react_router_1.Route, {path: "/next-steps", getComponent: loadNextStepsPage}), React.createElement(react_router_1.Route, {path: "/questions", getComponent: loadQuestionsPage}), React.createElement(react_router_1.Route, {path: "/authorize", getComponent: loadAuthorisePage}), React.createElement(react_router_1.Route, {path: "/all-questions", getComponent: allQuestionsPage}), React.createElement(react_router_1.Route, {path: "/edit-questions", getComponent: editQuestionsPage}), React.createElement(react_router_1.Route, {path: "/signature", getComponent: getSignaturePage}), React.createElement(react_router_1.Route, {path: "/offer", getComponent: getOfferPage}), React.createElement(react_router_1.Route, {path: "/payment_success", getComponent: loadPaymentSuccessPage}), React.createElement(react_router_1.Route, {path: "/payment", getComponent: loadPaymentPage}), React.createElement(react_router_1.Route, {path: "/agent", getComponent: loadQuotePage}), React.createElement(react_router_1.Route, {path: "/agent/products", getComponent: loadProductsPage}), React.createElement(react_router_1.Route, {path: "/agent/plans", getComponent: loadPlansPage}), React.createElement(react_router_1.Route, {path: "/agent/next-steps", getComponent: loadAgentNextStepsPage}), React.createElement(react_router_1.Route, {path: "/connect-to-agent", getComponent: loadContactAgent}), React.createElement(react_router_1.Route, {path: "/connect-through-application", getComponent: loadEmailCaptureToQuote}), React.createElement(react_router_1.Route, {path: "/agent/connect-to-agent", getComponent: loadContactAgent}), React.createElement(react_router_1.Route, {path: "/connect-agent-success", getComponent: loadContactAgentSuccess}), React.createElement(react_router_1.Route, {path: "/agent/connect-agent-success", getComponent: loadContactAgentSuccess}), React.createElement(react_router_1.Route, {path: "/email-to-quote", getComponent: loadEmailToQuote}), React.createElement(react_router_1.Route, {path: "/agent/email-to-quote", getComponent: loadEmailToQuote}), React.createElement(react_router_1.Route, {path: "/agent/connect-through-application", getComponent: loadEmailCaptureToQuote}), React.createElement(react_router_1.Route, {path: "/agent/email-quote-success", getComponent: loadEmailToQuoteSuccess}), React.createElement(react_router_1.Route, {path: "/email-quote-success", getComponent: loadEmailToQuoteSuccess}), React.createElement(react_router_1.Route, {path: "/customer", getComponent: loadQuotePage}), React.createElement(react_router_1.Route, {path: "/quote", getComponent: loadQuotePage}), React.createElement(react_router_1.Route, {path: "/about", getComponent: loadAboutPage}), React.createElement(react_router_1.Route, {path: "/member", getComponent: loadMemberPage}), React.createElement(react_router_1.Route, {path: "/memberEdit/:id", getComponent: loadMemberPage}))), document.getElementById('root'));


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
	var react_redux_1 = __webpack_require__(269);
	var redux_thunk_1 = __webpack_require__(278);
	var header_1 = __webpack_require__(279);
	var reducers_1 = __webpack_require__(537);
	var react_bootstrap_1 = __webpack_require__(280);
	var store = redux_1.createStore(reducers_1.default, redux_1.applyMiddleware(redux_thunk_1.default));
	var App = (function (_super) {
	    __extends(App, _super);
	    function App() {
	        _super.apply(this, arguments);
	    }
	    App.prototype.render = function () {
	        var isPaymentPage = this.props.location.pathname == "/payment";
	        return (React.createElement(react_redux_1.Provider, {store: store}, React.createElement("div", {className: ""}, !isPaymentPage && React.createElement(header_1.default, {logoImgSrc: "../images/logo.svg"}), React.createElement("div", {className: "c-body"}, this.props.children), !isPaymentPage && React.createElement(react_bootstrap_1.Row, {className: "c-footer hidden-xs", style: { marginBottom: "0px" }}, React.createElement(react_bootstrap_1.Col, {xs: 8, className: "c-footer-content c-center"}, React.createElement(react_bootstrap_1.Row, null, React.createElement(react_bootstrap_1.Col, null, "Site Map »  Privacy Policy »"), React.createElement(react_bootstrap_1.Col, null, "© Copyright 2017 Vantis Life Insurance Company, Windsor, Connecticut - All Rights Reserved."), React.createElement(react_bootstrap_1.Col, null, "Vantis, Vantis Life, and A better life experience are registered trademarks of Vantis Life Insurance Company."), React.createElement(react_bootstrap_1.Col, null, "Life insurance and annuities issued by Vantis Life Insurance Company, Windsor, CT (all states except NY) and by Vantis Life Insurance Company of New York, Brewster, NY (NY only). Products not available in all states and state variations may apply.")))))));
	    };
	    return App;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = App;


/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.connect = exports.Provider = undefined;
	
	var _Provider = __webpack_require__(270);
	
	var _Provider2 = _interopRequireDefault(_Provider);
	
	var _connect = __webpack_require__(275);
	
	var _connect2 = _interopRequireDefault(_connect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports.Provider = _Provider2["default"];
	exports.connect = _connect2["default"];

/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports["default"] = undefined;
	
	var _react = __webpack_require__(1);
	
	var _propTypes = __webpack_require__(271);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _storeShape = __webpack_require__(273);
	
	var _storeShape2 = _interopRequireDefault(_storeShape);
	
	var _warning = __webpack_require__(274);
	
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

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _propTypes = __webpack_require__(271);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports["default"] = _propTypes2["default"].shape({
	  subscribe: _propTypes2["default"].func.isRequired,
	  dispatch: _propTypes2["default"].func.isRequired,
	  getState: _propTypes2["default"].func.isRequired
	});

/***/ }),

/***/ 274:
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

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports["default"] = connect;
	
	var _react = __webpack_require__(1);
	
	var _storeShape = __webpack_require__(273);
	
	var _storeShape2 = _interopRequireDefault(_storeShape);
	
	var _shallowEqual = __webpack_require__(276);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	var _wrapActionCreators = __webpack_require__(277);
	
	var _wrapActionCreators2 = _interopRequireDefault(_wrapActionCreators);
	
	var _warning = __webpack_require__(274);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _isPlainObject = __webpack_require__(250);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _hoistNonReactStatics = __webpack_require__(227);
	
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

/***/ 276:
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

/***/ 277:
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

/***/ 279:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var react_bootstrap_1 = __webpack_require__(280);
	var TelLinkComponent_1 = __webpack_require__(536);
	var Header = (function (_super) {
	    __extends(Header, _super);
	    function Header() {
	        _super.apply(this, arguments);
	    }
	    Header.prototype.render = function () {
	        return (React.createElement(react_bootstrap_1.Navbar, {className: "cf-nav-main-header"}, React.createElement(react_bootstrap_1.Navbar.Header, null, React.createElement("div", null, React.createElement(react_bootstrap_1.Navbar.Brand, null, React.createElement("img", {src: this.props.logoImgSrc})))), React.createElement(react_bootstrap_1.Navbar.Text, {pullRight: true}, React.createElement("div", {className: "header-text", style: { marginLeft: "22px", fontSize: "16px" }}, React.createElement("div", {style: { textAlign: "right" }}, "Need help? ", React.createElement("a", {href: "tel:" + "1-800-252-7254"}, React.createElement("img", {className: "visible-xs", style: { float: "right", paddingLeft: "10px", paddingTop: "4px" }, src: "../images/small-phone.svg"}))), React.createElement("div", {className: "hidden-xs", style: { fontSize: "18px" }}, React.createElement(TelLinkComponent_1.default, {phoneNumber: "1-800-252-7254"}))))));
	    };
	    return Header;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Header;


/***/ }),

/***/ 536:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(1);
	var TelLinkComponent = React.createClass({
	    render: function () {
	        return (React.createElement("a", {href: "tel:" + this.props.phoneNumber}, this.props.phoneNumber));
	    }
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = TelLinkComponent;


/***/ }),

/***/ 537:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var redux_1 = __webpack_require__(248);
	var memberReducer_1 = __webpack_require__(538);
	var membersReducer_1 = __webpack_require__(541);
	var StatesReducer_1 = __webpack_require__(542);
	var quotesReducer_1 = __webpack_require__(543);
	var questionsReducer_1 = __webpack_require__(544);
	var selectPersons_1 = __webpack_require__(545);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = redux_1.combineReducers({
	    member: memberReducer_1.default,
	    members: membersReducer_1.default,
	    states: StatesReducer_1.default,
	    quotes: quotesReducer_1.default,
	    questions: questionsReducer_1.default,
	    selectPersons: selectPersons_1.default
	});


/***/ }),

/***/ 538:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var memberEntity_1 = __webpack_require__(539);
	var objectAssign = __webpack_require__(4);
	var memberFormErrors_1 = __webpack_require__(540);
	var emptyMemberEntity = new memberEntity_1.default();
	var MemberState = (function () {
	    function MemberState() {
	        this.member = new memberEntity_1.default();
	        this.memberId = -1;
	        this.errors = new memberFormErrors_1.default();
	        this.isValid = false;
	        this.saveCompleted = false;
	    }
	    return MemberState;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (state, action) {
	    if (state === void 0) { state = new MemberState(); }
	    var newState = null;
	    switch (action.type) {
	        case 'MEMBER_INITIALIZE_NEW':
	            newState = objectAssign({}, state, { member: new memberEntity_1.default(), errors: new memberFormErrors_1.default(), isValid: false });
	            return newState;
	        case 'MEMBER_LOAD':
	            newState = objectAssign({}, state, { dirty: false, member: action.member, errors: new memberFormErrors_1.default(), isValid: true });
	            return newState;
	        case 'MEMBER_UI_INPUT':
	            var fieldName = action['fieldName'];
	            var value = action['value'];
	            var newMember = objectAssign({}, state.member, {});
	            newMember[fieldName] = value;
	            newState = objectAssign({}, state, { member: newMember, dirty: true });
	            return newState;
	        case 'MEMBER_SAVE':
	            if (action.errors.isEntityValid) {
	                newState = objectAssign({}, state, { saveCompleted: true });
	            }
	            else {
	                newState = objectAssign({}, state, { isValid: action.errors.isEntityValid, errors: action.errors });
	            }
	            return newState;
	        case 'MEMBER_RESET_SAVE_COMPLETED':
	            newState = objectAssign({}, state, { saveCompleted: false });
	            return newState;
	        default:
	            return state;
	    }
	};


/***/ }),

/***/ 539:
/***/ (function(module, exports) {

	"use strict";
	var MemberEntity = (function () {
	    function MemberEntity() {
	        this.id = -1;
	        this.login = "";
	        this.avatar_url = "";
	    }
	    return MemberEntity;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MemberEntity;


/***/ }),

/***/ 540:
/***/ (function(module, exports) {

	"use strict";
	var MemberErrors = (function () {
	    function MemberErrors() {
	        this.id = "";
	        this.login = "";
	        this.avatar_url = "";
	    }
	    return MemberErrors;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MemberErrors;


/***/ }),

/***/ 541:
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

/***/ 542:
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

/***/ 543:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var objectAssign = __webpack_require__(4);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (state, action) {
	    if (state === void 0) { state = []; }
	    switch (action.type) {
	        case 'SUMBMITTED_PERSONAL_INFO':
	            return objectAssign({}, state, { products: action.products, productValidations: action.productValidations, isProductFetchCallDone: true, is_agent: action.is_agent });
	        case 'SUMBMITTED_PRODUCTS_INFO':
	            return objectAssign({}, state, { plans: action.plans });
	        case 'SUMBMITTED_PLANS_INFO':
	            var premiums;
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
	        default:
	            return state;
	    }
	};


/***/ }),

/***/ 544:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var objectAssign = __webpack_require__(4);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (state, action) {
	    if (state === void 0) { state = []; }
	    switch (action.type) {
	        case 'FETCHING_QUESTIONS':
	            return objectAssign({}, state, { questions: action.questions });
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
	        default:
	            return state;
	    }
	};


/***/ }),

/***/ 545:
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


/***/ })

});
//# sourceMappingURL=app.3feead31541ad3ae6f1c.js.map