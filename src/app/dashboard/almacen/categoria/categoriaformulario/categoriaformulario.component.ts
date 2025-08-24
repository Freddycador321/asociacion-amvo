import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-categoriaformulario',
  templateUrl: './categoriaformulario.component.html',
  styleUrls: ['./categoriaformulario.component.css']
})
export class CategoriaformularioComponent {
  letras:any=/[A-Za-z ]{3,20}/;
  public name:string=""
  public previsualizacion:string=""
  texto:string=""
  constructor(public dialogRef:MatDialogRef<CategoriaformularioComponent>, @ Inject (MAT_DIALOG_DATA) public data:any){
    this.texto=data.texto
    this.id?.setValue(data.categoria.id)
    this.grupo?.setValue(data.categoria.grupo)
    this.codigo?.setValue(data.categoria.codigo)
    this.sucursal_id?.setValue(data.categoria.sucursal_id)
  }
  agregar=new FormGroup({
    id: new FormControl('',[]),
    grupo: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
    codigo: new FormControl('',[Validators.required,Validators.minLength(3)]),
    sucursal_id: new FormControl('',[Validators.required]),
  })
  get id(){return this.agregar.get('id'); }
  get grupo(){return this.agregar.get('grupo'); }
  get codigo(){return this.agregar.get('codigo'); }
  get sucursal_id(){return this.agregar.get('sucursal_id'); }
  nuevo():void{
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_grupo() {
    if (this.grupo?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.grupo?.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    return this.grupo?.hasError('pattern') ? 'Solo se aceptan letras' : '';
  }
  error_codigo() {
    if (this.codigo?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.codigo?.hasError('minlength'))
      return 'Ingrese 3 caracteres';
    return this.codigo?.hasError('pattern') ? 'Solo se aceptan letras' : '';
  }
}
