webpackJsonp([2],{547:function(e,t,r){"use strict";var n=this&&this.__extends||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);function n(){this.constructor=e}e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},o=r(1),a=r(269),u=r(184),i=r(548),s=r(550),l=r(556),p=r(558),c=r(559),m=r(560),f=function(e){function t(t){e.call(this,t)}return n(t,e),t.prototype.componentWillMount=function(){var e=this.props.params.id;if(e){var t=parseInt(e);this.props.loadMember(t)}else this.props.initializeNewMember()},t.prototype.componentWillReceiveProps=function(e){this.props.saveCompleted!=e.saveCompleted&&e.saveCompleted&&(u.hashHistory.push("/members"),this.props.resetSaveCompletedFlag())},t.prototype.updateMemberFromUI=function(e){var t=e.target.name,r=e.target.value;this.props.fireFieldValueChanged(t,r)},t.prototype.saveMember=function(e){e.preventDefault(),this.props.saveMember(this.props.member)},t.prototype.render=function(){return this.props.member?o.createElement(i.default,{member:this.props.member,errors:this.props.errors,onChange:this.updateMemberFromUI.bind(this),onSave:this.saveMember.bind(this)}):o.createElement("div",null,"No data")},t}(o.Component),d=a.connect(function(e){return{member:e.member.member,errors:e.member.errors,saveCompleted:e.member.saveCompleted}},function(e){return{loadMember:function(t){return e(s.default(t))},fireFieldValueChanged:function(t,r){return e(p.default(t,r))},saveMember:function(t){return e(l.default(t))},resetSaveCompletedFlag:function(){return e(c.default())},initializeNewMember:function(){return e(m.default())}}})(f);Object.defineProperty(t,"__esModule",{value:!0}),t.default=d},548:function(e,t,r){"use strict";var n=this&&this.__extends||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);function n(){this.constructor=e}e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},o=r(1),a=r(549),u=function(e){function t(t){e.call(this,t)}return n(t,e),t.prototype.render=function(){return o.createElement("form",null,o.createElement("h1",null," Manage member "),o.createElement(a.default,{name:"login",label:"Login",value:this.props.member.login,onChange:this.props.onChange,error:this.props.errors.login}),o.createElement(a.default,{name:"avatar_url",label:"Avatar Url",value:this.props.member.avatar_url,onChange:this.props.onChange,error:this.props.errors.avatar_rul}),o.createElement("input",{type:"submit",value:"Save",className:"btn btn-default",onClick:this.props.onSave}))},t}(o.Component);Object.defineProperty(t,"__esModule",{value:!0}),t.default=u},549:function(e,t,r){"use strict";var n=this&&this.__extends||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);function n(){this.constructor=e}e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},o=r(1),a=function(e){function t(t){e.call(this,t)}return n(t,e),t.prototype.getClassName=function(){var e="form-control ";return this.props.className&&(e+=this.props.className),e},t.prototype.render=function(){var e="form-group";return this.props.error&&this.props.error.length>0&&(e+=" has-error"),o.createElement("div",{className:e},o.createElement("label",{htmlFor:this.props.name},this.props.label),o.createElement("div",{className:"field"},o.createElement("input",{type:this.props.type||"text",name:this.props.name,className:this.getClassName(),placeholder:this.props.placeholder,ref:this.props.name,value:this.props.value,onChange:this.props.onChange}),o.createElement("div",{className:"input"},this.props.error)))},t}(o.Component);Object.defineProperty(t,"__esModule",{value:!0}),t.default=a},550:function(e,t,r){"use strict";var n=r(551);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return{type:"MEMBER_LOAD",member:n.default.getMemberById(e)}}},551:function(e,t,r){"use strict";var n=r(552),o=r(553),a=r(539),u=r(555),i=function(){function e(){this._idSeed=20}return e.prototype._clone=function(e){return JSON.parse(JSON.stringify(e))},e.prototype.getAllMembersAsync=function(){return o("https://api.github.com/orgs/lemoncode/members").then(function(e){return e.json().then(function(e){return e.map(function(e){var t=new a.default;return t.id=e.id,t.login=e.login,t.avatar_url=e.avatar_url,t})})})},e.prototype.getMemberById=function(e){var t=n.find(u.default,{id:e});return this._clone(t)},e.prototype.saveAuthor=function(e){if(console.log("Pretend this just saved the author to the DB via AJAX call..."),-1!=e.id){var t=n.indexOf(u.default,n.find(u.default,{id:e.id}));u.default.splice(t,1,e)}else e.id=this._generateId(),u.default.push(this._clone(e));return e},e}();Object.defineProperty(t,"__esModule",{value:!0}),t.default=new i},555:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=[{id:1457912,login:"brauliodiez",avatar_url:"https://avatars.githubusercontent.com/u/1457912?v=3"},{id:4374977,login:"Nasdan",avatar_url:"https://avatars.githubusercontent.com/u/4374977?v=3"}]},556:function(e,t,r){"use strict";var n=r(551),o=r(557);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=o.default.validateMember(e);return t.isEntityValid&&n.default.saveAuthor(e),{type:"MEMBER_SAVE",errors:t}}},557:function(e,t,r){"use strict";var n=r(540),o=function(){function e(){}return e.prototype.validateMember=function(e){var t=new n.default;return t.isEntityValid=!0,e.login.length<3&&(t.login="Login must be at least 3 characters.",t.isEntityValid=!1),t},e}();Object.defineProperty(t,"__esModule",{value:!0}),t.default=new o},558:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){return{type:"MEMBER_UI_INPUT",fieldName:e,value:t}}},559:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return{type:"MEMBER_RESET_SAVE_COMPLETED"}}},560:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return{type:"MEMBER_INITIALIZE_NEW"}}},561:function(e,t,r){"use strict";var n=this&&this.__extends||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);function n(){this.constructor=e}e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},o=r(1),a=r(269),u=r(184),i=r(562),s=r(563),l=function(e){function t(){e.apply(this,arguments)}return n(t,e),t.prototype.componentDidMount=function(){this.props.loadMembers()},t.prototype.render=function(){return this.props.members?o.createElement("div",{className:"row"},o.createElement("h2",null," Members Page"),o.createElement(u.Link,{to:"/member"},"New Member"),o.createElement("table",{className:"table"},o.createElement("thead",null,o.createElement("tr",null,o.createElement("th",null,"Avatar"),o.createElement("th",null,"Id"),o.createElement("th",null,"Name"))),o.createElement("tbody",null,this.props.members.map(function(e){return o.createElement(i.default,{key:e.id,member:e})})))):o.createElement("div",null,"No data")},t}(o.Component);Object.defineProperty(t,"__esModule",{value:!0}),t.default=a.connect(function(e){return{members:e.members}},function(e){return{loadMembers:function(){return e(s.default())}}})(l)},562:function(e,t,r){"use strict";var n=this&&this.__extends||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);function n(){this.constructor=e}e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},o=r(1),a=r(184),u=function(e){function t(t){e.call(this,t)}return n(t,e),t.prototype.render=function(){return o.createElement("tr",null,o.createElement("td",null,o.createElement("img",{src:this.props.member.avatar_url,className:"avatar"})),o.createElement("td",null,o.createElement(a.Link,{to:"/memberEdit/"+this.props.member.id},this.props.member.id)),o.createElement("td",null,o.createElement("span",null,this.props.member.login)))},t}(o.Component);Object.defineProperty(t,"__esModule",{value:!0}),t.default=u},563:function(e,t,r){"use strict";var n=r(551),o=r(564);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return function(e){return n.default.getAllMembersAsync().then(function(t){return e(o.default(t))})}}},564:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return{type:"MEMBERS_ASSIGN",members:e}}}});