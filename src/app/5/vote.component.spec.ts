import { VoteComponent } from './vote.component'; 

describe('VoteComponent', () => {
  var component: VoteComponent; 

  beforeEach(() => {
    component = new VoteComponent();
  });

  it('should raise votechanged event when upvoted', () => {
    let totalVotes = null;
    component.voteChanged.subscribe(v => totalVotes = v);
    component.upVote();

    //expect total values to be not null
    expect(totalVotes).not.toBeNull;
  });
});