import {Part} from "../Part/Part.jsx";

export const Content = ({partList}) => {
  return <>
    {partList.map((item, index) => (<Part key={index} partName={item.name} exerciseCount={item.exercises}/>))}
  </>
}
