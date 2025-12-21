import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo-section">
          <img src="/images/logo.png" alt="Логотип" className="logo" />
          <h1 className="logo-title">Теория трансляции</h1>
        </div>
        <nav className="nav">
          <a href="#" className="nav-link">Главная</a>
        </nav>
      </div>
    </header>
  )
}

export default Header






