import express from 'express';
import {addPatient, getAll, getById} from "../controllers/patients";
import {NewPatientEntry, newPatientSchema, Patient, PatientEntry} from "../types";
import {z} from "zod";
import {newPatientParser} from "../utils/middleware";
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
    res.send(addPatient(newPatientSchema.parse(req.body)));
});

router.get('/:id', (req: Request, res: Response<Patient>) => {
    res.send(getById(req.params.id));
});

router.use(errorMiddleware)

export default router;