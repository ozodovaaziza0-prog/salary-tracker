import React, { useState, useCallback } from 'react';
import TransactionList from '../../components/TransactionList/TransactionList';
import Modal from '../../components/Modal/Modal';
import TransactionForm from '../../components/TransactionForm/TransactionForm';
import { getFilteredTransactions } from '../../services/summaryService';
import { addIncome, updateIncome, deleteIncome } from '../../services/incomeService';
import { addExpense, updateExpense, deleteExpense } from '../../services/expenseService';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';
import styles from './History.module.css';

function History() {
  // Состояния для фильтров
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Состояния для модалки
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Ключ обновления — меняем его после CRUD-операций, чтобы пересчитать данные
  const [refreshKey, setRefreshKey] = useState(0);

  // Получаем отфильтрованные транзакции
  const transactions = getFilteredTransactions({
    type: filterType,
    category: filterCategory,
    search: searchQuery,
  });

  // Подсчёт итоговых сумм по отфильтрованным данным
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  // Объединённый список категорий для фильтра
  const allCategories = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

  // Принудительный ре-рендер
  const refresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  // Открытие модалки для добавления новой операции
  const handleOpenAdd = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  // Открытие модалки для редактирования существующей операции
  const handleOpenEdit = (transaction) => {
    setEditData(transaction);
    setIsModalOpen(true);
  };

  // Закрытие модалки
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  // Обработка отправки формы (создание или обновление)
  const handleSubmit = (transactionData) => {
    if (editData) {
      // Режим редактирования
      if (editData.type === 'income') {
        updateIncome(editData.id, transactionData);
      } else {
        updateExpense(editData.id, transactionData);
      }
    } else {
      // Режим создания
      if (transactionData.type === 'income') {
        addIncome(transactionData);
      } else {
        addExpense(transactionData);
      }
    }

    handleCloseModal();
    refresh();
  };

  // Удаление операции
  const handleDelete = (id) => {
    // Находим операцию, чтобы определить её тип
    const transaction = transactions.find((t) => t.id === id);

    if (!transaction) return;

    const confirmed = window.confirm('Удалить эту операцию?');
    if (!confirmed) return;

    if (transaction.type === 'income') {
      deleteIncome(id);
    } else {
      deleteExpense(id);
    }

    refresh();
  };

  return (
    <div className={styles.history}>
      <div className={styles.header}>
        <h1 className={styles.title}>История операций</h1>
        <button
          className={styles.addButton}
          onClick={handleOpenAdd}
          type="button"
        >
          <span>+</span>
          <span>Добавить</span>
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Тип</label>
          <select
            className={styles.filterSelect}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">Все</option>
            <option value="income">Доходы</option>
            <option value="expense">Расходы</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Категория</label>
          <select
            className={styles.filterSelect}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">Все категории</option>
            {allCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Поиск</label>
          <input
            type="text"
            className={styles.filterInput}
            placeholder="Поиск по комментарию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.list}>
        <TransactionList
          transactions={transactions}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryIncome}>
          Доходы: {formatCurrency(totalIncome)}
        </div>
        <div className={styles.summaryExpense}>
          Расходы: {formatCurrency(totalExpense)}
        </div>
      </div>

      {/* Модальное окно с формой */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editData ? 'Редактировать операцию' : 'Новая операция'}
      >
        <TransactionForm
          editData={editData}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

export default History;