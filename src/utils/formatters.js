// Утилиты форматирования даты и валюты

/**
 * Форматирование суммы в рубли с разделителями тысяч
 * @param {number} amount - сумма
 * @returns {string} отформатированная строка, например "1 234 ₽"
 */
export const formatCurrency = (amount) => {
  const value = amount ?? 0;
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Форматирование даты в короткий формат (дд.мм.гггг)
 * @param {string|Date} date - дата в виде строки ISO или объекта Date
 * @returns {string} отформатированная дата, например "23.09.2026"
 */
export const formatDate = (date) => {
  if (!date) return '—';
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Форматирование даты в длинный формат (23 сентября 2026)
 * @param {string|Date} date - дата
 * @returns {string} отформатированная дата
 */
export const formatDateLong = (date) => {
  if (!date) return '—';
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Получение названия месяца и года (сентябрь 2026)
 * @param {string|Date} date - дата
 * @returns {string} название месяца и год
 */
export const formatMonthYear = (date) => {
  if (!date) return '—';
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('ru-RU', {
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Получение короткого названия месяца (янв, фев, мар)
 * @param {string|Date} date - дата
 * @returns {string} короткое название месяца
 */
export const formatMonthShort = (date) => {
  if (!date) return '—';
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('ru-RU', {
    month: 'short',
  });
};

/**
 * Преобразование даты в строку формата YYYY-MM-DD (для input type="date")
 * @param {string|Date} date - дата
 * @returns {string} строка в формате YYYY-MM-DD
 */
export const toInputDate = (date) => {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return '';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Получение ключа месяца в формате YYYY-MM (для группировки по месяцам)
 * @param {string|Date} date - дата
 * @returns {string} ключ месяца, например "2026-09"
 */
export const getMonthKey = (date) => {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return '';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};