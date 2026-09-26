import { storageGetArray, storageSetArray, generateId } from './storage';
import { STORAGE_KEYS } from '../utils/constants';

/**
 * Получение всех доходов
 * @returns {Array} массив объектов доходов
 */
export const getIncomes = () => {
  return storageGetArray(STORAGE_KEYS.INCOMES);
};

/**
 * Получение дохода по ID
 * @param {string} id - идентификатор дохода
 * @returns {Object|null} объект дохода или null, если не найден
 */
export const getIncomeById = (id) => {
  if (!id) return null;
  const incomes = getIncomes();
  return incomes.find((income) => income.id === id) || null;
};

/**
 * Добавление нового дохода
 * @param {Object} incomeData - данные дохода (type, category, amount, date, comment)
 * @returns {Object} созданный объект дохода с добавленным id
 */
export const addIncome = (incomeData) => {
  const incomes = getIncomes();
  
  const newIncome = {
    id: generateId(),
    type: 'income',
    category: incomeData.category || 'other',
    amount: parseFloat(incomeData.amount) || 0,
    date: incomeData.date || new Date().toISOString(),
    comment: incomeData.comment || '',
    createdAt: new Date().toISOString(),
  };

  const updatedIncomes = [...incomes, newIncome];
  storageSetArray(STORAGE_KEYS.INCOMES, updatedIncomes);

  return newIncome;
};

/**
 * Обновление существующего дохода
 * @param {string} id - идентификатор дохода
 * @param {Object} updateData - данные для обновления
 * @returns {Object|null} обновлённый объект дохода или null, если не найден
 */
export const updateIncome = (id, updateData) => {
  if (!id) return null;
  
  const incomes = getIncomes();
  const index = incomes.findIndex((income) => income.id === id);
  
  if (index === -1) return null;

  const updatedIncome = {
    ...incomes[index],
    ...updateData,
    id, // ID нельзя изменить
    type: 'income', // Тип всегда income
    amount: updateData.amount ? parseFloat(updateData.amount) : incomes[index].amount,
    updatedAt: new Date().toISOString(),
  };

  const updatedIncomes = [...incomes];
  updatedIncomes[index] = updatedIncome;
  storageSetArray(STORAGE_KEYS.INCOMES, updatedIncomes);

  return updatedIncome;
};

/**
 * Удаление дохода
 * @param {string} id - идентификатор дохода
 * @returns {boolean} true, если удалён успешно, false, если не найден
 */
export const deleteIncome = (id) => {
  if (!id) return false;
  
  const incomes = getIncomes();
  const filteredIncomes = incomes.filter((income) => income.id !== id);
  
  if (filteredIncomes.length === incomes.length) {
    return false; // Ничего не удалилось
  }

  storageSetArray(STORAGE_KEYS.INCOMES, filteredIncomes);
  return true;
};