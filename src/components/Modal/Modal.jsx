import React, { useEffect } from 'react';
import styles from './Modal.module.css';

function Modal({ isOpen, onClose, title, children }) {
  // Обработка закрытия по клавише Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Блокируем прокрутку body, пока модалка открыта
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Если модалка закрыта — ничего не рендерим
  if (!isOpen) return null;

  // Закрытие по клику на overlay (но не на содержимое модалки)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title || 'Окно'}</h2>
          <button
            className={styles.closeButton}
            onClick={() => onClose?.()}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        <div className={styles.body}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;