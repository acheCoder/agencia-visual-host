// src/network/fetchUtils.ts

// 1. Contrato inmutable para la UI
export interface ResponseMessageContract {
  code: string;
  message: string;
  details?: unknown;
}

// 2. Emisor de eventos global (desacoplado del store)
export const eventEmitter = {
  emit: (event: string, payload: unknown) => {
    document.dispatchEvent(new CustomEvent(event, { detail: payload }));
  }
};

// 3. Normalización y parseo de errores
export const defaultFetchError: ResponseMessageContract = {
  code: 'NETWORK_ERROR',
  message: 'Error de conexión no controlado',
};

const parseErrors = async (response: Response): Promise<ResponseMessageContract> => {
  try {
    const data = await response.json();
    return {
      code: data?.code || `HTTP_${response.status}`,
      message: data?.message || 'Error en la respuesta del servidor',
      details: data?.details,
    };
  } catch {
    return {
      code: `HTTP_${response.status}`,
      message: response.statusText,
    };
  }
};

const normalizeErrors = (error: unknown): ResponseMessageContract => {
  if (typeof error === 'object' && error !== null && 'code' in error && 'message' in error) {
    return error as ResponseMessageContract;
  }
  return defaultFetchError;
};

// 4. Interceptor Core
export const fetchUtils = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const headers = new Headers(options.headers || {});
  
  // Centralización de cabeceras estándar y CSRF
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  // headers.set('X-CSRF-Token', 'tu-logica-csrf-aqui');

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const parsedError = await parseErrors(response);
      throw parsedError; // Se lanza tipado hacia el catch
    }

    return (await response.json()) as T;
  } catch (error) {
    const normalizedError = normalizeErrors(error);
    
    // Emisión global para que la UI reaccione (ej: Toasts o modales de error)
    eventEmitter.emit('ON_GLOBAL_ERROR', normalizedError);
    
    throw normalizedError;
  }
};