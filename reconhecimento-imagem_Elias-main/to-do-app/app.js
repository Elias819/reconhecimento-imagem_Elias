// app.js — TaskFlow To-Do App
// Persistência via localStorage, sem backend, sem frameworks

// ─── DB Helpers ────────────────────────────────────────────────────────────────

function getDB() {
  const raw = localStorage.getItem('db');
  if (!raw) {
    const initial = { users: [], todos: [] };
    localStorage.setItem('db', JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(raw);
}

function saveDB(db) {
  localStorage.setItem('db', JSON.stringify(db));
}

function getCurrentUser() {
  const raw = localStorage.getItem('currentUser');
  return raw ? JSON.parse(raw) : null;
}

function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

function clearCurrentUser() {
  localStorage.removeItem('currentUser');
}

// ─── View Router ────────────────────────────────────────────────────────────────

const authView      = document.getElementById('auth-view');
const dashboardView = document.getElementById('dashboard-view');
const loginSection  = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');

function showView(view) {
  authView.classList.add('hidden');
  dashboardView.classList.add('hidden');
  authView.classList.remove('hidden');      // default reset
  authView.classList.add('hidden');
  dashboardView.classList.add('hidden');

  if (view === 'login') {
    authView.classList.remove('hidden');
    loginSection.classList.remove('hidden');
    registerSection.classList.add('hidden');
  } else if (view === 'register') {
    authView.classList.remove('hidden');
    loginSection.classList.add('hidden');
    registerSection.classList.remove('hidden');
  } else if (view === 'dashboard') {
    dashboardView.classList.remove('hidden');
  }
}

// ─── Error Display ─────────────────────────────────────────────────────────────

function showError(el, msg) {
  el.textContent = msg;
  el.classList.remove('hidden');
}

function hideError(el) {
  el.classList.add('hidden');
  el.textContent = '';
}

// ─── Auth: Login ───────────────────────────────────────────────────────────────

const loginForm     = document.getElementById('login-form');
const loginEmail    = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginError    = document.getElementById('login-error');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  hideError(loginError);

  const email = loginEmail.value.trim();
  const pass  = loginPassword.value.trim();

  if (!email || !pass) {
    showError(loginError, 'Preencha e-mail e senha para continuar.');
    return;
  }

  const db   = getDB();
  const user = db.users.find(u => u.email === email);

  if (!user) {
    showError(loginError, 'E-mail não encontrado. Cadastre-se primeiro.');
    return;
  }

  if (user.password !== pass) {
    showError(loginError, 'Senha incorreta. Tente novamente.');
    return;
  }

  setCurrentUser(user);
  loginForm.reset();
  initDashboard(user);
});

// ─── Auth: Cadastro ────────────────────────────────────────────────────────────

const registerForm     = document.getElementById('register-form');
const regName          = document.getElementById('reg-name');
const regEmail         = document.getElementById('reg-email');
const regPassword      = document.getElementById('reg-password');
const registerError    = document.getElementById('register-error');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  hideError(registerError);

  const name  = regName.value.trim();
  const email = regEmail.value.trim();
  const pass  = regPassword.value.trim();

  if (!name || !email || !pass) {
    showError(registerError, 'Todos os campos são obrigatórios.');
    return;
  }

  if (pass.length < 6) {
    showError(registerError, 'A senha deve ter no mínimo 6 caracteres.');
    return;
  }

  const db = getDB();

  if (db.users.some(u => u.email === email)) {
    showError(registerError, 'Este e-mail já está cadastrado. Faça login.');
    return;
  }

  const newUser = { id: Date.now().toString(), name, email, password: pass };
  db.users.push(newUser);
  saveDB(db);

  setCurrentUser(newUser);
  registerForm.reset();
  initDashboard(newUser);
});

// ─── Navigation Buttons ────────────────────────────────────────────────────────

document.getElementById('go-register').addEventListener('click', () => {
  hideError(loginError);
  loginForm.reset();
  showView('register');
});

document.getElementById('go-login').addEventListener('click', () => {
  hideError(registerError);
  registerForm.reset();
  showView('login');
});

// ─── Logout ────────────────────────────────────────────────────────────────────

document.getElementById('logout-btn').addEventListener('click', () => {
  clearCurrentUser();
  showView('login');
});

// ─── Dashboard ─────────────────────────────────────────────────────────────────

const todoList   = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');

function initDashboard(user) {
  document.getElementById('header-username').textContent  = user.name;
  document.getElementById('greeting-username').textContent = user.name.split(' ')[0];
  showView('dashboard');
  renderTodos(user.email);
}

// ─── Todo: Adicionar ───────────────────────────────────────────────────────────

const todoForm  = document.getElementById('todo-form');
const todoTitle = document.getElementById('todo-title');
const todoType  = document.getElementById('todo-type');
const todoDesc  = document.getElementById('todo-desc');
const todoError = document.getElementById('todo-error');

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  hideError(todoError);

  const title = todoTitle.value.trim();
  const type  = todoType.value;
  const desc  = todoDesc.value.trim();

  if (!title) {
    showError(todoError, 'O título da tarefa é obrigatório.');
    todoTitle.focus();
    return;
  }

  const user = getCurrentUser();
  const db   = getDB();

  const newTodo = {
    id:          Date.now().toString(),
    userId:      user.email,
    title,
    type,
    description: desc,
    done:        false,
    createdAt:   new Date().toISOString(),
  };

  db.todos.push(newTodo);
  saveDB(db);

  todoForm.reset();
  renderTodos(user.email);
});

// ─── Todo: Concluir ────────────────────────────────────────────────────────────

function completeTodo(id) {
  const db   = getDB();
  const todo = db.todos.find(t => t.id === id);
  if (todo) {
    todo.done = true;
    saveDB(db);
    const user = getCurrentUser();
    renderTodos(user.email);
  }
}

// ─── Todo: Render ──────────────────────────────────────────────────────────────

const TYPE_CONFIG = {
  'Trabalho': { badge: 'badge-work',     label: '💼 Trabalho' },
  'Pessoal':  { badge: 'badge-personal', label: '👤 Pessoal'  },
  'Estudos':  { badge: 'badge-study',    label: '📚 Estudos'  },
};

function renderTodos(userId) {
  const db = getDB();

  // Filtrar por usuário e ordenar: pendentes primeiro
  const myTodos = db.todos
    .filter(t => t.userId === userId)
    .sort((a, b) => {
      if (a.done === b.done) return new Date(b.createdAt) - new Date(a.createdAt);
      return a.done ? 1 : -1;
    });

  // Stats
  const total   = myTodos.length;
  const done    = myTodos.filter(t => t.done).length;
  const pending = total - done;
  document.getElementById('stat-total').textContent   = total;
  document.getElementById('stat-pending').textContent = pending;
  document.getElementById('stat-done').textContent    = done;

  // Empty state
  if (total === 0) {
    todoList.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');

  todoList.innerHTML = myTodos.map(todo => {
    const config = TYPE_CONFIG[todo.type] || TYPE_CONFIG['Pessoal'];
    const descHTML = todo.description
      ? `<p class="text-slate-400 text-sm mt-2 leading-relaxed">${escapeHtml(todo.description)}</p>`
      : '';
    const doneIcon = todo.done
      ? `<svg class="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
           <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
         </svg>`
      : '';

    return `
      <div class="glass rounded-xl p-5 fade-in ${todo.done ? 'todo-done' : ''}">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap mb-2">
              <span class="text-xs font-semibold px-2.5 py-1 rounded-full ${config.badge}">${config.label}</span>
              ${todo.done ? '<span class="text-xs text-emerald-400 font-medium flex items-center gap-1">' + doneIcon + ' Concluída</span>' : ''}
            </div>
            <h3 class="todo-title text-white font-semibold text-base leading-snug">${escapeHtml(todo.title)}</h3>
            ${descHTML}
          </div>
          <div class="flex-shrink-0">
            <button
              onclick="completeTodo('${todo.id}')"
              class="btn-success px-3 py-2 text-xs flex items-center gap-1.5"
              ${todo.done ? 'disabled' : ''}
              title="${todo.done ? 'Tarefa concluída' : 'Marcar como concluída'}"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
              </svg>
              ${todo.done ? 'Feito' : 'Concluir'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ─── Utils ─────────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ─── Init ──────────────────────────────────────────────────────────────────────

(function init() {
  // Garantir estrutura base no localStorage
  getDB();

  const user = getCurrentUser();
  if (user) {
    initDashboard(user);
  } else {
    showView('login');
  }
})();
