import Diary from "./Diary";
import type { DiaryEntry } from "../types"

interface DiaryListProps {
	diaries: DiaryEntry[];
}

const DiaryList = (props: DiaryListProps) => {
	return (
		<div>
			<h2>Diary entries</h2>
			{props.diaries.map(diary => 
				<Diary diary={diary} key={diary.id}/>
			)}
		</div>
	)
}

export default DiaryList;