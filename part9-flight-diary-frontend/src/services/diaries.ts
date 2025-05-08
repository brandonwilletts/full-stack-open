import axios from 'axios';
import type { DiaryEntry, DiaryFormValues } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries'

const getAll = async () => {
	const { data } = await axios.get<DiaryEntry[]>(baseUrl);
	return data;
}

const addNewDiary = async (newDiaryEntry: DiaryFormValues) => {
	const { data } = await axios.post<DiaryEntry>(baseUrl, newDiaryEntry);
	return data;
}

export default { getAll, addNewDiary };