import React, { useState, useEffect } from 'react';
import styles from './TransactionForm.module.css';

// Fallback-категории (будут заменены на импорт из utils/constants.js в Фазе E)
const INCOME_CATEGORIES_FALLBACK = [
  { id: 'salary', label: 'Зарплата' },
  { id: 'freelance', label: 'Подработка' },
  { id: 'bonus', label: 'Премия' },
  { id: 'debt_return', label: 'Возврат долга' },
  { id: 'deposit_interest', label: 'Проценты по вкладу' },
  { id: 'gift', label: 'Подарок' },
  { id: 'other', label: 'Прочее' },
];

const EXPENSE_CATEGORIES_FALLBACK = [
  { id: 'groceries', label: 'Продукты' },
  { id: 'utilities', label: 'Коммуналка' },
  { id: 'rent', label: 'Аренда' },
  { id: 'subscriptions', label: 'Подписки' },
  { id: 'transport', label: 'Транспорт' },
  { id: 'health', label: 'Здоровье' },
  { id: 'clothing', label: 'Одежда' },
  { id: 'entertainment', label: 'Развлечения' },
  { id: 'communication', label: 'Связь' },
  { id: 'other', label: 'Прочее' },
];

function TransactionForm({ onSubmit, onCancel, editData }) {
  // Начальное состояние формы
  const [type, setType] = useState(editData?.type || 'expense');
  const [category, setCategory] = useState(editData?.category || '');
  const [amount, setAmount] = useState(editData?.amount?.toString() || '');
  const [date, setDate] = useState(
    editData?.date || new Date().toISOString().split('T')[0]
  );
  const [comment, setComment] = useState(editData?.comment || '');

  // Определяем список категорий по типу операции
  const categories =
    type === 'income'
      ? INCOME_CATEGORIES_FALLBACK
      : EXPENSE_CATEGORIES_FALLBACK;

  // При смене типа сбрасываем категорию, если она не из нового списка
  useEffect(() => {
    const isValid = categories.some((cat) => cat.id === category);
    if (!isValid) {
      setCategory(categories[0]?.id || '');
    }
  }, [type, category, categories]);

  // Обработка отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      alert('Введите корректную сумму');
      return;
    }

    const transaction = {
      id: editData?.id || null,
      type,
      category,
      amount: parsedAmount,
      date,
      comment: comment.trim(),
    };

    onSubmit?.(transaction);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Переключатель типа операции */}
      <div className={styles.typeSwitcher}>
        <button
          type="button"
          className={`${styles.typeButton} ${
            type === 'income' ? styles.typeButtonActiveIncome : ''
          }`}
          onClick={() => setType('income')}
        >
          Доход
        </button>
        <button
          type="button"
          className={`${styles.typeButton} ${
            type === 'expense' ? styles.typeButtonActiveExpense : ''
          }`}
          onClick={() => setType('expense')}
        >
          Расход
        </button>
      </div>

      {/* Категория и сумма в одном ряду */}
      <div className={styles.fieldRow}>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Категория</label>
          <select
            className={styles.fieldInput}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Сумма (₽)</label>
          <input
            type="number"
            className={styles.fieldInput}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            min="0.01"
            step="0.01"
            required
          />
        </div>
      </div>

      {/* Дата */}
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Дата</label>
        <input
          type="date"
          className={styles.fieldInput}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      {/* Комментарий */}
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Комментарий</label>
        <textarea
          className={styles.fieldTextarea}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Необязательный комментарий..."
          rows="3"
        />
      </div>

      {/* Кнопки действий */}
      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonSecondary}`}
          onClick={() => onCancel?.()}
        >
          Отмена
        </button>
        <button
          type="submit"
          className={`${styles.button} ${styles.buttonPrimary}`}
        >
          {editData ? 'Сохранить' : 'Добавить'}
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;