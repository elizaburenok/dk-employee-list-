import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import styles from './App.module.css';
import { EmployeesPage } from './pages/EmployeesPage';
import { EmployeeProfilePage } from './pages/EmployeeProfilePage';

const App: React.FC = () => {
  return (
    <div className={styles.root}>
      <main className={styles.content}>
        <Routes>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/employees/:employeeId" element={<EmployeeProfilePage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

