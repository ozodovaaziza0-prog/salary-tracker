// Обёртка над localStorage для безопасной работы с JSON-данными

/**
 * Безопасное чтение значения из localStorage с парсингом JSON.
 * Возвращает null, если ключ не найден или данные повреждены.
 * @param {string} key - ключ в localStorage
 * @returns {any|null} распарсенное значение или null
 */
export const storageGet = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null || raw === undefined) return null;
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`[storage] Не удалось прочитать ключ "${key}":`, error);
    return null;
  }
};

/**
 * Безопасная запись значения в localStorage (сериализация в JSON).
 * @param {string} key - ключ в localStorage
 * @param {any} value - значение (будет сериализовано)
 */
export const storageSet = (key, value) => {
  try {
    const raw = JSON.stringify(value);
    localStorage.setItem(key, raw);
  } catch (error) {
    console.warn(`[storage] Не удалось записать ключ "${key}":`, error);
  }
};

/**
 * Удаление ключа из localStorage.
 * @param {string} key - ключ в localStorage
 */
export const storageRemove = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[storage] Не удалось удалить ключ "${key}":`, error);
  }
};

/**
 * Генерация уникального идентификатора (UUID v4).
 * Использует встроенный crypto.randomUUID(), если доступен,
 * иначе — fallback на случайную строку.
 * @returns {string} уникальный ID
 */
export const generateId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback для сред без crypto.randomUUID
  return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
};

/**
 * Получение массива по ключу. Если данных нет или они не массив — возвращает [].
 * @param {string} key - ключ в localStorage
 * @returns {Array} массив данных
 */
export const storageGetArray = (key) => {
  const data = storageGet(key);
  return Array.isArray(data) ? data : [];
};

/**
 * Сохранение массива по ключу.
 * @param {string} key - ключ в localStorage
 * @param {Array} data - массив данных
 */
export const storageSetArray = (key, data) => {
  storageSet(key, Array.isArray(data) ? data : []);
};