//Modelo para crear una nuevo producto
export class ProductosModuleCocinasNuevos {
  id?: number;
  "nombre": string;
  "descripcion": string;
  "categoria": ModeloCategorias;
  // "precio": string;
  "imagen":Imagen[];
  "public_id":string;

}

//Modelo para crear una nueva categoria
export class ModeloCategorias {
  "idCategoria": number;
  "nombreCategoria": string;
  descripcionCategoria?:string
}

export class Imagen{
  idImagen?:number;
  "nombre_imagen":string;
  "url_imagen":string;
}




//Modelo para el envio de correo
export class Email {
  "nombre": string;
  "correoCliente":string;
  "asunto": string;
  "mensaje": string;
}




















//Modelo de Prueba
export class ProductosModuleCocinas {
  "categoria": string;
  "titulo": string;
  "descripcion": string;
  "url": string

}

//Modelo de prueba
export class ProductosModule {
  "nombre": string;
  "url": string
}
