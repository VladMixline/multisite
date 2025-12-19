import { Link } from 'react-router-dom'
import './Conclusion.css'

function Conclusion({ conclusionText }) {
  return (
    <div className="conclusion">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Главная</Link> / Заключение
        </nav>
        
        <h1>Заключение</h1>
        
        <div className="conclusion-content">
          {conclusionText && conclusionText.split('\n').map((line, index) => (
            line.trim() && <p key={index}>{line.trim()}</p>
          ))}
        </div>
        
        <div className="conclusion-navigation">
          <Link to="/" className="btn">На главную</Link>
        </div>
      </div>
    </div>
  )
}

export default Conclusion


