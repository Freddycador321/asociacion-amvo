import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { faPlus,faEdit,faTrash, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { FormularioItemComponent } from '../formulario-item/formulario-item.component';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit{
  id:number=0
  faPlus=faPlus
  faTrash=faTrash
  faEdit=faEdit
  faArrowCircleLeft=faArrowCircleLeft
  items:Item[]
  productos:Producto[]
  form:Proveedor={nombre:'',apellido:'',celular:'',empresa:'',id:0,observacion:''}
  constructor(private route:ActivatedRoute,
    private proveedorServicio:ProveedorService,
    private itemServicio:ItemService,
    private toastr: ToastrService,
    private dialog:MatDialog,
    private dialogo:MatDialog,
    private productoServicio:ProductoService
  ){
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.proveedorServicio.buscar(this.id).subscribe(data=>{
      this.form=data[0]
      this.productos=data[1]
    })
  }
  agregar() {
    let item: Item={id:0,  proveedor_id:0,producto_id:0,nuevo:"",precio:0};
    const dialogo1 = this.dialog.open(FormularioItemComponent, {data:{item:item,texto:"Nuevo Item",productos:this.productos}});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined){
        item={
          id:0,
          proveedor_id:this.id,
          producto_id:0,
          nuevo:art.value.nuevo,
          precio:art.value.precio,
        }
        console.log(item)
        this.itemServicio.nuevo(item).subscribe(data=>{
          this.form.items=data
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
  actualizar(item:Item):void {
    let prov:Item
    const dialogo1 = this.dialog.open(FormularioItemComponent, {data:{item:item,texto:"Editar Item",productos:this.productos}});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined){
        prov={
          id:item.id,
          nuevo:art.value.nuevo,
          proveedor_id:this.id,
          precio:art.value.precio
        }
        this.itemServicio.actualizar(item.id,prov).subscribe(data=>{
          this.form.items=data
          Swal.fire({
            icon: "success",
            title: "Satisfactorio",
            text: "Item Actualizado Correctamente",
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
  eliminar(item:Item): void {
    Swal.fire({
      title: 'Seguro de Eliminar este Item?',
      text: item.nuevo,
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
            text: "Item Eliminado Correctamente",
            showConfirmButton: false,
            timer: 1500
        });
        this.itemServicio.eliminar(item.id).subscribe(data=>{
          this.form.items=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el Item",
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }

}
