interface Summary {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

interface ExerciseValues {
	daily_exercises: Array<number>,
	target: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseExerciseRequest = (request: any): ExerciseValues => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = request;
	if (!daily_exercises || !target) {
		throw new Error('parameters missing');
	}
	if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
		throw new Error('malformatted parameters');
	}
	for (const hours of daily_exercises) {
		if (isNaN(Number(hours))) {
			throw new Error('malformatted parameters');
		}
	}
	return {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		daily_exercises,
		target: Number(target)
	};
};

export const parseExerciseArguments = (args: string[]): ExerciseValues => {
	// Check number of arguments
	if (args.length < 4) throw new Error('Too few arguments!');

	// Check if all args are numbers
	for (let i = 2; i < args.length; i++) {
		if (isNaN(Number(args[i]))) {
			throw new Error('Arguments must be numbers!');
		}
	}

	const daily_exercises: Array<number> = [];
	for (let i = 3; i < args.length; i++) {
		daily_exercises.push(Number(args[i]));
	}

	const target: number = Number(args[2]);

	return {
		daily_exercises,
		target
	};
};

export const calculateExercises = (daily_exercises: Array<number>, target: number): Summary => {
	const totalHours = daily_exercises.reduce((sum, hours) => sum + hours, 0);
	const periodLength = daily_exercises.length;
	const trainingDays = daily_exercises.filter(hours => hours > 0).length;
	const average = totalHours / periodLength;
	const success = average > target;
	const trainingRatio = totalHours / (periodLength * target);
	let rating = 0;
	let ratingDescription = '';
	switch (true) {
		case (trainingRatio >= 1):
			rating = 3;
			ratingDescription = 'Excellent job!';
			break;
		case (trainingRatio >= 0.5):
			rating = 2;
			ratingDescription = 'Not too bad but could be better';
			break;
		default:
			rating = 0;
			ratingDescription = 'Needs improvement';
			break;
	}
	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average
	};
};

if (require.main === module) {
	try {
		const { daily_exercises, target } = parseExerciseArguments(process.argv);
		console.log(calculateExercises(daily_exercises, target));
	} catch (error: unknown) {
		let errorMessage = 'Error!';
		if (error instanceof Error) {
			errorMessage = `Error: ${error.message}`;
		}
		console.log(errorMessage);
	}
}

