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
import { CategoriaformularioComponent } from './categoriaformulario/categoriaformulario.component';
import { environment } from 'src/environments/environments.prod';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  faPlus=faPlus
  faTrash=faTrash
  faEdit=faEdit
  base=environment.base+'sucursal/imagen/';
  filterpost='';
  sucursales:Sucursal[]=[]
  sucursal:Sucursal={id:0,imagen:'',direccion:'',numero:0}
  categorias:Categoria[]=[]
  user:Usuario
  constructor(
    private authServicio:AuthService,
    private sucursalServicio:SucursalService,
    private categoriaServicio:CategoriaService,
    private route:Router,
    private toastr: ToastrService,
    private dialog:MatDialog,
    public dialogo: MatDialog
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
    })
  }
  actualizar(item:Categoria):void {
    let cat: Categoria;
    const dialogo1 = this.dialog.open(CategoriaformularioComponent, {data:{categoria:item,texto:"Editar Categoria"}});
    dialogo1.afterClosed().subscribe(art => {
      if (art!= undefined){
        cat={
          id:item.id,
          grupo:art.value.grupo,
          sucursal_id:art.value.sucursal_id,
          codigo:art.value.codigo
        }
        this.categoriaServicio.actualizar(item.id,cat).subscribe(data=>{
          this.categorias=data
          Swal.fire({
            icon: "success",
            title: "Satisfactorio",
            text: "Categoria Actualizado Correctamente",
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
    let cat:Categoria;
    cat={
      id:0,
      grupo:'',
      sucursal_id:0,
      codigo:''
    }
    const dialogo1 = this.dialog.open(CategoriaformularioComponent, {data:{categoria:cat,texto:"Nuevo Categoria"}});
    dialogo1.afterClosed().subscribe(art => {
      if (art!= undefined){
        cat={
          id:0,
          grupo:art.value.grupo,
          sucursal_id:art.value.sucursal_id,
          codigo:art.value.codigo
        }
        cat.sucursal_id=this.sucursal.id
        this.categoriaServicio.nuevo(cat).subscribe(data=>{
          this.categorias=data
          Swal.fire({
            icon: "success",
            title: "Satisfactorio",
            text: "Categoria Registrado Correctamente",
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
  eliminar(cat:Categoria): void {
    Swal.fire({
      title: 'Seguro de Eliminar este registro?',
      text: cat.grupo,
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
            text: "Categoria Eliminado Correctamente",
            showConfirmButton: false,
            timer: 1500
        });
        this.categoriaServicio.eliminar(cat.id).subscribe(data=>{
          this.categorias=data
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
}
