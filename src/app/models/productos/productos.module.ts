export class ProductosModuleCocinas {
  "categoria":string;
  "titulo":string;
  "descripcion":string;
  "url":string

}


export class ProductosModuleCocinasNuevos {
  id?: number; // opcional, porque es nuevo
  "categoria":string;
  "nombre":string;
  "descripcion":string;
  "precio":string

}


// Modelo de respuesta genérica que devuelve tu backend
export interface GenericResponse<T> {
  code: number;
  message: string;
  data: T;
}
