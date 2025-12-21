import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getOverallProgress, getChapterProgress } from '../utils/progressTracker'
import './ProgressTracker.css'

function ProgressTracker({ isVisible, onToggleVisibility }) {
  const [progress, setProgress] = useState(getOverallProgress())
  const [isExpanded, setIsExpanded] = useState(true)
  const location = useLocation()

  useEffect(() => {
    // Обновляем прогресс при изменении маршрута
    const updateProgress = () => {
      setProgress(getOverallProgress())
    }
    
    updateProgress()
    // Обновляем каждую секунду для синхронизации между вкладками
    const interval = setInterval(updateProgress, 1000)
    
    return () => clearInterval(interval)
  }, [location.pathname])

  const chapters = [
    { id: 'introduction', name: 'Введение', path: '/introduction', hasTest: false },
    { id: 'chapter1', name: 'Теория формальных грамматик и языков', path: '/chapter1', hasTest: true },
    { id: 'chapter2', name: 'Теория трансляции', path: '/chapter2', hasTest: true },
    { id: 'chapter3', name: 'Организация таблиц символов', path: '/chapter3', hasTest: true },
    { id: 'chapter4', name: 'Оптимизация кода', path: '/chapter4', hasTest: true },
    { id: 'chapter5', name: 'Организация диалога в вычислительных системах', path: '/chapter5', hasTest: true },
  ]

  const sections = [
    { id: 'exercises', name: 'Упражнения', path: '/exercises' },
    { id: 'coursework', name: 'Курсовая работа', path: '/coursework' },
  ]

  const getChapterStatus = (chapterId) => {
    const chapterProgress = getChapterProgress(chapterId)
    if (chapterProgress.testCompleted) return 'completed'
    if (chapterProgress.viewed) return 'viewed'
    return 'not-viewed'
  }

  if (!isVisible) {
    return null
  }

  return (
    <>
      <div className={`progress-tracker ${isExpanded ? 'expanded' : 'collapsed'}`}>
        {isExpanded && (
          <>
            <div className="progress-header">
              <h3 className="progress-header-title">Прогресс изучения</h3>
              <button 
                className="progress-toggle-header"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-label="Свернуть прогресс"
                title="Свернуть"
              >
                ◀
              </button>
            </div>
          <div className="progress-content">
          
          {/* Общая статистика */}
          <div className="progress-stats">
            <div className="stat-item">
              <span className="stat-label">Главы изучены:</span>
              <span className="stat-value">
                {progress.chaptersViewed}/{progress.chaptersTotal} ({progress.chaptersProgress}%)
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Тесты пройдены:</span>
              <span className="stat-value">
                {progress.testsCompleted}/{progress.testsTotal} ({progress.testsProgress}%)
              </span>
            </div>
          </div>

          {/* Прогресс-бары */}
          <div className="progress-bars">
            <div className="progress-bar-container">
              <div className="progress-bar-label">Изучение материала</div>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${progress.chaptersProgress}%` }}
                />
              </div>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-label">Прохождение тестов</div>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${progress.testsProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Список глав */}
          <div className="progress-chapters">
            <h4 className="progress-section-title">Главы</h4>
            <ul className="progress-list">
              {chapters.map(chapter => {
                const status = getChapterStatus(chapter.id)
                const chapterProgress = getChapterProgress(chapter.id)
                const isActive = location.pathname === chapter.path
                
                return (
                  <li key={chapter.id} className={`progress-item ${status} ${isActive ? 'active' : ''}`}>
                    <Link to={chapter.path} className="progress-link">
                      <span className="progress-icon">
                        {status === 'completed' && '✓'}
                        {status === 'viewed' && '○'}
                        {status === 'not-viewed' && '○'}
                      </span>
                      <span className="progress-name">{chapter.name}</span>
                      {chapter.hasTest && chapterProgress.testCompleted && (
                        <span className="progress-score">
                          {chapterProgress.testScore}/{chapterProgress.testTotal}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Разделы */}
          <div className="progress-sections">
            <h4 className="progress-section-title">Разделы</h4>
            <ul className="progress-list">
              {sections.map(section => {
                const isActive = location.pathname === section.path
                return (
                  <li key={section.id} className={`progress-item ${isActive ? 'active' : ''}`}>
                    <Link to={section.path} className="progress-link">
                      <span className="progress-icon">○</span>
                      <span className="progress-name">{section.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          </div>
        </>
      )}
      {!isExpanded && (
        <button 
          className="progress-toggle-collapsed"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Развернуть прогресс"
          title="Развернуть"
        >
          ▶
        </button>
      )}
      </div>
    </>
  )
}

export default ProgressTracker

