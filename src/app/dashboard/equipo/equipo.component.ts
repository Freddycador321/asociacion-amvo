import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environments.prod';
import { FormularioComponent } from '../usuario/formulario/formulario.component'; // ⚠️ Ajusta si tienes un formulario específico para equipos
import Swal from 'sweetalert2';
import { Equipo } from 'src/app/models/equipo';
import { EquipoService } from 'src/app/services/equipo.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  title = 'Equipos';
  equipos: Equipo[] = [];

  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;

  // ⚠️ Ajusta la ruta si las imágenes están en otra carpeta
  base = environment.base + 'equipo/imagen/';

  filterpost = '';
categorias: any;

  constructor(
    private equipoServicio: EquipoService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listarEquipos();
  }

  listarEquipos(): void {
    this.equipoServicio.listar().subscribe(
      data => {
        this.equipos = data;
      },
      error => {
        this.toastr.error('Error al cargar los equipos', 'Error');
      }
    );
  }

  llenarImagen(img: string): string {
    return this.base + img;
  }

  actualizar(item: Equipo): void {
    const dialogo1 = this.dialog.open(FormularioComponent, {
      data: { equipo: item, texto: 'Editar Equipo' }
    });

    dialogo1.afterClosed().subscribe(result => {
      if (result) {
        const equipoActualizado: Equipo = {
          id: item.id,
          nombre_eq: result.value.nombre_eq,
          estado: result.value.estado,
          nota: result.value.nota,
          categoria_id: result.value.categoria_id,
          categoria: undefined
        };

        this.equipoServicio.actualizar(item.id, equipoActualizado).subscribe(
          data => {
            this.equipos = data;
            Swal.fire({
              icon: 'success',
              title: 'Satisfactorio',
              text: 'Equipo actualizado correctamente',
              showConfirmButton: false,
              timer: 1500
            });
          },
          () => this.toastr.error('No se pudo actualizar el equipo', 'Error')
        );
      } else {
        this.toastr.info('Operación cancelada');
      }
    });
  }

  agregar(): void {
    const nuevoEquipo: Equipo = {
      id: 0,
      nombre_eq: '',
      estado: '',
      nota: '',
      categoria_id: 0,
      categoria: undefined
    };

    const dialogo1 = this.dialog.open(FormularioComponent, {
      data: { equipo: nuevoEquipo, texto: 'Nuevo Equipo' }
    });

    dialogo1.afterClosed().subscribe(result => {
      if (result) {
        const equipoCreado: Equipo = {
          id: 0,
          nombre_eq: result.value.nombre_eq,
          estado: result.value.estado,
          nota: result.value.nota,
          categoria_id: result.value.categoria_id,
          categoria: undefined
        };

        this.equipoServicio.nuevo(equipoCreado).subscribe(
          data => {
            this.equipos = data;
            Swal.fire({
              icon: 'success',
              title: 'Satisfactorio',
              text: 'Equipo registrado correctamente',
              showConfirmButton: false,
              timer: 1500
            });
          },
          () => this.toastr.error('No se pudo registrar el equipo', 'Error')
        );
      } else {
        this.toastr.info('Operación cancelada');
      }
    });
  }

  eliminar(equipo: Equipo): void {
    Swal.fire({
      title: '¿Seguro de eliminar este equipo?',
      text: `${equipo.nombre_eq}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        this.equipoServicio.eliminar(equipo.id).subscribe(
          data => {
            this.equipos = data;
            Swal.fire({
              icon: 'success',
              title: 'Satisfactorio',
              text: 'Equipo eliminado correctamente',
              showConfirmButton: false,
              timer: 1500
            });
          },
          () => this.toastr.error('No se pudo eliminar el equipo', 'Error')
        );
      }
    });
  }
}
