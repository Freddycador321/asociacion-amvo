import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { faPlus,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environments.prod';
import { FormularioComponent } from '../usuario/formulario/formulario.component';
import { jugadorService } from 'src/app/services/jugador.service';
import { Jugador } from 'src/app/models/jugador';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent {
  title = 'jugadores';
  jugadores:Jugador[]=[];
  faPlus=faPlus
  faTrash=faTrash
  faEdit=faEdit

  base=environment.base+'jugador/imagen/';
  filterpost='';
  role(rol:number){
    switch(rol){
      case 1:
        return "Administrador";
      case 2:
        return "Encargado Sucursal";
      case 3:
        return "Vendedor";
      default:
        return "";
    }
  }
  constructor(private jugadorServicio:jugadorService, private route:Router,private toastr: ToastrService,private dialog:MatDialog,public dialogo: MatDialog) {}
  ngOnInit(): void {
    this.jugadorServicio.listar().subscribe(
      data=>{
        this.jugadores=data;
      }
    );
  }
  llenar_imagen(img:string){
    return this.base+img;
  }
  actualizar(item:Jugador):void {
    let user: Jugador;
    const dialogo1 = this.dialog.open(FormularioComponent, {data:{jugador:item,texto:"Editar Jugador"}});
    dialogo1.afterClosed().subscribe(art => {
      if (art!= undefined){
        user={
          id:item.id,
          nombre:art.value.nombre,
          apellido:art.value.apellido,
          ci:art.value.ci,
          fecha_naci:art.value.fecha_naci,
          foto:art.value.foto,
          rama:art.value.rama,
          equipo_id:art.value.equipo_id,
        }
        this.jugadorServicio.actualizar(item.id,user).subscribe(data=>{
         this.jugadores=data
          Swal.fire({
            icon: "success",
            title: "Satisfactorio",
            text: "Jugador Actualizado Correctamente",
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
    let user: Jugador;
    user={
      id:0,
      nombre:'',
      apellido:'',
      ci:0,
      fecha_naci:new Date(),
      foto:'',
      rama:'',
      equipo_id:0

    }
    const dialogo1 = this.dialog.open(FormularioComponent, {data:{jugador:user,texto:"Nuevo Jugador"}});
    dialogo1.afterClosed().subscribe(art => {
      if (art!= undefined){
        user={
          id:0,
          nombre:art.value.nombre,
          apellido:art.value.apellido,
          ci:art.value.ci,
          fecha_naci:art.value.fecha_naci,
          foto:art.value.foto,
          rama:art.value.rama,
          equipo_id:art.value.equipo_id,
        }
        this.jugadorServicio.nuevo(user).subscribe(data=>{
          this.jugadores=data
          Swal.fire({
            icon: "success",
            title: "Satisfactorio",
            text: "Jugador Registrado Correctamente",
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
  eliminar(user:Jugador): void {
    Swal.fire({
      title: 'Seguro de Eliminar este registro?',
      text: user.apellido+" "+user.nombre,
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
            text: "Usuario Eliminado Correctamente",
            showConfirmButton: false,
            timer: 1500
        });
        this.jugadorServicio.eliminar(user.id).subscribe(data=>{
          this.jugadores=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el jugador",
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }
  // pdf():void{
  //     let fecha=new Date();
  //     const titulo="jugadores "+fecha;
  //     const doc = new jsPDF('p', 'pt', 'a4');
  //     const imagen= new Image();
  //     // imagen.src="assets/images/uto.png";
  //     // doc.addImage(imagen,"png",40,30,60,60);
  //     doc.setFontSize(25);
  //     doc.setFont('helvetica','bold')
  //     doc.text("COMERCIAL BELEN",160,45);
  //     // doc.text("FACULTAD NACIONAL DE INGENIERIA",220,57);
  //     // doc.text("INGENIERIA DE SISTEMAS E INGENIERIA INFORMATICA",190,69);
  //     doc.setFontSize(18);
  //     doc.text("Lista de jugadores",200,110);
  //     doc.setFontSize(10);
  //     doc.setFont('helvetica','normal')
  //     var data=[]
  //     let i=1;
  //     let imagenes:string[]=[];
  //     for(let u of this.jugadores){
  //       let x=[];
  //       x.push(i++)
  //       x.push(u.apellido+" "+u.nombre)
  //       x.push(u.fecha_naci)
  //       // x.push(u.email)
  //       //x.push(u.username)
  //       x.push(" ")
  //       //imagenes.push(u.imagen)
  //       data.push(x)
  //     }
  //     let imag= new Image();
  //     // imag.src=this.base+imagenes[0];
  //     let cabeza=['#','Nombre Completo','Rol','Cuenta','    Imagen    ']
  //     // autoTable(doc,{columns:cabeza,body:data,theme:'grid',pageBreak:'auto',headStyles:{fillColor:[0,0,0],textColor:[255,255,255]},startY:180,
  //     autoTable(doc,{columns:cabeza,body:data,pageBreak:'auto',headStyles:{fillColor:[0,0,0],textColor:[255,255,255]},startY:180,
  //     didDrawCell: (data) => {
  //       data.row.height=50;
  //       if (data.section === 'body' && data.column.index === 4) {
  //         data.row.height=80;
  //         // data.cell.width=100;
  //           imag.src=this.base+imagenes[data.row.index];
  //           // imag=this.base+data.cell.text;
  //           // imag=this.base+'202185131519.jpg';
  //         // doc.addImage(imag,"jpeg",10,10,60,60);
  //         // var base64Img = 'data:image/jpeg;base64,iVBORw0KGgoAAAANS...'
  //           doc.addImage(imag, 'JPEG', data.cell.x + 2, data.cell.y -20, 65, 65)
  //         }
  //       }
  //     })
  //     // const pageCount = doc.internal.getNumberOfPages()
  //     // doc.setFont('helvetica', 'italic')
  //     // doc.setFontSize(8)
  //     // for (var i = 1; i <= pageCount; i++) {
  //     //   doc.setPage(i)
  //     //   doc.text('Usuario: ' + localStorage.getItem('nombre')+" "+localStorage.getItem('apellido'), 40, doc.internal.pageSize.height-10, {align:'left'})
  //     //   doc.text('Página ' + String(i) + ' de ' + String(pageCount), 550, doc.internal.pageSize.height-10, {align:'right'})
  //     // }
  //   doc.save(titulo+'.pdf')
  // }

}
