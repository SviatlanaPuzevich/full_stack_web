import data from '../data/patients';
import {Gender, NewPatientEntry, Patient, PatientEntry} from "../types";
import {v1 as uuid} from 'uuid';


export const getAll = (): PatientEntry [] => {
    return data.map(({ssn, gender, ...rest}) => ( {gender: gender as Gender, ...rest}));
};


export const addPatient = (patient: NewPatientEntry): PatientEntry => {
    const id = uuid();
    const newPatient: Patient = {id, ...patient};
    data.push(newPatient);
    const {ssn, ...rest} = newPatient;
    return rest;
};