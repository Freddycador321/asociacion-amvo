export interface Producto {
  id:number,
  codigo:number,
  descripcion:string,
  imagen:string,
  stock:number,
  cantidad_minima:number,
  precio_compra:number,
  precio_venta:number,
  categoria_id:number,
  direccion?:string,
  numero?:number,
  categoriaGrupo?:string,
}
