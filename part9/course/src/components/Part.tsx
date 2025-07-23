import type {CoursePart} from "../App.tsx";

interface PartProps {
    part: CoursePart;
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};
export const Part = (props: PartProps) => {
    switch (props.part.kind) {
        case "basic":
            return (<div><b>{props.part.name} {props.part.exerciseCount}</b>
                <div><i>{props.part.description}</i></div>
            </div>);
        case "group":
            return (<div><b>{props.part.name} {props.part.exerciseCount}</b>
                <div>project count: {props.part.groupProjectCount}</div>
            </div>);
        case "background":
            return (<div><b>{props.part.name} {props.part.exerciseCount}</b>
                <div><i>{props.part.description}</i></div>
                <div>{props.part.backgroundMaterial}</div>
            </div>);
            case "special":
                return (<div><b>{props.part.name} {props.part.exerciseCount}</b>
                    <div><i>{props.part.description}</i></div>
                    <div>required skills: {props.part.requirements.join(", ")}</div>
                </div>);
        default:
            return assertNever(props.part)
    }
}