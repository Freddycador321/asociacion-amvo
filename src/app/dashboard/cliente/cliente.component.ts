import { Component } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { FormularioComponent } from './formulario/formulario.component';
import { faPlus,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  faPlus=faPlus
  faTrash=faTrash
  faEdit=faEdit
  displayedColumns: string[] = ['nit', 'nombre','opcion'];
  // dataSource = ELEMENT_DATA;
  clientes:Cliente[]=[];
  constructor(private clienteServicio:ClienteService, private route:Router,private toastr: ToastrService,private dialog:MatDialog,private dialogo:MatDialog) {
  }
  ngOnInit(): void {
    this.clienteServicio.listar().subscribe(data=>{
      this.clientes=data;
    });
  }
  filterpost=[];
  agregar() {
    let client: Cliente={id:0,nit:"",nombre:"",celular:"",direccion:""};
    const dialogo1 = this.dialog.open(FormularioComponent, {data:{cliente:client,texto:"Nuevo Cliente"}});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined){
        client={
          id:0,
          nit:art.value.nit,
          nombre:art.value.nombre,
          celular:art.value.celular,
          direccion:art.value.direccion
        }
        this.clienteServicio.nuevo(client).subscribe(data=>{
          this.clientes=data
          Swal.fire({
            icon: "success",
            title: "Satisfactorio",
            text: "Cliente Registrado Correctamente",
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
  actualizar(item:Cliente):void {
    let client:Cliente
    const dialogo1 = this.dialog.open(FormularioComponent, {data:{cliente:item,texto:"Editar Cliente"}});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined){
        client={
          id:item.id,
          nombre:art.value.nombre,
          nit:art.value.nit,
          celular:art.value.celular,
          direccion:art.value.direccion,
        }
        this.clienteServicio.actualizar(item.id,client).subscribe(data=>{
          this.clientes=data
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
  eliminar(item:Cliente): void {
    Swal.fire({
      title: 'Seguro de Eliminar este cliente?',
      text: item.nombre,
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
        this.clienteServicio.eliminar(item.id).subscribe(data=>{
          this.clientes=data
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
