import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Introduction.css'

function Introduction() {
  const [isTestOpen, setIsTestOpen] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const audioRef = useRef(null)

  const introductionText = `В состав любой вычислительной системы может входить комплекс программ, которые называются трансляторами. Транслятор обеспечивает автоматический перевод программ с алгоритмического языка в машинные коды.
По функциональному назначению трансляторы делятся на компиляторы (перевод программ на языке высокого уровня в машинные коды без выполнения), интерпретаторы (перевод каждой конструкции алгоритмического языка в машинные коды с одновременным выполнением) и ассемблеры (перевод программы с языка низкого уровня в машинные коды).
Более подробно остановимся на компиляторах. Компилятор – это не что иное, как программа, написанная на некотором языке, для которой входной информацией служит исходная программа, а результатом является эквивалентная ей объектная программа. Раньше компиляторы писались на автокоде. Часто это был единственно доступный язык. Однако сейчас существует тенденция писать компиляторы на языках высокого уровня, поскольку при этом уменьшается время, затрачиваемое на программирование и отладку, а также обеспечивается удобочитаемость компилятора, когда работа над ним завершена.
Компиляторам присущ ряд общих черт, что упрощает процесс создания компилирующих программ. Наша цель состоит в том, чтобы описать известные уже модельные представления структуры компиляторов и показать, как с их помощью создаётся работоспособная компилирующая программа.
Компилятор должен выполнить анализ исходной программы и синтез объектного кода. В соответствии с этим любой компилятор включает три основные части: лексический анализатор, синтаксический анализатор и генератор кода.
Взаимодействие между компонентами компилятора может осуществляться разнообразными способами.
В настоящей работе рассматриваются основные подходы к созданию транслирующих программ.
Приведённые подходы будут полезны для бакалавров 2-го курса специальности 230100 "Информатика и вычислительная техника" при выполнении лабораторных и курсовой работы по дисциплине "Лингвистические средства вычислительных систем" и магистрантов 5-го года обучения специальности 230100 "Информатика и вычислительная техника" при выполнении лабораторных работ по дисциплине «Теория языков программирования и методы трансляции».`

  const testQuestions = [
    {
      id: 1,
      question: "Что такое синтаксис языка?",
      options: {
        a: "Набор команд машинного кода",
        b: "Правила записи правильных предложений языка",
        в: "Значение операторов и выражений",
        г: "Способ выполнения программы"
      },
      correct: "б"
    },
    {
      id: 2,
      question: "Что из перечисленного описывает грамматика языка?",
      options: {
        a: "Семантику операторов",
        b: "Алгоритмы выполнения программы",
        в: "Синтаксис языка",
        г: "Оптимизацию кода"
      },
      correct: "в"
    },
    {
      id: 3,
      question: "Как формально определяется грамматика языка?",
      options: {
        a: "Как тройка (A, B, C)",
        b: "Как множество символов алфавита",
        в: "Как четвёрка (N, T, P, S)",
        г: "Как набор машинных инструкций"
      },
      correct: "в"
    },
    {
      id: 4,
      question: "Какая грамматика используется для описания большинства языков программирования?",
      options: {
        a: "Регулярная",
        b: "Контекстно-зависимая",
        в: "Грамматика без ограничений",
        г: "Контекстно-свободная"
      },
      correct: "г"
    },
    {
      id: 5,
      question: "Для чего используются синтаксические деревья?",
      options: {
        a: "Для хранения машинного кода",
        b: "Для представления структуры предложения языка",
        в: "Для выполнения программы",
        г: "Для оптимизации памяти"
      },
      correct: "б"
    }
  ]

  const handleMusicToggle = () => {
    if (!audioRef.current) {
      // Создаём простой аудио элемент с тихой мелодией (можно использовать data URI или внешний файл)
      audioRef.current = new Audio()
      // Используем простой способ - можно добавить реальный аудио файл позже
      // Для демонстрации создадим тихую синусоиду через Web Audio API
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.value = 440
        oscillator.type = 'sine'
        gainNode.gain.value = 0.1
        
        oscillator.start()
        audioRef.current.oscillator = oscillator
        audioRef.current.audioContext = audioContext
        audioRef.current.gainNode = gainNode
        setIsMusicPlaying(true)
      } catch (e) {
        console.log('Audio not supported')
      }
    } else {
      if (isMusicPlaying) {
        if (audioRef.current.oscillator) {
          audioRef.current.oscillator.stop()
          audioRef.current.audioContext.close()
        }
        setIsMusicPlaying(false)
      } else {
        try {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)()
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()
          
          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)
          
          oscillator.frequency.value = 440
          oscillator.type = 'sine'
          gainNode.gain.value = 0.1
          
          oscillator.start()
          audioRef.current.oscillator = oscillator
          audioRef.current.audioContext = audioContext
          audioRef.current.gainNode = gainNode
          setIsMusicPlaying(true)
        } catch (e) {
          console.log('Audio not supported')
        }
      }
    }
  }

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer
    })
  }

  const handleSubmitTest = () => {
    setShowResults(true)
  }

  const handleCloseTest = () => {
    setIsTestOpen(false)
    setShowResults(false)
    setSelectedAnswers({})
    if (audioRef.current && audioRef.current.oscillator) {
      audioRef.current.oscillator.stop()
      audioRef.current.audioContext.close()
      setIsMusicPlaying(false)
    }
  }

  const getScore = () => {
    let correct = 0
    testQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        correct++
      }
    })
    return correct
  }

  useEffect(() => {
    return () => {
      if (audioRef.current && audioRef.current.oscillator) {
        audioRef.current.oscillator.stop()
        if (audioRef.current.audioContext) {
          audioRef.current.audioContext.close()
        }
      }
    }
  }, [])

  return (
    <div className="introduction">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Главная</Link> / Введение
        </nav>
        
        <h1>Введение</h1>
        
        <div className="introduction-content">
          {introductionText.split('\n').map((line, index) => (
            line.trim() && <p key={index}>{line.trim()}</p>
          ))}
        </div>
        
        <div className="introduction-navigation">
          <button className="btn test-btn" onClick={() => setIsTestOpen(true)}>
            Пройти тест
          </button>
          <Link to="/" className="btn">На главную</Link>
        </div>
      </div>

      {isTestOpen && (
        <div className="test-modal-overlay" onClick={handleCloseTest}>
          <div className="test-modal" onClick={(e) => e.stopPropagation()}>
            <div className="test-modal-header">
              <h2>Тест по теме "Введение"</h2>
              <button className="close-btn" onClick={handleCloseTest}>×</button>
            </div>
            
            <div className="test-music-control">
              <button 
                className={`music-btn ${isMusicPlaying ? 'playing' : ''}`}
                onClick={handleMusicToggle}
              >
                {isMusicPlaying ? '🔊 Музыка включена' : '🔇 Музыка выключена'}
              </button>
            </div>

            <div className="test-content">
              {testQuestions.map((q) => (
                <div key={q.id} className="test-question">
                  <h3>{q.id}. {q.question}</h3>
                  <div className="test-options">
                    {Object.entries(q.options).map(([key, value]) => {
                      const isSelected = selectedAnswers[q.id] === key
                      const isCorrect = q.correct === key
                      const showAnswer = showResults
                      return (
                        <label 
                          key={key} 
                          className={`test-option ${isSelected ? 'selected' : ''} ${showAnswer && isCorrect ? 'correct' : ''} ${showAnswer && isSelected && !isCorrect ? 'incorrect' : ''}`}
                        >
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value={key}
                            checked={isSelected}
                            onChange={() => handleAnswerSelect(q.id, key)}
                            disabled={showResults}
                          />
                          <span>{key}) {value}</span>
                          {showAnswer && isCorrect && <span className="correct-mark">✓ Правильный ответ</span>}
                        </label>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="test-footer">
              {!showResults ? (
                <button 
                  className="btn submit-btn" 
                  onClick={handleSubmitTest}
                  disabled={Object.keys(selectedAnswers).length !== testQuestions.length}
                >
                  Завершить тест
                </button>
              ) : (
                <div className="test-results">
                  <h3>Результаты теста</h3>
                  <p className="test-score">
                    Правильных ответов: {getScore()} из {testQuestions.length}
                  </p>
                  <p className="test-percentage">
                    {Math.round((getScore() / testQuestions.length) * 100)}%
                  </p>
                  <button className="btn" onClick={handleCloseTest}>
                    Закрыть
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Introduction


