import express from 'express';
import {addEntry, addPatient, getAll, getById} from "../controllers/patients";
import {Entry, NewEntry, NewPatientEntry, Patient, PatientEntry} from "../types";
import {z} from "zod";
import {newEntryParser, newPatientParser} from "../utils/middleware";
import { Request, Response, NextFunction } from 'express';

const router = express.Router();
const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

router.get('/', (_req: Request, res: Response<PatientEntry []>) => {
    res.send(getAll());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
    res.send(addPatient(req.body));
});

router.get('/:id', (req: Request, res: Response<Patient>) => {
    res.send(getById(req.params.id));
});

router.post('/:id/entries', newEntryParser, (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
    res.send(addEntry(req.params.id, req.body));
});

router.use(errorMiddleware);

export default router;