import {StatisticLine} from "../StatisticLine/StatisticLine.jsx";

export const Statistics = ({good, neutral, bad}) => {
  const reviewValue = {
    bad: -1,
    neutral: 0,
    good: 1
  }
  const all = good + neutral + bad;
  const average = all > 0 ? (good * reviewValue.good + bad * reviewValue.bad + neutral * reviewValue.neutral) / all : 0;
  const positive = all > 0 ? good / all * 100 : 0;
  if (all < 1) {
    return (
      <p>No feedbacks given</p>
    )
  }
  return (<table>
    <StatisticLine text="good" count={good}/>
    <StatisticLine text="neutral" count={neutral}/>
    <StatisticLine text="bad" count={bad}/>
    <StatisticLine text="all" count={all}/>
    <StatisticLine text="average" count={average}/>
    <StatisticLine text="positive" count={`${positive} %`}/></table>)
}