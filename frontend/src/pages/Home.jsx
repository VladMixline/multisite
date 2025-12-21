import { Link } from 'react-router-dom'
import './Home.css'

function Home({ chapters }) {
  return (
    <div className="home">
      <div className="container">
        <p className="subtitle">Учебное пособие</p>
        
        <nav className="tabs-nav">
          <Link to="/introduction" className="tab-link"><span>Введение</span></Link>
          <Link to="/chapter1" className="tab-link"><span>Теория формальных грамматик и языков</span></Link>
          <Link to="/chapter2" className="tab-link"><span>Теория трансляции</span></Link>
          <Link to="/chapter3" className="tab-link"><span>Организация таблиц символов</span></Link>
          <Link to="/chapter4" className="tab-link"><span>Оптимизация кода</span></Link>
          <Link to="/chapter5" className="tab-link"><span>Организация диалога в вычислительных системах</span></Link>
          <Link to="/exercises" className="tab-link"><span>Упражнения</span></Link>
          <Link to="/coursework" className="tab-link"><span>Курсовая работа</span></Link>
        </nav>
      </div>
    </div>
  )
}

export default Home


