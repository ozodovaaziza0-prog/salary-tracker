import { getIncomes } from './incomeService';
import { getExpenses } from './expenseService';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../utils/constants';
import { formatMonthShort, getMonthKey } from '../utils/formatters';

/**
 * Получение общей суммы всех доходов
 * @returns {number} сумма доходов
 */
export const getTotalIncome = () => {
  const incomes = getIncomes();
  return incomes.reduce((sum, item) => sum + (item.amount || 0), 0);
};

/**
 * Получение общей суммы всех расходов
 * @returns {number} сумма расходов
 */
export const getTotalExpense = () => {
  const expenses = getExpenses();
  return expenses.reduce((sum, item) => sum + (item.amount || 0), 0);
};

/**
 * Получение общего баланса (доходы минус расходы)
 * @returns {number} баланс
 */
export const getTotalBalance = () => {
  return getTotalIncome() - getTotalExpense();
};

/**
 * Получение расходов, сгруппированных по категориям (для круговой диаграммы)
 * @returns {Array} массив объектов { name, value }
 */
export const getExpenseByCategory = () => {
  const expenses = getExpenses();
  const categoryMap = {};

  expenses.forEach((expense) => {
    const cat = expense.category || 'other';
    categoryMap[cat] = (categoryMap[cat] || 0) + (expense.amount || 0);
  });

  return Object.entries(categoryMap).map(([categoryId, value]) => {
    const categoryInfo = EXPENSE_CATEGORIES.find((c) => c.id === categoryId);
    return {
      name: categoryInfo?.label || categoryId,
      value,
    };
  });
};

/**
 * Получение доходов, сгруппированных по категориям (для круговой диаграммы)
 * @returns {Array} массив объектов { name, value }
 */
export const getIncomeByCategory = () => {
  const incomes = getIncomes();
  const categoryMap = {};

  incomes.forEach((income) => {
    const cat = income.category || 'other';
    categoryMap[cat] = (categoryMap[cat] || 0) + (income.amount || 0);
  });

  return Object.entries(categoryMap).map(([categoryId, value]) => {
    const categoryInfo = INCOME_CATEGORIES.find((c) => c.id === categoryId);
    return {
      name: categoryInfo?.label || categoryId,
      value,
    };
  });
};

/**
 * Получение помесячной статистики доходов и расходов (для столбчатого графика)
 * @returns {Array} массив объектов { month, income, expense }, отсортированный по дате
 */
export const getMonthlyStats = () => {
  const incomes = getIncomes();
  const expenses = getExpenses();
  const monthMap = {};

  // Собираем доходы по месяцам
  incomes.forEach((income) => {
    const key = getMonthKey(income.date);
    if (!key) return;
    if (!monthMap[key]) monthMap[key] = { income: 0, expense: 0 };
    monthMap[key].income += income.amount || 0;
  });

  // Собираем расходы по месяцам
  expenses.forEach((expense) => {
    const key = getMonthKey(expense.date);
    if (!key) return;
    if (!monthMap[key]) monthMap[key] = { income: 0, expense: 0 };
    monthMap[key].expense += expense.amount || 0;
  });

  // Преобразуем в массив и сортируем по ключу месяца
  return Object.entries(monthMap)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, data]) => ({
      month: formatMonthShort(key + '-01'),
      income: data.income,
      expense: data.expense,
    }));
};

/**
 * Получение последних N операций (объединяет доходы и расходы, сортирует по дате)
 * @param {number} limit - максимальное количество операций (по умолчанию 5)
 * @returns {Array} массив объектов транзакций, отсортированных по дате (новые первыми)
 */
export const getRecentTransactions = (limit = 5) => {
  const incomes = getIncomes().map((item) => ({
    ...item,
    categoryLabel:
      INCOME_CATEGORIES.find((c) => c.id === item.category)?.label || item.category,
  }));

  const expenses = getExpenses().map((item) => ({
    ...item,
    categoryLabel:
      EXPENSE_CATEGORIES.find((c) => c.id === item.category)?.label || item.category,
  }));

  // Объединяем и сортируем по дате (новые первыми)
  const all = [...incomes, ...expenses].sort((a, b) => {
    const dateA = new Date(a.date || 0).getTime();
    const dateB = new Date(b.date || 0).getTime();
    return dateB - dateA;
  });

  return all.slice(0, limit);
};

/**
 * Получение всех операций с применёнными фильтрами
 * @param {Object} filters - объект фильтров
 * @param {string} filters.type - 'all' | 'income' | 'expense'
 * @param {string} filters.category - ID категории или 'all'
 * @param {string} filters.search - поисковый запрос по комментарию
 * @returns {Array} отфильтрованный массив транзакций
 */
export const getFilteredTransactions = (filters = {}) => {
  const { type = 'all', category = 'all', search = '' } = filters;

  let incomes = [];
  let expenses = [];

  if (type === 'all' || type === 'income') {
    incomes = getIncomes().map((item) => ({
      ...item,
      categoryLabel:
        INCOME_CATEGORIES.find((c) => c.id === item.category)?.label || item.category,
    }));
  }

  if (type === 'all' || type === 'expense') {
    expenses = getExpenses().map((item) => ({
      ...item,
      categoryLabel:
        EXPENSE_CATEGORIES.find((c) => c.id === item.category)?.label || item.category,
    }));
  }

  let all = [...incomes, ...expenses];

  // Фильтр по категории
  if (category && category !== 'all') {
    all = all.filter((item) => item.category === category);
  }

  // Фильтр по поисковому запросу
  if (search && search.trim()) {
    const query = search.trim().toLowerCase();
    all = all.filter(
      (item) =>
        (item.comment || '').toLowerCase().includes(query) ||
        (item.categoryLabel || '').toLowerCase().includes(query)
    );
  }

  // Сортировка по дате (новые первыми)
  all.sort((a, b) => {
    const dateA = new Date(a.date || 0).getTime();
    const dateB = new Date(b.date || 0).getTime();
    return dateB - dateA;
  });

  return all;
};