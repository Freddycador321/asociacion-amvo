export interface Usuario {
  id:number;
  nombre:string;
  apellido:string;
  username:string;
  rol:number;
  imagen:string;
  password:string;
  sucursal_id?:number;
  numero?:number;
  direccion?:string;
  token?:string;
}
