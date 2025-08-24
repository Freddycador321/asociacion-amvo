import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faPlus,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';
import { Sucursal } from 'src/app/models/sucursal';
import { SucursalService } from 'src/app/services/sucursal.service';
import { ProductoformularioComponent } from './productoformulario/productoformulario.component';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { environment } from 'src/environments/environments.prod';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit{
  faPlus=faPlus
  faTrash=faTrash
  faEdit=faEdit
  base=environment.base;
  filterpost='';
  sucursales:Sucursal[]=[]
  sucursal:Sucursal={id:0,imagen:'',direccion:'',numero:0}
  categoria:Categoria={id:0,grupo:'',codigo:'',sucursal_id:0}
  categorias:Categoria[]=[]
  productos:Producto[]=[]
  user:Usuario;
  constructor(
      private authServicio:AuthService,
      private sucursalServicio:SucursalService,
      private categoriaServicio:CategoriaService,
      private productoServicio:ProductoService,
      private route:Router,
      private toastr: ToastrService,
      private dialog:MatDialog,
      public dialogo: MatDialog,
  ) {}
  ngOnInit(): void {
    this.user=this.authServicio.usuarioActualValue
    if(this.user.rol==2 && this.user.sucursal_id!=undefined)
      this.sucursalServicio.buscar(this.user.sucursal_id).subscribe(data=>{
        this.sucursal={
          id:data.id,
          direccion:data.direccion,
          imagen:data.imagen,
          numero:data.numero
        }
        this.mostrarCategorias(this.sucursal)
      })
    else
      this.sucursalServicio.listar().subscribe(data=>{
        this.sucursales=data
      })
  }
  llenar_imagen(img:string){
    return this.base+img;
  }
  mostrarCategorias(item:Sucursal):void{
    this.sucursal=item
    this.categoriaServicio.listarPorSucursal(item.id).subscribe(data=>{
      this.categorias=data
      console.log(data)
    })
  }
  isactive(id:number):Boolean{
    let item=localStorage.getItem('productoId')
    let value=(item==null)?0:(+item)
    return value==id
3.  }
  mostrarProductos(item:Categoria):void{
    localStorage.setItem('productoId',item.id+"")
    this.categoria=item
    this.productoServicio.listarPorCategoria(item.id).subscribe(data=>{
      this.productos=data
      console.log(data)
    })
  }
  actualizar(item:Producto,i:number):void {
    let prod: Producto;
    const dialogo1 = this.dialog.open(ProductoformularioComponent, {data:{producto:item,texto:"Editar Producto"}});
    dialogo1.afterClosed().subscribe(art => {
      if (art!= undefined){
        prod={
          id:item.id,
          codigo:art.value.codigo,
          descripcion:art.value.descripcion,
          stock:art.value.stock,
          cantidad_minima:art.value.cantidad_minima,
          precio_compra:art.value.precio_compra,
          precio_venta:art.value.precio_venta,
          categoria_id:art.value.categoria_id,
          imagen:art.value.nombreImagen
        }
        this.productoServicio.actualizar(item.id,prod).subscribe(data=>{
          this.productos[i]=data
          Swal.fire({
            icon: "success",
            title: "Satisfactorio",
            text: "Producto Actualizado Correctamente",
            showConfirmButton: false,
            timer: 1500
          });
        },
        error=>{
          this.toastr.error('Error','Operacion Fallida')
        })
      }
      else
      this.toastr.info('Operacion Cancelada','');
    });
  }
  agregar():void{
    let lastitem=this.productos[this.productos.length-1]
    let lastcode=0
    if(lastitem!=undefined)
        lastcode=lastitem.codigo+1
    else
      lastcode=1
    let prod:Producto;
    prod={
      id:0,
      codigo:lastcode,
      descripcion:'',
      stock:0,
      cantidad_minima:0,
      precio_compra:0,
      precio_venta:0,
      categoria_id:0,
      imagen:''
    }
    const dialogo1 = this.dialog.open(ProductoformularioComponent, {data:{producto:prod,texto:"Nuevo Producto"}});
    dialogo1.afterClosed().subscribe(art => {
      if (art!= undefined){
        console.log(art.value)
        prod={
          id:0,
          codigo:art.value.codigo,
          descripcion:art.value.descripcion,
          stock:art.value.stock,
          cantidad_minima:art.value.cantidad_minima,
          precio_compra:art.value.precio_compra,
          precio_venta:art.value.precio_venta,
          categoria_id:this.categoria.id,
          imagen:art.value.nombreImagen
        }
        prod.categoria_id=this.categoria.id
        this.productoServicio.nuevo(prod).subscribe(data=>{
          this.productos=data
          Swal.fire({
            icon: "success",
            title: "Satisfactorio",
            text: "Producto Registrado Correctamente",
            showConfirmButton: false,
            timer: 1500
          });
        },
        error=>{
          this.toastr.error('Error','Operacion Fallida')
        })
      }
      else
      this.toastr.info('Operacion Cancelada','');
    }
    );
  }
  eliminar(item:Producto): void {
    Swal.fire({
      title: 'Seguro de Eliminar este registro?',
      text: item.codigo+""+item.descripcion,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor:'#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor:'#d33'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
            icon: "success",
            title: "Satisfactorio",
            text: "Producto Eliminado Correctamente",
            showConfirmButton: false,
            timer: 1500
        });
        this.productoServicio.eliminar(item.id).subscribe(data=>{
          this.productos=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el Categoria",
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

}

