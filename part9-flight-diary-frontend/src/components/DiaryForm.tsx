import { useState } from "react";
import { Visibility, Weather, type DiaryFormValues } from "../types";

interface DiaryFormProps {
	addDiary: (values: DiaryFormValues) => void;
}

const DiaryForm = (props: DiaryFormProps) => {
	const [date, setDate] = useState('');
	const [visibility, setVisibility] = useState(Visibility.Great);
	const [weather, setWeather] = useState(Weather.Sunny);
	const [comment, setComment] = useState('');

	const resetForm = () => {
		setDate('');
		setVisibility(Visibility.Great);
		setWeather(Weather.Sunny);
		setComment('');
	}

	const createDiary = (event: React.SyntheticEvent) => {
		event.preventDefault();
		const newDiaryEntry: DiaryFormValues = {
			date,
			visibility,
			weather,
			comment
		}
		props.addDiary(newDiaryEntry);
		resetForm();
	}
	
	return (
		<form onSubmit={createDiary}>
			<div>
				date: 
				<input
					type='date'
					name='Date'
					value={date}
					onChange={({ target }) => setDate(target.value)}
				/>
			</div>
			<div>
				visibility: 
				{Object.values(Visibility).map(v => 
					<span key={v}>
							<input
								type='radio'
								name='visibility'
								value={v}
								onChange={() => setVisibility(v)}
								checked={v === visibility}
							/>
							{v}
						</span>
				)}
			</div>
			<div>
				weather: 
				{Object.values(Weather).map(w => 
					<span key={w}>
							<input
								type='radio'
								name='weather'
								value={w}
								onChange={() => setWeather(w)}
								checked={w === weather}
							/>
							{w}
					</span>
				)}
			</div>
			<div>
				comment: 
				<input
					type='text'
					name='Comment'
					value={comment}
					onChange={({ target }) => setComment(target.value)}
				/>
			</div>
			<button type="submit">create</button>
		</form>
	)
}

export default DiaryForm;