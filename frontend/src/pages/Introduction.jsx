import { Link } from 'react-router-dom'
import './Introduction.css'

function Introduction({ introductionText }) {
  return (
    <div className="introduction">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Главная</Link> / Введение
        </nav>
        
        <h1>Введение</h1>
        
        <div className="introduction-content">
          {introductionText && introductionText.split('\n').map((line, index) => (
            line.trim() && <p key={index}>{line.trim()}</p>
          ))}
        </div>
        
        <div className="introduction-navigation">
          <Link to="/" className="btn">На главную</Link>
        </div>
      </div>
    </div>
  )
}

export default Introduction

