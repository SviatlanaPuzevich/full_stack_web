import {Part} from "../Part/Part.jsx";

export const Content = ({partInfoList}) => {
  return <>
    {partInfoList.map((item, index) => (<Part key={index} partName={item[0]} exerciseCount={item[1]}/>))}
  </>
}
