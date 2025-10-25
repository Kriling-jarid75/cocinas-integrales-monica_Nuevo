// api-responses.ts
export enum API_RESPONSE_CODES {
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export const API_RESPONSE_MESSAGES: Record<API_RESPONSE_CODES, string> = {
  [API_RESPONSE_CODES.SUCCESS]: 'Operación exitosa.',
  [API_RESPONSE_CODES.CREATED]: 'Recurso creado exitosamente.',
  [API_RESPONSE_CODES.NO_CONTENT]: 'Petición procesada, sin contenido para mostrar.',
  [API_RESPONSE_CODES.BAD_REQUEST]: 'La petición no es válida.',
  [API_RESPONSE_CODES.UNAUTHORIZED]: 'Credenciales de autenticación inválidas o faltantes.',
  [API_RESPONSE_CODES.FORBIDDEN]: 'No tiene permiso para acceder a este recurso.',
  [API_RESPONSE_CODES.NOT_FOUND]: 'El recurso solicitado no se encontró.',
  [API_RESPONSE_CODES.INTERNAL_SERVER_ERROR]: 'Ocurrió un error en el servidor.',
};

