import { useEffect, useRef } from 'react'
import './Header.css'

function Header() {
  const headerRef = useRef(null)

  useEffect(() => {
    const setHeaderHeightVar = () => {
      const h = headerRef.current?.offsetHeight
      if (h) {
        document.documentElement.style.setProperty('--site-header-height', `${h}px`)
      }
    }

    setHeaderHeightVar()
    window.addEventListener('resize', setHeaderHeightVar)
    return () => window.removeEventListener('resize', setHeaderHeightVar)
  }, [])

  return (
    <header ref={headerRef} className="header">
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






