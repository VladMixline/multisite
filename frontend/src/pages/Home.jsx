import { Link } from 'react-router-dom'
import './Home.css'

function Home({ chapters }) {
  return (
    <div className="home">
      <div className="container">
        <h1>Теория трансляции</h1>
        <p className="subtitle">Учебное пособие</p>
        
        <nav className="chapters-nav">
          <h2>Содержание</h2>
          <ul className="chapters-list">
            <li><Link to="/introduction">Введение</Link></li>
            {chapters.map((chapter) => (
              <li key={chapter.number}>
                <Link to={`/chapter/${chapter.number}`}>
                  {chapter.number}. {chapter.title}
                </Link>
              </li>
            ))}
            <li><Link to="/exercises">Упражнения</Link></li>
            <li><Link to="/variants">Варианты заданий</Link></li>
            <li><Link to="/coursework">Курсовая работа</Link></li>
            <li><Link to="/conclusion">Заключение</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Home

