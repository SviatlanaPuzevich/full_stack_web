import data from '../data/patients';
import {PatientEntry} from "../types";


export const getAll = (): PatientEntry [] => {
    return data.map(({ ssn, ...rest }) => rest);
};