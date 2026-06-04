const USERS_KEY = 'trafficSense_local_users';

const demoUsers = [
  {
    id: 1,
    username: 'Admin',
    email: 'admin@gmail.com',
    role: 'Operator Lalu Lintas',
    password: '12345678',
  },
  {
    id: 2,
    username: 'Admin',
    email: 'admin@gmail.com',
    role: 'Operator Lalu Lintas',
    password: 'admin12345',
  },
];

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerLocalUser(form) {
  const users = readUsers();
  const normalizedEmail = form.email.trim().toLowerCase();
  const allUsers = [...demoUsers, ...users];

  if (allUsers.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    throw new Error('Email sudah terdaftar.');
  }

  const user = {
    id: Date.now(),
    username: form.username.trim(),
    email: form.email.trim(),
    role: form.role?.trim() || 'Operator Lalu Lintas',
    password: form.password,
  };

  users.push(user);
  writeUsers(users);

  const { password: hidden, ...safeUser } = user;
  return { message: 'Registrasi lokal berhasil.', user: safeUser };
}

export function loginLocalUser(form) {
  const email = form.email.trim().toLowerCase();
  const users = [...demoUsers, ...readUsers()];
  const user = users.find((item) => item.email.toLowerCase() === email && item.password === form.password);

  if (!user) {
    throw new Error('Email atau password salah.');
  }

  const { password: hidden, ...safeUser } = user;

  return {
    message: 'Login lokal berhasil.',
    token: `local-${Date.now()}`,
    user: safeUser,
  };
}
