webpackJsonp([3],{

/***/ 548:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var react_redux_1 = __webpack_require__(268);
	var College_1 = __webpack_require__(549);
	var react_bootstrap_1 = __webpack_require__(280);
	var college_card_1 = __webpack_require__(550);
	var util_1 = __webpack_require__(551);
	var prefix = "jhm-home-page";
	var cs = util_1.getCs(prefix);
	var Index = (function (_super) {
	    __extends(Index, _super);
	    function Index() {
	        _super.call(this);
	    }
	    Index.prototype.componentWillMount = function () {
	    };
	    Index.prototype.render = function () {
	        var collegesList = this.props.collegesList;
	        return (React.createElement("div", null, React.createElement("div", {className: cs("banner-img-cont")}, React.createElement("img", {className: cs("banner-image"), src: "https://joinhotelmanagement.s3.ap-south-1.amazonaws.com/bannerImage2.jpg", alt: "banner"}), React.createElement("p", {className: cs("banner-img-txt")}, "Join Hotel Management")), React.createElement("div", {className: cs("main-container")}, React.createElement(react_bootstrap_1.Row, {className: cs("content-box")}, React.createElement(react_bootstrap_1.Col, {sm: 8, className: cs("content-sub-box")}, React.createElement("p", null, "Looking to kickstart your career in hotel management?"), React.createElement("p", null, "Sign up to choose best college"), React.createElement(react_bootstrap_1.Button, {variant: "primary"}, "Sign up")), React.createElement(react_bootstrap_1.Col, {sm: 4, className: cs(["content-sub-box", "content-right-box"])}, React.createElement("img", {className: cs("icon-image"), src: "../images/student/student.svg"}))), React.createElement(react_bootstrap_1.Row, {className: cs("content-box")}, React.createElement(react_bootstrap_1.Col, {sm: 4, className: cs(["content-sub-box", "content-right-box"])}, React.createElement("img", {className: cs("icon-image"), src: "../images/college/university.svg"})), React.createElement(react_bootstrap_1.Col, {sm: 8, className: cs("content-sub-box")}, React.createElement("p", null, "Want to get students joined in your institution?"), React.createElement("p", null, "Sign up to find eligible students"), React.createElement(react_bootstrap_1.Button, {variant: "primary"}, "Sign up"))), React.createElement("div", {className: cs("colleges-list")}, collegesList.map(function (elem, index) {
	            return (React.createElement(college_card_1.default, {collegeObj: elem}));
	        })))));
	    };
	    return Index;
	}(React.Component));
	var mapStateToProps = function (state) {
	    return {
	        collegesList: state.college.collegesList
	    };
	};
	var mapDispatchToProps = function (dispatch) {
	    return {
	        getCollegesList: function (data) { return dispatch(College_1.getCollegesList(data)); },
	    };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Index);


/***/ }),

/***/ 549:
/***/ (function(module, exports) {

	"use strict";
	exports.getCollegesList = function () {
	    return function (dispatch) {
	        return dispatch({
	            type: 'GET_COLLEGES_LIST'
	        });
	    };
	};


/***/ }),

/***/ 550:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var util_1 = __webpack_require__(551);
	var prefix = "jhm-college-card";
	var cs = util_1.getCs(prefix);
	var CollegeCard = (function (_super) {
	    __extends(CollegeCard, _super);
	    function CollegeCard() {
	        _super.call(this);
	    }
	    CollegeCard.prototype.render = function () {
	        var collegeObj = this.props.collegeObj;
	        return (React.createElement("div", {className: prefix}, React.createElement("img", {src: collegeObj.bannerImage, alt: collegeObj.name}), React.createElement("div", {className: cs("card-bottom-cont")}, React.createElement("p", null, collegeObj.name, " - ", collegeObj.location))));
	    };
	    return CollegeCard;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = CollegeCard;


/***/ }),

/***/ 551:
/***/ (function(module, exports) {

	"use strict";
	exports.getCs = function (prefix) {
	    return function (cls) {
	        if (typeof cls === "string") {
	            return prefix + "-" + cls;
	        }
	        else {
	            var className = "";
	            var clsListLength = cls.length;
	            for (var i = 0; i < clsListLength; i++) {
	                className += prefix + "-" + cls[i] + " ";
	            }
	            return className.trim();
	        }
	    };
	};


/***/ })

});
//# sourceMappingURL=3.HomePage.064709493fb12e1b69d4.js.map