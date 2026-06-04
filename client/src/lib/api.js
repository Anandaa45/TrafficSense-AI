const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

async function getErrorMessage(response, fallback) {
  try {
    const data = await response.json();
    return data.message || data.error || fallback;
  } catch {
    return fallback;
  }
}

export async function apiGet(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, 'Gagal mengambil data dari server'));
  }

  return response.json();
}

export async function apiPost(path, payload) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, 'Gagal mengirim data ke server'));
  }

  return response.json();
}

export async function apiPostForm(path, formData) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, 'Gagal mengirim file ke server'));
  }

  const data = await response.json();

  if (data.status === 'error') {
    throw new Error(data.message || 'Analisis AI gagal');
  }

  return data;
}

export const api = {
  get: apiGet,
  post: apiPost,
  postForm: apiPostForm,
};
