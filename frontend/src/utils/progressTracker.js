// Утилита для отслеживания прогресса изучения материала и прохождения тестов

const STORAGE_KEY = 'translationTheoryProgress'

// Структура прогресса:
// {
//   chapters: {
//     introduction: { viewed: true/false },
//     chapter1: { viewed: true/false, testCompleted: true/false, testScore: number },
//     chapter2: { viewed: true/false, testCompleted: true/false, testScore: number },
//     ...
//   },
//   exercises: { viewed: true/false },
//   coursework: { viewed: true/false }
// }

export function getProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {
      chapters: {},
      exercises: { viewed: false },
      coursework: { viewed: false }
    }
  } catch (e) {
    return {
      chapters: {},
      exercises: { viewed: false },
      coursework: { viewed: false }
    }
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (e) {
    console.error('Failed to save progress:', e)
  }
}

export function markChapterViewed(chapterId) {
  const progress = getProgress()
  if (!progress.chapters[chapterId]) {
    progress.chapters[chapterId] = {}
  }
  progress.chapters[chapterId].viewed = true
  saveProgress(progress)
}

export function markTestCompleted(chapterId, score, totalQuestions) {
  const progress = getProgress()
  if (!progress.chapters[chapterId]) {
    progress.chapters[chapterId] = {}
  }
  progress.chapters[chapterId].testCompleted = true
  progress.chapters[chapterId].testScore = score
  progress.chapters[chapterId].testTotal = totalQuestions
  saveProgress(progress)
}

export function markSectionViewed(sectionId) {
  const progress = getProgress()
  if (!progress[sectionId]) {
    progress[sectionId] = {}
  }
  progress[sectionId].viewed = true
  saveProgress(progress)
}

export function getChapterProgress(chapterId) {
  const progress = getProgress()
  return progress.chapters[chapterId] || { viewed: false, testCompleted: false }
}

export function getOverallProgress() {
  const progress = getProgress()
  const chapters = [
    'introduction',
    'chapter1',
    'chapter2',
    'chapter3',
    'chapter4',
    'chapter5'
  ]
  
  let viewedCount = 0
  let testCompletedCount = 0
  const totalChapters = chapters.length
  
  chapters.forEach(chapterId => {
    const chapterProgress = progress.chapters[chapterId] || {}
    if (chapterProgress.viewed) viewedCount++
    if (chapterProgress.testCompleted) testCompletedCount++
  })
  
  return {
    chaptersViewed: viewedCount,
    chaptersTotal: totalChapters,
    testsCompleted: testCompletedCount,
    testsTotal: totalChapters - 1, // introduction не имеет теста
    chaptersProgress: Math.round((viewedCount / totalChapters) * 100),
    testsProgress: Math.round((testCompletedCount / (totalChapters - 1)) * 100)
  }
}

