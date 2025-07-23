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

export interface Patient{
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type PatientEntry = Omit<Patient, 'ssn'>;
export type NewPatientEntry = z.infer<typeof newPatientSchema>;

export const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    gender: z.enum(Gender),
    occupation: z.string(),
    ssn: z.string()
});