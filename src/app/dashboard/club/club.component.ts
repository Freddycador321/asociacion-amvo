import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Club } from 'src/app/models/club';
import { ClubService } from 'src/app/services/club.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environments.prod';
import { FormularioComponent } from './formulario/formulario.component'; 


@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent {
  title = 'clubes';
  clubes: Club[] = [];
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;

  base = environment.base + 'club/imagen/';
  filterpost = '';

  constructor(
    private clubService: ClubService,
    private route: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public dialogo: MatDialog
  ) {}

  ngOnInit(): void {
    this.clubService.listar().subscribe(data => {
      this.clubes = data;
      console.log(this.clubes)
    });
  }

  llenar_imagen(img: string) {
    return this.base + img;
  }

  actualizar(item: Club): void {
    let club: Club;
    const dialogo1 = this.dialog.open(FormularioComponent, {
      data: { club: item, texto: 'Editar Club' }
    });
    dialogo1.afterClosed().subscribe(res => {
      if (res != undefined) {
        club = {
          id: item.id,
          nombre_prop: res.value.nombre_prop,
          apellido_prop: res.value.apellido_prop,
          ci_prop: res.value.ci_prop,
          fecha_nac: res.value.fecha_nac,
          foto: res.value.foto,
          nombre_club: res.value.nombre_club,
          tel_cel: res.value.tel_cel,
          gmail: res.value.gmail,
          abreviatura: res.value.abreviatura
        };
        this.clubService.actualizar(item.id, club).subscribe(
          data => {
            this.clubes = data;
            Swal.fire({
              icon: 'success',
              title: 'Satisfactorio',
              text: 'Club actualizado correctamente',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error => {
            this.toastr.error('Error', 'Operación Fallida');
          }
        );
      } else {
        this.toastr.info('Operación Cancelada', '');
      }
    });
  }

  agregar(): void {
    let club: Club;
    club = {
      id: 0,
      nombre_prop: '',
      apellido_prop: '',
      ci_prop: '',
      fecha_nac: new Date(),
      foto: '',
      nombre_club: '',
      tel_cel: '',
      gmail: '',
      abreviatura: ''
    };
    const dialogo1 = this.dialog.open(FormularioComponent, {
      data: { club: club, texto: 'Nuevo Club' }
    });
    dialogo1.afterClosed().subscribe(res => {
      if (res != undefined) {
        club = {
          id: 0,
          nombre_prop: res.value.nombre_prop,
          apellido_prop: res.value.apellido_prop,
          ci_prop: res.value.ci_prop,
          fecha_nac: res.value.fecha_nac,
          foto: res.value.foto,
          nombre_club: res.value.nombre_club,
          tel_cel: res.value.tel_cel,
          gmail: res.value.gmail,
          abreviatura: res.value.abreviatura
        };
        this.clubService.nuevo(club).subscribe(
          data => {
            this.clubes = data;
            Swal.fire({
              icon: 'success',
              title: 'Satisfactorio',
              text: 'Club registrado correctamente',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error => {
            this.toastr.error('Error', 'Operación Fallida');
          }
        );
      } else {
        this.toastr.info('Operación Cancelada', '');
      }
    });
  }

  eliminar(club: Club): void {
    Swal.fire({
      title: '¿Seguro de eliminar este club?',
      text: club.nombre_club,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33'
    }).then(result => {
      if (result.value) {
        Swal.fire({
          icon: 'success',
          title: 'Satisfactorio',
          text: 'Club eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.clubService.eliminar(club.id).subscribe(data => {
          this.clubes = data;
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el club',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  pdf(): void {
    let fecha = new Date();
    const titulo = 'clubes ' + fecha;
    const doc = new jsPDF('p', 'pt', 'a4');
    const imagen = new Image();

    doc.setFontSize(25);
    doc.setFont('helvetica', 'bold');
    doc.text('COMERCIAL BELEN', 160, 45);
    doc.setFontSize(18);
    doc.text('Lista de clubes', 200, 110);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    let data = [];
    let i = 1;
    let imagenes: string[] = [];
    for (let c of this.clubes) {
      let x: any[] = [];
      x.push(i++);
      x.push(c.nombre_club);
      x.push(c.abreviatura);
      x.push(c.nombre_prop + ' ' + c.apellido_prop);
      x.push(c.fecha_nac);
      x.push(' ');
      data.push(x);
    }
    let imag = new Image();
    let cabeza = ['#', 'Nombre Club', 'Abreviatura', 'Propietario', 'Fecha Nac.', 'Imagen'];

    autoTable(doc, {
      columns: cabeza,
      body: data,
      pageBreak: 'auto',
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
      startY: 180,
      didDrawCell: data => {
        data.row.height = 50;
        if (data.section === 'body' && data.column.index === 5) {
          data.row.height = 80;
          imag.src = this.base + imagenes[data.row.index];
          doc.addImage(imag, 'JPEG', data.cell.x + 2, data.cell.y - 20, 65, 65);
        }
      }
    });

    doc.save(titulo + '.pdf');
  }
}
