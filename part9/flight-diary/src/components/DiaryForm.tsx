import {useState} from "react";
import {type DiaryEntryFormValues, Visibility, Weather} from "../types.ts";

interface DiaryFormProps {
    addEntry: (value: DiaryEntryFormValues) => void;
}

export const DiaryForm = (props: DiaryFormProps) => {
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [weather, setWeather] = useState<Weather>(Weather.Sunny);
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
    const [comment, setComment] = useState<string>('');
    const createNewEntry = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const entry: DiaryEntryFormValues = {
            date,
            weather,
            visibility,
            comment,
        }
        props.addEntry(entry);
        setDate('');
        setComment('');
        setWeather(Weather.Sunny);
        setVisibility(Visibility.Good);
    }
    return (<>
            <h2>Add new entry</h2>
            <form onSubmit={createNewEntry}>
                <div>
                    <label>date<input type="date" value={date}
                                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDate(event.target.value)}/></label>
                </div>
                <div>
                    <fieldset>
                        <legend>weather</legend>
                        {Object.values(Weather).map((weatherVal: Weather) => (
                            <><input type="radio" name="weather" key={weatherVal} checked={weatherVal === weather}
                                     onChange={(event: React.ChangeEvent<HTMLInputElement>) => setWeather(event.target.value as Weather)}
                                     value={weatherVal}/><label>{weatherVal}</label></>))}
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                        <legend>visibility</legend>
                        {Object.values(Visibility).map((visibilityVal: Visibility) => (
                            <><input type="radio" name="visibility" key={visibilityVal}
                                     checked={visibilityVal === visibility} onChange={(e) => {
                                setVisibility(e.target.value as Visibility)
                            }}
                                     value={visibilityVal}/><label>{visibilityVal}</label></>))}
                    </fieldset>
                </div>
                <div>
                    <label>comment<input value={comment} onChange={(event) => setComment(event.target.value)}/></label>
                </div>
                <button type="submit">Add entry</button>
            </form>
        </>
    )
}