import {Header} from './Header/Header.jsx'
import {Total} from "./Total/Total.jsx";
import {Content} from "./Content/Content.jsx";

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;
  const partInfoList= [[part1, exercises1], [part2, exercises2], [part3, exercises3]];

  return (
    <div>
      <Header course={course} />
      <Content partInfoList={partInfoList}/>
      <Total exerciseCount={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App