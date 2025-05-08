import { useEffect, useState } from 'react'
import diariesService from './services/diaries';
import DiaryList from './components/DiaryList';
import type { DiaryEntry, DiaryFormValues } from './types';
import DiaryForm from './components/DiaryForm';
import Notification from './components/Notification';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    diariesService.getAll().then(data => {
      setDiaries(data);
    })
  }, []);

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 5000);
  }

  const addDiary = async (newDiaryEntry: DiaryFormValues) => {
    try {
      const diaryEntry: DiaryEntry = await diariesService.addNewDiary(newDiaryEntry);
      setDiaries(diaries.concat(diaryEntry))
      showNotification('New note added!')
    } catch (error) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      showNotification(errorMessage);
    }
  }

  return (
    <div>
      <Notification notification={notification}/>
      <DiaryForm addDiary={addDiary}/>
      <DiaryList diaries={diaries}/>
    </div>
  )
}

export default App
