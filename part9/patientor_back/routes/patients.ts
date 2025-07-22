import express from 'express';
import {addPatient, getAll} from "../controllers/patients";
import {PatientEntry} from "../types";
import {toNewPatientEntry} from "../utils/utils";

const router = express.Router();

router.get('/', (_req: express.Request, res: express.Response<PatientEntry []>) => {
    res.send(getAll());
});

router.post('/', (req: express.Request, res: express.Response<PatientEntry>) => {
    res.send(addPatient(toNewPatientEntry(req.body)));
});

export default router;