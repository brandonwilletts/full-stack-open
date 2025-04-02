import { useState } from 'react'

const Button = ({ onClick, label }) => {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  )
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.label}</td> 
      <td>{props.count}</td>
    </tr>
  )
};

const Statistics = ({counts}) => {
  const [good, neutral, bad] = counts;

  if (good + neutral + bad === 0) {
    return <div>No feedback given</div>
  }

  const all = good + neutral + bad;
  const average =  (good - bad) / all;
  const positive = good / all * 100;

  return (
    <table>
      <tbody>
        <StatisticLine label="good" count={good}/>
        <StatisticLine label="neutral" count={neutral}/>
        <StatisticLine label="bad" count={bad}/>
        <StatisticLine label="all" count={all}/>
        <StatisticLine label="average" count={average}/>
        <StatisticLine label="positive" count={positive + " %"}/>
      </tbody>
    </table>
  )
};

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
  };

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
  };

  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} label="good" />
      <Button onClick={handleNeutralClick} label="neutral" />
      <Button onClick={handleBadClick} label="bad" />
      <h1>statistics</h1>
      <Statistics counts={[good, neutral, bad]} />
    </div>
  )
}

export default App
