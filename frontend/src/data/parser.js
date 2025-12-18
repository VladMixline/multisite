// Упрощенный парсер для разбора текста на главы
export function parseTextToChapters(fullText) {
  const chapters = []
  const lines = fullText.split('\n')
  
  let currentChapter = null
  let currentSection = null
  let currentContent = []
  let i = 0
  
  // Пропускаем титульную часть до ВВЕДЕНИЕ
  while (i < lines.length && !lines[i].includes('ВВЕДЕНИЕ')) {
    i++
  }
  
  // ВВЕДЕНИЕ
  if (i < lines.length) {
    currentChapter = {
      number: '0',
      title: 'ВВЕДЕНИЕ',
      sections: [],
      content: [],
      fullText: ''
    }
    i++
    
    while (i < lines.length && !lines[i].match(/^\d+\.\s+[А-ЯЁ]/)) {
      if (lines[i].trim()) {
        currentChapter.content.push(lines[i].trim())
        currentChapter.fullText += lines[i].trim() + '\n'
      }
      i++
    }
  }
  
  // Основные главы (1-5)
  while (i < lines.length) {
    const line = lines[i].trim()
    
    // Определяем начало главы
    const chapterMatch = line.match(/^(\d+)\.\s+(.+)$/)
    if (chapterMatch) {
      // Сохраняем предыдущую главу
      if (currentChapter && currentSection) {
        currentChapter.sections.push(currentSection)
      }
      if (currentChapter) {
        chapters.push(currentChapter)
      }
      
      currentChapter = {
        number: chapterMatch[1],
        title: chapterMatch[2].trim(),
        sections: [],
        content: []
      }
      currentSection = null
      i++
      continue
    }
    
    // Определяем подразделы
    const sectionMatch = line.match(/^(\d+)\.(\d+)\.\s+(.+)$/)
    if (sectionMatch && currentChapter) {
      if (currentSection) {
        currentChapter.sections.push(currentSection)
      }
      
      currentSection = {
        number: `${sectionMatch[1]}.${sectionMatch[2]}`,
        title: sectionMatch[3].trim(),
        content: [],
        questions: []
      }
      i++
      continue
    }
    
    // Контрольные вопросы
    if (line.includes('Контрольные вопросы') && currentSection) {
      i++
      const questions = []
      while (i < lines.length && lines[i].trim() && !lines[i].match(/^\d+\.\s+/) && !lines[i].match(/^\d+\.\d+\.\s+/)) {
        const qLine = lines[i].trim()
        const qMatch = qLine.match(/^\d+\.\s+(.+)$/)
        if (qMatch) {
          questions.push(qMatch[1])
        }
        i++
      }
      currentSection.questions = questions
      continue
    }
    
    // УПРАЖНЕНИЯ
    if (line === 'УПРАЖНЕНИЯ') {
      if (currentChapter) {
        if (currentSection) {
          currentChapter.sections.push(currentSection)
        }
        chapters.push(currentChapter)
      }
      
      currentChapter = {
        number: 'exercises',
        title: 'УПРАЖНЕНИЯ',
        sections: [],
        content: [],
        exercises: []
      }
      
      // Парсим упражнения
      i++
      const exercises = []
      let exerciseNum = 1
      
      while (i < lines.length && !lines[i].includes('КУРСОВАЯ РАБОТА')) {
        const exLine = lines[i].trim()
        if (exLine.match(/^\d+\.\s+/) && !exLine.includes('Записать') && !exLine.includes('Привести')) {
          exercises.push({
            id: exerciseNum++,
            text: exLine
          })
        }
        i++
      }
      
      currentChapter.exercises = exercises
      chapters.push(currentChapter)
      continue
    }
    
    // ВАРИАНТЫ ЗАДАНИЙ
    if (line.includes('ВАРИАНТЫ ЗАДАНИЙ')) {
      currentChapter = {
        number: 'variants',
        title: 'ВАРИАНТЫ ЗАДАНИЙ',
        sections: [],
        content: [],
        variants: []
      }
      
      i++
      const variants = []
      let variantNum = 1
      
      while (i < lines.length && !lines[i].includes('ЗАКЛЮЧЕНИЕ')) {
        const varLine = lines[i].trim()
        if (varLine.match(/^\d+\.\s+/) && !varLine.includes('Приведённый')) {
          // Собираем весь текст варианта
          let variantText = varLine
          i++
          while (i < lines.length && lines[i].trim() && !lines[i].match(/^\d+\.\s+/) && !lines[i].includes('ЗАКЛЮЧЕНИЕ')) {
            variantText += '\n' + lines[i].trim()
            i++
          }
          
          variants.push({
            id: variantNum++,
            text: variantText
          })
          continue
        }
        i++
      }
      
      currentChapter.variants = variants
      chapters.push(currentChapter)
      continue
    }
    
    // КУРСОВАЯ РАБОТА
    if (line.includes('КУРСОВАЯ РАБОТА')) {
      currentChapter = {
        number: 'coursework',
        title: 'КУРСОВАЯ РАБОТА',
        sections: [],
        content: [],
        fullText: ''
      }
      
      i++
      while (i < lines.length && !lines[i].includes('ЗАКЛЮЧЕНИЕ')) {
        if (lines[i].trim()) {
          currentChapter.content.push(lines[i].trim())
          currentChapter.fullText += lines[i].trim() + '\n'
        }
        i++
      }
      
      chapters.push(currentChapter)
      continue
    }
    
    // ЗАКЛЮЧЕНИЕ
    if (line === 'ЗАКЛЮЧЕНИЕ') {
      currentChapter = {
        number: 'conclusion',
        title: 'ЗАКЛЮЧЕНИЕ',
        sections: [],
        content: [],
        fullText: ''
      }
      
      i++
      while (i < lines.length && !lines[i].includes('СПИСОК ЛИТЕРАТУРЫ')) {
        if (lines[i].trim()) {
          currentChapter.content.push(lines[i].trim())
          currentChapter.fullText += lines[i].trim() + '\n'
        }
        i++
      }
      
      chapters.push(currentChapter)
      break
    }
    
    // Добавляем контент
    if (line && currentSection) {
      currentSection.content.push(line)
    } else if (line && currentChapter && !currentSection) {
      currentChapter.content.push(line)
    }
    
    i++
  }
  
  // Сохраняем последнюю главу
  if (currentSection && currentChapter) {
    currentChapter.sections.push(currentSection)
  }
  if (currentChapter && !chapters.find(ch => ch.number === currentChapter.number)) {
    chapters.push(currentChapter)
  }
  
  return chapters
}
