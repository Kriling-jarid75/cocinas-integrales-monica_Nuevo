export class ProductosModuleCocinas {
  "categoria":string;
  "titulo":string;
  "descripcion":string;
  "url":string

}


//creacion de un producto nuevo con una categoria
export class ProductosModuleCocinasNuevos {
  id?: number;
  "nombre": string;
  "descripcion": string;
  "categoria": ModeloCategorias;
 // "precio": string;

}

//Gestion de una categoria nueva
export class ModeloCategorias {
  "idCategoria": number;
  "nombreCategoria": string;
}


