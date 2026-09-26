import React from 'react';
import EmptyState from '../EmptyState/EmptyState';
import styles from './TransactionList.module.css';

function TransactionList({ transactions = [], onEdit, onDelete }) {
  // Если транзакций нет — показываем заглушку
  if (!transactions || transactions.length === 0) {
    return (
      <EmptyState
        icon="📭"
        title="Нет операций"
        description="Добавьте первую операцию, чтобы начать отслеживание"
      />
    );
  }

  // Форматирование даты
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Форматирование суммы
  const formatAmount = (amount) => {
    const value = amount ?? 0;
    return new Intl.NumberFormat('ru-RU').format(value);
  };

  // Иконки для категорий (fallback, пока не импортированы константы)
  const categoryIcons = {
    salary: '💰',
    freelance: '💼',
    bonus: '🎁',
    groceries: '🛒',
    utilities: '💡',
    rent: '🏠',
    subscriptions: '📱',
    transport: '🚗',
    health: '💊',
    clothing: '👕',
    entertainment: '🎬',
    communication: '📞',
    other: '📌',
  };

  return (
    <div className={styles.list}>
      {/* Заголовок таблицы (десктоп) */}
      <div className={styles.listHeader}>
        <div>Дата</div>
        <div>Категория</div>
        <div>Комментарий</div>
        <div style={{ textAlign: 'right' }}>Сумма</div>
        <div></div>
      </div>

      {/* Строки транзакций */}
      {transactions.map((transaction) => {
        const isIncome = transaction.type === 'income';
        const amountClass = isIncome ? styles.amountIncome : styles.amountExpense;
        const amountSign = isIncome ? '+' : '−';
        const icon = categoryIcons[transaction.category] || '📌';

        return (
          <div key={transaction.id} className={styles.row}>
            <div className={styles.date}>
              {formatDate(transaction.date)}
            </div>

            <div className={styles.category}>
              <span className={styles.categoryIcon}>{icon}</span>
              <span>{transaction.categoryLabel || transaction.category}</span>
            </div>

            <div className={styles.comment}>
              {transaction.comment || '—'}
            </div>

            <div className={`${styles.amount} ${amountClass}`}>
              {amountSign}{formatAmount(transaction.amount)} ₽
            </div>

            <div className={styles.actions}>
              {onEdit && (
                <button
                  className={styles.actionButton}
                  onClick={() => onEdit(transaction)}
                  title="Редактировать"
                  type="button"
                >
                  ✏️
                </button>
              )}
              {onDelete && (
                <button
                  className={`${styles.actionButton} ${styles.actionButtonDelete}`}
                  onClick={() => onDelete(transaction.id)}
                  title="Удалить"
                  type="button"
                >
                  🗑️
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TransactionList;