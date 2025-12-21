import './Header.css'

function Header({ onToggleProgress, isProgressVisible }) {
  return (
    <header className="header">
      <div className="container">
        <div className="logo-section">
          <img src="/images/logo.png" alt="Логотип" className="logo" />
          <h1 className="logo-title">Теория трансляции</h1>
        </div>
        <nav className="nav">
          <a href="#" className="nav-link">Главная</a>
          <button 
            className="progress-toggle-btn"
            onClick={onToggleProgress}
            title={isProgressVisible ? 'Скрыть прогресс' : 'Показать прогресс'}
            aria-label={isProgressVisible ? 'Скрыть прогресс' : 'Показать прогресс'}
          >
            {isProgressVisible ? '📊 Скрыть прогресс' : '📊 Показать прогресс'}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header






