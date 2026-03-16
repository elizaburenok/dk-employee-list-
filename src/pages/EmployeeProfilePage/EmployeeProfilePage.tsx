import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import styles from './EmployeeProfilePage.module.css';
import { NavigationBar } from '@/components/NavigationBar/NavigationBar';
import { Cell } from '@/components/Cell/Cell';
import { PageAction } from '@/components/PageAction/PageAction';
import { Navigator } from '@/components/Navigator';
import { DrawerHeader } from '@/components/Drawer';

type MeetingPeriodicity = 'weekly' | 'biweekly' | 'monthly';

type PeriodicityProgress = {
  periodicity: MeetingPeriodicity;
  completedMeetings: number;
  totalMeetings: number;
};

type EmployeeCycleProgress = {
  completedInCycle: number;
  totalInCycle: number;
  periodicities: [PeriodicityProgress, PeriodicityProgress, PeriodicityProgress];
};

type MeetingHistoryItem = {
  id: string;
  name: string;
  date: string;
  periodicity: MeetingPeriodicity;
};

type ProgressBarState = 'completed' | 'inProgress' | 'notStarted';

type ProgressBarSegment = {
  periodicity: MeetingPeriodicity;
  completedMeetings: number;
  totalMeetings: number;
  percent: number;
  state: ProgressBarState;
};

const PERIODICITY_LABELS: Record<MeetingPeriodicity, string> = {
  weekly: 'Раз в неделю',
  biweekly: 'Раз в две недели',
  monthly: 'Раз в месяц',
};

const EMPLOYEE_CYCLE_PROGRESS_BY_ID: Record<string, EmployeeCycleProgress> = {
  e2: {
    completedInCycle: 8,
    totalInCycle: 20,
    periodicities: [
      { periodicity: 'weekly', completedMeetings: 8, totalMeetings: 8 },
      { periodicity: 'biweekly', completedMeetings: 5, totalMeetings: 8 },
      { periodicity: 'monthly', completedMeetings: 0, totalMeetings: 4 },
    ],
  },
};

const EMPLOYEE_MEETING_HISTORY_BY_ID: Record<string, MeetingHistoryItem[]> = {
  e2: [
    {
      id: 'm1',
      name: '1 встреча: постановка целей',
      date: '15 января 2026',
      periodicity: 'weekly',
    },
    {
      id: 'm2',
      name: '2 встреча: разбор итогов недели',
      date: '22 января 2026',
      periodicity: 'weekly',
    },
    {
      id: 'm3',
      name: '3 встреча: корректировка плана',
      date: '5 февраля 2026',
      periodicity: 'biweekly',
    },
    {
      id: 'm4',
      name: '4 встреча: обсуждение развития',
      date: '19 февраля 2026',
      periodicity: 'biweekly',
    },
    {
      id: 'm5',
      name: 'Встреча по итогам месяца',
      date: '28 февраля 2026',
      periodicity: 'monthly',
    },
  ],
};

const DEFAULT_EMPLOYEE_CYCLE_PROGRESS: EmployeeCycleProgress = EMPLOYEE_CYCLE_PROGRESS_BY_ID.e2;
const DEFAULT_EMPLOYEE_MEETING_HISTORY: MeetingHistoryItem[] = EMPLOYEE_MEETING_HISTORY_BY_ID.e2;

const getProgressPercent = (completedMeetings: number, totalMeetings: number): number => {
  if (totalMeetings <= 0) {
    return 0;
  }

  const rawPercent = Math.round((completedMeetings / totalMeetings) * 100);
  return Math.max(0, Math.min(100, rawPercent));
};

const getProgressState = (percent: number): ProgressBarState => {
  if (percent >= 100) {
    return 'completed';
  }

  if (percent <= 0) {
    return 'notStarted';
  }

  return 'inProgress';
};

const getMeetingsCountLabel = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return `${count} встреча`;
  }

  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
    return `${count} встречи`;
  }

  return `${count} встреч`;
};

export const EmployeeProfilePage: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const cycleProgress =
    EMPLOYEE_CYCLE_PROGRESS_BY_ID[employeeId ?? ''] ?? DEFAULT_EMPLOYEE_CYCLE_PROGRESS;
  const meetingHistory =
    EMPLOYEE_MEETING_HISTORY_BY_ID[employeeId ?? ''] ?? DEFAULT_EMPLOYEE_MEETING_HISTORY;
  const { employeeFullName: employeeFullNameFromState, meetingDateLabel } =
    (location.state as { employeeFullName?: string; meetingDateLabel?: string } | null) ?? {};
  const employeeFullName = employeeFullNameFromState ?? 'Морозова Екатерина Николаевна';
  const nextMeetingDateLabel = meetingDateLabel ?? '12 марта';

  const progressSegments: ProgressBarSegment[] = cycleProgress.periodicities.map((item) => {
    const percent = getProgressPercent(item.completedMeetings, item.totalMeetings);
    return {
      ...item,
      percent,
      state: getProgressState(percent),
    };
  });

  const activePeriodicity =
    progressSegments.find((segment) => segment.state === 'inProgress') ?? progressSegments[0];

  const orderedPeriodicities: MeetingPeriodicity[] = [
    activePeriodicity.periodicity,
    ...(['weekly', 'biweekly', 'monthly'] as MeetingPeriodicity[]).filter(
      (periodicity) => periodicity !== activePeriodicity.periodicity,
    ),
  ];

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
            onBackClick={() => navigate('/employees')}
            hasRootLink
            rootLinkText="Качество диалогов"
            onRootLinkClick={() => navigate('/employees')}
            title={employeeFullName}
          />
        </aside>

        <section className={styles.mainColumn}>
          <section className={styles.notification}>
            <span className={styles.notificationIcon} aria-hidden="true">
              i
            </span>
            <div className={styles.notificationContent}>
              <div className={styles.notificationText}>
                <p className={styles.notificationTitle}>{`Ближайшая встреча — ${nextMeetingDateLabel}`}</p>
                <p className={styles.notificationDescription}>
                  Пора проверить, готов ли сотрудник перейти на новый график встреч или завершить цикл
                </p>
              </div>
              <button type="button" className={styles.notificationAction}>
                Перейти в активность встречи
              </button>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>О сотруднике</h2>
            <div className={styles.sectionList}>
              <Cell size="S" subtitle="Роль">
                Дайвер
              </Cell>
              <Cell size="S" subtitle="Круг">
                Платёжные решения
              </Cell>
              <Cell size="S" subtitle="Команда">
                Название команды
              </Cell>
            </div>
          </section>

          <section className={styles.section}>
            <Navigator />
          </section>

          <section className={styles.section}>
            <PageAction
              title="Профиль сотрудника"
              iconLeft={
                <svg viewBox="0 0 30 30" aria-hidden="true">
                  <path
                    d="M18.75 9.75H21.5V12.5M20.75 9.75L13.25 17.25M10.5 9.75H9.75C9.05964 9.75 8.5 10.3096 8.5 11V20.25C8.5 20.9404 9.05964 21.5 9.75 21.5H19C19.6904 21.5 20.25 20.9404 20.25 20.25V19.5"
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
          <div className={styles.progressWidget}>
            <header className={styles.progressHeader}>
              <h2 className={styles.progressTitle}>Прогресс сотрудника</h2>
            </header>

            <div className={styles.progressContent}>
              <div className={styles.progressSummary}>
                <span className={styles.progressLabel}>{`${cycleProgress.completedInCycle} встреч в цикле`}</span>
                <span className={styles.progressTotal}>{`из ${cycleProgress.totalInCycle}`}</span>
              </div>

              <div className={styles.progressBar}>
                {progressSegments.map((segment) => (
                  <div
                    key={segment.periodicity}
                    className={`${styles.progressBarStep} ${styles[`progressBarStep--${segment.state}`]}`}
                    style={
                      segment.state === 'inProgress'
                        ? ({ '--segment-fill': `${segment.percent}%` } as React.CSSProperties)
                        : undefined
                    }
                  />
                ))}
              </div>

              <p className={styles.progressDescription}>
                {`${PERIODICITY_LABELS[activePeriodicity.periodicity]} — ${activePeriodicity.completedMeetings} встреч прошло`}
              </p>
            </div>

            <footer className={styles.progressFooter}>
              <button
                type="button"
                className={styles.progressFooterButton}
                onClick={() => setIsHistoryOpen(true)}
              >
                Посмотреть историю
              </button>
            </footer>
          </div>
        </aside>
      </main>
      {isHistoryOpen && (
        <div className={styles.historyDrawerOverlay}>
          <aside className={styles.historyDrawer} aria-label="История встреч">
            <DrawerHeader onClose={() => setIsHistoryOpen(false)}>История встреч</DrawerHeader>
            <div className={styles.historyDrawerContent}>
              {orderedPeriodicities.map((periodicity) => {
                const items = meetingHistory.filter(
                  (item) => item.periodicity === periodicity,
                );

                if (items.length === 0) {
                  return null;
                }

                return (
                  <section key={periodicity} className={styles.historyDrawerGroup}>
                    <Cell
                      size="L"
                      variant="default"
                      className={styles.historyDrawerGroupHeader}
                      label={getMeetingsCountLabel(items.length)}
                    >
                      {PERIODICITY_LABELS[periodicity]}
                    </Cell>
                    <div className={styles.historyDrawerList}>
                      {items.map((item) => (
                        <Cell
                          key={item.id}
                          size="M"
                          variant="neutral"
                          className={styles.historyDrawerCell}
                          label={item.date}
                        >
                          {item.name}
                        </Cell>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfilePage;

