import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Logo</h1>
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


