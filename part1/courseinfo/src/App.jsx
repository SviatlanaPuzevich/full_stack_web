import {Header} from './Header/Header.jsx'
import {Total} from "./Total/Total.jsx";
import {Content} from "./Content/Content.jsx";

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const totalCount = course.parts.reduce((total, item) => total + item.exercises, 0);

  return (
    <div>
      <Header course={course.name} />
      <Content partList={course.parts}/>
      <Total exerciseCount={totalCount}/>
    </div>
  )
}

export default App