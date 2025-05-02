import express from 'express';
import { calculateBmi, parseBmiParams } from './bmiCalculator';
import { calculateExercises, parseExerciseRequest } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello full stack!');
});

app.get('/bmi', (req, res) => {
	try {
		const { height, weight } = parseBmiParams(req.query);
		const bmi = calculateBmi(height, weight);
		res.send({ height, weight, bmi });
	} catch (error: unknown) {
		let errorMessage = 'Error!';
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.send({ error: errorMessage });
	}
});

app.post('/exercises', (req, res) => {
	try {
		const { daily_exercises, target } = parseExerciseRequest(req.body);
		const exerciseSummary = calculateExercises(daily_exercises, target);
		res.send(exerciseSummary);
	} catch (error: unknown) {
		let errorMessage = 'Error!';
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.send({ error: errorMessage });
	}
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});