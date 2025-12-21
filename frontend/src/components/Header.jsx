import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo" aria-label="Логотип">
          <img src="/images/logo.png" alt="Логотип" className="logo-img" />
        </div>
        <nav className="nav">
          <a href="#" className="nav-link">Главная</a>
          <a href="#" className="nav-link">О нас</a>
          <a href="#" className="nav-link">Контакты</a>
        </nav>
      </div>
    </header>
  )
}

export default Header






