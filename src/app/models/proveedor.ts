import { Item } from "./item"

export interface Proveedor {
  id:number,
  nombre:string,
  apellido:string,
  empresa:string,
  celular:string,
  observacion?:string
  items?:Item[]
}
