import React from 'react';

import { Cell } from '@/components/Cell/Cell';

import styles from './Navigator.module.css';

export const Navigator: React.FC = () => {
  return (
    <div className={styles.navigator}>
      <header className={styles.navigator__header}>
        <h2 className={styles.navigator__title}>Закреплённые диалог-коучи</h2>
        <span className={styles.navigator__chevron} aria-hidden="true">
          <svg
            className={styles['navigator__chevron-icon']}
            viewBox="0 0 14 7"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 6L7 1L13 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </header>

      <div className={styles.navigator__content}>
        <Cell size="S" subtitle="Чат" className={styles.navigator__cell}>
          Андропов Кирилл Игорьевич
        </Cell>
        <Cell size="S" subtitle="Телефон" className={styles.navigator__cell}>
          Кролюшка Ева
        </Cell>
      </div>
    </div>
  );
};

export default Navigator;

