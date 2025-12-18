import { useParams, Link } from 'react-router-dom'
import './Chapter.css'

function Chapter({ chapters }) {
  const { chapterNumber } = useParams()
  const chapter = chapters.find(ch => ch.number === chapterNumber)
  
  if (!chapter) {
    return (
      <div className="chapter">
        <div className="container">
          <p>Глава не найдена</p>
          <Link to="/">Вернуться на главную</Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="chapter">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Главная</Link> / {chapter.number}. {chapter.title}
        </nav>
        
        <h1>{chapter.number}. {chapter.title}</h1>
        
        {chapter.content && chapter.content.length > 0 && (
          <div className="chapter-content">
            {chapter.content.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}
        
        {chapter.sections && chapter.sections.map((section, index) => (
          <section key={index} className="chapter-section">
            <h2>{section.number}. {section.title}</h2>
            <div className="section-content">
              {section.content && section.content.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
            {section.questions && section.questions.length > 0 && (
              <div className="questions">
                <h3>Контрольные вопросы</h3>
                <ol>
                  {section.questions.map((question, qIdx) => (
                    <li key={qIdx}>{question}</li>
                  ))}
                </ol>
              </div>
            )}
          </section>
        ))}
        
        <div className="chapter-navigation">
          <Link to="/" className="btn">На главную</Link>
        </div>
      </div>
    </div>
  )
}

export default Chapter

