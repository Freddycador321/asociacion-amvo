import { Component, OnInit } from '@angular/core';
import { Sucursal } from 'src/app/models/sucursal';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { faPlus,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { SucursalformularioComponent } from './sucursalformulario/sucursalformulario.component';
import { environment } from 'src/environments/environments.prod';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent {
  title = 'Sucursales';
  sucursales:Sucursal[]=[];
  faPlus=faPlus
  faTrash=faTrash
  faEdit=faEdit

  base=environment.base+'sucursal/imagen/';
  filterpost='';
  constructor(private sucursalServicio:SucursalService, private route:Router,private toastr: ToastrService,private dialog:MatDialog,public dialogo: MatDialog) {}
  ngOnInit(): void {
    this.sucursalServicio.listar().subscribe((data:any)=>{
      this.sucursales=data;
    });
    this.sucursalServicio.listar().subscribe(data=>{
      this.sucursales=data
    })
  }
  llenar_imagen(img:string){
    return this.base+img;
  }
  actualizar(item:Sucursal):void {
    let suc: Sucursal;
    const dialogo1 = this.dialog.open(SucursalformularioComponent, {data:{sucursal:item,texto:"Editar Sucursal"}});
    dialogo1.afterClosed().subscribe(art => {
      if (art!= undefined){
        suc={
          id:item.id,
          numero:art.value.numero,
          imagen:art.value.nombreImagen,
          direccion:art.value.direccion,
        }
        console.log(suc)
        this.sucursalServicio.actualizar(item.id,suc).subscribe(data=>{
          this.sucursales=data
          Swal.fire({
            icon: "success",
            title: "Satisfactorio",
            text: "Sucursal Actualizado Correctamente",
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
    let item: Sucursal;
    item={
      id:0,
      numero:0,
      imagen:'',
      direccion:'',
    }
    const dialogo1 = this.dialog.open(SucursalformularioComponent, {data:{sucursal:item,texto:"Nueva Sucursal"}});
    dialogo1.afterClosed().subscribe(art => {
      if (art!= undefined){
        item={
          id:0,
          imagen:art.value.nombreImagen,
          direccion:art.value.direccion,
          numero:art.value.numero,
        }
        console.log(item)
        this.sucursalServicio.nuevo(item).subscribe(data=>{
          this.sucursales=data
          Swal.fire({
            icon: "success",
            title: "Satisfactorio",
            text: "Sucursal Registrado Correctamente",
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
  eliminar(item:Sucursal): void {
    Swal.fire({
      title: 'Seguro de Eliminar este registro?',
      text: item.numero+" "+item.direccion,
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
            text: "Sucursal Eliminado Correctamente",
            showConfirmButton: false,
            timer: 1500
        });
        this.sucursalServicio.eliminar(item.id).subscribe(data=>{
          this.sucursales=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar la Sucursal",
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }
  pdf():void{
      let fecha=new Date();
      const titulo="sucursales "+fecha;
      const doc = new jsPDF('p', 'pt', 'a4');
      const imagen= new Image();
      // imagen.src="assets/images/uto.png";
      // doc.addImage(imagen,"png",40,30,60,60);
      doc.setFontSize(25);
      doc.setFont('helvetica','bold')
      doc.text("COMERCIAL BELEN",160,45);
      // doc.text("FACULTAD NACIONAL DE INGENIERIA",220,57);
      // doc.text("INGENIERIA DE SISTEMAS E INGENIERIA INFORMATICA",190,69);
      doc.setFontSize(18);
      doc.text("Lista de sucursales",200,110);
      doc.setFontSize(10);
      doc.setFont('helvetica','normal')
      var data=[]
      let i=1;
      let imagenes:string[]=[];
      for(let u of this.sucursales){
        let x=[];
        x.push(i++)
        x.push(u.numero)
        x.push(u.direccion)
        x.push(" ")
        imagenes.push(u.imagen)
        data.push(x)
      }
      let imag= new Image();
      let cabeza=['#','Numero','Direccion','    Imagen    ']
      autoTable(doc,{columns:cabeza,body:data,pageBreak:'auto',headStyles:{fillColor:[0,0,0],textColor:[255,255,255]},startY:180,
      didDrawCell: (data) => {
        data.row.height=50;
        if (data.section === 'body' && data.column.index === 3) {
          data.row.height=80;
            imag.src=this.base+imagenes[data.row.index];
            doc.addImage(imag, 'JPEG', data.cell.x + 2, data.cell.y -20, 65, 65)
          }
        }
      })
    doc.save(titulo+'.pdf')
  }

}
