import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sucursal } from 'src/app/models/sucursal';
import { SucursalService } from 'src/app/services/sucursal.service';
import { environment } from 'src/environments/environments.prod';

@Component({
  selector: 'app-sucursalformulario',
  templateUrl: './sucursalformulario.component.html',
  styleUrls: ['./sucursalformulario.component.css']
})
export class SucursalformularioComponent {
  letras:any=/[A-Za-z ]{3,20}/;
  public name:string=""
  public previsualizacion:string=""
  texto:string=""
  sucursales:Sucursal[]=[]
  constructor(public dialogRef:MatDialogRef<SucursalformularioComponent>, @ Inject (MAT_DIALOG_DATA) public data:any,private sucursalServicio:SucursalService){
    this.texto=data.texto
    this.id?.setValue(data.sucursal.id)
    this.numero?.setValue(data.sucursal.numero)
    this.direccion?.setValue(data.sucursal.direccion)
    if(data.texto=="Editar Sucursal"){
      this.imagen?.clearValidators()
      if(data.sucursal.imagen!="")
      this.previsualizacion=this.base+data.sucursal.imagen
    }
  }
  agregar=new FormGroup({
    id: new FormControl('',[]),
    numero: new FormControl('',[Validators.required,Validators.min(1),Validators.max(10)]),
    direccion: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
    imagen: new FormControl('',[Validators.required]),
    nombreImagen: new FormControl('',[])
  })
  get id(){return this.agregar.get('id'); }
  get numero(){return this.agregar.get('numero'); }
  get direccion(){return this.agregar.get('direccion'); }
  get imagen(){return this.agregar.get('imagen'); }
  get nombreImagen(){return this.agregar.get('nombreImagen')}
  base=environment.base+'sucursal/imagen/';
  llenar_imagen(img:string){
    return this.base+img;
  }
  cargarImagen(event:any):void{
    let file:File=<File>event.target.files[0]
    this.name=file.name
    this.nombreImagen?.setValue(this.name)
    this.previsualizar(file)
    this.sucursalServicio.subirImagen(file,this.name).subscribe(data=>{
    })
  }
  previsualizar(file:File):void{
    const reader=new FileReader()
    reader.onload=(e:any)=>{
      this.previsualizacion=e.target.result
    };
    reader.readAsDataURL(file)
  };

  nuevo():void{
    // this.enviarImagen();
    // this.agregar.controls['img'].setValue(this.nombre_i);
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_numero() {
    if (this.numero?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
      return  '';
  }
  error_direccion() {
    if (this.direccion?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.direccion?.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
      return this.direccion?.hasError('pattern') ? 'Solo se aceptan caracteres alfanumericos' : '';
  }
  error_imagen() {
    if (this.imagen?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return "";
  }
}
