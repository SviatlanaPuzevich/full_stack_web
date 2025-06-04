import {Part} from "./Part/Part.jsx";

export const Content = ({partList}) => {
  return <>
    {partList.map((item) => (<Part key={item.id} partName={item.name} exerciseCount={item.exercises}/>))}
  </>
}
