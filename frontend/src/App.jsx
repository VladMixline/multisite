import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import ProgressTracker from './components/ProgressTracker'
import Home from './pages/Home'
import Introduction from './pages/Introduction'
import Chapter from './pages/Chapter'
import Chapter1 from './pages/Chapter1'
import Chapter2 from './pages/Chapter2'
import Chapter3 from './pages/Chapter3'
import Chapter4 from './pages/Chapter4'
import Chapter5 from './pages/Chapter5'
import Exercises from './pages/Exercises'
import Variants from './pages/Variants'
import Coursework from './pages/Coursework'
import Conclusion from './pages/Conclusion'
import { parseTextToChapters } from './data/parser'
import './App.css'

function App() {
  const [chapters, setChapters] = useState([])
  const [introductionText, setIntroductionText] = useState('')
  const [courseworkText, setCourseworkText] = useState('')
  const [conclusionText, setConclusionText] = useState('')
  const [loading, setLoading] = useState(true)
  const [isProgressVisible, setIsProgressVisible] = useState(true)
  
  useEffect(() => {
    async function loadData() {
      try {
        // Загружаем текст из файла
        const response = await fetch('/source/posob.txt')
        const text = await response.text()
        
        // Парсим текст
        const parsedChapters = parseTextToChapters(text)
        setChapters(parsedChapters)
        
        // Извлекаем введение, курсовую и заключение
        const introChapter = parsedChapters.find(ch => ch.number === '0')
        const courseworkChapter = parsedChapters.find(ch => ch.number === 'coursework')
        const conclusionChapter = parsedChapters.find(ch => ch.number === 'conclusion')
        
        if (introChapter) setIntroductionText(introChapter.fullText || introChapter.content.join('\n'))
        if (courseworkChapter) setCourseworkText(courseworkChapter.fullText || courseworkChapter.content.join('\n'))
        if (conclusionChapter) setConclusionText(conclusionChapter.fullText || conclusionChapter.content.join('\n'))
        
        setLoading(false)
      } catch (error) {
        console.error('Ошибка загрузки данных:', error)
        setLoading(false)
      }
    }
    
    loadData()
  }, [])
  
  if (loading) {
    return (
      <div className="App">
        <Header />
        <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Загрузка...</p>
        </div>
      </div>
    )
  }
  
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header 
          onToggleProgress={() => setIsProgressVisible(!isProgressVisible)}
          isProgressVisible={isProgressVisible}
        />
        <ProgressTracker isVisible={isProgressVisible} />
        <Routes>
          <Route path="/" element={<Home chapters={chapters.filter(ch => !['0', 'exercises', 'variants', 'coursework', 'conclusion'].includes(ch.number))} />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/chapter1" element={<Chapter1 />} />
          <Route path="/chapter2" element={<Chapter2 />} />
          <Route path="/chapter3" element={<Chapter3 />} />
          <Route path="/chapter4" element={<Chapter4 />} />
          <Route path="/chapter5" element={<Chapter5 />} />
          <Route path="/chapter/:chapterNumber" element={<Chapter chapters={chapters} />} />
          <Route path="/exercises" element={<Exercises chapters={chapters} />} />
          <Route path="/variants" element={<Variants chapters={chapters} />} />
          <Route path="/coursework" element={<Coursework courseworkText={courseworkText} />} />
          <Route path="/conclusion" element={<Conclusion conclusionText={conclusionText} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

