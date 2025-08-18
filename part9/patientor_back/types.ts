import {z} from "zod";

export type Diagnosis = {
    code: string;
    name: string;
    latin?: string;
};

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type PatientEntry = Omit<Patient, 'ssn' | "entries">;
export type NewPatientEntry = z.infer<typeof newPatientSchema>;

export const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    gender: z.enum(Gender),
    occupation: z.string(),
    ssn: z.string()
});

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

interface SickLeave{
    startDate: string;
    endDate: string;
}
interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: SickLeave;
}
interface Discharge{
    date: string;
    criteria: string;
}
interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: Discharge;
}
export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}
export type Entry = OccupationalHealthcareEntry | HospitalEntry | HealthCheckEntry;


export type NewEntry =
    | Omit<HospitalEntry, 'id'>
    | Omit<HealthCheckEntry, 'id'>
    | Omit<OccupationalHealthcareEntry, 'id'>;

export const newEntrySchema = z.object({
    description: z.string(),
    date: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
    type: z.string(),
});

