import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './App.module.css';

// Временная заглушка Layout (будет заменена на импорт из ./components/Layout/Layout.jsx в шаге B6)
const Layout = ({ children }) => (
  <div style={{ padding: 'var(--spacing-md)', maxWidth: 'var(--container-max-width)', margin: '0 auto', width: '100%' }}>
    {children}
  </div>
);

// Заглушки страниц (будут детально реализованы в Фазе C)
const Dashboard = () => (
  <h2 style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Главная (Dashboard)</h2>
);

const History = () => (
  <h2 style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>История (History)</h2>
);

const Analytics = () => (
  <h2 style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Аналитика (Analytics)</h2>
);

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;