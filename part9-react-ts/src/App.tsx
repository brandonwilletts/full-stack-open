import { courseName, courseParts } from './data/course'
import Header from './components/Header';
import Total from './components/Total';
import Content from './components/Content';

const App = () => {
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts}/>
      <Total total={totalExercises} />
    </div>
  );
};

export default App;