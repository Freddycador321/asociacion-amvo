
import { FormularioComponent } from '../usuario/formulario/formulario.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environments.prod';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  title = 'Categorias';
  categorias: Categoria[] = [];
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  base = environment.base + 'categoria/imagen/';
  filterpost = '';

  constructor(
    private categoriaServicio: CategoriaService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias(): void {
    this.categoriaServicio.listar().subscribe(
      data => {
        this.categorias = data;
      },
      error => {
        this.toastr.error('Error al cargar las categorías', 'Error');
      }
    );
  }

  llenarImagen(img: string): string {
    return this.base + img;
  }

  actualizar(item: Categoria): void {
    const dialogo1 = this.dialog.open(FormularioComponent, {
      data: { categoria: item, texto: 'Editar Categoría' }
    });

    dialogo1.afterClosed().subscribe(result => {
      if (result) {
        const categoriaActualizada: Categoria = {
          id: item.id,
          categoria: result.value.categoria,
          rama: result.value.rama,
          club_id: result.value.club_id
        };
        this.categoriaServicio.actualizar(item.id, categoriaActualizada).subscribe(
          data => {
            this.categorias = data;
            Swal.fire({
              icon: 'success',
              title: 'Satisfactorio',
              text: 'Categoría actualizada correctamente',
              showConfirmButton: false,
              timer: 1500
            });
          },
          () => this.toastr.error('No se pudo actualizar la categoría', 'Error')
        );
      } else {
        this.toastr.info('Operación cancelada');
      }
    });
  }

  agregar(): void {
    const nuevaCategoria: Categoria = { id: 0, categoria: '', rama: '', club_id: 0 };

    const dialogo1 = this.dialog.open(FormularioComponent, {
      data: { categoria: nuevaCategoria, texto: 'Nueva Categoría' }
    });

    dialogo1.afterClosed().subscribe(result => {
      if (result) {
        const categoriaCreada: Categoria = {
          id: 0,
          categoria: result.value.categoria,
          rama: result.value.rama,
          club_id: result.value.club_id
        };
        this.categoriaServicio.nuevo(categoriaCreada).subscribe(
          data => {
            this.categorias = data;
            Swal.fire({
              icon: 'success',
              title: 'Satisfactorio',
              text: 'Categoría registrada correctamente',
              showConfirmButton: false,
              timer: 1500
            });
          },
          () => this.toastr.error('No se pudo registrar la categoría', 'Error')
        );
      } else {
        this.toastr.info('Operación cancelada');
      }
    });
  }

  eliminar(categoria: Categoria): void {
    Swal.fire({
      title: '¿Seguro de eliminar esta categoría?',
      text: `${categoria.categoria} - ${categoria.rama}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        this.categoriaServicio.eliminar(categoria.id).subscribe(
          data => {
            this.categorias = data;
            Swal.fire({
              icon: 'success',
              title: 'Satisfactorio',
              text: 'Categoría eliminada correctamente',
              showConfirmButton: false,
              timer: 1500
            });
          },
          () => this.toastr.error('No se pudo eliminar la categoría', 'Error')
        );
      }
    });
  }
}
