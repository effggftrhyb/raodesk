const app = document.querySelector('#app');

const pages = {
  index: {
    title: 'RAODESK Pilot — вход',
    hero: 'Демо-вход в pilot-систему',
  },
  dashboard: {
    title: 'RAODESK Pilot — обзор',
    hero: 'Панель управления и KPI',
  },
  tickets: {
    title: 'RAODESK Pilot — заявки',
    hero: 'Жизненный цикл, назначение и комментарии',
  },
  intake: {
    title: 'RAODESK Pilot — каналы',
    hero: 'Приём и регистрация обращений',
  },
  knowledge: {
    title: 'RAODESK Pilot — база знаний',
    hero: 'Портал самообслуживания и шаблоны',
  },
  analytics: {
    title: 'RAODESK Pilot — аналитика',
    hero: 'SLA, отчёты и KPI',
  },
  integrations: {
    title: 'RAODESK Pilot — интеграции',
    hero: 'Интеграции, активы и безопасность',
  },
};

const state = {
  currentUser: null,
  currentPage: 'index',
  activeTicketId: 'T-1048',
  login: {
    email: 'admin@raodesk.demo',
    password: 'Admin123!',
    selectedAccountId: 'admin',
    error: '',
  },
  newTicket: {
    title: 'Житель сообщает о протечке в подъезде 4',
    requester: 'Мария Иванова',
    channel: 'Телефон',
    category: 'Авария / протечка',
    priority: 'Критический',
    service: 'Эксплуатация МКД',
    address: 'ул. Лесная, 18',
    description: 'Вода течёт с потолка, требуется немедленный выезд аварийной бригады.',
  },
  filters: {
    status: 'all',
    priority: 'all',
    category: 'all',
  },
  newComment: {
    text: '',
    visibility: 'internal',
  },
};

const users = [
  { id: 'admin', name: 'Анна Власова', role: 'Главный администратор', email: 'admin@raodesk.demo', password: 'Admin123!', avatar: 'АВ', zone: 'Центральный офис' },
  { id: 'dispatcher', name: 'Ольга Романова', role: 'Диспетчер / оператор', email: 'dispatcher@raodesk.demo', password: 'Dispatch123!', avatar: 'ОР', zone: 'Диспетчерская служба' },
  { id: 'specialist', name: 'Иван Петров', role: 'Специалист участка', email: 'specialist@raodesk.demo', password: 'Special123!', avatar: 'ИП', zone: 'Участок №2' },
];

const topNav = [
  { id: 'dashboard', label: 'Обзор' },
  { id: 'tickets', label: 'Заявки' },
  { id: 'intake', label: 'Каналы' },
  { id: 'knowledge', label: 'База знаний' },
  { id: 'analytics', label: 'Аналитика' },
  { id: 'integrations', label: 'Интеграции' },
];

const team = [
  'Анна Власова — главный администратор',
  'Ольга Романова — диспетчер',
  'Иван Петров — сантехник участка №2',
  'Андрей Смирнов — электрик участка №4',
  'Подрядчик ЛифтСервис — внешний исполнитель',
];

const notifications = [
  { channel: 'Email', audience: 'Клиент', title: 'Заявка T-1048 зарегистрирована', text: 'Клиент получил номер обращения и SLA первого ответа — 15 минут.', severity: 'info' },
  { channel: 'Push', audience: 'Исполнитель', title: 'Риск нарушения SLA по T-1048', text: 'До дедлайна первого ответа осталось 12 минут.', severity: 'warning' },
  { channel: 'Чат-бот', audience: 'Команда', title: 'Назначен исполнитель по T-1031', text: 'Подрядчик уведомлён через внутренний чат.', severity: 'success' },
  { channel: 'SMS', audience: 'Клиент', title: 'Запрошено уточнение по T-1037', text: 'Отправлен запрос фото и дополнительной информации.', severity: 'danger' },
];

const knowledgeBase = [
  { id: 'KB-01', title: 'Как обрабатывать аварийную протечку в МКД', category: 'Аварии', summary: 'Регламент диспетчера и аварийной бригады.', tags: ['SLA 15 минут', 'эскалация', 'аварийная бригада'] },
  { id: 'KB-02', title: 'Шаблон ответа клиенту по переносам срока', category: 'Шаблоны ответов', summary: 'Типовой ответ при переносе времени визита.', tags: ['email', 'SMS', 'прозрачность'] },
  { id: 'KB-03', title: 'FAQ для жителя: проблемы с домофоном и лифтом', category: 'FAQ', summary: 'Частые вопросы до выезда специалиста.', tags: ['самообслуживание', 'портал', 'лифт'] },
];

const integrations = [
  { title: 'Почта и корпоративный ящик', status: 'active', description: 'Импорт входящих обращений и ответы клиентам.' },
  { title: 'CRM / ERP / 1С', status: 'pilot', description: 'Связка с договорами, объектами и клиентской базой.' },
  { title: 'Мессенджеры и чат-боты', status: 'active', description: 'Приём заявок и статусы в Telegram/ботах.' },
  { title: 'Мониторинг инженерных систем', status: 'planned', description: 'Автогенерация инцидентов по событиям оборудования.' },
];

const assets = [
  { id: 'A-301', name: 'Лифт Otis, подъезд 2', type: 'Оборудование', owner: 'Дом ул. Центральная 4', status: 'На сервисе', note: 'Привязан к заявкам лифтового хозяйства.' },
  { id: 'A-114', name: 'Лицензия мобильного приложения мастера', type: 'ПО / лицензия', owner: 'Служба эксплуатации', status: 'Активна', note: 'Используется выездными сотрудниками.' },
  { id: 'A-207', name: 'Сервер уведомлений', type: 'Инфраструктура', owner: 'ЦОД УК', status: 'Под контролем', note: 'Обеспечивает email, push, SMS и webhooks.' },
];

const surveys = [
  { ticketId: 'T-1024', client: 'Елена Смирнова', score: 5, feedback: 'Специалист приехал вовремя, всё решено за один визит.' },
  { ticketId: 'T-1011', client: 'ТСЖ «Север»', score: 4, feedback: 'Решение хорошее, но ответ хотелось быстрее.' },
];

const tickets = [
  {
    id: 'T-1048', type: 'Инцидент', title: 'Протечка в 4 подъезде', category: 'Авария / протечка', service: 'Эксплуатация МКД', priority: 'Критический', status: 'В работе', requester: 'Мария Иванова', source: 'Телефон', address: 'ул. Лесная, 18', assignee: 'Иван Петров', team: 'Аварийная бригада', createdAt: '2026-04-01 10:24', firstResponseLeft: '12 минут', resolutionLeft: '1 час 34 мин', description: 'Житель сообщил о течи с потолка в подъезде. Требуется аварийный выезд и фотофиксация.',
    comments: [
      { author: 'Ольга Романова', role: 'Диспетчер', visibility: 'public', createdAt: '10:25', text: 'Заявка зарегистрирована, аварийная бригада уведомлена.' },
      { author: 'Анна Власова', role: 'Главный администратор', visibility: 'internal', createdAt: '10:28', text: 'Контролируем как приоритетный кейс, при отсутствии доступа эскалировать.' },
    ],
    timeline: [
      '10:24 — обращение принято по телефону оператором',
      '10:25 — карточка создана автоматически, клиент уведомлён',
      '10:27 — заявка маршрутизирована на аварийную бригаду',
    ],
  },
  {
    id: 'T-1041', type: 'Запрос на обслуживание', title: 'Замена автомата в щитовой', category: 'Электрика', service: 'Плановые работы', priority: 'Высокий', status: 'Назначена', requester: 'Инженер дома', source: 'Портал самообслуживания', address: 'ул. Парковая, 22', assignee: 'Андрей Смирнов', team: 'Электрики', createdAt: '2026-04-01 09:12', firstResponseLeft: 'Выполнено', resolutionLeft: '4 часа 15 мин', description: 'Плановая замена автомата в электрощитовой после предписания обхода.',
    comments: [{ author: 'Система', role: 'Автоматизация', visibility: 'public', createdAt: '09:12', text: 'Категория и SLA определены автоматически.' }],
    timeline: ['09:12 — создана через портал', '09:13 — классифицирована автоматически', '09:20 — назначен исполнитель'],
  },
  {
    id: 'T-1037', type: 'Запрос на обслуживание', title: 'Уборка МОП после ремонта', category: 'Клининг', service: 'Содержание мест общего пользования', priority: 'Средний', status: 'На уточнении', requester: 'Старший по дому', source: 'Чат-бот', address: 'ул. Южная, 15', assignee: 'Клининг 3', team: 'Подрядчики', createdAt: '2026-04-01 08:40', firstResponseLeft: 'Выполнено', resolutionLeft: '18 часов', description: 'Нужно уточнение объёма работ и фото после ремонта.',
    comments: [{ author: 'Ольга Романова', role: 'Диспетчер', visibility: 'public', createdAt: '08:52', text: 'Запросили фотографии и точный этаж.' }],
    timeline: ['08:40 — получено через чат-бот', '08:42 — отправлен автоответ', '08:52 — статус переведён на уточнение'],
  },
  {
    id: 'T-1031', type: 'Инцидент', title: 'Сбой лифта во 2 подъезде', category: 'Лифтовое хозяйство', service: 'Лифты и диспетчеризация', priority: 'Высокий', status: 'На контроле', requester: 'Житель дома', source: 'Email', address: 'ул. Центральная, 4', assignee: 'Подрядчик ЛифтСервис', team: 'Подрядчики', createdAt: '2026-04-01 07:58', firstResponseLeft: 'Выполнено', resolutionLeft: '38 минут', description: 'Лифт периодически не закрывает двери.',
    comments: [{ author: 'Анна Власова', role: 'Главный администратор', visibility: 'internal', createdAt: '08:40', text: 'Если подрядчик не закрывает до дедлайна — эскалировать.' }],
    timeline: ['07:58 — обращение пришло по почте', '08:00 — создан инцидент', '08:15 — подрядчик уведомлён'],
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&')
    .replaceAll('<', '<')
    .replaceAll('>', '>')
    .replaceAll('"', '"')
    .replaceAll("'", '&#039;');
}

function badgeClass(value) {
  if (['Критический', 'Высокий', 'danger'].includes(value)) return 'danger';
  if (['Средний', 'warning'].includes(value)) return 'warning';
  if (['Закрыта', 'Активна', 'success'].includes(value)) return 'success';
  return 'info';
}

function getCurrentUser() {
  return users.find((user) => user.id === state.currentUser) || null;
}

function getSelectedAccount() {
  return users.find((user) => user.id === state.login.selectedAccountId) || users[0];
}

function getTicketById(id) {
  return tickets.find((ticket) => ticket.id === id) || tickets[0];
}

function setPage(page) {
  state.currentPage = page;
  render();
}

function loginAs(accountId) {
  const account = users.find((user) => user.id === accountId);
  if (!account) return;
  state.login.selectedAccountId = accountId;
  state.login.email = account.email;
  state.login.password = account.password;
  state.login.error = '';
  render();
}

function attemptLogin() {
  const account = users.find(
    (user) => user.email === state.login.email.trim() && user.password === state.login.password.trim(),
  );

  if (!account) {
    state.login.error = 'Неверный email или пароль. Используйте одну из демонстрационных учётных записей.';
    render();
    return;
  }

  state.currentUser = account.id;
  state.currentPage = 'dashboard';
  state.login.error = '';
  render();
}

function logout() {
  state.currentUser = null;
  state.currentPage = 'index';
  render();
}

function assignTicket(ticketId, assignee) {
  const ticket = getTicketById(ticketId);
  ticket.assignee = assignee;
  ticket.status = 'Назначена';
  ticket.comments.unshift({
    author: getCurrentUser().name,
    role: getCurrentUser().role,
    visibility: 'internal',
    createdAt: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    text: `Исполнитель изменён на: ${assignee}.`,
  });
  ticket.timeline.push(`${new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} — переназначена на ${assignee}`);
  render();
}

function changeStatus(ticketId, status) {
  const ticket = getTicketById(ticketId);
  ticket.status = status;
  ticket.comments.unshift({
    author: 'Система',
    role: 'Автоматизация',
    visibility: 'public',
    createdAt: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    text: `Статус заявки изменён на «${status}». Уведомления отправлены.`,
  });
  ticket.timeline.push(`${new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} — статус изменён на ${status}`);
  render();
}

function addComment() {
  const user = getCurrentUser();
  const ticket = getTicketById(state.activeTicketId);
  const text = state.newComment.text.trim();
  if (!text) return;

  ticket.comments.unshift({
    author: user.name,
    role: user.role,
    visibility: state.newComment.visibility,
    createdAt: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    text,
  });
  ticket.timeline.push(`${new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} — добавлен комментарий`);
  state.newComment.text = '';
  render();
}

function createTicket() {
  const user = getCurrentUser();
  const nextNumber = `T-${1050 + tickets.length}`;
  const now = new Date();
  const ticket = {
    id: nextNumber,
    type: state.newTicket.priority === 'Критический' ? 'Инцидент' : 'Запрос на обслуживание',
    title: state.newTicket.title,
    category: state.newTicket.category,
    service: state.newTicket.service,
    priority: state.newTicket.priority,
    status: 'Новая',
    requester: state.newTicket.requester,
    source: state.newTicket.channel,
    address: state.newTicket.address,
    assignee: 'Очередь диспетчеризации',
    team: 'Операционный центр',
    createdAt: `${now.toLocaleDateString('ru-RU').split('.').reverse().join('-')} ${now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`,
    firstResponseLeft: state.newTicket.priority === 'Критический' ? '15 минут' : '45 минут',
    resolutionLeft: state.newTicket.priority === 'Критический' ? '2 часа' : '1 день',
    description: state.newTicket.description,
    comments: [{ author: user.name, role: user.role, visibility: 'public', createdAt: now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }), text: 'Заявка создана оператором/пользователем в пилоте.' }],
    timeline: [
      `${now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} — обращение зарегистрировано через ${state.newTicket.channel}`,
      `${now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} — карточка создана автоматически`,
    ],
  };

  tickets.unshift(ticket);
  state.activeTicketId = ticket.id;
  state.currentPage = 'tickets';
  render();
}

function filteredTickets() {
  return tickets.filter((ticket) => {
    const statusOk = state.filters.status === 'all' || ticket.status === state.filters.status;
    const priorityOk = state.filters.priority === 'all' || ticket.priority === state.filters.priority;
    const categoryOk = state.filters.category === 'all' || ticket.category === state.filters.category;
    return statusOk && priorityOk && categoryOk;
  });
}

function renderLoginPage() {
  const selected = getSelectedAccount();
  document.title = pages.index.title;

  app.innerHTML = `
    <section class="login-screen">
      <div class="login-panel">
        <aside class="login-aside">
          <div class="brand-line">
            <div class="brand-mark">R</div>
            <div>
              <p class="pill">UK-focused ITSM pilot</p>
              <h1>RAODESK Pilot</h1>
            </div>
          </div>
          <div class="hero-copy">
            <h2>Многостраничный pilot helpdesk для управляющей компании</h2>
            <p>
              Перестроено в более спокойную, читаемую структуру без размытия и перегруженного единого полотна.
              Основные разделы теперь логически разведены по отдельным страницам внутри демо-навигации.
            </p>
          </div>
          <ul class="login-highlights">
            <li>3 демо-учётки для разных ролей</li>
            <li>Регистрация обращений, SLA, назначение и комментарии</li>
            <li>Разделы: обзор, заявки, каналы, база знаний, аналитика, интеграции</li>
            <li>Полностью статический проект под GitHub Pages</li>
          </ul>
        </aside>

        <div class="login-form-wrap">
          <div class="section-title">
            <p>Авторизация</p>
            <h2>Вход в систему</h2>
          </div>

          <div class="accounts-grid">
            ${users
              .map(
                (user) => `
                <button class="account-card ${state.login.selectedAccountId === user.id ? 'active' : ''}" data-account="${user.id}">
                  <span class="account-role">${escapeHtml(user.role)}</span>
                  <strong>${escapeHtml(user.name)}</strong>
                  <div class="auth-hint">${escapeHtml(user.email)}</div>
                  <div class="auth-hint">Пароль: ${escapeHtml(user.password)}</div>
                </button>
              `,
              )
              .join('')}
          </div>

          <form class="auth-form" id="login-form">
            <div class="input-group">
              <label for="email">Email</label>
              <input id="email" type="email" value="${escapeHtml(state.login.email)}" />
            </div>
            <div class="input-group">
              <label for="password">Пароль</label>
              <input id="password" type="text" value="${escapeHtml(state.login.password)}" />
            </div>
            <div class="auth-hint">Выбрана учётка: ${escapeHtml(selected.name)} — ${escapeHtml(selected.zone)}</div>
            ${state.login.error ? `<div class="notice-inline">${escapeHtml(state.login.error)}</div>` : ''}
            <div class="auth-footer">
              <span class="inline-note">Демо-режим: локальная фейк-аутентификация без backend</span>
              <button class="btn btn-primary" type="submit">Войти</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;

  document.querySelectorAll('[data-account]').forEach((button) => {
    button.addEventListener('click', () => loginAs(button.dataset.account));
  });

  document.querySelector('#login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    state.login.email = document.querySelector('#email').value;
    state.login.password = document.querySelector('#password').value;
    attemptLogin();
  });
}

function renderHeader(user) {
  return `
    <header class="site-header">
      <div class="site-header-inner">
        <div class="topbar-left">
          <div class="brand-mark">R</div>
          <div>
            <p class="pill">${escapeHtml(pages[state.currentPage].hero)}</p>
            <h1>RAODESK Pilot</h1>
          </div>
        </div>
        <nav class="main-nav">
          ${topNav
            .map(
              (item) => `<a href="#" class="${state.currentPage === item.id ? 'active' : ''}" data-page="${item.id}">${escapeHtml(item.label)}</a>`,
            )
            .join('')}
        </nav>
        <div class="topbar-actions">
          <div class="user-panel">
            <div class="brand-mark">${escapeHtml(user.avatar)}</div>
            <div>
              <strong>${escapeHtml(user.name)}</strong>
              <div class="auth-hint">${escapeHtml(user.role)} • ${escapeHtml(user.zone)}</div>
            </div>
          </div>
          <button class="btn btn-secondary" data-action="logout">Выйти</button>
        </div>
      </div>
    </header>
  `;
}

function renderDashboardPage() {
  document.title = pages.dashboard.title;
  const user = getCurrentUser();

  return `
    ${renderHeader(user)}
    <main class="page-container">
      <section class="workspace-header">
        <div>
          <p>Обзор пилота</p>
          <h2>Операционная панель управляющей компании</h2>
          <p>Отдельная стартовая страница с ключевыми KPI, ролями и составом модулей без перегрузки экрана.</p>
        </div>
        <div class="workspace-actions">
          <button class="btn btn-primary" data-action="go-tickets">Перейти к заявкам</button>
          <button class="btn btn-secondary" data-action="go-intake">Открыть каналы</button>
        </div>
      </section>

      <section class="overview-grid">
        <article class="overview-card">
          <h4>Активные заявки</h4>
          <span class="value">${tickets.length}</span>
          <p>Инциденты, сервисные запросы и контрольные кейсы.</p>
        </article>
        <article class="overview-card">
          <h4>Соблюдение SLA</h4>
          <span class="value">92%</span>
          <p>Выполнение нормативов первого ответа и решения.</p>
        </article>
        <article class="overview-card">
          <h4>Средняя реакция</h4>
          <span class="value">14 мин</span>
          <p>По телефону, email, порталу и ботам.</p>
        </article>
        <article class="overview-card">
          <h4>Текущая роль</h4>
          <span class="value">${escapeHtml(user.role)}</span>
          <p>Демо-интерфейс открыт под выбранной учёткой.</p>
        </article>
      </section>

      <section class="modules-grid">
        ${[
          ['Приём и регистрация', 'Единый контур входящих обращений и создание заявок оператором от имени клиента.'],
          ['Классификация', 'Категории, приоритеты, SLA, маршрутизация по профилю и командам.'],
          ['Жизненный цикл', 'Новая, назначена, в работе, на уточнении, на контроле, закрыта.'],
          ['Коммуникация', 'Публичные и внутренние комментарии прямо внутри карточки заявки.'],
          ['База знаний', 'FAQ, статьи, типовые шаблоны ответов для сотрудников.'],
          ['Отчётность', 'Нагрузка, SLA, узкие места, повторные обращения и оценки качества.'],
        ]
          .map(
            ([title, text]) => `
            <article class="module-card">
              <span class="module-tag">Модуль</span>
              <h4>${escapeHtml(title)}</h4>
              <p>${escapeHtml(text)}</p>
            </article>
          `,
          )
          .join('')}
      </section>
    </main>
  `;
}

function renderTicketsPage() {
  document.title = pages.tickets.title;
  const user = getCurrentUser();
  const ticket = getTicketById(state.activeTicketId);
  const statuses = ['all', 'Новая', 'Назначена', 'В работе', 'На уточнении', 'На контроле', 'Закрыта'];
  const priorities = ['all', 'Критический', 'Высокий', 'Средний', 'Низкий'];
  const categories = ['all', ...new Set(tickets.map((item) => item.category))];

  return `
    ${renderHeader(user)}
    <main class="page-container">
      <section class="panel-header">
        <div>
          <p>Раздел заявок</p>
          <h3>Назначение исполнителей, статусы и переписка</h3>
        </div>
        <div class="panel-toolbar">
          <button class="btn btn-primary" data-action="create-ticket">Создать заявку</button>
          <button class="btn btn-secondary" data-action="close-ticket">Закрыть текущую</button>
        </div>
      </section>

      <section class="form-card" style="margin-bottom:18px;">
        <div class="filters-form">
          <div class="filters-grid">
            <div class="input-group">
              <label for="filter-status">Статус</label>
              <select id="filter-status">
                ${statuses.map((item) => `<option value="${escapeHtml(item)}" ${state.filters.status === item ? 'selected' : ''}>${escapeHtml(item === 'all' ? 'Все статусы' : item)}</option>`).join('')}
              </select>
            </div>
            <div class="input-group">
              <label for="filter-priority">Приоритет</label>
              <select id="filter-priority">
                ${priorities.map((item) => `<option value="${escapeHtml(item)}" ${state.filters.priority === item ? 'selected' : ''}>${escapeHtml(item === 'all' ? 'Все приоритеты' : item)}</option>`).join('')}
              </select>
            </div>
            <div class="input-group">
              <label for="filter-category">Категория</label>
              <select id="filter-category">
                ${categories.map((item) => `<option value="${escapeHtml(item)}" ${state.filters.category === item ? 'selected' : ''}>${escapeHtml(item === 'all' ? 'Все категории' : item)}</option>`).join('')}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section class="ticket-layout">
        <div class="ticket-list">
          ${filteredTickets()
            .map(
              (item) => `
              <article class="ticket-card ${item.id === state.activeTicketId ? 'active' : ''}" data-ticket="${item.id}">
                <div class="ticket-top">
                  <div>
                    <h4>${escapeHtml(item.id)} — ${escapeHtml(item.title)}</h4>
                    <div class="ticket-meta">${escapeHtml(item.type)} • ${escapeHtml(item.category)} • ${escapeHtml(item.address)}</div>
                  </div>
                  <span class="badge ${badgeClass(item.priority)}">${escapeHtml(item.priority)}</span>
                </div>
                <p>${escapeHtml(item.description)}</p>
                <div class="meta-row">
                  <span class="badge ${badgeClass(item.status)}">${escapeHtml(item.status)}</span>
                  <span class="badge info">${escapeHtml(item.assignee)}</span>
                  <span class="badge warning">SLA: ${escapeHtml(item.resolutionLeft)}</span>
                </div>
              </article>
            `,
            )
            .join('')}
        </div>

        <div class="content-two-column" style="grid-template-columns:1fr;">
          <article class="ticket-card">
            <div class="ticket-top">
              <div>
                <h4>${escapeHtml(ticket.id)} — ${escapeHtml(ticket.title)}</h4>
                <div class="ticket-meta">${escapeHtml(ticket.requester)} • ${escapeHtml(ticket.source)} • ${escapeHtml(ticket.createdAt)}</div>
              </div>
              <span class="badge ${badgeClass(ticket.status)}">${escapeHtml(ticket.status)}</span>
            </div>
            <p>${escapeHtml(ticket.description)}</p>
            <div class="ticket-tags">
              <span class="badge ${badgeClass(ticket.priority)}">${escapeHtml(ticket.priority)}</span>
              <span class="badge info">${escapeHtml(ticket.category)}</span>
              <span class="badge info">${escapeHtml(ticket.service)}</span>
              <span class="badge warning">1-й ответ: ${escapeHtml(ticket.firstResponseLeft)}</span>
              <span class="badge warning">Решение: ${escapeHtml(ticket.resolutionLeft)}</span>
            </div>

            <div class="form-row" style="margin-top:16px;">
              <div class="input-group" style="flex:1 1 220px;">
                <label for="assignee-select">Исполнитель</label>
                <select id="assignee-select">${team.map((member) => `<option value="${escapeHtml(member)}" ${ticket.assignee === member ? 'selected' : ''}>${escapeHtml(member)}</option>`).join('')}</select>
              </div>
              <div class="input-group" style="flex:1 1 220px;">
                <label for="status-select">Статус</label>
                <select id="status-select">${['Новая', 'Назначена', 'В работе', 'На уточнении', 'На контроле', 'Закрыта'].map((status) => `<option value="${escapeHtml(status)}" ${ticket.status === status ? 'selected' : ''}>${escapeHtml(status)}</option>`).join('')}</select>
              </div>
            </div>
            <div class="panel-toolbar">
              <button class="btn btn-primary" data-action="assign-ticket">Сохранить назначение</button>
              <button class="btn btn-secondary" data-action="change-status">Сохранить статус</button>
            </div>
          </article>

          <article class="ticket-card">
            <div class="panel-header">
              <div>
                <p>Комментарии</p>
                <h3>Внутренние и клиентские сообщения</h3>
              </div>
            </div>
            <div class="comment-list">
              ${ticket.comments
                .map(
                  (comment) => `
                  <article class="comment-card ${comment.visibility}">
                    <div class="comment-head">
                      <div>
                        <strong>${escapeHtml(comment.author)}</strong>
                        <div class="ticket-meta">${escapeHtml(comment.role)} • ${escapeHtml(comment.createdAt)}</div>
                      </div>
                      <span class="badge ${comment.visibility === 'internal' ? 'warning' : 'info'}">${comment.visibility === 'internal' ? 'Внутренний' : 'Публичный'}</span>
                    </div>
                    <p>${escapeHtml(comment.text)}</p>
                  </article>
                `,
                )
                .join('')}
            </div>

            <div class="ticket-form" style="margin-top:16px;">
              <div class="input-group">
                <label for="comment-text">Добавить комментарий</label>
                <textarea id="comment-text">${escapeHtml(state.newComment.text)}</textarea>
              </div>
              <div class="form-row">
                <div class="input-group" style="flex:1 1 220px;">
                  <label for="comment-visibility">Видимость</label>
                  <select id="comment-visibility">
                    <option value="internal" ${state.newComment.visibility === 'internal' ? 'selected' : ''}>Внутренний</option>
                    <option value="public" ${state.newComment.visibility === 'public' ? 'selected' : ''}>Публичный</option>
                  </select>
                </div>
              </div>
              <button class="btn btn-primary" data-action="add-comment">Сохранить комментарий</button>
            </div>
          </article>

          <article class="ticket-card">
            <div class="panel-header">
              <div>
                <p>История</p>
                <h3>Таймлайн заявки</h3>
              </div>
            </div>
            <ul class="timeline-list">
              ${ticket.timeline.map((row) => `<li>${escapeHtml(row)}</li>`).join('')}
            </ul>
          </article>
        </div>
      </section>
    </main>
  `;
}

function renderIntakePage() {
  document.title = pages.intake.title;
  const user = getCurrentUser();

  return `
    ${renderHeader(user)}
    <main class="page-container">
      <section class="workspace-header">
        <div>
          <p>Каналы и регистрация</p>
          <h2>Единый входной контур обращений</h2>
          <p>Отдельная страница под каналы поступления, автоматическую регистрацию и создание от имени клиента.</p>
        </div>
        <div class="workspace-actions">
          <button class="btn btn-primary" data-action="create-ticket">Зарегистрировать обращение</button>
        </div>
      </section>

      <section class="channel-grid">
        ${[
          ['Телефон', 'Оператор вручную заводит карточку от имени клиента.'],
          ['Email', 'Почтовый коннектор создаёт заявку автоматически.'],
          ['Портал самообслуживания', 'Клиент сам подаёт обращение и видит статус.'],
          ['Чат-бот / мессенджеры', 'Быстрый канал для жителей и подрядчиков.'],
          ['Форма на сайте', 'Публичная форма для подачи сервисных заявок.'],
          ['Мониторинг', 'Автоматический инцидент по сигналу системы.'],
        ]
          .map(
            ([title, text]) => `
            <article class="channel-card">
              <span class="channel-chip">Канал</span>
              <h4>${escapeHtml(title)}</h4>
              <p>${escapeHtml(text)}</p>
            </article>
          `,
          )
          .join('')}
      </section>

      <section class="queue-grid">
        <article class="queue-card">
          <h4>Автоклассификация</h4>
          <ul class="response-list">
            <li>Тип обращения: инцидент или запрос на обслуживание</li>
            <li>Категория, приоритет и SLA</li>
            <li>Маршрут на профильную команду или подрядчика</li>
          </ul>
        </article>
        <article class="queue-card">
          <h4>Уведомления при регистрации</h4>
          <ul class="notifications-list">
            ${notifications.map((item) => `<li>${escapeHtml(item.channel)} — ${escapeHtml(item.title)}</li>`).join('')}
          </ul>
        </article>
      </section>
    </main>
  `;
}

function renderKnowledgePage() {
  document.title = pages.knowledge.title;
  const user = getCurrentUser();

  return `
    ${renderHeader(user)}
    <main class="page-container">
      <section class="workspace-header">
        <div>
          <p>Портал и база знаний</p>
          <h2>FAQ, инструкции и шаблоны ответов</h2>
          <p>Отдельный раздел для самообслуживания и ускорения работы операторов и специалистов.</p>
        </div>
      </section>

      <section class="kb-grid">
        ${knowledgeBase
          .map(
            (item) => `
            <article class="kb-card">
              <span class="module-tag">${escapeHtml(item.category)}</span>
              <h4>${escapeHtml(item.title)}</h4>
              <p>${escapeHtml(item.summary)}</p>
              <div class="ticket-tags">
                ${item.tags.map((tag) => `<span class="badge info">${escapeHtml(tag)}</span>`).join('')}
              </div>
            </article>
          `,
          )
          .join('')}
      </section>

      <section class="queue-grid">
        <article class="queue-card">
          <h4>Кабинет пользователя</h4>
          <ul class="kb-list">
            <li>История обращений и статусы текущих заявок</li>
            <li>Архив закрытых кейсов</li>
            <li>Оценка качества после выполнения работ</li>
          </ul>
        </article>
        <article class="queue-card">
          <h4>Шаблоны ответов</h4>
          <ul class="response-list">
            <li>Подтверждение регистрации обращения</li>
            <li>Запрос дополнительной информации</li>
            <li>Подтверждение завершения работ</li>
          </ul>
        </article>
      </section>
    </main>
  `;
}

function renderAnalyticsPage() {
  document.title = pages.analytics.title;
  const user = getCurrentUser();

  return `
    ${renderHeader(user)}
    <main class="page-container">
      <section class="workspace-header">
        <div>
          <p>Аналитика и KPI</p>
          <h2>Отчёты по SLA, загрузке и качеству</h2>
          <p>Раздел отчётности вынесен отдельно, чтобы не смешивать его с операционной работой по тикетам.</p>
        </div>
      </section>

      <section class="analytics-grid">
        ${[
          ['Среднее время решения', '3.2 часа', 'Сводный показатель по обращениям'],
          ['Выполнение в срок', '92%', 'Доля заявок внутри SLA'],
          ['Повторные обращения', '6.3%', 'Ниже целевого лимита'],
          ['Нагрузка специалиста', '12 заявок/смена', 'Средняя загрузка выездного сотрудника'],
          ['Узкие места', 'Лифты и участок №4', 'Наибольший риск по просрочкам'],
          ['CSAT', '4.7/5', 'Средняя оценка клиентов'],
        ]
          .map(
            ([title, value, text]) => `
            <article class="analytics-card">
              <h4>${escapeHtml(title)}</h4>
              <div class="value">${escapeHtml(value)}</div>
              <p>${escapeHtml(text)}</p>
            </article>
          `,
          )
          .join('')}
      </section>

      <section class="queue-grid">
        <article class="queue-card">
          <h4>Отчёт по сотрудникам</h4>
          <table class="table">
            <thead>
              <tr><th>Сотрудник</th><th>Роль</th><th>Заявок</th><th>SLA</th></tr>
            </thead>
            <tbody>
              <tr><td>Иван Петров</td><td>Специалист участка</td><td>12</td><td>94%</td></tr>
              <tr><td>Ольга Романова</td><td>Диспетчер</td><td>31</td><td>96%</td></tr>
              <tr><td>Подрядчик ЛифтСервис</td><td>Подрядчик</td><td>5</td><td>81%</td></tr>
            </tbody>
          </table>
        </article>
        <article class="queue-card">
          <h4>Оценки клиентов</h4>
          <ul class="activity-feed">
            ${surveys.map((survey) => `<li>${escapeHtml(survey.ticketId)} — ${survey.score}/5 — ${escapeHtml(survey.feedback)}</li>`).join('')}
          </ul>
        </article>
      </section>
    </main>
  `;
}

function renderIntegrationsPage() {
  document.title = pages.integrations.title;
  const user = getCurrentUser();

  return `
    ${renderHeader(user)}
    <main class="page-container">
      <section class="workspace-header">
        <div>
          <p>Интеграции, активы и безопасность</p>
          <h2>Внешние системы и операционная инфраструктура</h2>
          <p>Свели в отдельный раздел технические возможности пилота, чтобы не перегружать основные страницы.</p>
        </div>
      </section>

      <section class="integrations-grid">
        ${integrations
          .map(
            (item) => `
            <article class="integration-card">
              <span class="mode-chip ${item.status === 'planned' ? 'warning' : item.status === 'pilot' ? 'info' : 'success'}">${escapeHtml(item.status)}</span>
              <h4>${escapeHtml(item.title)}</h4>
              <p>${escapeHtml(item.description)}</p>
            </article>
          `,
          )
          .join('')}
      </section>

      <section class="assets-grid" style="margin-top:18px;">
        ${assets
          .map(
            (item) => `
            <article class="asset-card">
              <h4>${escapeHtml(item.name)}</h4>
              <p>${escapeHtml(item.note)}</p>
              <div class="ticket-tags">
                <span class="badge info">${escapeHtml(item.id)}</span>
                <span class="badge info">${escapeHtml(item.type)}</span>
                <span class="badge ${badgeClass(item.status)}">${escapeHtml(item.status)}</span>
              </div>
            </article>
          `,
          )
          .join('')}
      </section>

      <section class="settings-grid" style="margin-top:18px;">
        <article class="settings-card">
          <h4>Безопасность доступа</h4>
          <p>Для демо используется локальная фейк-авторизация, но в концепции предусмотрены роли, 2FA и журнал аудита.</p>
          <ul class="audit-list">
            <li>Главный администратор</li>
            <li>Диспетчер / оператор</li>
            <li>Специалист участка</li>
          </ul>
        </article>
        <article class="settings-card">
          <h4>Аудит и контроль</h4>
          <p>Все изменения по заявкам, маршрутизации и SLA должны логироваться в production-версии.</p>
          <ul class="audit-list">
            <li>Создание заявки</li>
            <li>Назначение исполнителя</li>
            <li>Изменение статуса</li>
            <li>Внутренние комментарии</li>
          </ul>
        </article>
      </section>
    </main>
  `;
}

function bindCommonEvents() {
  document.querySelectorAll('[data-page]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      setPage(link.dataset.page);
    });
  });

  const logoutButton = document.querySelector('[data-action="logout"]');
  if (logoutButton) logoutButton.addEventListener('click', logout);

  const toTickets = document.querySelector('[data-action="go-tickets"]');
  if (toTickets) toTickets.addEventListener('click', () => setPage('tickets'));

  const toIntake = document.querySelector('[data-action="go-intake"]');
  if (toIntake) toIntake.addEventListener('click', () => setPage('intake'));
}

function bindTicketEvents() {
  document.querySelectorAll('[data-ticket]').forEach((card) => {
    card.addEventListener('click', () => {
      state.activeTicketId = card.dataset.ticket;
      render();
    });
  });

  const statusFilter = document.querySelector('#filter-status');
  if (statusFilter) statusFilter.addEventListener('change', (event) => {
    state.filters.status = event.target.value;
    render();
  });

  const priorityFilter = document.querySelector('#filter-priority');
  if (priorityFilter) priorityFilter.addEventListener('change', (event) => {
    state.filters.priority = event.target.value;
    render();
  });

  const categoryFilter = document.querySelector('#filter-category');
  if (categoryFilter) categoryFilter.addEventListener('change', (event) => {
    state.filters.category = event.target.value;
    render();
  });

  const assignButton = document.querySelector('[data-action="assign-ticket"]');
  if (assignButton) {
    assignButton.addEventListener('click', () => {
      assignTicket(state.activeTicketId, document.querySelector('#assignee-select').value);
    });
  }

  const statusButton = document.querySelector('[data-action="change-status"]');
  if (statusButton) {
    statusButton.addEventListener('click', () => {
      changeStatus(state.activeTicketId, document.querySelector('#status-select').value);
    });
  }

  const commentButton = document.querySelector('[data-action="add-comment"]');
  if (commentButton) {
    commentButton.addEventListener('click', () => {
      state.newComment.text = document.querySelector('#comment-text').value;
      state.newComment.visibility = document.querySelector('#comment-visibility').value;
      addComment();
    });
  }

  const closeButton = document.querySelector('[data-action="close-ticket"]');
  if (closeButton) closeButton.addEventListener('click', () => changeStatus(state.activeTicketId, 'Закрыта'));

  const createButton = document.querySelector('[data-action="create-ticket"]');
  if (createButton) {
    createButton.addEventListener('click', () => {
      createTicket();
    });
  }
}

function renderWorkspace() {
  switch (state.currentPage) {
    case 'dashboard':
      app.innerHTML = renderDashboardPage();
      break;
    case 'tickets':
      app.innerHTML = renderTicketsPage();
      break;
    case 'intake':
      app.innerHTML = renderIntakePage();
      break;
    case 'knowledge':
      app.innerHTML = renderKnowledgePage();
      break;
    case 'analytics':
      app.innerHTML = renderAnalyticsPage();
      break;
    case 'integrations':
      app.innerHTML = renderIntegrationsPage();
      break;
    default:
      app.innerHTML = renderDashboardPage();
      break;
  }

  bindCommonEvents();
  if (state.currentPage === 'tickets') bindTicketEvents();
  if (state.currentPage === 'intake') {
    const createButton = document.querySelector('[data-action="create-ticket"]');
    if (createButton) createButton.addEventListener('click', createTicket);
  }
}

function render() {
  if (!state.currentUser) {
    renderLoginPage();
    return;
  }

  renderWorkspace();
}

render();
