import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Arbitro } from 'src/app/models/arbitro';
import { ArbitroService } from 'src/app/services/arbitro.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { faPlus,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environments.prod';
import { FormularioComponent } from './formulario/formulario.component';

@Component({
  selector: 'app-arbitro',
  templateUrl: './arbitro.component.html',
  styleUrls: ['./arbitro.component.css']
})
export class ArbitroComponent {
  title = 'arbitros';
  arbitros:Arbitro[]=[];
  faPlus=faPlus
  faTrash=faTrash
  faEdit=faEdit

  base=environment.base+'usuario/imagen/';
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
  constructor(private arbitroServicio:ArbitroService, private route:Router,private toastr: ToastrService,private dialog:MatDialog,public dialogo: MatDialog) {}
  ngOnInit(): void {
    this.arbitroServicio.listar().subscribe(
      data=>{
        this.arbitros=data;
      }
    );
  }
  llenar_imagen(img:string){
    return this.base+img;
  }
  actualizar(item:Arbitro):void {
    let user: Arbitro;
    const dialogo1 = this.dialog.open(FormularioComponent, {data:{usuario:item,texto:"Editar Usuario"}});
    dialogo1.afterClosed().subscribe(art => {
      if (art!= undefined){
        user={
          id:item.id,
          nombre_arb:art.value.nombre_arb,
          apellido_arb:art.value.apellido_arb,
          ci_arb:art.value.ci_arb,
          cel_arb:art.value.cel_arb,
          estado:art.value.estado,
          fecha_nac_arb:art.value.fecha_nac_arb,
          foto:art.value.foto,
          gmail_arb:art.value.gmail_arb,
          nivel:art.value.nivel,
          nota:art.value.nota,

        }
        this.arbitroServicio.actualizar(item.id,user).subscribe(data=>{
          this.arbitros=data
          Swal.fire({
            icon: "success",
            title: "Satisfactorio",
            text: "Usuario Actualizado Correctamente",
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
    let user: Arbitro;
    user={
      id:0,
      nombre_arb:'',
      apellido_arb:'',
      ci_arb:'',
      cel_arb:0,
      estado:'',
      fecha_nac_arb:'',
      foto:'',
      gmail_arb:'',
      nivel:'',
      nota:'',

    }
    const dialogo1 = this.dialog.open(FormularioComponent, {data:{usuario:user,texto:"Nuevo Usuario"}});
    dialogo1.afterClosed().subscribe(art => {
      if (art!= undefined){
        user={
          id:0,
          nombre_arb:art.value.nombre_arb,
          apellido_arb:art.value.apellido_arb,
          ci_arb:art.value.ci_arb,
          cel_arb:art.value.cel_arb,
          estado:art.value.estado,
          fecha_nac_arb:art.value.fecha_nac_arb,
          foto:art.value.foto,
          gmail_arb:art.value.gmail_arb,
          nivel:art.value.nivel,
          nota:art.value.nota,
        }
        this.arbitroServicio.nuevo(user).subscribe(data=>{
          this.arbitros=data
          Swal.fire({
            icon: "success",
            title: "Satisfactorio",
            text: "Usuario Registrado Correctamente",
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
  eliminar(user:Arbitro): void {
    Swal.fire({
      title: 'Seguro de Eliminar este registro?',
      text: user.apellido_arb+" "+user.nombre_arb,
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
        this.arbitroServicio.eliminar(user.id).subscribe(data=>{
          this.arbitros=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el usuario",
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }
  pdf():void{
      let fecha=new Date();
      const titulo="arbitros "+fecha;
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
      doc.text("Lista de arbitros",200,110);
      doc.setFontSize(10);
      doc.setFont('helvetica','normal')
      var data=[]
      let i=1;
      let imagenes:string[]=[];
      for(let u of this.arbitros){
        let x=[];
        x.push(i++)
        x.push(u.apellido_arb+" "+u.nombre_arb)
        x.push(u.fecha_nac_arb)
        // x.push(u.email)
        //x.push(u.username)
        x.push(" ")
        //imagenes.push(u.imagen)
        data.push(x)
      }
      let imag= new Image();
      // imag.src=this.base+imagenes[0];
      let cabeza=['#','Nombre Completo','Rol','Cuenta','    Imagen    ']
      // autoTable(doc,{columns:cabeza,body:data,theme:'grid',pageBreak:'auto',headStyles:{fillColor:[0,0,0],textColor:[255,255,255]},startY:180,
      autoTable(doc,{columns:cabeza,body:data,pageBreak:'auto',headStyles:{fillColor:[0,0,0],textColor:[255,255,255]},startY:180,
      didDrawCell: (data) => {
        data.row.height=50;
        if (data.section === 'body' && data.column.index === 4) {
          data.row.height=80;
          // data.cell.width=100;
            imag.src=this.base+imagenes[data.row.index];
            // imag=this.base+data.cell.text;
            // imag=this.base+'202185131519.jpg';
          // doc.addImage(imag,"jpeg",10,10,60,60);
          // var base64Img = 'data:image/jpeg;base64,iVBORw0KGgoAAAANS...'
            doc.addImage(imag, 'JPEG', data.cell.x + 2, data.cell.y -20, 65, 65)
          }
        }
      })
      // const pageCount = doc.internal.getNumberOfPages()
      // doc.setFont('helvetica', 'italic')
      // doc.setFontSize(8)
      // for (var i = 1; i <= pageCount; i++) {
      //   doc.setPage(i)
      //   doc.text('Usuario: ' + localStorage.getItem('nombre')+" "+localStorage.getItem('apellido'), 40, doc.internal.pageSize.height-10, {align:'left'})
      //   doc.text('Página ' + String(i) + ' de ' + String(pageCount), 550, doc.internal.pageSize.height-10, {align:'right'})
      // }
    doc.save(titulo+'.pdf')
  }

}
