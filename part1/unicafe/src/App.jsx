import {useState} from 'react'
import {Button} from "./Button/Button.jsx";
import {Statistics} from "./Statistics/Statistics.jsx";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood(good + 1)}>Good</Button>
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)}>Neutral</Button>
      <Button text="bad" onClick={() => setBad(bad + 1)}>Bad</Button>
      <h1>Statistics</h1>
      <Statistics bad={bad} neutral={neutral} good={good}/>
    </div>
  )
}

export default App