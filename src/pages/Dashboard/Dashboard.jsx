import React, { useState, useEffect, useCallback } from 'react';
import BalanceCard from '../../components/BalanceCard/BalanceCard';
import TransactionList from '../../components/TransactionList/TransactionList';
import Modal from '../../components/Modal/Modal';
import TransactionForm from '../../components/TransactionForm/TransactionForm';
import { getTotalIncome, getTotalExpense, getTotalBalance, getRecentTransactions } from '../../services/summaryService';
import { addIncome, updateIncome, deleteIncome } from '../../services/incomeService';
import { addExpense, updateExpense, deleteExpense } from '../../services/expenseService';
import styles from './Dashboard.module.css';

function Dashboard() {
  // Состояния для модалки
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Ключ обновления — меняем его после CRUD-операций, чтобы пересчитать данные
  const [refreshKey, setRefreshKey] = useState(0);

  // Пересчитываем данные при каждом изменении refreshKey
  const totalIncome = getTotalIncome();
  const totalExpense = getTotalExpense();
  const balance = getTotalBalance();
  const recentTransactions = getRecentTransactions(5);

  // Принудительный ре-рендер (на случай, если сервисы не вызвали перерисовку)
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
    const allTransactions = getRecentTransactions(100);
    const transaction = allTransactions.find((t) => t.id === id);

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
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>Главная</h1>
        <button
          className={styles.addButton}
          title="Добавить операцию"
          onClick={handleOpenAdd}
          type="button"
        >
          +
        </button>
      </div>

      <div className={styles.balanceGrid}>
        <BalanceCard
          title="Доходы"
          amount={totalIncome}
          color="income"
        />
        <BalanceCard
          title="Расходы"
          amount={totalExpense}
          color="expense"
        />
        <BalanceCard
          title="Баланс"
          amount={balance}
          color="balance"
        />
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Последние операции</h2>
        <TransactionList
          transactions={recentTransactions}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
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

export default Dashboard;