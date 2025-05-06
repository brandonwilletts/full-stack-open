import patients from '../../data/patients';
import { NewPatient, nonSensitivePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getNonSensitivePatients = (): nonSensitivePatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addNewPatient = (newPatient: NewPatient): Patient => {
	const id = uuid();
	const newPatientToAdd = {
		id,
		...newPatient
	};
	patients.push(newPatientToAdd);
	return newPatientToAdd;
};

export default { getNonSensitivePatients, addNewPatient };