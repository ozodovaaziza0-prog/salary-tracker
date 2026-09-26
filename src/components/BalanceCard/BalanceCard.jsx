import React from 'react';
import styles from './BalanceCard.module.css';

function BalanceCard({ title, amount, color }) {
  // Fallback для amount: если не передано — показываем 0
  const displayAmount = amount ?? 0;

  // Форматирование суммы с разделителями тысяч
  const formattedAmount = new Intl.NumberFormat('ru-RU').format(displayAmount);

  // Определяем класс-модификатор по типу цвета
  const colorClass =
    color === 'income'
      ? styles.income
      : color === 'expense'
      ? styles.expense
      : styles.balance;

  return (
    <div className={`${styles.card} ${colorClass}`}>
      <div className={styles.title}>{title || 'Баланс'}</div>
      <div className={styles.amount}>
        {formattedAmount} ₽
      </div>
    </div>
  );
}

export default BalanceCard;