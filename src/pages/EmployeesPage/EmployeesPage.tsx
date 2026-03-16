import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Cell } from '@/components/Cell';
import { Chip } from '@/components/Chip';
import { NavigationBar } from '@/components/NavigationBar';
import flashAvatar from '../../avatars/flash.png';

import styles from './EmployeesPage.module.css';

type EmployeeScheduleItem = {
  id: string;
  fullName: string;
  role: string;
  meetingNumber: number;
  periodicity: MeetingPeriodicity;
  hasPriorityIcon?: boolean;
};

type EmployeeScheduleDay = {
  id: string;
  dateLabel: string;
  employees: EmployeeScheduleItem[];
};

type MeetingPeriodicity = 'weekly' | 'biweekly' | 'monthly';

type EmployeePeriodicity = {
  id: string;
  fullName: string;
  periodicity: MeetingPeriodicity;
};

const EMPLOYEES_WITH_FINISHING_PERIODICITY: EmployeePeriodicity[] = [
  {
    id: 'ep1',
    fullName: 'Кузнецова Ольга',
    periodicity: 'weekly',
  },
  {
    id: 'ep2',
    fullName: 'Морозова Екатерина',
    periodicity: 'biweekly',
  },
  {
    id: 'ep3',
    fullName: 'Петров Максим',
    periodicity: 'weekly',
  },
];

const PERIODICITY_LABELS: Record<MeetingPeriodicity, string> = {
  weekly: 'Раз в неделю',
  biweekly: 'Раз в 2 недели',
  monthly: 'Раз в месяц',
};

const employeeSchedule: EmployeeScheduleDay[] = [
  {
    id: '2026-03-23',
    dateLabel: '23 марта',
    employees: [
      {
        id: 'e1',
        fullName: 'Агафонов Илья Сергеевич',
        role: 'Дайвер',
        meetingNumber: 1,
        periodicity: 'weekly',
      },
      {
        id: 'e2',
        fullName: 'Борисова Анна Викторовна',
        role: 'Дайвер',
        hasPriorityIcon: true,
        meetingNumber: 2,
        periodicity: 'biweekly',
      },
      {
        id: 'e3',
        fullName: 'Громов Павел Андреевич',
        role: 'Дайвер',
        meetingNumber: 3,
        periodicity: 'monthly',
      },
    ],
  },
  {
    id: '2026-03-24',
    dateLabel: '24 марта',
    employees: [
      {
        id: 'e4',
        fullName: 'Демидова Мария Алексеевна',
        role: 'Дайвер',
        meetingNumber: 1,
        periodicity: 'weekly',
      },
      {
        id: 'e5',
        fullName: 'Егоров Кирилл Михайлович',
        role: 'Дайвер',
        meetingNumber: 2,
        periodicity: 'weekly',
      },
      {
        id: 'e6',
        fullName: 'Журавлёва Ольга Петровна',
        role: 'Дайвер',
        hasPriorityIcon: true,
        meetingNumber: 1,
        periodicity: 'monthly',
      },
    ],
  },
  {
    id: '2026-03-25',
    dateLabel: '25 марта',
    employees: [
      {
        id: 'e7',
        fullName: 'Зайцева Наталья Андреевна',
        role: 'Дайвер',
        meetingNumber: 2,
        periodicity: 'biweekly',
      },
      {
        id: 'e8',
        fullName: 'Иванов Артём Дмитриевич',
        role: 'Дайвер',
        meetingNumber: 3,
        periodicity: 'weekly',
      },
      {
        id: 'e9',
        fullName: 'Кириллова Софья Максимовна',
        role: 'Дайвер',
        meetingNumber: 1,
        periodicity: 'weekly',
      },
    ],
  },
  {
    id: '2026-03-26',
    dateLabel: '26 марта',
    employees: [
      {
        id: 'e10',
        fullName: 'Леонтьев Никита Игоревич',
        role: 'Дайвер',
        meetingNumber: 2,
        periodicity: 'monthly',
      },
      {
        id: 'e11',
        fullName: 'Морозова Ольга Петровна',
        role: 'Дайвер',
        meetingNumber: 4,
        periodicity: 'weekly',
      },
      {
        id: 'e12',
        fullName: 'Николаева Дарья Сергеевна',
        role: 'Дайвер',
        meetingNumber: 1,
        periodicity: 'biweekly',
      },
    ],
  },
  {
    id: '2026-03-27',
    dateLabel: '27 марта',
    employees: [
      {
        id: 'e13',
        fullName: 'Орлов Михаил Евгеньевич',
        role: 'Дайвер',
        meetingNumber: 3,
        periodicity: 'weekly',
      },
      {
        id: 'e14',
        fullName: 'Павлова Елена Константиновна',
        role: 'Дайвер',
        meetingNumber: 2,
        periodicity: 'monthly',
      },
      {
        id: 'e15',
        fullName: 'Романов Степан Олегович',
        role: 'Дайвер',
        meetingNumber: 1,
        periodicity: 'weekly',
      },
    ],
  },
];

const sortEmployeesByName = (employees: EmployeeScheduleItem[]): EmployeeScheduleItem[] =>
  [...employees].sort((a, b) => a.fullName.localeCompare(b.fullName, 'ru-RU'));

const getInitials = (fullName: string): string => {
  const [lastName, firstName] = fullName.split(' ');
  return `${lastName?.[0] ?? ''}${firstName?.[0] ?? ''}`.toUpperCase();
};

const EmployeesPage: React.FC = () => {
  const navigate = useNavigate();

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
        <aside className={styles.pageTitleColumn}>
          <NavigationBar
            hasBackButton
            hasTextBlock
            hasRootLink
            rootLinkText="Все сотрудники"
            title="Список сотрудников"
            onBackClick={() => navigate(-1)}
            onRootLinkClick={() => navigate('/employees')}
          />
        </aside>

        <section className={styles.mainColumn}>
          <div className={styles.filters}>
            <Chip variant="dropdown" label="Роль" size="s" />
            <Chip variant="dropdown" label="Фокус" size="s" />
            <Chip variant="dropdown" label="Периодичность" size="s" />
          </div>

          {EMPLOYEES_WITH_FINISHING_PERIODICITY.length > 0 && (
            <section className={styles.periodicitySection}>
              <div className={styles.periodicityBanner} data-node-id="9423:7595">
                <div className={styles.periodicityBannerLeft}>
                  <div className={styles.periodicityAvatar}>
                    <img src={flashAvatar} alt="" width={44} height={44} />
                  </div>

                  <div className={styles.periodicityText}>
                    <p className={styles.periodicityTitle}>Обновление периодичности</p>
                    <p className={styles.periodicityDescription}>
                      Пора проверить, готовы ли эти сотрудники перейти на новый график встреч или
                      завершить цикл
                    </p>
                  </div>
                </div>

                <div className={styles.periodicityEmployeeGrid}>
                  <ul className={styles.periodicityEmployeeList}>
                    {EMPLOYEES_WITH_FINISHING_PERIODICITY.map((employee) => (
                      <li key={employee.id} className={styles.periodicityEmployeeListItem}>
                        <span className={styles.periodicityEmployeeName}>{employee.fullName}</span>
                        <span className={styles.periodicityEmployeePeriodicity}>
                          {PERIODICITY_LABELS[employee.periodicity]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          <section className={styles.scheduleSection}>
            {employeeSchedule.map((day) => (
              <div key={day.id} className={styles.scheduleDay}>
                <div className={styles.scheduleDayHeader}>{day.dateLabel}</div>

                <div className={styles.scheduleDayEmployees}>
                  {sortEmployeesByName(day.employees).map((employee) => (
                    <div
                      key={employee.id}
                      className={styles.scheduleEmployeeRow}
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        navigate(`/employees/${employee.id}`, {
                          state: { employeeFullName: employee.fullName, meetingDateLabel: day.dateLabel },
                        })
                      }
                    >
                      <div className={styles.employeeIdentity}>
                        <div className={styles.employeeAvatar}>{getInitials(employee.fullName)}</div>
                        <div className={styles.employeeInfo}>
                          <Cell
                            size="L"
                            variant="default"
                            className={styles.employeeInfoCell}
                            subtitle={
                              employee.hasPriorityIcon
                                ? `${employee.role} ${String.fromCodePoint(0x26a1)}`
                                : employee.role
                            }
                          >
                            {employee.fullName}
                          </Cell>
                        </div>
                      </div>
                      <Cell
                        size="L"
                        variant="neutral"
                        align="right"
                        className={styles.scheduleEmployeeMeeting}
                        label={PERIODICITY_LABELS[employee.periodicity]}
                      >
                        {`${employee.meetingNumber} встреча`}
                      </Cell>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </section>

        <aside className={styles.sidebar}>
          <section className={styles.sidebarWidget}>
            <h2 className={styles.sidebarWidgetTitle}>Периодичность</h2>
            <div className={styles.sidebarWidgetSummary}>
              <span className={styles.sidebarSummaryLabel}>В работе</span>
              <span className={styles.sidebarSummaryValue}>12 сотрудников</span>
            </div>
            <div className={styles.periodicityBar}>
              <span className={styles.periodicityBarItemWeekly} />
              <span className={styles.periodicityBarItemBiWeekly} />
              <span className={styles.periodicityBarItemMonthly} />
            </div>
            <ul className={styles.sidebarPeriodicityList}>
              <li className={styles.sidebarPeriodicityRow}>Раз в неделю - 5</li>
              <li className={styles.sidebarPeriodicityRow}>Раз в две недели - 4</li>
              <li className={styles.sidebarPeriodicityRow}>Раз в месяц - 3</li>
            </ul>
          </section>

          <section className={styles.sidebarWidget}>
            <h2 className={styles.sidebarWidgetTitle}>Диалог-коуч</h2>
            <p className={styles.sidebarWidgetDescription}>Можно посмотреть активности другого диалог-коуча</p>
            <button type="button" className={styles.sidebarAction}>
              Выбрать
            </button>
          </section>

          <button type="button" className={styles.allActivities}>
            Все активности
          </button>
        </aside>
      </main>
    </div>
  );
};

export default EmployeesPage;

