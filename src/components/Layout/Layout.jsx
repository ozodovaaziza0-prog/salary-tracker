import React from 'react';
import Header from '../Header/Header';
import styles from './Layout.module.css';

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} Salary Tracker
      </footer>
    </div>
  );
}

export default Layout;