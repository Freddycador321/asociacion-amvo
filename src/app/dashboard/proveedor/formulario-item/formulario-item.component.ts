import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/models/item';
import { Producto } from 'src/app/models/producto';
import { ItemService } from 'src/app/services/item.service';
import { environment } from 'src/environments/environments.prod';

@Component({
  selector: 'app-formulario-item',
  templateUrl: './formulario-item.component.html',
  styleUrls: ['./formulario-item.component.css']
})
export class FormularioItemComponent {
  texto:string=""
  base=environment.base
  productos:Producto[]
  constructor(public dialogRef:MatDialogRef<FormularioItemComponent>, @ Inject (MAT_DIALOG_DATA) public data:any,private itemServicio:ItemService){
    this.texto=data.texto
    this.productos=data.productos
    console.log(this.productos)
    this.id?.setValue(data.item.id)
    this.nuevo?.setValue(data.item.nuevo),
    this.precio?.setValue(data.item.precio)
  }
  agregar=new FormGroup({
    id: new FormControl('',[]),
    nuevo: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
    precio: new FormControl('',[Validators.required,Validators.min(1),Validators.max(1000)]),
    producto_id:new FormControl(),
  })
  get id(){return this.agregar.get('id'); }
  get nuevo(){return this.agregar.get('nuevo'); }
  get precio(){return this.agregar.get('precio'); }
  get producto_id(){return this.agregar.get('producto_id'); }

  adicionar():void{
    // this.enviarImagen();
    // this.agregar.controls['img'].setValue(this.nombre_i);
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_nuevo() {
    if (this.nuevo?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.nuevo?.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    if(this.nuevo?.hasError('pattern'))
      return  'Solo se aceptan letras';
      return  '';
  }
  error_precio() {
    if (this.precio?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.precio?.hasError('min'))
      return 'Ingrese un monto mayor a 1';
    if(this.precio?.hasError('max'))
      return  'Ingrese un monto menor o igual a 1000';
      return  '';
  }
  setear(item:any):void{
    this.nuevo?.setValue(item.categoriaGrupo+" "+item.descripcion)
  }
}
