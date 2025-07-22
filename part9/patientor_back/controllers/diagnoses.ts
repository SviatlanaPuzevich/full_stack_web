import data from '../data/diagnoses';
import {Diagnosis} from "../types";

export const getAll = () : Array<Diagnosis> => {
    return data;
};