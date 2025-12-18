import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Exercises.css'

function Exercises({ chapters }) {
  const exercisesChapter = chapters.find(ch => ch.number === 'exercises')
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [userAnswers, setUserAnswers] = useState({})
  
  if (!exercisesChapter || !exercisesChapter.exercises) {
    return (
      <div className="exercises">
        <div className="container">
          <p>Упражнения не найдены</p>
          <Link to="/">Вернуться на главную</Link>
        </div>
      </div>
    )
  }
  
  const handleExerciseClick = (exerciseId) => {
    setSelectedExercise(selectedExercise === exerciseId ? null : exerciseId)
  }
  
  const handleAnswerChange = (exerciseId, answer) => {
    setUserAnswers({
      ...userAnswers,
      [exerciseId]: answer
    })
  }
  
  return (
    <div className="exercises">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Главная</Link> / Упражнения
        </nav>
        
        <h1>Упражнения</h1>
        
        <div className="exercises-list">
          {exercisesChapter.exercises.map((exercise) => (
            <div key={exercise.id} className="exercise-item">
              <div 
                className="exercise-header"
                onClick={() => handleExerciseClick(exercise.id)}
              >
                <span className="exercise-number">Упражнение {exercise.id}</span>
                <span className="toggle-icon">
                  {selectedExercise === exercise.id ? '▼' : '▶'}
                </span>
              </div>
              
              {selectedExercise === exercise.id && (
                <div className="exercise-content">
                  <div className="exercise-text">
                    <p>{exercise.text}</p>
                  </div>
                  
                  <div className="exercise-input">
                    <label>Ваш ответ:</label>
                    <textarea
                      value={userAnswers[exercise.id] || ''}
                      onChange={(e) => handleAnswerChange(exercise.id, e.target.value)}
                      placeholder="Введите ваш ответ здесь..."
                      rows="6"
                    />
                  </div>
                  
                  <div className="exercise-actions">
                    <button className="btn-save">Сохранить ответ</button>
                    <button className="btn-clear" onClick={() => handleAnswerChange(exercise.id, '')}>
                      Очистить
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="exercises-navigation">
          <Link to="/" className="btn">На главную</Link>
        </div>
      </div>
    </div>
  )
}

export default Exercises

