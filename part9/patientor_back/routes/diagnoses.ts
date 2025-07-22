import express from 'express';
import {getAll} from "../controllers/diagnoses";
import {Diagnosis} from "../types";

const router = express.Router();

router.get('/', (_req: express.Request, res: express.Response<Array<Diagnosis>>) => {
    res.send(getAll());
});

export default router;