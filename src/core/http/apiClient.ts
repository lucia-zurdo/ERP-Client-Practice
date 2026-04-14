const BASE_URL = 'https://localhost:7040/api';

// Función inyectable para obtener el token desde Auth0
let _getToken: (() => Promise<string>) | null = null;
let _onUnauthorized: (() => void) | null = null;

export function setTokenGetter(fn: () => Promise<string>) {
  _getToken = fn;
}

export function setUnauthorizedHandler(fn: () => void) {  // ← nuevo
  _onUnauthorized = fn;
}

async function getAuthHeaders(): Promise<HeadersInit> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (_getToken) {
    try {
      const token = await _getToken();
      headers['Authorization'] = `Bearer ${token}`;
    } catch {
      // Si falla obtener el token, la request irá sin él (el backend devolverá 401)
    }
  }
  return headers;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('UNAUTHORIZED');
    }
    if (response.status === 403) {
      // Notificamos a la app sin recargar la página
      _onUnauthorized?.();
      throw new Error('FORBIDDEN');
    }
    let error: Record<string, unknown> = {};
    try {
      error = await response.json();
    } catch {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    if (error.errors) {
      const mensajes = Object.values(error.errors as Record<string, string[]>)
        .flat()
        .filter(msg => !msg.includes('dto field is required'))
        .join(', ');
      throw new Error(mensajes || 'Error de validación');
    }
    throw new Error((error.mensaje as string) || 'Error en la petición');
  }
  return response.json();
}

export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    const headers = await getAuthHeaders();
    return fetch(`${BASE_URL}${endpoint}`, { headers })
      .then(res => handleResponse<T>(res));
  },

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    const headers = await getAuthHeaders();
    return fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    }).then(res => handleResponse<T>(res));
  },

  async put<T>(endpoint: string, body: unknown): Promise<T> {
    const headers = await getAuthHeaders();
    return fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    }).then(res => handleResponse<T>(res));
  },

  async delete(endpoint: string, body?: unknown): Promise<void> {
    const headers = await getAuthHeaders();
    return fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }).then(res => handleResponse<void>(res));
  },
};