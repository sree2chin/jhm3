import * as _ from 'underscore';
import * as fetch from "isomorphic-fetch";
import MemberEntity from './memberEntity';
import MembersMockData from './memberMockData';

// Sync mock data API, inspired from:
// https://gist.github.com/coryhouse/fd6232f95f9d601158e4
class MemberAPI {
  private _idSeed : number;

  public constructor() {
    this._idSeed = 20;
  }

  private _clone (item) {
  	return JSON.parse(JSON.stringify(item));
  };

  getAllMembersAsync() : Promise<MemberEntity[]> {

    return fetch('https://api.github.com/orgs/lemoncode/members').then(function(res) {
        var members : Array<MemberEntity>;

        return res.json().then(function (response: any) {
          members = response.map((gitHubMember) => {
            var member : MemberEntity = new MemberEntity();

            member.id = gitHubMember.id;
            member.login = gitHubMember.login;
            member.avatar_url = gitHubMember.avatar_url;

            return member;
          });

          return members;
        })

    }));
  }


  getMemberById(id : number) : MemberEntity {
		var member = _.find(MembersMockData, {id: id});
		return this._clone(member);
	}

  saveAuthor(member: MemberEntity) {
		//pretend an ajax call to web api is made here
		console.log('Pretend this just saved the author to the DB via AJAX call...');

		if (member.id != -1) {
			var existingAuthorIndex = _.indexOf(MembersMockData, _.find(MembersMockData, {id: member.id}));
			MembersMockData.splice(existingAuthorIndex, 1, member);
		} else {
			//Just simulating creation here.
			//The server would generate ids for new authors in a real app.
			//Cloning so copy returned is passed by value rather than by reference.
			member.id = this._generateId();
			MembersMockData.push(this._clone(member));
		}

		return member;
	}

}

export default new MemberAPI();
