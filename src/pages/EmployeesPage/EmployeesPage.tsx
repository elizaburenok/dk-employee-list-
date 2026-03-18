import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Cell } from '@/components/Cell';
import { Chip } from '@/components/Chip';
import { NavigationBar } from '@/components/NavigationBar';
import flashAvatar from '../../avatars/flash.png';

import styles from './EmployeesPage.module.css';

type EmployeeScheduleItem = {
  id: string;
  name: string;
  role: string;
  circle: string;
  team: string;
  upcomingMeetings: number;
  periodicityType: MeetingPeriodicity;
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
  name: string;
  periodicityType: MeetingPeriodicity;
};

const EMPLOYEES_WITH_FINISHING_PERIODICITY: EmployeePeriodicity[] = [
  {
    id: 'ep1',
    name: 'Леманская Елена',
    periodicityType: 'biweekly',
  },
  {
    id: 'ep2',
    name: 'Токманцева Наталья',
    periodicityType: 'monthly',
  },
];

const PERIODICITY_LABELS: Record<MeetingPeriodicity, string> = {
  weekly: 'Раз в неделю',
  biweekly: 'Раз в 2 недели',
  monthly: 'Раз в месяц',
};

const employeeSchedule: EmployeeScheduleDay[] = [
  {
    id: '2026-03-18',
    dateLabel: '18 марта',
    employees: [
      {
        id: 'e1',
        name: 'Леманская Елена Александровна',
        role: 'Специалист',
            circle: 'Экспертный офис',
            team: 'DeLorean',
        hasPriorityIcon: true,
        upcomingMeetings: 8,
        periodicityType: 'biweekly',
      },
      {
        id: 'e2',
        name: 'Лященко Мария Александровна',
        role: 'Специалист',
            circle: 'Экспертный офис',
            team: 'DeLorean',
        upcomingMeetings: 2,
        periodicityType: 'weekly',
      },
      {
        id: 'e3',
        name: 'Ростова Олеся Александровна ',
        role: ' Эксперт ',
            circle: 'Экспертный офис',
            team: 'DeLorean',
        upcomingMeetings: 1,
        periodicityType: 'biweekly',
      },
    ],
  },
  {
    id: '2026-03-19',
    dateLabel: '19 марта',
    employees: [
      {
        id: 'e4',
        name: 'Буренкова Софья Алексеевна',
        role: 'Эксперт',
            circle: 'Экспертный офис',
            team: 'DeLorean',
        upcomingMeetings: 1,
        periodicityType: 'monthly',
      },
      {
        id: 'e5',
        name: 'Токманцева Наталья Сергеевна  ',
        role: 'Эксперт',
            circle: 'Экспертный офис',
            team: 'DeLorean',
        hasPriorityIcon: true,
        upcomingMeetings: 6,
        periodicityType: 'monthly',
      },
      {
        id: 'e6',
        name: 'Дурягина Алина Максимовна ',
        role: 'Дайвер',
            circle: 'Экспертный офис',
            team: 'DeLorean',
        upcomingMeetings: 3,
        periodicityType: 'weekly',
      },
    ],
  },
  {
    id: '2026-03-20',
    dateLabel: '20 марта',
    employees: [
      {
        id: 'e7',
        name: 'Зайцева Наталья Андреевна',
        role: 'Дайвер',
            circle: 'Экспертный офис',
            team: 'DeLorean',
        upcomingMeetings: 2,
        periodicityType: 'biweekly',
      },
      {
        id: 'e8',
        name: 'Иванов Артём Дмитриевич',
        role: 'Дайвер',
            circle: 'Экспертный офис',
            team: 'DeLorean',
        upcomingMeetings: 3,
        periodicityType: 'weekly',
      },
      {
        id: 'e9',
        name: 'Кириллова Софья Максимовна',
        role: 'Дайвер',
            circle: 'Экспертный офис',
            team: 'DeLorean',
        upcomingMeetings: 1,
        periodicityType: 'weekly',
      },
    ],
  },
  {
    id: '2026-03-23',
    dateLabel: '23 марта',
    employees: [
      {
        id: 'e10',
        name: 'Леонтьев Никита Игоревич',
        role: 'Дайвер',
            circle: 'Экспертный офис',
            team: 'DeLorean',
        upcomingMeetings: 2,
        periodicityType: 'monthly',
      },
      {
        id: 'e11',
        name: 'Морозова Ольга Петровна',
        role: 'Дайвер',
            circle: 'Экспертный офис',
            team: 'DeLorean',
        upcomingMeetings: 4,
        periodicityType: 'weekly',
      },
      {
        id: 'e12',
        name: 'Николаева Дарья Сергеевна',
        role: 'Дайвер',
            circle: 'Экспертный офис',
            team: 'DeLorean',
        upcomingMeetings: 1,
        periodicityType: 'biweekly',
      },
    ],
  },
  {
    id: '2026-03-24',
    dateLabel: '24 марта',
    employees: [
      {
        id: 'e13',
        name: 'Орлов Михаил Евгеньевич',
        role: 'Дайвер',
            circle: 'Экспертный офис',
            team: 'DeLorean',
        upcomingMeetings: 3,
        periodicityType: 'weekly',
      },
      {
        id: 'e14',
        name: 'Павлова Елена Константиновна',
        role: 'Дайвер',
            circle: 'Экспертный офис',
            team: 'DeLorean',
        upcomingMeetings: 2,
        periodicityType: 'monthly',
      },
      {
        id: 'e15',
        name: 'Романов Степан Олегович',
        role: 'Дайвер',
            circle: 'Экспертный офис',
            team: 'DeLorean',
        upcomingMeetings: 1,
        periodicityType: 'weekly',
      },
    ],
  },
  {
    id: '2026-03-25',
    dateLabel: '25 марта',
    employees: [
      {
        id: 'e16',
        name: 'Семёнова Ирина Павловна',
        role: 'Дайвер',
            circle: 'Экспертный офис',
            team: 'DeLorean',
        upcomingMeetings: 2,
        periodicityType: 'weekly',
      },
      {
        id: 'e17',
        name: 'Тихонов Алексей Романович',
        role: 'Дайвер',
            circle: 'Экспертный офис',
            team: 'DeLorean',
        upcomingMeetings: 1,
        periodicityType: 'biweekly',
      },
      {
        id: 'e18',
        name: 'Фёдорова Марина Игоревна',
        role: 'Дайвер',
            circle: 'Экспертный офис',
            team: 'DeLorean',
        upcomingMeetings: 3,
        periodicityType: 'monthly',
      },
    ],
  },
];

const sortEmployeesByName = (employees: EmployeeScheduleItem[]): EmployeeScheduleItem[] =>
  [...employees].sort((a, b) => a.name.localeCompare(b.name, 'ru-RU'));

const getInitials = (name: string): string => {
  const [lastName, firstName] = name.split(' ');
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
                        <span className={styles.periodicityEmployeeName}>{employee.name}</span>
                        <span className={styles.periodicityEmployeePeriodicity}>
                          {PERIODICITY_LABELS[employee.periodicityType]}
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
                          state: {
                            employeeFullName: employee.name,
                            meetingDateLabel: day.dateLabel,
                            role: employee.role,
                            circle: employee.circle,
                            team: employee.team,
                          },
                        })
                      }
                    >
                      <div className={styles.employeeIdentity}>
                        <div className={styles.employeeAvatar}>{getInitials(employee.name)}</div>
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
                            {employee.name}
                          </Cell>
                        </div>
                      </div>
                      <Cell
                        size="L"
                        variant="neutral"
                        align="right"
                        className={styles.scheduleEmployeeMeeting}
                        label={PERIODICITY_LABELS[employee.periodicityType]}
                      >
                        {`${employee.upcomingMeetings} встреча`}
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

