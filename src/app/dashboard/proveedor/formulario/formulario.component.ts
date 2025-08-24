import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item.service';
import { environment } from 'src/environments/environments.prod';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  texto:string=""
  base=environment.base
  constructor(public dialogRef:MatDialogRef<FormularioComponent>, @ Inject (MAT_DIALOG_DATA) public data:any,private itemServicio:ItemService){
    this.texto=data.texto
    this.id?.setValue(data.proveedor.id)
    this.nombre?.setValue(data.proveedor.nombre)
    this.apellido?.setValue(data.proveedor.apellido)
    this.empresa?.setValue(data.proveedor.empresa)
    this.celular?.setValue(data.proveedor.celular)
    this.observacion?.setValue(data.proveedor.observacion)
  }
  agregar=new FormGroup({
    id: new FormControl('',[]),
    nombre: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
    apellido: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
    empresa: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
    celular: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(15)]),
    observacion: new FormControl('',[Validators.minLength(3),Validators.maxLength(50)]),

  })
  get id(){return this.agregar.get('id'); }
  get nombre(){return this.agregar.get('nombre'); }
  get apellido(){return this.agregar.get('apellido'); }
  get empresa(){return this.agregar.get('empresa'); }
  get celular(){return this.agregar.get('celular'); }
  get observacion(){return this.agregar.get('observacion'); }

  adicionar():void{
    // this.enviarImagen();
    // this.agregar.controls['img'].setValue(this.nombre_i);
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_nombre() {
    if (this.nombre?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.nombre?.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    if(this.nombre?.hasError('pattern'))
      return  'Solo se aceptan letras';
      return  '';
  }

  error_apellido() {
    if (this.apellido?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.apellido?.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    if(this.apellido?.hasError('pattern'))
      return  'Solo se aceptan letras';
      return  '';
  }

  error_celular() {
    if (this.celular?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.celular?.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    if(this.celular?.hasError('pattern'))
      return  'Solo se aceptan letras';
      return  '';
  }

  error_empresa() {
    if (this.empresa?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.empresa?.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    if(this.empresa?.hasError('pattern'))
      return  'Solo se aceptan letras';
      return  '';
  }

  error_observacion() {
    if (this.observacion?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.observacion?.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    if(this.observacion?.hasError('pattern'))
      return  'Solo se aceptan letras';
      return  '';
  }
}
