webpackJsonp([2],{

/***/ 547:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var react_redux_1 = __webpack_require__(269);
	var react_router_1 = __webpack_require__(184);
	var memberForm_1 = __webpack_require__(548);
	var loadMember_1 = __webpack_require__(550);
	var saveMember_1 = __webpack_require__(556);
	var uiInputMember_1 = __webpack_require__(558);
	var resetSaveCompleted_1 = __webpack_require__(559);
	var initializeNewMember_1 = __webpack_require__(560);
	var MemberPage = (function (_super) {
	    __extends(MemberPage, _super);
	    function MemberPage(props) {
	        _super.call(this, props);
	    }
	    MemberPage.prototype.componentWillMount = function () {
	        var memberId = this.props.params.id;
	        if (memberId) {
	            var memberIdNumber = parseInt(memberId);
	            this.props.loadMember(memberIdNumber);
	        }
	        else {
	            this.props.initializeNewMember();
	        }
	    };
	    MemberPage.prototype.componentWillReceiveProps = function (nextProps) {
	        if (this.props.saveCompleted != nextProps.saveCompleted
	            && nextProps.saveCompleted) {
	            react_router_1.hashHistory.push('/members');
	            this.props.resetSaveCompletedFlag();
	        }
	    };
	    MemberPage.prototype.updateMemberFromUI = function (event) {
	        var field = event.target.name;
	        var value = event.target.value;
	        this.props.fireFieldValueChanged(field, value);
	    };
	    MemberPage.prototype.saveMember = function (event) {
	        event.preventDefault();
	        this.props.saveMember(this.props.member);
	    };
	    MemberPage.prototype.render = function () {
	        if (!this.props.member)
	            return (React.createElement("div", null, "No data"));
	        return (React.createElement(memberForm_1.default, {member: this.props.member, errors: this.props.errors, onChange: this.updateMemberFromUI.bind(this), onSave: this.saveMember.bind(this)}));
	    };
	    return MemberPage;
	}(React.Component));
	var mapStateToProps = function (state) {
	    return {
	        member: state.member.member,
	        errors: state.member.errors,
	        saveCompleted: state.member.saveCompleted
	    };
	};
	var mapDispatchToProps = function (dispatch) {
	    return {
	        loadMember: function (id) { return dispatch(loadMember_1.default(id)); },
	        fireFieldValueChanged: function (fieldName, value) { return dispatch(uiInputMember_1.default(fieldName, value)); },
	        saveMember: function (member) { return dispatch(saveMember_1.default(member)); },
	        resetSaveCompletedFlag: function () { return dispatch(resetSaveCompleted_1.default()); },
	        initializeNewMember: function () {
	            return dispatch(initializeNewMember_1.default());
	        }
	    };
	};
	var ContainerMemberPage = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(MemberPage);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ContainerMemberPage;


/***/ }),

/***/ 548:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var textInput_1 = __webpack_require__(549);
	var MemberForm = (function (_super) {
	    __extends(MemberForm, _super);
	    function MemberForm(props) {
	        _super.call(this, props);
	    }
	    MemberForm.prototype.render = function () {
	        return (React.createElement("form", null, React.createElement("h1", null, " Manage member "), React.createElement(textInput_1.default, {name: "login", label: "Login", value: this.props.member.login, onChange: this.props.onChange, error: this.props.errors.login}), React.createElement(textInput_1.default, {name: "avatar_url", label: "Avatar Url", value: this.props.member.avatar_url, onChange: this.props.onChange, error: this.props.errors.avatar_rul}), React.createElement("input", {type: "submit", value: "Save", className: "btn btn-default", onClick: this.props.onSave})));
	    };
	    return MemberForm;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MemberForm;


/***/ }),

/***/ 549:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var Input = (function (_super) {
	    __extends(Input, _super);
	    function Input(props) {
	        _super.call(this, props);
	    }
	    Input.prototype.getClassName = function () {
	        var className = "form-control ";
	        if (this.props.className) {
	            className = className + this.props.className;
	        }
	        return className;
	    };
	    Input.prototype.render = function () {
	        var wrapperClass = 'form-group';
	        if (this.props.error && this.props.error.length > 0) {
	            wrapperClass += " " + 'has-error';
	        }
	        return (React.createElement("div", {className: wrapperClass}, React.createElement("label", {htmlFor: this.props.name}, this.props.label), React.createElement("div", {className: "field"}, React.createElement("input", {type: this.props.type || "text", name: this.props.name, className: this.getClassName(), placeholder: this.props.placeholder, ref: this.props.name, value: this.props.value, onChange: this.props.onChange}), React.createElement("div", {className: "input"}, this.props.error))));
	    };
	    return Input;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Input;


/***/ }),

/***/ 550:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var memberAPI_1 = __webpack_require__(551);
	var loadMember = function (id) {
	    return {
	        type: 'MEMBER_LOAD',
	        member: memberAPI_1.default.getMemberById(id)
	    };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = loadMember;


/***/ }),

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(552);
	var fetch = __webpack_require__(553);
	var memberEntity_1 = __webpack_require__(539);
	var memberMockData_1 = __webpack_require__(555);
	var MemberAPI = (function () {
	    function MemberAPI() {
	        this._idSeed = 20;
	    }
	    MemberAPI.prototype._clone = function (item) {
	        return JSON.parse(JSON.stringify(item));
	    };
	    ;
	    MemberAPI.prototype.getAllMembersAsync = function () {
	        return fetch('https://api.github.com/orgs/lemoncode/members').then(function (res) {
	            var members;
	            return res.json().then(function (response) {
	                members = response.map(function (gitHubMember) {
	                    var member = new memberEntity_1.default();
	                    member.id = gitHubMember.id;
	                    member.login = gitHubMember.login;
	                    member.avatar_url = gitHubMember.avatar_url;
	                    return member;
	                });
	                return members;
	            });
	        });
	        ;
	    };
	    MemberAPI.prototype.getMemberById = function (id) {
	        var member = _.find(memberMockData_1.default, { id: id });
	        return this._clone(member);
	    };
	    MemberAPI.prototype.saveAuthor = function (member) {
	        console.log('Pretend this just saved the author to the DB via AJAX call...');
	        if (member.id != -1) {
	            var existingAuthorIndex = _.indexOf(memberMockData_1.default, _.find(memberMockData_1.default, { id: member.id }));
	            memberMockData_1.default.splice(existingAuthorIndex, 1, member);
	        }
	        else {
	            member.id = this._generateId();
	            memberMockData_1.default.push(this._clone(member));
	        }
	        return member;
	    };
	    return MemberAPI;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = new MemberAPI();


/***/ }),

/***/ 555:
/***/ (function(module, exports) {

	"use strict";
	var MembersMockData = [
	    {
	        id: 1457912,
	        login: "brauliodiez",
	        avatar_url: "https://avatars.githubusercontent.com/u/1457912?v=3"
	    },
	    {
	        id: 4374977,
	        login: "Nasdan",
	        avatar_url: "https://avatars.githubusercontent.com/u/4374977?v=3"
	    }
	];
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MembersMockData;


/***/ }),

/***/ 556:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var memberAPI_1 = __webpack_require__(551);
	var memberFormValidator_1 = __webpack_require__(557);
	var saveMember = function (member) {
	    var errorsSave = memberFormValidator_1.default.validateMember(member);
	    if (errorsSave.isEntityValid) {
	        memberAPI_1.default.saveAuthor(member);
	    }
	    return {
	        type: 'MEMBER_SAVE',
	        errors: errorsSave
	    };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = saveMember;


/***/ }),

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var memberFormErrors_1 = __webpack_require__(540);
	var MemberFormValidator = (function () {
	    function MemberFormValidator() {
	    }
	    MemberFormValidator.prototype.validateMember = function (member) {
	        var memberFormErrors = new memberFormErrors_1.default();
	        memberFormErrors.isEntityValid = true;
	        if (member.login.length < 3) {
	            memberFormErrors.login = 'Login must be at least 3 characters.';
	            memberFormErrors.isEntityValid = false;
	        }
	        return memberFormErrors;
	    };
	    return MemberFormValidator;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = new MemberFormValidator();


/***/ }),

/***/ 558:
/***/ (function(module, exports) {

	"use strict";
	var uiInputMember = function (fieldName, value) {
	    return {
	        type: 'MEMBER_UI_INPUT',
	        fieldName: fieldName,
	        value: value
	    };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = uiInputMember;


/***/ }),

/***/ 559:
/***/ (function(module, exports) {

	"use strict";
	var resetSaveCompleted = function () {
	    return {
	        type: 'MEMBER_RESET_SAVE_COMPLETED'
	    };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = resetSaveCompleted;


/***/ }),

/***/ 560:
/***/ (function(module, exports) {

	"use strict";
	var initializeNewMember = function () {
	    return {
	        type: 'MEMBER_INITIALIZE_NEW'
	    };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = initializeNewMember;


/***/ }),

/***/ 561:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var react_redux_1 = __webpack_require__(269);
	var react_router_1 = __webpack_require__(184);
	var memberRow_1 = __webpack_require__(562);
	var loadMembers_1 = __webpack_require__(563);
	var MembersPage = (function (_super) {
	    __extends(MembersPage, _super);
	    function MembersPage() {
	        _super.apply(this, arguments);
	    }
	    MembersPage.prototype.componentDidMount = function () {
	        this.props.loadMembers();
	    };
	    MembersPage.prototype.render = function () {
	        if (!this.props.members) {
	            return (React.createElement("div", null, "No data"));
	        }
	        return (React.createElement("div", {className: "row"}, React.createElement("h2", null, " Members Page"), React.createElement(react_router_1.Link, {to: "/member"}, "New Member"), React.createElement("table", {className: "table"}, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Avatar"), React.createElement("th", null, "Id"), React.createElement("th", null, "Name"))), React.createElement("tbody", null, this.props.members.map(function (member) {
	            return React.createElement(memberRow_1.default, {key: member.id, member: member});
	        })))));
	    };
	    return MembersPage;
	}(React.Component));
	var mapStateToProps = function (state) {
	    return {
	        members: state.members,
	    };
	};
	var mapDispatchToProps = function (dispatch) {
	    return {
	        loadMembers: function () { return dispatch(loadMembers_1.default()); }
	    };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(MembersPage);


/***/ }),

/***/ 562:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var react_router_1 = __webpack_require__(184);
	var MemberRow = (function (_super) {
	    __extends(MemberRow, _super);
	    function MemberRow(props) {
	        _super.call(this, props);
	    }
	    MemberRow.prototype.render = function () {
	        return (React.createElement("tr", null, React.createElement("td", null, React.createElement("img", {src: this.props.member.avatar_url, className: "avatar"})), React.createElement("td", null, React.createElement(react_router_1.Link, {to: "/memberEdit/" + this.props.member.id}, this.props.member.id)), React.createElement("td", null, React.createElement("span", null, this.props.member.login))));
	    };
	    return MemberRow;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MemberRow;


/***/ }),

/***/ 563:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var memberAPI_1 = __webpack_require__(551);
	var assignMembers_1 = __webpack_require__(564);
	function loadMembers() {
	    return function (dispatch) {
	        return memberAPI_1.default.getAllMembersAsync().then(function (data) { return dispatch(assignMembers_1.default(data)); });
	    };
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = loadMembers;


/***/ }),

/***/ 564:
/***/ (function(module, exports) {

	"use strict";
	var assignMembers = function (members) {
	    return {
	        type: 'MEMBERS_ASSIGN',
	        members: members
	    };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = assignMembers;


/***/ })

});
//# sourceMappingURL=2.MemberPages.3feead31541ad3ae6f1c.js.map