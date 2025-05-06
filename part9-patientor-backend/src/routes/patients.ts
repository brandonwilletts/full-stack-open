import express, { Request, Response, NextFunction } from 'express';
import { nonSensitivePatient, NewPatient, Patient } from '../types';
import { z } from 'zod';
import patientsService from '../services/patientsService';
import { NewPatientSchema } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<nonSensitivePatient[]>) => {
	res.send(patientsService.getNonSensitivePatients());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
	try {
		NewPatientSchema.parse(req.body);
		next();
	} catch (error: unknown) {
		next(error);
	}
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
	const addedPatient = patientsService.addNewPatient(req.body);
	res.json(addedPatient);
});

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
	if (error instanceof z.ZodError) {
		res.status(400).send({ error: error.issues });
	} else {
		next(error);
	}
};

router.use(errorMiddleware);

export default router;