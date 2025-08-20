import { useState } from "react";

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  let all = good + bad + neutral;
  if (all == 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good}></StatisticsLine>
        <StatisticsLine text="neutral" value={neutral}></StatisticsLine>
        <StatisticsLine text="bad" value={bad}></StatisticsLine>
        <StatisticsLine text="all" value={all}></StatisticsLine>
        <StatisticsLine
          text="average"
          value={all == 0 ? 0 : (good - bad) / all}
        ></StatisticsLine>
        <StatisticsLine
          text="positive"
          value={`${all == 0 ? 0 : (good / all) * 100} %`}
        ></StatisticsLine>
      </tbody>
    </table>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [all, setAll] = useState(0);

  const handleClick = (feedback) => () => {
    console.log("feedback", feedback);
    if (feedback == "good") {
      setGood(good + 1);
    } else if (feedback == "bad") {
      setBad(bad + 1);
    } else if (feedback == "neutral") {
      setNeutral(neutral + 1);
    }
  };

  return (
    <>
      <h2>Give feedback</h2>
      <Button onClick={handleClick("good")} text={"good"}></Button>
      <Button onClick={handleClick("neutral")} text={"neutral"}></Button>
      <Button onClick={handleClick("bad")} text={"bad"}></Button>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </>
  );
}

export default App;
