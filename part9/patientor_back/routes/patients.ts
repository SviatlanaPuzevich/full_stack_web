import express from 'express';
import {getAll} from "../controllers/patients";
import {PatientEntry} from "../types";
const router = express.Router();

router.get('/', (_req: express.Request, res: express.Response<PatientEntry []>) => {
    res.send(getAll());
});

export default router;