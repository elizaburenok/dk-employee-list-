import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import styles from './EmployeeActivityPage.module.css';
import { NavigationBar } from '@/components/NavigationBar/NavigationBar';
import { Cell } from '@/components/Cell/Cell';
import { PageAction } from '@/components/PageAction/PageAction';

type ActivityStatus = 'planned' | 'inProgress' | 'completed';

type ActivityItem = {
  id: string;
  title: string;
  description: string;
  status: ActivityStatus;
};

type EmployeeActivityById = Record<string, ActivityItem[]>;

const EMPLOYEE_ACTIVITY_BY_ID: EmployeeActivityById = {
  e2: [
    {
      id: 'a1',
      title: 'Проверить готовность к новому графику',
      description: 'Обсудите с сотрудником изменения в графике встреч и его ожидания.',
      status: 'inProgress',
    },
    {
      id: 'a2',
      title: 'Подвести итоги текущего цикла',
      description: 'Кратко зафиксируйте прогресс, достижения и зоны роста за цикл.',
      status: 'planned',
    },
    {
      id: 'a3',
      title: 'Записать наблюдения по диалогу',
      description: 'Сформулируйте основные моменты, которые важно сохранить для следующей встречи.',
      status: 'planned',
    },
  ],
};

const DEFAULT_ACTIVITY_ITEMS: ActivityItem[] = EMPLOYEE_ACTIVITY_BY_ID.e2;

type LocationState = {
  employeeFullName?: string;
  meetingDateLabel?: string;
  role?: string;
  circle?: string;
  team?: string;
};

export const EmployeeActivityPage: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    employeeFullName: employeeFullNameFromState,
    meetingDateLabel,
    role: roleFromState,
    circle: circleFromState,
    team: teamFromState,
  } = (location.state as LocationState | null) ?? {};

  const employeeFullName = employeeFullNameFromState ?? 'Морозова Екатерина Николаевна';
  const nextMeetingDateLabel = meetingDateLabel ?? '12 марта';
  const employeeRole = roleFromState ?? 'Дайвер';
  const employeeCircle = circleFromState ?? 'Экспертный офис';
  const employeeTeam = teamFromState ?? 'DeLorean';

  const activityItems: ActivityItem[] =
    (employeeId && EMPLOYEE_ACTIVITY_BY_ID[employeeId]) || DEFAULT_ACTIVITY_ITEMS;

  return (
    <div className={styles.root}>
      <header className={styles.topBar}>
        <div className={styles.logo}>афина</div>
        <nav className={styles.topNav}>
          <button type="button" className={styles.topNavItem}>
            Главная
          </button>
          <button type="button" className={styles.topNavItem}>
            Задачи
          </button>
          <button type="button" className={styles.topNavItem}>
            Поиск
          </button>
          <button type="button" className={styles.topNavItem}>
            Сервисы
          </button>
          <button type="button" className={styles.topNavItem}>
            Админка
          </button>
        </nav>
        <div className={styles.topProfile}>
          <div className={styles.topProfileAvatar}>БА</div>
          <span className={styles.topProfileName}>Бурлин Александр</span>
        </div>
      </header>

      <main className={styles.pageLayout}>
        <aside className={styles.leftColumn}>
          <NavigationBar
            hasBackButton
            hasTextBlock
            hasItems={false}
            onBackClick={() => navigate(`/employees/${employeeId ?? 'e2'}`)}
            hasRootLink
            rootLinkText="Качество диалогов"
            onRootLinkClick={() => navigate('/employees')}
            title={employeeFullName}
          />
        </aside>

        <section className={styles.mainColumn}>
          <section className={styles.headerSection}>
            <div className={styles.headerMeta}>
              <p className={styles.headerTitle}>Активность встречи</p>
              <p className={styles.headerSubtitle}>{`Ближайшая встреча — ${nextMeetingDateLabel}`}</p>
            </div>
            <div className={styles.headerInfo}>
              <Cell size="S" subtitle="Роль">
                {employeeRole}
              </Cell>
              <Cell size="S" subtitle="Круг">
                {employeeCircle}
              </Cell>
              <Cell size="S" subtitle="Команда">
                {employeeTeam}
              </Cell>
            </div>
          </section>

          <section className={styles.activitySection}>
            <h2 className={styles.activityTitle}>Шаги встречи</h2>
            <div className={styles.activityList}>
              {activityItems.map((item) => (
                <Cell
                  key={item.id}
                  size="L"
                  variant={item.status === 'completed' ? 'neutral' : 'default'}
                  className={styles.activityItem}
                  label={item.status === 'inProgress' ? 'Сейчас' : undefined}
                >
                  <div className={styles.activityItemContent}>
                    <div className={styles.activityItemHeader}>
                      <span className={styles.activityItemTitle}>{item.title}</span>
                      {item.status === 'inProgress' && (
                        <span className={styles.activityItemBadge}>В процессе</span>
                      )}
                      {item.status === 'completed' && (
                        <span className={styles.activityItemBadgeCompleted}>Готово</span>
                      )}
                    </div>
                    <p className={styles.activityItemDescription}>{item.description}</p>
                  </div>
                </Cell>
              ))}
            </div>
          </section>

          <section className={styles.actionSection}>
            <PageAction
              title="Завершить встречу и зафиксировать результат"
              iconLeft={
                <svg viewBox="0 0 30 30" aria-hidden="true">
                  <path
                    d="M9 15.75L12.75 19.5L21 11.25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </section>
        </section>

        <aside className={styles.rightColumn}>
          <section className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Сводка встречи</h2>
            <p className={styles.summaryText}>
              Проверьте, готовы ли вы перевести сотрудника на новый график встреч или завершить
              цикл. Используйте шаги слева, чтобы последовательно пройти сценарий диалога.
            </p>
          </section>
        </aside>
      </main>
    </div>
  );
};

export default EmployeeActivityPage;

