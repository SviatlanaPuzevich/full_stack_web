import data from '../data/patients';
import {Gender, NewPatientEntry, Patient, PatientEntry} from "../types";
import {v1 as uuid} from 'uuid';


export const getAll = (): PatientEntry [] => {
    return data.map(({ssn, gender, ...rest}) => ({gender: gender as Gender, ...rest}));
};

export const getById = (id: string): Patient | undefined => {
    const obj = data.find(patient => patient.id === id)
    if (!obj) return undefined;
    return { ...obj, gender: obj.gender as Gender}
}

export const addPatient = (patient: NewPatientEntry): PatientEntry => {
    const id = uuid();
    const newPatient: Patient = {id, ...patient, entries: [] };
    data.push({id, ...patient, entries: [] });
    const {ssn, entries, ...rest} = newPatient;
    return rest;
};