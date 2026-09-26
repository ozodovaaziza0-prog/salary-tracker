import React from 'react';
import styles from './Analytics.module.css';

// Временные заглушки для компонентов графиков (будут детально реализованы в шагах D11 и D12)
const PieChartPlaceholder = () => (
  <div className={styles.chartPlaceholder}>
    <div style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--spacing-md)' }}>📊</div>
    <p>Графики появятся после подключения данных</p>
  </div>
);

const BarChartPlaceholder = () => (
  <div className={styles.chartPlaceholder}>
    <div style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--spacing-md)' }}>📈</div>
    <p>Графики появятся после подключения данных</p>
  </div>
);

function Analytics() {
  return (
    <div className={styles.analytics}>
      <div className={styles.header}>
        <h1 className={styles.title}>Аналитика</h1>
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartContainer}>
          <h2 className={styles.chartTitle}>Расходы по категориям</h2>
          <div className={styles.chartWrapper}>
            <PieChartPlaceholder />
          </div>
        </div>

        <div className={styles.chartContainer}>
          <h2 className={styles.chartTitle}>Доходы и расходы по месяцам</h2>
          <div className={styles.chartWrapper}>
            <BarChartPlaceholder />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;