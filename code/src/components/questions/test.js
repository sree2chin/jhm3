function voteWinner(votes)
{
  var votesMapper = {};
  for(var i=0; i<votes.length; i++) {
    if (votesMapper[votes[i]]) {
      votesMapper[votes[i]]++;
    } else {
      votesMapper[votes[i]] = 1;
    }
  }
  var maxVotes = 0;
  for (var k in votesMapper) {
    if (maxVotes < votesMapper[k]) {
      maxVotes = votesMapper[k];
    }
  }
  var maxVoters = [];
  for (var k in votesMapper) {
    if (maxVotes== votesMapper[k]) {
      maxVoters.push(k);
    }
  }
  maxVoters.sort();
  return maxVoters[maxVoters.length-1];
}
const votesCount = parseInt(readline(), 10)
let votes = []
for (let i = 0; i < votesCount; i++) {
  const votesItem = readline()
  votes.push(votesItem)
}
print(voteWinner(votes))