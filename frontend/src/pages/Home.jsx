import { Link } from 'react-router-dom'
import './Home.css'

function Home({ chapters }) {
  return (
    <div className="home">
      <div className="container">
        <h1>Теория трансляции</h1>
        <p className="subtitle">Учебное пособие</p>
        
        <nav className="tabs-nav">
          <Link to="/introduction" className="tab-link">Введение</Link>
        </nav>
      </div>
    </div>
  )
}

export default Home


