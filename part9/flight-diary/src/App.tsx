import {useEffect, useState} from 'react'
import {DiaryList} from "./components/DiaryList.tsx";
import type {DiaryEntry, DiaryEntryFormValues} from "./types.ts";
import {getAll, save} from "./services/diaryEntries.ts";
import {DiaryForm} from "./components/DiaryForm.tsx";
import {Notification} from "./components/Notification.tsx";
import axios from "axios";


function App() {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
    const [message, setMessage] = useState<string>('');
    useEffect(() => {
        const fetchDiaries = async () => {
            const allDiaries = await getAll();
            setDiaries(allDiaries);
        };
        fetchDiaries();
    }, []);

    const addEntry = async (entry: DiaryEntryFormValues) => {
        try {
            const savedEntry: DiaryEntry = await save(entry);
            setDiaries(diaries.concat(savedEntry));
        } catch (error) {
            if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
                notify(error.response.data);
            } else {
                console.error(error);
            }
        }
    }

    const notify = (message: string) => {
        setMessage(message);
        setTimeout(()=>setMessage(''), 3000);
    }

    return (
        <>
            <Notification message={message}/>
            <DiaryForm addEntry={addEntry}/>
            <DiaryList diaries={diaries}/>
        </>
    )
}

export default App
