import data from '../data/patients';
import {Entry, NewEntry, NewPatientEntry, Patient, PatientEntry} from "../types";
import {v1 as uuid} from 'uuid';


export const getAll = (): PatientEntry [] => {
    return data.map(({ssn, ...rest}) => ({ ...rest}));
};

export const getById = (id: string): Patient | undefined => {
    return data.find(patient => patient.id === id);
};

export const addPatient = (patient: NewPatientEntry): PatientEntry => {
    const id = uuid();
    const newPatient: Patient = {id, ...patient, entries: [] };
    data.push({id, ...patient, entries: [] });
    const {ssn, entries, ...rest} = newPatient;
    return rest;
};

export const addEntry = (patientId: string, newEntry: NewEntry) : Entry=>{
    const patient: Patient | undefined = data.find(patient => patient.id === patientId);
    if (!patient) {
        throw new Error ("the patient not found");
    }
    const id = uuid();
    const entry: Entry = {id, ...newEntry};
    patient.entries.push(entry);
    return entry;
};