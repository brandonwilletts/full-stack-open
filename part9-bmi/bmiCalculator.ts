interface BmiValues {
	height: number,
	weight: number
}

const parseBmiArguments = (args: string[]): BmiValues => {
	// Check number of arguments
	if (args.length < 4) throw new Error('Too few arguments!');
	if (args.length > 4) throw new Error('Too many arguments!');

	// Check arguments are numbers
	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			height: Number(args[2]),
			weight: Number(args[3])
		};
	} else {
		throw new Error('Provided values are not numbers!');
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseBmiParams = (params: any): BmiValues => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { height, weight } = params;
	if (!Number(height) || !Number(weight)) {
		throw new Error('missing parameters');
	}

	if (isNaN(Number(height)) || isNaN(Number(weight))) {
		throw new Error('malformatted parameters');
	}

	return {
		height: Number(height),
		weight: Number(weight)
	};
};

export const calculateBmi = (height: number, weight: number): string => {
	const bmi = (weight / ((height / 100) ** 2));
	switch (true) {
		case (bmi <= 18.4):
			return 'Underweight';
		case (bmi > 18.4 && bmi < 25):
			return 'Normal range';
		case (bmi >= 25 && bmi < 30):
			return 'Overweight (pre-obese)';
		case (bmi > 40):
			return 'Obese';
		default:
			return 'Error';
	}
};

// Run program
if (require.main === module) {
	try {
		const { height, weight } = parseBmiArguments(process.argv);
		console.log(calculateBmi(height, weight));
	} catch (error: unknown) {
		let errorMessage = 'Error!';
		if (error instanceof Error) {
			errorMessage = `Error: ${error.message}`;
		}
		console.log(errorMessage);
	}
};
