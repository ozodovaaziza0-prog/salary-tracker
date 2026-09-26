import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Цвета для сегментов диаграммы
const COLORS = [
  '#4f46e5', // primary
  '#10b981', // income
  '#3b82f6', // balance
  '#f59e0b', // amber
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#14b8a6', // teal
  '#f97316', // orange
  '#6366f1', // indigo
  '#84cc16', // lime
];

function PieChart({ data = [], title = '' }) {
  // Если данных нет — показываем заглушку
  if (!data || data.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '300px',
        color: 'var(--color-text-muted)',
        textAlign: 'center',
        gap: 'var(--spacing-sm)',
      }}>
        <div style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--spacing-md)' }}>📊</div>
        <p>Нет данных для отображения</p>
      </div>
    );
  }

  // Форматирование суммы для tooltip
  const formatAmount = (value) => {
    return `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
  };

  // Кастомный tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div style={{
          backgroundColor: 'var(--color-surface)',
          padding: 'var(--spacing-sm) var(--spacing-md)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--color-border)',
        }}>
          <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-text)' }}>
            {data.name}
          </p>
          <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
            {formatAmount(data.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {title && (
        <h3 style={{
          textAlign: 'center',
          fontSize: 'var(--font-size-lg)',
          fontWeight: 600,
          color: 'var(--color-text)',
          marginBottom: 'var(--spacing-md)',
        }}>
          {title}
        </h3>
      )}

      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{ fontSize: 'var(--font-size-sm)' }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChart;