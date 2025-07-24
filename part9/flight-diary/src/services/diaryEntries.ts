import axios from "axios";
import type {DiaryEntry, DiaryEntryFormValues} from "../types.ts";

const baseURL = "http://localhost:3000/api/diaries";

export const getAll = async () => {
    const response = await axios.get<DiaryEntry[]>(baseURL)
    return response.data
}

export const save = async (data: DiaryEntryFormValues ) => {
    const response = await axios.post<DiaryEntry>(baseURL, data)
    return response.data
}