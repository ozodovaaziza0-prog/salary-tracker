/* Стили хедера приложения */
.header {
  background-color: var(--color-surface);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg);
}

/* Логотип */
.logo {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.logo:hover {
  color: var(--color-primary-hover);
}

/* Навигация */
.nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.navLink {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.navLink:hover {
  color: var(--color-text);
  background-color: var(--color-primary-light);
}

/* Активная ссылка */
.navLinkActive {
  color: var(--color-primary);
  background-color: var(--color-primary-light);
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .nav {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
}