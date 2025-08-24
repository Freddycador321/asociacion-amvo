import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { FormularioComponent } from './formulario/formulario.component';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { faPlus,faEdit,faTrash,faEye } from '@fortawesome/free-solid-svg-icons';
import { Permisos } from 'src/app/core/permisos';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit{
  faPlus=faPlus
  faTrash=faTrash
  faEdit=faEdit
  faEye=faEye
  permisos = new Permisos()
  proveedores:Proveedor[]
  constructor(private proveedorServicio:ProveedorService, private route:Router,private toastr: ToastrService,private dialog:MatDialog,private dialogo:MatDialog){}
  isEncargado():boolean{
    return this.permisos.isEncargado()
  }
  isAdmin():boolean{
    return this.permisos.isAdmin()
  }
  ngOnInit(): void {
    this.proveedorServicio.listar().subscribe(data=>{
      this.proveedores=data
    })
  }
  filterpost=[];
  agregar() {
    let prov: Proveedor={id:0,nombre:"",celular:"",observacion:"",apellido:"",empresa:""};
    const dialogo1 = this.dialog.open(FormularioComponent, {data:{proveedor:prov,texto:"Nuevo Proveedor"}});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined){
        prov={
          id:0,
          nombre:art.value.nombre,
          celular:art.value.celular,
          empresa:art.value.empresa,
          apellido:art.value.apellido,
          observacion:art.value.observacion,
        }
        console.log(prov)
        this.proveedorServicio.nuevo(prov).subscribe(data=>{
          this.proveedores=data
          Swal.fire({
            icon: "success",
            title: "Satisfactorio",
            text: "Proveedor Registrado Correctamente",
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
  actualizar(item:Proveedor):void {
    let prov:Proveedor
    const dialogo1 = this.dialog.open(FormularioComponent, {data:{proveedor:item,texto:"Editar Proveedor"}});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined){
        prov={
          id:item.id,
          nombre:art.value.nombre,
          apellido:art.value.apellido,
          empresa:art.value.empresa,
          celular:art.value.celular,
          observacion:art.value.observacion,
        }
        this.proveedorServicio.actualizar(item.id,prov).subscribe(data=>{
          this.proveedores=data
          Swal.fire({
            icon: "success",
            title: "Satisfactorio",
            text: "Cliente Actualizado Correctamente",
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
  eliminar(item:Proveedor): void {
    Swal.fire({
      title: 'Seguro de Eliminar este cliente?',
      text: item.nombre+" "+item.apellido,
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
            text: "Cliente Eliminado Correctamente",
            showConfirmButton: false,
            timer: 1500
        });
        this.proveedorServicio.eliminar(item.id).subscribe(data=>{
          this.proveedores=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el Cliente",
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }
}
