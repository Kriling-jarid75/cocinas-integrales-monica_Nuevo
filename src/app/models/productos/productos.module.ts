//Modelo para crear una nuevo producto
export class ProductosModuleCocinasNuevos {
  id?: number;
  "nombre": string;
  "descripcion": string;
  "categoria": ModeloCategorias;
 // "precio": string;

}

//Modelo para crear una nueva categoria
export class ModeloCategorias {
  "idCategoria": number;
  "nombreCategoria": string;
}

//Modelo de Prueba
export class ProductosModuleCocinas {
  "categoria":string;
  "titulo":string;
  "descripcion":string;
  "url":string

}

//Modelo de prueba
export class ProductosModule {
  "nombre": string;
  "url": string
}
