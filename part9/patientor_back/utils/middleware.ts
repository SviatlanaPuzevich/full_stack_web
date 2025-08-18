import {newEntrySchema, newPatientSchema} from "../types";
import { Request, Response, NextFunction } from 'express';

export const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

export const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};