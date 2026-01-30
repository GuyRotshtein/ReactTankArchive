const API_BASE = import.meta.env.VITE_API_BASE || '';

async function apiFetch(path, options) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    },
    ...options
  });

  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      msg = body?.message || msg;
    } catch {
      // ignore JSON parse issues
    }
    throw new Error(msg);
  }

  return res.json();
}

export const tanksApi = {
  list: () => apiFetch('/api/tanks'),
  get: (id) => apiFetch(`/api/tanks/${id}`),
  create: (payload) => apiFetch('/api/tanks', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) => apiFetch(`/api/tanks/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  remove: (id) => apiFetch(`/api/tanks/${id}`, { method: 'DELETE' })
};
