import type { DiaryEntry } from "../types"

interface DiaryProps {
	diary: DiaryEntry;
}

const Diary = (props: DiaryProps) => {
	return (
		<div>
			<h3>{props.diary.date}</h3>
			<div>visibility: {props.diary.visibility}</div>
			<div>weather: {props.diary.weather}</div>
		</div>
	)
}

export default Diary;