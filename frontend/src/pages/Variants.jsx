import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Variants.css'

function Variants({ chapters }) {
  const variantsChapter = chapters.find(ch => ch.number === 'variants')
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [userSolutions, setUserSolutions] = useState({})
  
  if (!variantsChapter || !variantsChapter.variants) {
    return (
      <div className="variants">
        <div className="container">
          <p>Варианты заданий не найдены</p>
          <Link to="/">Вернуться на главную</Link>
        </div>
      </div>
    )
  }
  
  const handleVariantClick = (variantId) => {
    setSelectedVariant(selectedVariant === variantId ? null : variantId)
  }
  
  const handleSolutionChange = (variantId, solution) => {
    setUserSolutions({
      ...userSolutions,
      [variantId]: solution
    })
  }
  
  return (
    <div className="variants">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Главная</Link> / Варианты заданий
        </nav>
        
        <h1>Варианты заданий</h1>
        
        <div className="variants-list">
          {variantsChapter.variants.map((variant) => (
            <div key={variant.id} className="variant-item">
              <div 
                className="variant-header"
                onClick={() => handleVariantClick(variant.id)}
              >
                <span className="variant-number">Вариант {variant.id}</span>
                <span className="toggle-icon">
                  {selectedVariant === variant.id ? '▼' : '▶'}
                </span>
              </div>
              
              {selectedVariant === variant.id && (
                <div className="variant-content">
                  <div className="variant-text">
                    <pre>{variant.text}</pre>
                  </div>
                  
                  <div className="variant-input">
                    <label>Ваше решение:</label>
                    <textarea
                      value={userSolutions[variant.id] || ''}
                      onChange={(e) => handleSolutionChange(variant.id, e.target.value)}
                      placeholder="Введите ваше решение здесь..."
                      rows="10"
                    />
                  </div>
                  
                  <div className="variant-actions">
                    <button className="btn-save">Сохранить решение</button>
                    <button className="btn-clear" onClick={() => handleSolutionChange(variant.id, '')}>
                      Очистить
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="variants-navigation">
          <Link to="/" className="btn">На главную</Link>
        </div>
      </div>
    </div>
  )
}

export default Variants







