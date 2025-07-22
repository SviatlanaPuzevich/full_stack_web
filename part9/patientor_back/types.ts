export type Diagnosis =  {
    code: string;
    name: string;
    latin?: string;
};

export type Gender = 'male' | 'female';

interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export type PatientEntry = Omit<Patient, 'ssn'> ;