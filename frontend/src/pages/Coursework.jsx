import { Link } from 'react-router-dom'
import './Coursework.css'

function Coursework({ courseworkText }) {
  return (
    <div className="coursework">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Главная</Link> / Курсовая работа
        </nav>
        
        <h1>Курсовая работа</h1>
        
        <div className="coursework-content">
          {courseworkText && courseworkText.split('\n').map((line, index) => (
            line.trim() && <p key={index}>{line.trim()}</p>
          ))}
        </div>
        
        <div className="coursework-navigation">
          <Link to="/" className="btn">На главную</Link>
        </div>
      </div>
    </div>
  )
}

export default Coursework

