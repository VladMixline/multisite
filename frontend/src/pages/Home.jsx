import { Link } from 'react-router-dom'
import './Home.css'

function Home({ chapters }) {
  return (
    <div className="home">
      <div className="container">
        <p className="subtitle">Учебное пособие</p>
        
        <nav className="tabs-nav">
          <Link to="/introduction" className="tab-link">Введение</Link>
          <Link to="/chapter1" className="tab-link">ТЕОРИЯ ФОРМАЛЬНЫХ ГРАММАТИК И ЯЗЫКОВ</Link>
          <Link to="/chapter2" className="tab-link">ТЕОРИЯ ТРАНСЛЯЦИИ</Link>
          <Link to="/chapter3" className="tab-link">ОРГАНИЗАЦИЯ ТАБЛИЦ СИМВОЛОВ</Link>
          <Link to="/chapter4" className="tab-link">ОПТИМИЗАЦИЯ КОДА</Link>
          <Link to="/chapter5" className="tab-link">ОРГАНИЗАЦИЯ ДИАЛОГА В ВЫЧИСЛИТЕЛЬНЫХ СИСТЕМАХ</Link>
          <Link to="/exercises" className="tab-link">УПРАЖНЕНИЯ</Link>
          <Link to="/coursework" className="tab-link">КУРСОВАЯ РАБОТА</Link>
        </nav>
      </div>
    </div>
  )
}

export default Home


