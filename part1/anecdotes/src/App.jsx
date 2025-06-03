import {useState} from 'react'
import {Button} from "./Button/Button.jsx";
import {Vote} from "./Vote/Vote.jsx";
import {Anecdote} from "./Anecdote/Anecdote.jsx";

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
  const count = anecdotes.length;
  const [votes, setVotes] = useState(new Array(count).fill(0));
  const [selected, setSelected] = useState(Math.floor(Math.random() * count));
  const [mostVotedIndex, setMostVotedIndex] = useState(0);
  const onHandleRandomNumber = () => setSelected(Math.floor(Math.random() * count));
  const onVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] = updatedVotes[selected] + 1;
    setVotes(updatedVotes);
    setMostVotedIndex(findIndexOfMostVoted(updatedVotes));
  }

  return (
    <div>
      <Anecdote text={anecdotes[selected]}/>
      <Vote count={votes[selected]}/>
      <div>
        <Button text="vote" onclick={onVote}/>
        <Button text="next anecdote" onclick={onHandleRandomNumber}/>
      </div>
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[mostVotedIndex]}/>
    </div>
  )
}

function findIndexOfMostVoted(votes) {
  let maxValue = -1;
  let index = -1;
  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > maxValue) {
      maxValue = votes[i];
      index = i;
    }
  }
  return index
}

export default App