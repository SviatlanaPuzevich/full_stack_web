import type {DiaryEntry} from "../types.ts";

interface DiaryListProps {
    diaries: DiaryEntry[];
}

export const DiaryList = (props: DiaryListProps) => {
    return (
        <>
            <h2>Diary entries</h2>
            {props.diaries.map((diaryEntry) => (<div key={diaryEntry.id}>
                <b>{diaryEntry.date}</b>
                <div>{diaryEntry.weather}</div>
                <div>{diaryEntry.visibility}</div>
            </div>))}
        </>
    )
}