import {Header} from "./Header/Header.jsx";
import {Content} from "./Content/Content.jsx";
import {Total} from "./Total/Total.jsx";

export const Course = ({ course }) => {
  const totalCount = course.parts.reduce((total, item) => total + item.exercises, 0);
  return (
    <div>
      <Header course={course.name} />
      <Content partList={course.parts}/>
      <Total exerciseCount={totalCount}/>
    </div>
  )
}