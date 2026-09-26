import { storageGetArray, storageSetArray, generateId } from './storage';
import { STORAGE_KEYS } from '../utils/constants';

/**
 * Получение всех расходов
 * @returns {Array} массив объектов расходов
 */
export const getExpenses = () => {
  return storageGetArray(STORAGE_KEYS.EXPENSES);
};

/**
 * Получение расхода по ID
 * @param {string} id - идентификатор расхода
 * @returns {Object|null} объект расхода или null, если не найден
 */
export const getExpenseById = (id) => {
  if (!id) return null;
  const expenses = getExpenses();
  return expenses.find((expense) => expense.id === id) || null;
};

/**
 * Добавление нового расхода
 * @param {Object} expenseData - данные расхода (type, category, amount, date, comment)
 * @returns {Object} созданный объект расхода с добавленным id
 */
export const addExpense = (expenseData) => {
  const expenses = getExpenses();

  const newExpense = {
    id: generateId(),
    type: 'expense',
    category: expenseData.category || 'other',
    amount: parseFloat(expenseData.amount) || 0,
    date: expenseData.date || new Date().toISOString(),
    comment: expenseData.comment || '',
    createdAt: new Date().toISOString(),
  };

  const updatedExpenses = [...expenses, newExpense];
  storageSetArray(STORAGE_KEYS.EXPENSES, updatedExpenses);

  return newExpense;
};

/**
 * Обновление существующего расхода
 * @param {string} id - идентификатор расхода
 * @param {Object} updateData - данные для обновления
 * @returns {Object|null} обновлённый объект расхода или null, если не найден
 */
export const updateExpense = (id, updateData) => {
  if (!id) return null;

  const expenses = getExpenses();
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) return null;

  const updatedExpense = {
    ...expenses[index],
    ...updateData,
    id, // ID нельзя изменить
    type: 'expense', // Тип всегда expense
    amount: updateData.amount ? parseFloat(updateData.amount) : expenses[index].amount,
    updatedAt: new Date().toISOString(),
  };

  const updatedExpenses = [...expenses];
  updatedExpenses[index] = updatedExpense;
  storageSetArray(STORAGE_KEYS.EXPENSES, updatedExpenses);

  return updatedExpense;
};

/**
 * Удаление расхода
 * @param {string} id - идентификатор расхода
 * @returns {boolean} true, если удалён успешно, false, если не найден
 */
export const deleteExpense = (id) => {
  if (!id) return false;

  const expenses = getExpenses();
  const filteredExpenses = expenses.filter((expense) => expense.id !== id);

  if (filteredExpenses.length === expenses.length) {
    return false; // Ничего не удалилось
  }

  storageSetArray(STORAGE_KEYS.EXPENSES, filteredExpenses);
  return true;
};