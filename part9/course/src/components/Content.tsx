import type {CoursePart} from "../App.tsx";
import {Part} from "./Part.tsx";

interface ContentProps {
    courseParts: CoursePart[];
}

export const Content = (props: ContentProps) => {
    return (
        <>
            {props.courseParts.map((coursePart: CoursePart) => (<Part key={coursePart.name} part={coursePart}/>))}
        </>
    )
}