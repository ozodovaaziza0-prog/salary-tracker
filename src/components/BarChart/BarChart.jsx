import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function BarChart({ data = [], title = '' }) {
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
        <div style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--spacing-md)' }}>📈</div>
        <p>Нет данных для отображения</p>
      </div>
    );
  }

  // Форматирование суммы для tooltip и осей
  const formatAmount = (value) => {
    return `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
  };

  // Кастомный tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'var(--color-surface)',
          padding: 'var(--spacing-sm) var(--spacing-md)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--color-border)',
        }}>
          <p style={{ margin: '0 0 var(--spacing-xs) 0', fontWeight: 600, color: 'var(--color-text)' }}>
            {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: '0', color: entry.color, fontSize: 'var(--font-size-sm)' }}>
              {entry.name}: {formatAmount(entry.value)}
            </p>
          ))}
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
        <RechartsBarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="month"
            stroke="var(--color-text-muted)"
            fontSize="var(--font-size-sm)"
          />
          <YAxis
            stroke="var(--color-text-muted)"
            fontSize="var(--font-size-sm)"
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{ fontSize: 'var(--font-size-sm)' }}
          />
          <Bar
            dataKey="income"
            name="Доходы"
            fill="var(--color-income)"
            radius={[8, 8, 0, 0]}
          />
          <Bar
            dataKey="expense"
            name="Расходы"
            fill="var(--color-expense)"
            radius={[8, 8, 0, 0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChart;