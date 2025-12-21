// Импортируем текст из файла (будет загружен через fetch)
let textData = '';

export async function loadTextData() {
  try {
    const response = await fetch('/source/posob.txt');
    textData = await response.text();
    return textData;
  } catch (error) {
    console.error('Ошибка загрузки текста:', error);
    // Если файл не найден, возвращаем заглушку
    return 'Файл не найден';
  }
}

export function getTextData() {
  return textData;
}






