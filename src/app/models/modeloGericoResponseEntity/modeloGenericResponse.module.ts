// Modelo de respuesta genérica que devuelve tu backend
export interface GenericResponse<T> {
  code: number;
  message: string;
  data: T;
}
